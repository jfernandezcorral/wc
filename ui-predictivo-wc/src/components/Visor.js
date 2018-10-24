import template from './Visor.html'
import styles from './Visor.scss'
import getZEfectivoEnBody, {getZMin} from './stacking'
import {getInstancePaged} from './servicios'
function getAnos(fecha){
    const ano = parseInt(fecha.split('-')[0])
    const thisAno = new Date().getFullYear()
    const ret = thisAno - ano
    if (isNaN(ret)){
        return '-'
    }
    return (String(ret) + " años")
}
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
function getCheckboxes(registros){
    const ret = {cartera: {}, oficina: {}, tipoPersona:{}}
    registros.forEach(reg=>{
        if (reg.tipocartera_desc && !ret.cartera[reg.tipocartera_desc]){ret.cartera[reg.tipocartera_desc] = 1}
        else if(reg.tipocartera_desc){
            ret.cartera[reg.tipocartera_desc]+= 1
        }
        if (reg.tipopersona_desc && !ret.tipoPersona[reg.tipopersona_desc]){ret.tipoPersona[reg.tipopersona_desc] = 1}
        else if(reg.tipopersona_desc){
            ret.tipoPersona[reg.tipopersona_desc]+= 1
        }
        reg.oficina.forEach(o=>{
            if (!ret.oficina[o]){ret.oficina[o] = 1}
            else {ret.oficina[o] += 1}
        })
    })
    return ret
}
export default class Visor {
    constructor(ref) {
        //super()
        this._search = ref._raw.parameters.qtext[0]
        this._ref = ref
        this._capa = undefined
        this._client = undefined
        this._wall = undefined
        this._progress = undefined
        this._filtros = undefined
        this._close = this._close.bind(this)
        this._scroll = this._scroll.bind(this)
        this._click = this._click.bind(this)
        this._clickFiltros = this._clickFiltros.bind(this)
        this._instancePaged = getInstancePaged(this._ref.user, this._ref.oficina, this._ref.entidad, this._search)
        this._cuentas={total: 0}
        Object.keys(this._ref._raw.results).forEach(k=>{
            this._cuentas[k] = this._ref._raw.results[k].numFound
            this._cuentas.total += this._cuentas[k]
        })
        this._registros = []
        this._visibles = {}
        this._statecol = undefined
    }
    _close(){
        this._client.querySelector('.pie .boton').removeEventListener('click', this._close)
        this._wall.removeEventListener('scroll', this._scroll)
        this._wall.removeEventListener('click', this._click)
        this._filtros.removeEventListener('click', this._clickFiltros)
        document.body.removeChild(this._capa)
    }
    _click(e){
        const target = e.composedPath()[0]
        if (!is(target, '.celda') && !is(target.parentNode, '.celda')){
            return
        }
        const id = target.closest('.row').getAttribute('data-id')
        const doc = this._registros.find(r=>r.id===id)
        this._ref.dispatchItem(doc)
        this._close()
    }
    go(){
        this._capa = document.createElement('aside')
        const z = getZMin()
        this._capa.style.zIndex = z? String(z): 'auto'
        const shadowRoot = this._capa.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = '<style>'+ styles +'</style>'+ template
        shadowRoot.host.style.font = window.getComputedStyle(this._ref.shadowRoot.host).font
        document.body.appendChild(this._capa)
        this._client = shadowRoot.querySelector('.client')
        this._progress = shadowRoot.querySelector('.progress')
        this._client.querySelector('.num').innerText = String(this._cuentas.total)
        this._client.querySelector('.patron').innerText = this._search
        this._client.querySelector('.wallCartera .num').innerText = String(this._cuentas.cartera)
        this._client.querySelector('.wallOficina .num').innerText = String(this._cuentas.oficina)
        this._client.querySelector('.wallOtros .num').innerText = String(this._cuentas.otros)
        this._client.querySelector('.pie .boton').addEventListener('click', this._close)
        this._wall = this._client.querySelector('.wall')
        this._wall.addEventListener('scroll', this._scroll)
        this._wall.addEventListener('click', this._click)
        this._progress.classList.add('visible')
        this._filtros = this._client.querySelector('.filtros')
        this._filtros.addEventListener('click', this._clickFiltros)
        this._instancePaged.inicia(/*this._ref._raw*/)
        .then(data=>{
            this._progress.classList.remove('visible')
            Object.keys(data).forEach(k=>{
                data[k].docs.forEach(r=>{
                    this._registros.push(r)
                    this._paint(r, k)
                })
            })
            this._paintFiltros()
        })
        .catch(e=>{
            this._progress.classList.remove('visible')
            console.log(e)
        })
    }
    _fill(txt){
        this._search.split(' ').forEach(t=>{
            txt = txt.replace(new RegExp("(" + t + ")", 'ig'), `<b>$1</b>`)
        })
        return txt
    }
    _paint(it, seccion){
        const model = {
            documento: it.documento || "-",
            nombre: (it.nombre? it.nombre:"") + (it.apellidos? " " + it.apellidos:""),
            localidad: it.localidad?it.localidad:'-',
            domicilio: it.domicilio? it.domicilio:'-',
            codPostal: it.cpostal || '-',
            telefono: it.telefono || '-',
            edad: it.fechanac? getAnos(it.fechanac): '-',
            id: it.id
        }
        let selector = ".wallCartera"
        if (seccion == 'oficina'){
            selector = ".wallOficina"
        }
        else if (seccion == 'otros'){
            selector = ".wallOtros"
        }
        if (!this._visibles[selector]){
            this._visibles[selector] = true
            this._client.querySelector(selector).style.display = 'block'
        }
        const row = document.createElement('div')
        row.classList.add('row')
        row.innerHTML = require('./fragments/registroL.html')
        row.querySelector('.nombre').innerHTML = this._fill(model.nombre)
        row.querySelector('.documento').innerHTML = this._fill(model.documento)
        row.querySelector('.edad').innerHTML = this._fill(model.edad)
        row.querySelector('.telefono').innerHTML = this._fill(model.telefono)
        row.querySelector('.domicilio').innerHTML = this._fill(model.domicilio)
        row.querySelector('.localidad').innerHTML = this._fill(model.localidad)
        row.querySelector('.codPostal').innerHTML = this._fill(model.codPostal)
        row.setAttribute('data-id', model.id)
        this._client.querySelector(selector + " .children").appendChild(row)
    }
    _isFiltersActive(){
        return this._filtros.querySelectorAll('input[type=checkbox].fx:checked').length > 0
    }
    _scroll(){
        if (!this._isFiltersActive() && this._registros.length < this._cuentas.total && this._wall.scrollTop + this._wall.clientHeight >= this._wall.scrollHeight){
            this._progress.classList.add('visible')
            this._instancePaged.siguiente()
            .then(data=>{
                this._progress.classList.remove('visible')
                Object.keys(data).forEach(k=>{
                    data[k].docs.forEach(r=>{
                        this._registros.push(r)
                        this._paint(r, k)
                    })
                })
                this._paintFiltros()
                //this._doFilter()
            })
            .catch(e=>{
                this._progress.classList.remove('visible')
                console.log(e)
            })
        }
    }
    _doFilter(){
        this._wall.scrollTop = 0
        const filtros = []
        this._filtros.querySelectorAll('input[type=checkbox].fx:checked').forEach(input=>{
            const contenedor = input.closest("[data-seccion]")
            const seccion = contenedor.getAttribute('data-seccion')
            const valor = contenedor.getAttribute('data-input')
            filtros.push({key: seccion, value: valor})
        })
        if (filtros.length == 0){
            this._wall.querySelectorAll('.row[data-id]').forEach(row=>row.removeAttribute('style'))
        }
        else{
            const a_visualizar = this._registros.filter(it=>{
                let retoficina = !filtros.some(f=>f.key==='oficina')
                let retcartera = !filtros.some(f=>f.key==='cartera')
                let rettipoPersona = !filtros.some(f=>f.key==='tipoPersona')
                filtros.forEach(filtro=>{
                    if (filtro.key==='oficina' && it.oficina.indexOf(filtro.value)>=0){retoficina = true}
                    else if (filtro.key==='cartera' && it.tipocartera_desc === filtro.value){retcartera = true}
                    else if (filtro.key==='tipoPersona' && it.tipopersona_desc === filtro.value){rettipoPersona = true}
                })
                return retoficina && retcartera && rettipoPersona
            }).map(it=>it.id)
            this._wall.querySelectorAll('.row[data-id]').forEach(row=>{
                if (a_visualizar.includes(row.getAttribute('data-id'))){
                   row.removeAttribute('style')
                }
                else{
                    row.style.display = 'none'
                }
            })
        }
    }
    _clickFiltros(e){
        const target = e.composedPath()[0]
        //console.log(e)
        if (is(target, '.text')){
            target.closest('.colapsable').classList.toggle('colapsado')
            return
        }
        if (is(target, '.reset')){
            this._filtros.querySelectorAll('input[type=checkbox].fx').forEach(input=>{
                input.checked = false
            })
            this._doFilter()
            return
        }
        if (is(target, 'input[type=checkbox].fx')){
            this._doFilter()
            return
        }
    }
    _backupState(){
        if (this._filtros.querySelector('#cartera')){
            this._statecol = {};
            ['cartera', 'oficina', 'tipoPersona'].forEach(it=>{
                if (is(this._filtros.querySelector('#' + it),'.colapsado')){
                    this._statecol[it] = true
                }
                else{
                    this._statecol[it] = false
                }
            })
        }
    }
    _paintFiltros(){
        //if (this._registros.length === this._cuentas.total){
            this._backupState()
            const parent = this._filtros.querySelector('.filter')
            parent.innerHTML = ""
            const div = document.createElement('div')
            div.innerHTML = require('./fragments/filter.html')
            parent.appendChild(div)
            const checks = getCheckboxes(this._registros)
            const templateInput = require('./fragments/input.html')
            if (this._statecol){
                Object.keys(this._statecol).forEach(k=>{
                    this._statecol[k] && this._filtros.querySelector('#' + k).classList.add('colapsado')
                    !this._statecol[k] && this._filtros.querySelector('#' + k).classList.remove('colapsado')
                })
            }
            Object.keys(checks).forEach(seccion=>{
                const order = [...Object.keys(checks[seccion])].sort()
                order.forEach(input=>{
                    const el = document.createElement('div')
                    el.innerHTML = templateInput
                    el.querySelector('span').innerText = input + " (" + String(checks[seccion][input]) + ")"
                    el.setAttribute('data-seccion', seccion)
                    el.setAttribute('data-input', input)
                    parent.querySelector('#' + seccion + " .children").appendChild(el)
                })
            })
        /*}
        else{
            this._filtros.querySelector('.filter').innerText =
            "No se puede filtrar debido a que la consulta a retornado demasiados resultados"
        }*/
    }
}
