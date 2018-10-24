import template from './GestDoc.html'
import styles from './GestDoc.scss'
import Subprocess from './Subprocess'
import filenamify from "filenamify"
import {descargaFichero, subirFichero} from './servicios'
import {mostrarInfoDoc, mostrarMenuAcciones, mapEstado, mapAccion, is, acciones, mostrarError,
    EVENT, URLS, filterAndAdjust, documentosPendientes, esAccionGestoria, obtenerMultiArchivo, resetSec} from './utilGestDoc'
const templateNode = document.createElement('template')
const CONTENT_NODE = `<div class='reg'>
                            <div class='node'>
                                <div class='manejador collapsed'></div>
                                <div class='text'></div>
                                <div class='info'></div>
                                <div class='obli'></div>
                                <div class='firma'></div>
                                <div class='estado'></div>
                                <div class='acciones'>
                                <div class='ancla'>
                                    <div class='cap'></div>
                                </div>
                                <div class='menu'></div>
                                </div>
                            </div>
                            <div class='children collapsed'></div>
                        </div>`
templateNode.innerHTML = CONTENT_NODE
export default class GestDoc extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
        this._root = shadowRoot.querySelector('#root')
        this._client = shadowRoot.querySelector('#client')
        this._handle = this._handle.bind(this)
        this._handlescroll = this._handlescroll.bind(this)
        this._error = this._error.bind(this)
        //
        this._cfg = null
        this._subprocesoInyeccion = new Subprocess(URLS.GESTIONARDOCUMENTOSGESTORIAS)
        this._subprocesoInyeccion.error(this._error)
        this._documentos = []
        this._reconect = false
        this._documentosMulti = []
        this._expandedMulti = []
        this._multisInyectar = []
    }
    _dispatchEvent(msg){
        if (msg == EVENT.NOTIFY_PENDING){
            this.dispatchEvent(new CustomEvent("bk-event",{detail: {msg, documentosPendientes: documentosPendientes(this._documentos)}, bubbles: true}))
            return
        }
        this.dispatchEvent(new CustomEvent("bk-event",{detail: {msg}, bubbles: true}))
    }
    _handle(e){
        const target = e.composedPath()[0]
        if (e.type=="click" && is(target, 'input')){
            target.value=""
            return
        }
        if (e.type=="change" && is(target, 'input')){
            if (!target.files[0]){return;}
            const id = target.closest('.node').getAttribute("data-id")
            const doc = this._documentos.find(d=>d.id==id)
            const file = target.files[0]
            const accion = target.closest('.ancla').getAttribute('data-id')
            this._accion(doc, accion, file)
            return
        }
        if (e.type=="bk-click"){
            const accion = e.detail.accion
            const node = e.composedPath()[0]
            if (!node || !is(node, '.node')){return;}
            const doc = this._documentos.find(d=>d.id==node.getAttribute("data-id"))
            this._accion(doc, accion, e.detail.file)
            return
        }
        if (is(target, '#client')){return;}
        const node = target.closest('.node')
        if (!node){return;}
        const doc = (is(node, '.file')?this._documentosMulti: this._documentos).find(d=>d.id==node.getAttribute("data-id"))
        //const doc = this._documentos.find(d=>d.id==node.getAttribute("data-id"))
        if (!doc){return;}
        if (is(node,'.multiArchivo') && is(target,'.manejador')){
            const reg = node.closest('.reg')
            reg.querySelector('.children').classList.toggle('collapsed')
            target.classList.toggle('collapsed')
            this._inyectarMultiArchivo(reg, doc, true)
        }
        else if (is(target, '.info.activo')){
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
    _inyectarMultiArchivo(node, doc, dispatch){
        if(node.querySelector('.children').innerHTML !== ""){return Promise.resolve(true);}
        dispatch && this._dispatchEvent(EVENT.SHOW_LOADING_EXPEDIENTE)
        return new Promise((resolve, reject)=>{
            obtenerMultiArchivo(node, doc, this._cfg.indicadorConsulta, this._subprocesoInyeccion)
            .then(r=>{
                dispatch && this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
                if (r===true){resolve(true)}
                const ref = node.querySelector('.children')
                r.forEach(obj=>{
                    this._documentosMulti.push(obj)
                    const n = this._paint(obj)
                    n.querySelector('.node').classList.add('file')
                    ref.appendChild(n)
                })
                resolve(true)
            })
            .catch((e)=>{console.log(e);dispatch && this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)})
        })
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
    set cfg(cfg){
        this._cfg = cfg
        this._render()
    }
    get EVENT(){
        return EVENT
    }
    _handlescroll(){
        this.dispatchEvent(new CustomEvent("bk-scroll",{bubbles: true}))
    }
    connectedCallback(){
        this._client.addEventListener('click', this._handle)
        this._client.addEventListener('bk-click', this._handle)
        this._client.addEventListener('change', this._handle)
        this.shadowRoot.addEventListener('scroll',this._handlescroll, true)
    }
    disconnectedCallback(){
        this._client.removeEventListener('click', this._handle)
        this._client.removeEventListener('bk-click', this._handle)
        this._client.removeEventListener('change', this._handle)
        this.shadowRoot.removeEventListener('scroll',this._handlescroll, true)
    }
    _paint(n){
        const tmp = templateNode.content.cloneNode(true)
        tmp.querySelector('.node').setAttribute('data-id', n.id)
        if (n.indicadorMultiArchivo){
            tmp.querySelector('.node').classList.add('multiArchivo')
            if (this._expandedMulti.includes(n.id)){
                this._multisInyectar.push([tmp.querySelector('div'), n])
            }
        }
        tmp.querySelector('.text').innerText = n.nombreSubtipoDocumento
        tmp.querySelector('.text').title = n.nombreSubtipoDocumento
        if (n.indicadorDescripcion){
            tmp.querySelector('.info').classList.add('activo')
        }
        if (n.indicadorObligatoriedad){
            tmp.querySelector('.obli').classList.add('activo')
        }
        if (n.indicadorRequiereFirma){
            tmp.querySelector('.firma').classList.add('activo')
        }
        tmp.querySelector('.estado').innerText = (mapEstado[n.codigoEstado] || '')
        tmp.querySelector('.estado').title = (mapEstado[n.codigoEstado] || '')
        const clase = n.codigoEstado == 'EE'? 'agree':(n.codigoEstado == 'NA'? 'progress':(n.codigoEstado == 'EX'? 'excepted': ''))
        if (clase){tmp.querySelector('.estado').classList.add(clase)}
        if (n.acciones.length > 0 && mapAccion[n.acciones[0].codigoAccion]){
            tmp.querySelector('.cap').innerText = (mapAccion[n.acciones[0].codigoAccion] || '')
            tmp.querySelector('.ancla').setAttribute('data-id', n.acciones[0].codigoAccion)
            if (['AD', 'AF'].includes(n.acciones[0].codigoAccion)){
                const file = document.createElement('input')
                file.setAttribute('type', 'file')
                tmp.querySelector('.ancla').appendChild(file)
            }
        }
        if (n.acciones.length > 1){
            tmp.querySelector('.menu').classList.add('activo')
        }
        return tmp.querySelector('div')
    }
    _backupEstado(){
        this._expandedMulti = []
        this._client.querySelectorAll('.node.multiArchivo').forEach(nodo=>{
            if (!is(nodo.querySelector('.manejador'),'.collapsed') &&  !is(nodo.closest('.reg').querySelector('.children'),':empty')){
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
        this._load()
        .then(docs=>{
            noShowLoading || this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE)
            this._client.innerHTML = ""
            this._multisInyectar = []
            docs.forEach(n=>{
                this._client.appendChild(this._paint(n))
            })
            this._dispatchEvent(EVENT.NOTIFY_PENDING)
            this._inyectarMultiArchivos(!noShowLoading)
            this._reconect = false
        })
        .catch(()=> noShowLoading || this._dispatchEvent(EVENT.HIDE_LOADING_EXPEDIENTE))//los mensajes de error ya los muestra sb
    }
    _getPage(){
        const codigoTarea = [this._cfg.tarea.codigoTarea + (this._cfg.notG? "": "G")]
        const model = {
            'datoDocumentoExpediente': {
            'codigoFase': this._cfg.fase,
            'identificadorInstanciaProceso': this._cfg.tarea.identificadorExpedienteDocumental,
            'codigosSubprocesos': codigoTarea,
            'identificadorPropuesta': this._cfg.propuesta.identificadorPropuesta,
            'indicadorConsulta': this._cfg.indicadorConsulta
            },
            'clavePaginacion': "0"
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
    _load() {
        return new Promise((resolve, reject)=>{
            this._getPage().then(data=>{
                this._documentos = filterAndAdjust(data.documentos)
                resolve(this._documentos)
            })
            .catch(reject)
        })
    }
    _loadmock() {
        return new Promise((resolve, reject)=>{
            const pp = require('../mocks/k.json')
            this._documentos = [...this._documentos, ...filterAndAdjust(pp.data.documentos)]
            resolve(this._documentos)
        })
    }
}
//export {mapAccion, URLS, EVENT}