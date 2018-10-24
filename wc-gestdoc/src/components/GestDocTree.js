import template from './GestDocTree.html'
import styles from './GestDocTree.scss'
import Subprocess from './Subprocess'
import filenamify from "filenamify"
import {descargaFichero, subirFichero} from './servicios'
import {mostrarInfoDoc, mostrarMenuAcciones, mapEstado, mapAccion, is, acciones, mostrarError,
    EVENT, URLS, filterAndAdjust, documentosPendientes, esAccionGestoria, resetSec, obtenerMultiArchivo} from './utilGestDoc'
let idCounter = 0;
function esGarantia(doc){
    return doc.identificadorExpedienteGarantia && doc.identificadorExpedienteGarantia.trim() && doc.codigoExpedienteInterviniente === ' '
}
function esInterviniente(doc){
    return doc.codigoExpedienteInterviniente && doc.codigoExpedienteInterviniente.trim()&& doc.identificadorExpedienteGarantia === ' '
}
function esDocumento(doc){
    return doc.identificadorSubtipoDocumento && doc.identificadorSubtipoDocumento.trim() 
}
function defineExpediente(doc){
    return !!doc.indicadorDocumentoDefinidoExpediente
}
function esAgrupacion(doc){
    return doc.indicadorAgrupacion && doc.indicadorAgrupacion.trim()
}
function composeNameGarantia(name) {
    const splitted = name.split('#', 2)
    return splitted.length > 1 ? splitted[1] + ' - ' + splitted[0] : splitted[0]
}
function processTree(docs, cfg){
    idCounter = 0
    const garantias = {}
    const expedientes = {}
    const intervinientes = {}
    const libres = []
    docs.forEach(doc=>{
        if (!esDocumento(doc)){return;}
        if (defineExpediente(doc)){
            addChildren(doc, expedientes, cfg.propuesta.identificadorExpediente,
                'Expediente Nº ' + cfg.propuesta.identificadorExpediente)
        }
        else{//no define expediente
            if (esInterviniente(doc)){
                addChildren(doc, intervinientes, doc.codigoExpedienteInterviniente, doc.nombreInterviniente);
            }
            else if (esGarantia(doc)){
                doc.nombreGarantia = composeNameGarantia(doc.nombreGarantia)
                addChildren(doc, garantias, doc.identificadorExpedienteGarantia, doc.nombreGarantia);
            }
            else{
                libres.push(doc)
            }
        }
    })
    const modelo = [...Object.values(intervinientes),
        ...Object.values(garantias), ...Object.values(expedientes),
        ...libres
    ]
    modelo.forEach(it=>{
        if (it.agrupaciones){
            it.children.unshift(...Object.values(it.agrupaciones))
            //it.agrupaciones.forEach(a=>it.children.unshift(Object.values(a)))
        }
    })
    //modelo[2].children = [ ...modelo[2].children[0].children, ...modelo[2].children]
    //modelo[2].children.unshift(...[modelo[2].children[0].children])
    return modelo
}
function addChildren(doc, obj, id, nombreSubtipoDocumento){
    if (!obj[id]){
        obj[id]={nombreSubtipoDocumento, children: [], nivel: 1, agrupaciones: [], id: String(idCounter++)}
    }
    if (esAgrupacion(doc) && !obj[id].agrupaciones[doc.indicadorAgrupacion]){
        obj[id].agrupaciones[doc.indicadorAgrupacion] = {
            nombreSubtipoDocumento: doc.nombreAgrupacion, children:[], nivel: 2, id: String(idCounter++),
            parent: obj[id]
        }
    }
    if (esAgrupacion(doc)) {
        obj[id].agrupaciones[doc.indicadorAgrupacion].children.push({...doc, parent: obj[id].agrupaciones[doc.indicadorAgrupacion]});
    } else {
        obj[id].children.push({...doc, parent: obj[id]});
    }
}
export default class GestDocTree extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
        this._root = shadowRoot.querySelector('#root')
        this._client = shadowRoot.querySelector('#client')
        this._mas = shadowRoot.querySelector('.mas')
        this._handle = this._handle.bind(this)
        this._handlescroll = this._handlescroll.bind(this)
        this._handleMas = this._handleMas.bind(this)
        this._error = this._error.bind(this)
        //
        this._cfg = null
        this._subprocesoInyeccion = new Subprocess(URLS.GESTIONARDOCUMENTOSGESTORIAS)
        this._subprocesoInyeccion.error(this._error)
        this._documentos = []
        this._documentosMulti = []
        this._modelo = undefined
        this._expanded = []
        this._expandedMulti = []
        this._indicadorMasDocumentos = false
        this._clavePaginacion = 0
        this._multisInyectar = []
        this._reconect = false
    }
    _dispatchEvent(msg){
        if (msg == EVENT.NOTIFY_PENDING){
            this.dispatchEvent(new CustomEvent("bk-event",{detail: {msg, documentosPendientes: documentosPendientes(this._documentos)}, bubbles: true}))
            return
        }
        this.dispatchEvent(new CustomEvent("bk-event",{detail: {msg}, bubbles: true}))
    }
    _generarPlantilla(doc){
        this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        acciones.generarPlantilla(doc, this._cfg, this._subprocesoInyeccion)
        .then(url=>{
            return descargaFichero(url, filenamify('plantilla_exp' + this._cfg.propuesta.identificadorExpediente))
            .catch((e)=>{mostrarError(e); return Promise.reject(e);})
        })
        .then(()=>this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE))
        .catch((e)=>{this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)})
    }
    _exceptuarDocumento(doc){
        acciones.exceptuarDocumento(doc)
        .then((r)=> r && this._render())
    }
    _verDetalleExceptuado(doc){
        acciones.obtenerMotivoExceptuacion(doc, this._cfg)
        .then((r)=> r && this._render())
    }
    _eliminarDocumento(doc){
        this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        acciones.eliminarDocumento(doc, this._subprocesoInyeccion)
        .then(r=>{this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE);this._render();})
        .catch((e)=>{this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)})
    }
    _consultarDocumento(doc){
        this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        acciones.consultarDocumento(doc, this._cfg, this._subprocesoInyeccion)
        .then(url=>{
            return descargaFichero(url, filenamify(doc.nombreSubtipoDocumento + '_exp' + this._cfg.propuesta.identificadorExpediente))
            .catch((e)=>{mostrarError(e); return Promise.reject(e);})
        })
        .then(()=>this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE))
        .catch((e)=>{this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)})
    }
    _adjuntarDocumento(doc, accion, file){
        this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        subirFichero(file)
        .then(data=>{
            if (accion=='AD'){
                return acciones.adjuntarDocumento(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage)
            }
            else{
                this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
                return acciones.adjuntarFirma(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage)
            }
         })
         .then(r=>{
            this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            r && this._render();
        })
        .catch((e)=>{this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE);mostrarError(e);})
    }
    _error(e){
        mostrarError(e)
        if (this._subprocesoInyeccion.abierto && !this._reconect){
            this._reconect = true
            const that = this //dana
            setTimeout(function(){that._render()}, 100)
        }
    }
    _accion(doc, accion, file){
        //console.log(doc, accion)
        if (['VI', 'IM', 'EM', 'DE'].includes(accion)){this._consultarDocumento(doc);}
        else if (['DP', 'EP', 'IP', 'VP'].includes(accion)){this._generarPlantilla(doc);}
        else if (['AD', 'AF'].includes(accion)){this._adjuntarDocumento(doc, accion, file);}
        else if (['AN'].includes(accion)){this._eliminarDocumento(doc);}
        else if (['VD'].includes(accion)){this._verDetalleExceptuado(doc);}
        else if (['EX'].includes(accion)){this._exceptuarDocumento(doc);}
        //else{throw new Error(`Acción '${accion}' no prevista`);}
    }
    _handleMas(){
        if (is(this._mas, '.disabled')){return;}
        this._backupEstado()
        this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        this._loadPage(this._clavePaginacion)
        .then(docs=>{
            this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            this._modelo = processTree(docs, this._cfg)
            this._client.innerHTML = ""
            this._multisInyectar = []
            this._paint(this._modelo, this._client)
            this._inyectarMultiArchivos(true)
            !this._indicadorMasDocumentos && this._mas.classList.add('disabled')
            this._dispatchEvent(EVENT.NOTIFY_PENDING)
        })
        .catch((e)=>{
            this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            this._error(e)
        })
    }
    _handlescroll(){
        this.dispatchEvent(new CustomEvent("bk-scroll",{bubbles: true}))
    }
    _handle(e){
        const target = e.composedPath()[0]
        if (e.type=="click" && is(target, 'input')){
            target.value=""
            return
        }
        if (e.type=="change" && is(target, 'input')){
            if (!target.files[0]){return;}
            const node = target.closest('.nodoD')
            const doc = (is(node, '.file')?this._documentosMulti: this._documentos).find(d=>d.id==node.getAttribute("data-id"))
            const file = target.files[0]
            const accion = target.closest('.ancla').getAttribute('data-id')
            this._accion(doc, accion, file)
            return
        }
        if (e.type=="bk-click"){
            const accion = e.detail.accion
            const node = e.composedPath()[0]
            if (!node || !is(node, '.nodoD')){return;}
            const doc = (is(node, '.file')?this._documentosMulti: this._documentos).find(d=>d.id==node.getAttribute("data-id"))
            this._accion(doc, accion, e.detail.file)
            return
        }
        if (is(target, '#client')){return;}
        const node = target.closest('.nodoA, .nodoD')
        if (!node){return;}
        if (is(target,'.manejador') && is(node, '.nodoA')){//expand/collapse
            node.querySelector('.children').classList.toggle('collapsed')
            target.classList.toggle('collapsed')
        }
        if (is(target,'.manejador') && is(node, '.nodoD.multiArchivo')){//expand/collapse
            node.querySelector('.children').classList.toggle('collapsed')
            target.classList.toggle('collapsed')
            const doc = this._documentos.find(d=>d.id==node.getAttribute("data-id"))
            this._inyectarMultiArchivo(node, doc, true)
        }
        else if (is(node, '.nodoD')){
            const doc = (is(node, '.file')?this._documentosMulti: this._documentos).find(d=>d.id==node.getAttribute("data-id"))
            if (is(target, '.help.activo')){
                mostrarInfoDoc(doc, e, this._cfg.indicadorConsulta)
            }
            else if (is(target, '.menu')){
                mostrarMenuAcciones(doc, e, node)
            }
            else if (is(target, '.ancla') || is(target, '.cap')){
                const ancla = target.closest('.ancla')
                this._accion(doc, ancla.getAttribute('data-id'))
            }
        }
    }
    _inyectarMultiArchivos(mod){
        //console.log('sdfadfasdf',this._multisInyectar)
        mod && this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE) 
        const arc = this._multisInyectar.pop()
        if (arc){
            const [node, doc] = arc
            node.querySelector('.manejador').classList.remove('collapsed')
            node.querySelector('.children').classList.remove('collapsed')
            this._inyectarMultiArchivo(node, doc)
            .then(()=>this._inyectarMultiArchivos())
        }
        else{
            this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE) 
        }
    }
    _inyectarMultiArchivo(node, doc, dispatch){
        if(node.querySelector('.children').innerHTML !== ""){return Promise.resolve(true);}
        dispatch && this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        return new Promise((resolve, reject)=>{
            obtenerMultiArchivo(node, doc, this._cfg.indicadorConsulta, this._subprocesoInyeccion)
            .then(r=>{
                dispatch && this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
                if (r===true){resolve(true)}
                //console.log(r)
                const ref = node.querySelector('.children')
                if (node.nextElementSibling){
                    ref.classList.add('vertical')
                }
                r.forEach(obj=>{
                    this._documentosMulti.push(obj)
                    const n = document.createElement('div')
                    n.classList.add('nodoD', 'file')
                    n.innerHTML = require('./fragments/nodoDoc.html')
                    n.setAttribute('data-id', obj.id)
                    this._paintDoc(obj, n.querySelector('.doc'))
                    ref.appendChild(n)
                })
                resolve(true)
            })
            .catch((e)=>{console.log(e);dispatch && this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)})
        })
    }
    _paint(obj, ref){
        if (Array.isArray(obj)){
            obj.forEach(it=>this._paint(it, ref))
        }
        else if (obj.children){
            const n = document.createElement('div')
            n.classList.add('nodoA')
            obj.nivel == 1 && (n.classList.add('raiz'))
            n.innerHTML = require('./fragments/nodoArbol.html')
            n.querySelector('.txt').innerText = obj.nombreSubtipoDocumento
            n.setAttribute('data-id', obj.id)
            if (obj.nivel == 2){
                const vert = document.createElement('span')
                vert.classList.add('vert')
                n.appendChild(vert)
                obj.parent.children.forEach((c, i)=>{
                    if (c === obj &&  i < obj.parent.children.length-1){
                        n.querySelector('.children').classList.add('vertical')
                    }
                })
            }
            if(this._expanded.includes(obj.id)){
                n.querySelector('.manejador').classList.remove('collapsed')
                n.querySelector('.children').classList.remove('collapsed')
            }
            ref.appendChild(n)
            this._paint(obj.children, n.querySelector('.children'))
        }
        else{//doc
            const n = document.createElement('div')
            n.classList.add('nodoD')
            if (is(ref, '#client')){
                n.classList.add('raiz')
            }
            n.innerHTML = require('./fragments/nodoDoc.html')
            n.setAttribute('data-id', obj.id)
            this._paintDoc(obj, n.querySelector('.doc'))
            if (obj.indicadorMultiArchivo){
                n.classList.add('multiArchivo')
                if (this._expandedMulti.includes(obj.id)){
                    this._multisInyectar.push([n, obj])
                }
            }
            ref.appendChild(n)
        }
    }
    _paintDoc(obj, ref){
        ref.querySelector('.documento').innerText = obj.nombreSubtipoDocumento
        ref.querySelector('.documento').title = obj.nombreSubtipoDocumento
        if (obj.indicadorDescripcion){
            ref.querySelector('.help').classList.add('activo')
        }
        if (obj.indicadorObligatoriedad){
            ref.querySelector('.obli').classList.add('activo')
        }
        if (obj.indicadorRequiereFirma){
            ref.querySelector('.firma').classList.add('activo')
        }
        ref.querySelector('.archivo').innerText = obj.indicadorArchivo? 'Sí': 'No'
        ref.querySelector('.incorporado').innerText = obj.incorporadoPor && obj.incorporadoPor.trim()?
            obj.incorporadoPor: '-'
        ref.querySelector('.estado').innerText = (mapEstado[obj.codigoEstado] || '')
        ref.querySelector('.estado').title = (mapEstado[obj.codigoEstado] || '')
        let clase = ''
        if (obj.codigoEstado == 'EE'){clase='agree'}
        else if (obj.codigoEstado == 'EX'){clase='excepted'}
        else if (['NA', 'NG', 'BL', 'GN', 'GS', 'NE', 'EF','PF', 'EP'].includes(obj.codigoEstado)){clase='progress'}
        else if (obj.codigoEstado == 'ND'){clase='pending'}
        if (clase){ref.querySelector('.estado').classList.add(clase)}
        if (obj.acciones.length > 0 && mapAccion[obj.acciones[0].codigoAccion]){
            ref.querySelector('.cap').innerText = (mapAccion[obj.acciones[0].codigoAccion] || '')
            ref.querySelector('.ancla').setAttribute('data-id', obj.acciones[0].codigoAccion)
            if (['AD', 'AF'].includes(obj.acciones[0].codigoAccion)){
                const file = document.createElement('input')
                file.setAttribute('type', 'file')
                ref.querySelector('.ancla').appendChild(file)
            }
        }
        if (obj.acciones.length > 1){
            ref.querySelector('.menu').classList.add('activo')
        }
    }
    _backupEstado(){
        this._expanded = []
        this._expandedMulti = []
        this._client.querySelectorAll('.nodoA').forEach(nodo=>{
            if (!is(nodo.querySelector('.manejador'),'.collapsed')){
                this._expanded.push(nodo.getAttribute('data-id'))
            }
        })
        this._client.querySelectorAll('.nodoD.multiArchivo').forEach(nodo=>{
            if (!is(nodo.querySelector('.manejador'),'.collapsed')){
                this._expandedMulti.push(nodo.getAttribute('data-id'))
            }
        })
        console.log(this._expandedMulti)
    }
    _render(noShowLoading){
        resetSec()
        this._backupEstado()
        noShowLoading || this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        this._documentos = []
        let consulta = undefined
        if (this._clavePaginacion > 0){
            consulta = this._loadMultiple(this._clavePaginacion)
            this._clavePaginacion = 0
        }
        else{
            consulta = this._loadPage(0)
        }
        consulta.then(docs=>{
            noShowLoading || this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            this._modelo = processTree(docs, this._cfg)
            this._client.innerHTML = ""
            this._multisInyectar = []
            this._paint(this._modelo, this._client)
            this._inyectarMultiArchivos(!noShowLoading)
            !this._indicadorMasDocumentos && this._mas.classList.add('disabled')
            //console.log(this._modelo)
            this._dispatchEvent(EVENT.NOTIFY_PENDING)
            this._reconect = false
            
        })
        .catch((e)=>{
            noShowLoading || this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            //this._error(e)
        })
    }
    _getPage(num){
        const codigoTarea = [this._cfg.tarea.codigoTarea + (this._cfg.notG? "": "G")]
        const model = {
            'datoDocumentoExpediente': {
            'codigoFase': this._cfg.fase,
            'identificadorInstanciaProceso': this._cfg.tarea.identificadorExpedienteDocumental,
            'codigosSubprocesos': codigoTarea,
            'identificadorPropuesta': this._cfg.propuesta.identificadorPropuesta,
            'indicadorConsulta': this._cfg.indicadorConsulta
            },
            'clavePaginacion': String(num)
        }
        if (this._cfg.idGarantia){
            model.datoDocumentoExpediente.codigoIdentificadorGarantia = this._cfg.idGarantia
        }
        return new Promise((resolve, reject)=>{
            this._subprocesoInyeccion.inicia(model)
            .when('MostrarDocumentosGestoriasIU',data =>{
                resolve(data)
            })
            .error(reject)
        })
    }
    _loadMultiple(claveHasta){
        return this._loadPage(this._clavePaginacion)
        .then(()=>{
            if(this._clavePaginacion < claveHasta){
                return this._loadMultiple(claveHasta)
            }
            return this._documentos
        })
    }
    _loadPage(clave){
        return new Promise((resolve, reject)=>{
            this._getPage(clave).then(data=>{
                this._indicadorMasDocumentos = data.indicadorMasDocumentos
                this._clavePaginacion = data.clavePaginacionOut || 0
                this._documentos = [...this._documentos, ...filterAndAdjust(data.documentos)]
                resolve(this._documentos)
            })
            .catch(reject)
        })
    }
    _loadinit2() {
        return new Promise((resolve, reject)=>{
            const pp = require('../mocks/k.json')
            this._indicadorMasDocumentos = pp.data.indicadorMasDocumentos
            this._clavePaginacion = pp.data.clavePaginacionOut || 0
            this._documentos = [...this._documentos, ...filterAndAdjust(pp.data.documentos)]
            resolve(this._documentos)
        })
    }
    set cfg(cfg){
        this._cfg = cfg
        this._render()
    }
    get EVENT(){
        return EVENT
    }
    connectedCallback(){
        this._client.addEventListener('click', this._handle)
        this._client.addEventListener('bk-click', this._handle)
        this._client.addEventListener('change', this._handle)
        this.shadowRoot.addEventListener('scroll',this._handlescroll, true)
        this._mas.addEventListener('click', this._handleMas)
    }
    disconnectedCallback(){
        this._client.removeEventListener('click', this._handle)
        this._client.removeEventListener('bk-click', this._handle)
        this._client.removeEventListener('change', this._handle)
        this.shadowRoot.removeEventListener('scroll',this._handlescroll, true)
        this._mas.removeEventListener('click', this._handleMas)
    }
    
}
//export {mapAccion, URLS, EVENT}