import template from './BuscEmp.html'
import styles from './BuscEmp.scss'
import getZEfectivoEnBody, {getZMin} from './stacking'
import getInstancePredictivo, {busquedaCliente, normalizarInfo} from './servicios'
import Visor from './Visor'
const ESPERA_TECLADO = 400
function scrollsEntre(p, h){
    let ret = {t: 0, l: 0}
    if (!p){return ret;}
    let tmp = h
    while (tmp && tmp != p){
        tmp = tmp.parentNode || tmp.host
        tmp.scrollTop && (ret.t += tmp.scrollTop)
        tmp.scrollLeft && (ret.l += tmp.scrollLeft)
    }
    return ret
}
function getTop(nodo, padre = document.documentElement){//!!padre debe ser posicionado!!!
    let tmpnodo = nodo
    let ret = tmpnodo.offsetTop - scrollsEntre(tmpnodo.offsetParent, tmpnodo).t
    while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre){
      tmpnodo = tmpnodo.offsetParent
      ret +=  tmpnodo.offsetTop - scrollsEntre(tmpnodo.offsetParent, tmpnodo).t
    }
    return ret
}
function getLeft(nodo, padre = document.documentElement){//!!padre debe ser posicionado!!!
    let tmpnodo = nodo
    let ret = tmpnodo.offsetLeft - scrollsEntre(tmpnodo.offsetParent, tmpnodo).l
    while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre){
      tmpnodo = tmpnodo.offsetParent
      ret +=  tmpnodo.offsetLeft - scrollsEntre(tmpnodo.offsetParent, tmpnodo).l
    }
    return ret
}
function getBoundingDocumentRect(n){
    return {
        left: getLeft(n),
        top: getTop(n),
        width: n.offsetWidth,
        height: n.offsetHeight
    }
}
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
function colocar(el, gbr){
    const cli = el.shadowRoot.querySelector('.cli')
    const wt = document.documentElement.clientWidth
    const ht = document.documentElement.clientHeight
    let derecha = false
    let abajo = true
    if (gbr.left < wt/2){derecha = true}
    if (gbr.top > ht/2){abajo = false}
    if (derecha){
        el.style.left = String(gbr.left) + 'px'
        el.style.maxWidth = String(wt - gbr.left -10) + 'px'
    }
    else{
        el.style.right =String(wt - gbr.left - gbr.width) + 'px'
        el.style.maxWidth = String(gbr.left + gbr.width -10) + 'px'
    }
    if (abajo){
        el.style.top = String(gbr.top + gbr.height + 1) + 'px'
        el.style.maxHeight = String(ht - gbr.top - gbr.height -10) + 'px'
        el.style.boxShadow = '3px 4px 2px #aaa'
    }
    else{
        el.style.bottom = String(ht - gbr.top + 1) + 'px'
        el.style.maxHeight = String(gbr.top -10) + 'px'
        el.style.boxShadow = '2px -4px 2px #aaa'
    }
}
function isOculto(r){
    const isBloqueado = (r.bloqueado==="80")
    let isConfidencial = false
    if (r.confidencialidad){
        const n = parseInt(r.confidencialidad, 10)
        if (!isNaN(n) && n > 100){
            isConfidencial = true
        }
    }
    return (isBloqueado || isConfidencial)
}
export default class BuscEmp extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._input = shadowRoot.querySelector('#client input')
      this._client = shadowRoot.querySelector('#client')
      this._manejadorInterno = shadowRoot.querySelector('.manejadorInterno')
      this._manejador = shadowRoot.querySelector('.manejador')
      this._handleManejadorInterno = this._handleManejadorInterno.bind(this)
      this._handle = this._handle.bind(this)
      this._buscar = this._buscar.bind(this)
      this._value = ''
      this._capa = undefined
      this._settimeout = undefined
      this._registros = []
      this._click = this._click.bind(this)
      this._instanciaPredictivo = undefined
      this._raw = undefined
      this._bloqueados = 0
    }
    _buscar(){
        this._ocultarCapa()
        this._value = this._input.value = ""
        busquedaCliente().then(r=>{
            if (!r.numCli) {return}
            this.dispatchItem(r)
        })
        .catch(e=>{
            console.log(e)
        })
    }
    
    get user(){
        return this.getAttribute('user')
    }
    set user(user){
        this.setAttribute('user', user)
    }
    get oficina(){
        return this.getAttribute('oficina')
    }
    set oficina(oficina){
        this.setAttribute('oficina', oficina)
    }
    get entidad(){
        return this.getAttribute('entidad')
    }
    set entidad(entidad){
        this.setAttribute('entidad', entidad)
    }
    _fill(txt){
        this._value.split(' ').forEach(t=>{
            txt = txt.replace(new RegExp("(" + t + ")", 'ig'), `<b>$1</b>`)
        })
        return txt
    }
    _paint(model, total){
        const cli = this._capa.shadowRoot.querySelector('.cli')
        const search = this._capa.shadowRoot.querySelector('.pie b')
        const num = this._capa.shadowRoot.querySelector('.pie i')
        search.innerText = this._value
        num.innerText = String(total)
        const bl = this._capa.shadowRoot.querySelector('.pie .bloqueados')
        if (this._bloqueados > 0){
            bl.classList.add('visible')
            bl.querySelector('b').innerText = String(this._bloqueados)
        }
        else{
            bl.classList.remove('visible')
        }

        this._capa.shadowRoot.host.style.display = 'flex'
        cli.innerHTML = ''
        if (model.length==0){
            cli.innerText = "Ninguna coincidencia"
            this._capa.shadowRoot.querySelector('.pie').style.visibility = 'hidden'
            return
        }
        this._capa.shadowRoot.querySelector('.pie').style.visibility = 'visible'
        model.filter(r=>!r.oculto).forEach(r=>{
            const fila = document.createElement('div')
            fila.classList.add('fila')
            fila.setAttribute('data-id', r.id)
            fila.innerHTML = require('./fragments/registro.html')
            fila.querySelector('.documento').innerHTML = this._fill(r.documento)
            fila.querySelector('.nombre').innerHTML = this._fill(r.nombre)
            fila.querySelector('.localidad').innerHTML = this._fill(r.localidad)
            fila.querySelector('.domicilio').innerHTML = this._fill(r.domicilio)
            cli.appendChild(fila)
        })
        

    }
    _search(t){
        if (!this._capa){return;}
        this._capa.shadowRoot.querySelector('.cli').style.opacity = 0.5
        this._client.classList.add('progreso')
        this._instanciaPredictivo.getData(t)
        .then(data=>{
            this._client.classList.remove('progreso')
            if (!this._capa){return;}
            this._raw = data
            this._registros = []
            this._bloqueados = 0
            const total = (data.results.cartera? data.results.cartera.numFound: 0) +
                (data.results.oficina? data.results.oficina.numFound: 0) +
                (data.results.otros? data.results.otros.numFound: 0)
            data.results.cartera && data.results.cartera.docs.forEach(r=>{
                const oculto = isOculto(r)
                if (oculto){
                    this._bloqueados += 1
                }
                this._registros.push({...r, oculto})
            })
            data.results.oficina && data.results.oficina.docs.forEach(r=>{
                const oculto = isOculto(r)
                if (oculto){
                    this._bloqueados += 1
                }
                this._registros.push({...r, oculto})
            })
            data.results.otros && data.results.otros.docs.forEach(r=>{
                const oculto = isOculto(r)
                if (oculto){
                    this._bloqueados += 1
                }
                this._registros.push({...r, oculto})
            })
            console.log(this._bloqueados)
            const model = this._registros.map(it=>{
                return {documento: it.documento || "-",
                    nombre: (it.nombre? it.nombre:"") + (it.apellidos? " " + it.apellidos:""),
                    localidad: it.localidad?it.localidad:'-',
                    domicilio: it.domicilio? it.domicilio:'-',
                    id: it.id,
                    oculto: it.oculto
                }
            })
            this._paint(model, total)
            this._capa.shadowRoot.querySelector('.cli').style.opacity = 1
        })
        .catch((e)=>{
            this._client.classList.remove('progreso')
            console.log(e)
            this._capa.shadowRoot.querySelector('.cli').style.opacity = 1
            
        })
    }
    _handleManejadorInterno(){
        if (is(this._manejadorInterno, '.activo')){
            this._ocultarCapa()
            this._value = this._input.value = ""
        }
    }
    _handle(e){
        //console.log(e)
        if (e.key==='Escape'){
            this._ocultarCapa()
            return
        }
        if (e.key==='Enter' && this._registros.length > 0){
            this._verTodo()
            return
        }
        if (this._input.value.trim().length >= 3 && this._input.value.trim() !== this._value){
            this._manejadorInterno.classList.add('activo')
            this._mostrarIfNotCapa(e)
            this._settimeout && clearTimeout(this._settimeout)
            this._settimeout = setTimeout(()=>{this._search(this._input.value.trim())}, ESPERA_TECLADO)
        }
        else if (this._input.value.trim().length < 3){
            //this._manejadorInterno.classList.remove('activo')
            this._ocultarCapa()
        }
        this._value = this._input.value.trim()
    }
    _mostrarIfNotCapa(e){
        if (this._capa){return}
        const target = e.composedPath()[0]
        this._capa = document.createElement('aside')
        const z = getZMin()
        this._capa.style.zIndex = z? String(z): 'auto'
        //this._capa.style.zIndex = getZEfectivoEnBody(target)
        const gbr = getBoundingDocumentRect(target)
        const shadowRoot = this._capa.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = '<style>'+ require('./fragments/predictivo.scss') +'</style>'+ require('./fragments/predictivo.html')
        colocar(this._capa, gbr)
        this._capa.shadowRoot.host.style.font = window.getComputedStyle(this.shadowRoot.host).font
        this._capa.shadowRoot.host.addEventListener('click', this._click)
        this._capa.shadowRoot.host.style.display = 'none'
        document.body.appendChild(this._capa)
    }
    _ocultarCapa(){
        this._manejadorInterno.classList.remove('activo')
        this._capa && this._capa.shadowRoot.host.removeEventListener('click', this._click)
        this._capa && document.body.removeChild(this._capa)
        this._capa = undefined
    }
    _click(e){
        const target = e.composedPath()[0]
        if (is(target, '.aspa')){
            this._ocultarCapa()
            this._value = this._input.value = ""
            return
        }
        else if (is(target, '.verTodo') || is(target, '.pie') || is(target.parentNode, '.verTodo')){
            this._verTodo()
            return
        }
        if (!is(target, '.celda') && !is(target.parentNode, '.celda')){
            return
        }
        const id = target.closest('.fila').getAttribute('data-id')
        const doc = this._registros.find(r=>r.id===id)
        this._ocultarCapa()
        this.dispatchItem(doc)
    }
    dispatchItem(r){
        const norm = normalizarInfo(r)
        this._value = this._input.value = norm.base.nombre
        this.value = norm.base.id
        this.dispatchEvent(new CustomEvent("bk-seleccion",{detail: norm, bubbles: true}))
    }
    connectedCallback(){
        this._manejadorInterno.addEventListener('click', this._handleManejadorInterno)
        this._manejador.addEventListener('click', this._buscar)
        this._input.addEventListener('keyup', this._handle)
        this._upgradeProperty('user')
        this._upgradeProperty('oficina')
        this._upgradeProperty('entidad')
        this._instanciaPredictivo = getInstancePredictivo(this.getAttribute('user'), this.getAttribute('oficina'), this.getAttribute('entidad'))
    }
    disconnectedCallback(){
        this._client.removeEventListener('keyup', this._handle)
        this._manejadorInterno.removeEventListener('click', this._handleManejadorInterno)
        this._manejador.removeEventListener('click', this._buscar)
    }
    _upgradeProperty(prop){
        if (this.hasOwnProperty(prop)){
            const value = this[prop]
            delete this[prop]
            this[prop] = value
        }
    }
    _verTodo(){
        if (this._value.trim().length < 3 || !this._raw){
            return
        }
        const visor = new Visor(this)
        this._ocultarCapa()
        this._value = this._input.value = ""
        visor.go()
    }
}
