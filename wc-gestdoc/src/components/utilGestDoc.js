import {aside} from './Aside'
import {http, getTabit} from './servicios'
import {popupi, dialogMsg} from './Modal'
//import getZEfectivoEnBody from './stacking'
let sec = 0
const uniq = ()=>{
    return String(sec++)
}
const resetSec = () =>{
    sec = 0
}
let secMulti = 0
const uniqMulti = ()=>{
    return String(secMulti++)
}
const resetSecMulti = () =>{
    secMulti = 0
}
const accionesPermitidas = ['AN', 'AD', 'VI', 'IM', 'EM', 'DE', 'DP', 'EP', 'IP', 'VP', 'AF', 'VD','EX']
function filterAndAdjust(documentos){
    const ret = documentos.filter(it=>it.identificadorSubtipoDocumento!=" ")
    .map(it=>{
        const st = it.instanciasSubtipoDocumentos || it.instanciasSubtipoDocuments
        return {...it, instanciasSubtipoDocumentos: st, id: uniq(), acciones: it.acciones.filter(a=>esAccionGestoria(a.codigoAccion))}
    })
    return ret
}
function documentosPendientes(docs){
    let documentosTotales = 0
    let documentosEnExpediente = 0
    docs.forEach(doc=>{
        doc.indicadorObligatoriedad && (documentosTotales += 1)
        doc.codigoEstado === 'EE' && doc.indicadorObligatoriedad && (documentosEnExpediente += 1)
    })
    return documentosTotales - documentosEnExpediente
}
function esAccionGestoria(codigo) {
    return accionesPermitidas.indexOf(codigo) !== -1;
}
const EVENT = {
    SHOW_LOADING_EXPEDIENTE:"LoadingViewExpediente",
    HIDE_LOADING_EXPEDIENTE:"hideLoadingViewExpediente",
    NOTIFY_PENDING:"eventPendingDocuments"
}
const URLS = {
    GESTIONARDOCUMENTOSGESTORIAS: '/api/1.0/extranet/extranet/gestionarDocumentosGestorias',
    OBTENERMOTIVOEXCEPTUACION: '/api/1.0/extranet/ObtenerMotivoExceptuacionSBP/1.0',
    INFO: '/api/1.0/extranet/saps/informacionDocumento',
    MODIFICARDOCUMENTO: '/api/1.0/extranet/ModificarDocumentoSBP/1.0',
    EXCEPTUARDOCUMENTO: '/api/1.0/extranet/ExceptuarDocumentoSBP/1.0',
}
const templateli = document.createElement('template')
const templateliInput = document.createElement('template')
templateli.innerHTML = require('./fragments/li.html')
templateliInput.innerHTML = require('./fragments/liInput.html')
const mapEstado = {NA:'No aportado', NG: 'Pendiente de Firma', BL: 'Pendiente de Firma', GN: 'Pendiente de Firma',
    GS: 'Pendiente de Firma', NE: 'No entregado', NP: 'No aportado por la aplicación', EE: 'En Expediente',
    EO: 'En otra operación', EA: 'Pendiente de Archivo', VE: 'Pendiente de Validación',EF: 'Pendiente de Firma',
    ED: 'Enviar Documento', IC: 'Incorporado por el cliente', IR: 'Incorporado por el cliente', PD: 'Pendiente Digitalización',
    PF: 'Pendiente de Firma', DC: 'Devuelto CTD', EC: 'en CTD', NV: 'Documento no válido', EX: 'Exceptuado',
    ER: 'En Expediente', DD: 'Enviando', EP: 'Firmado', IS: 'Imprimible'}
const mapAccion = {AN: 'Eliminar', AD: 'Adjuntar', VI: 'Visualizar', IM: 'Imprimir', EM: 'Enviar email', DE: 'Descargar',
    DP: 'Descargar plantilla', EP: 'Enviar plantilla', IP: 'Imprimir plantilla', VP: 'Visualizar plantilla',
    AF: 'Adjuntar firma', VD: 'Ver detalle', EX: 'Exceptuar'}

function is(nodo, selector){
    return nodo.closest(selector)==nodo
  }

const toQueryString= o =>{
    const str = []
    Object.entries(o).forEach(([k, v])=>str.push(encodeURIComponent(k) + '=' + encodeURI(v.toString())))
    return str.join('&')
}
const MSGS = {
    IMPORTEINSUFICIENTE: 'El importe disponible de provisión de fondos no es suficiente para abonar esta factura, <b>debes solicitar autorización para el cargo</b> en la Tarea de Ampliación de Provisión de Fondos.',
    MODOADVERTENCIAANULAR: 'No es posible anular el pago ya que no hay saldo suficiente en la cuenta de la gestoría. Se le notificará a la gestoría que la anulación no es posible.',
}
const mostrarInfoDoc = (doc, e, indicadorConsulta)=>{
    if (doc.txtinformacionDocumento){
        const p = document.createElement('p')
        p.innerHTML = doc.txtinformacionDocumento
        const style = require('./fragments/info.scss')
        aside(e, e.composedPath()[0], p, style)
        return
    }
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(it=>it.identificadorInstanciaSubtipoDocumento)
    const tipoFase = doc.codigoFase=='POST-FORMALIZACIÓN'?'POST':(doc.codigoFase=='FORMALIZACIÓN'?'FOR':'')
    const model = {
        tipoFase: tipoFase,
        codFase: doc.codigoFase,
        idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
        codSubproceso: doc.codigoSubproceso,
        indicadorFichero: 'N',
        listaInstanciasSbtipoDoc: listaInstancias,
        indicadorConsulta: indicadorConsulta,
        tipoFichero: '',
        tipoFirma: ''
    };
    const query = '?' + toQueryString(model)
    const target = e.composedPath()[0]
    target.style.cursor = 'progress'
    http(URLS.INFO + query).then(data=>{
        doc.txtinformacionDocumento = data.informacionDocumento
        const p = document.createElement('p')
        p.innerHTML = data.informacionDocumento
        const style = require('./fragments/info.scss')
        target.style.removeProperty('cursor')
        aside(e, target, p, style)
    })
    .catch((e)=>{mostrarError(e); target.style.removeProperty('cursor');})
}
const mostrarMenuAcciones = (doc, e, node)=>{
    const onclick = (e)=>{
        const target = e.composedPath()[0]
        const li = target.closest('li')
        if (e.type=="click" && is(target, 'input')){
            target.value=""
            return
        }
        if ( is(target, 'p') && li.hasAttribute('data-id')){
            node.dispatchEvent(new CustomEvent('bk-click',{
                detail: {accion: li.getAttribute('data-id')}, bubbles: true
            }))
            close()
        }
        else if (e.type=='change' && is(target, 'input') && li.hasAttribute('data-id') && target.files[0]){
            node.dispatchEvent(new CustomEvent('bk-click',{
                detail: {
                    accion: li.getAttribute('data-id'),
                    file: target.files[0]
                }, bubbles: true
            }))
            close()
        }
    }
    const clean = (e)=>{
        ul.removeEventListener('bk-clean', clean)
        ul.removeEventListener('click', onclick)
    }
    let acciones = doc.acciones.map(a=>a.codigoAccion)
    acciones.shift()
    acciones = acciones.reduce((a, it)=>{
            return {...a, [it]: mapAccion[it]}
        },{})
    const ul = document.createElement('ul')
    Object.keys(acciones).forEach(it=>{
        const li = ['AD', 'AF'].includes(it)?
            templateliInput.content.cloneNode(true):
            templateli.content.cloneNode(true)
        li.querySelector('p').innerText = acciones[it]
        li.querySelector('li').setAttribute('data-id', it)
        ul.appendChild(li/*.querySelector('li')*/)
    })
    
    const style = require('./fragments/menu.scss')
    const close = aside(e, e.composedPath()[0], ul, style, 11, true, true)
    /*const kk = ul.querySelector('li')
    console.log(getZEfectivoEnBody(kk))*/
    ul.addEventListener('click', onclick)
    ul.addEventListener('change', onclick)
    ul.addEventListener('bk-clean', clean)
    //console.log(doc, e, acciones)
}
const mostrarError = e=>{
    console.log(e)
    console.trace()
    const handle = ()=>{
        json.classList.toggle('oculto')
    }
    const clean = ()=>{
        manejador.removeEventListener('click', handle)
        aspa.removeEventListener('click', close)
        aceptar.removeEventListener('click', close)
        markup.removeEventListener('bk-clean', clean)
    }
    if (!Array.isArray(e) || e.length != 2)
    {
        e = ["Error general", e]
    }
    const style = require('./fragments/error.scss')
    const html = require('./fragments/error.html')
    const markup = document.createElement('div')
    markup.innerHTML = html
    markup.querySelector('.txt').innerText = e[0]
    const json = markup.querySelector('.json')
    json.innerText = JSON.stringify(e[1], null, 4)
    const manejador = markup.querySelector('.manejador')
    manejador.addEventListener('click', handle)
    const aspa = markup.querySelector('.aspa')
    const close = popupi(markup, style)
    aspa.addEventListener('click', close)
    const aceptar = markup.querySelector('.aceptar')
    aceptar.addEventListener('click', close)
    markup.addEventListener('bk-clean', clean)
}
const acciones = {
    consultarDocumento: (doc, cfg, sb)=>{
        const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst=>inst.identificadorInstanciaSubtipoDocumento)
        var model = {
            datosExpedienteConsultar: {
                codFase: doc.codigoFase,
                idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
                listaInstanciasSbtipoDoc: listaInstancias,
                codSubproceso: doc.codigoSubproceso,
                indicadorFichero: 'S',
                indicadorConsulta: cfg.indicadorConsulta
            }
        }
        return new Promise((resolve, reject)=>{
            sb.sendEvent('consultarDocumentoExpedienteDocumental', model)
            .when('VisualizarDocumentoIUViewIU', response => {
                const ficheroInyectado = response.ficheroInyectado
                resolve('/api/1.0/sap/commons/transmission/get/iplusget/' + ficheroInyectado.ficheros[0].localizadorFichero)
            })
            .error(reject)
        })
    },
    generarPlantilla: (doc, cfg, sb)=>{
        const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst=>inst.identificadorInstanciaSubtipoDocumento)
        var model = {
            datosExpedientePlantilla: {
                idInstanciaDocumento: listaInstancias[0],
                codFase: doc.codigoFase,
                codSubproceso: doc.codigoSubproceso,
                idInstanciaProceso: cfg.tarea.identificadorExpedienteDocumental,
                codIdioma: 'ES',
                opcionImpresion: 'CO01',
                numCopias: '0001',
                opcionGeneracion: '02',
                indFirmaDigital: 'N',
                datosImpresion: ''
            }
        }
        return new Promise((resolve, reject)=>{
            sb.sendEvent('generarPlantillaGestorDocumental', model)
            .when('MostrarPlantillaIUView', response => {
                resolve(response.localizadorFichero)
            })
            .error(reject)
        })
    },
    adjuntarDocumento: (doc, cfg, sb, loc)=>{
        var model = {
            datosExpedienteAdjuntar: {
                codigoFase: doc.codigoFase,
                codigoSubproceso: doc.codigoSubproceso,
                atributosnombreDocumento: [{ nombre: ' ', orden: ' ', valor: ' ' }],
                instanciasSubtipoDocument: doc.instanciasSubtipoDocumentos,
                localizadorFichero: loc,
                identificadorPropuesta: cfg.propuesta.identificadorPropuesta,
                identificadorContratoExpedienteActivo: cfg.propuesta.identificadorExpediente,
                codigoFamiliaProducto: cfg.propuesta.codigoFamiliaProducto,
                codigoGrupoProducto: cfg.propuesta.codigoGrupoProducto,
                codigoLineaNegocio: cfg.propuesta.codigoLineaDeNegocio,
                identificadorSubtipoDocumento: doc.identificadorSubtipoDocumento 
            }
        };
        return new Promise((resolve, reject)=>{
            sb.sendEvent('adjuntarDocumentoEnGestorDocumental', model)
            .when('MostrarDocumentosGestoriasIU', response => {
                resolve(response)
            })
            .error(reject)
        })
    },
    adjuntarFirma: (doc, cfg, sb, loc)=>{
        var model = {
            datosExpedienteAdjuntar: {
                codigoFase: doc.codigoFase,
                codigoSubproceso: doc.codigoSubproceso,
                atributosnombreDocumento: [{ nombre: ' ', orden: ' ', valor: ' ' }],
                instanciasSubtipoDocument: doc.instanciasSubtipoDocumentos,
                localizadorFichero: loc,
                identificadorPropuesta: cfg.propuesta.identificadorPropuesta,
                identificadorContratoExpedienteActivo: cfg.propuesta.identificadorExpediente,
                codigoFamiliaProducto: cfg.propuesta.codigoFamiliaProducto,
                codigoGrupoProducto: cfg.propuesta.codigoGrupoProducto,
                codigoLineaNegocio: cfg.propuesta.codigoLineaDeNegocio,
                identificadorSubtipoDocumento: doc.identificadorSubtipoDocumento 
            }
        };
        return new Promise((resolve, reject)=>{
            const cerrar = () =>{
                close()
                resolve(false)
            }
            const clean = ()=>{
                resolve(false)
                aspa.removeEventListener('click', cerrar)
                cancelar.removeEventListener('click', cerrar)
                markup.removeEventListener('bk-clean', clean)
                aceptar.removeEventListener('click', handle)
                date.removeEventListener('bkInput', handleChange)
            }
            const handle = ()=>{
                if (aceptar.hasAttribute('disabled')){
                    return
                }
                aceptar.setAttribute('disabled', true)
                error.innerText = ""
                model.datosExpedienteAdjuntar.fechaFirma = date.value.toISOString().replace(':', '.').replace(':', '.').replace('T', '-').replace('Z', '')
                aceptar.classList.add('progress')
                sb.sendEvent('adjuntarDocumentoEnGestorDocumental', model, true)
                .when('MostrarDocumentosGestoriasIU', response => {
                    aceptar.classList.remove('progress')
                    resolve(true)
                    close()
                })
                .error(e=>{
                    console.log(e)
                    aceptar.classList.remove('progress')
                    error.innerText = "Error en la operación"
                    aceptar.removeAttribute('disabled')
                })
            }
            const handleChange = ()=>{
                if (date.validity.valid){
                    aceptar.removeAttribute('disabled') 
                }
                else{
                    aceptar.setAttribute('disabled', '')
                }
            }
            const style = require('./fragments/adjuntarFirma.scss')
            const html = require('./fragments/adjuntarFirma.html')
            const markup = document.createElement('div')
            markup.innerHTML = html
            const aspa = markup.querySelector('.aspa')
            aspa.addEventListener('click', cerrar)
            const cancelar = markup.querySelector('.cancelar')
            cancelar.addEventListener('click', cerrar)
            const aceptar = markup.querySelector('.aceptar')
            aceptar.addEventListener('click', handle)
            markup.addEventListener('bk-clean', clean)
            const date = markup.querySelector('bk-wc-ui-date')
            date.addEventListener('bkInput', handleChange)
            const error = markup.querySelector('.error')
            const close = popupi(markup, style)
        })
    },
    eliminarDocumento: (doc,sb)=>{
        const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst=>inst.identificadorInstanciaSubtipoDocumento)
        var model = {
            datosExpedienteEliminar: {
                codFase: doc.codigoFase,
                idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
                listaInstanciasSbtipoDoc: listaInstancias,
                codSubproceso: doc.codigoSubproceso,
                indicadorFichero: 'S'
            }
        }
        return new Promise((resolve, reject)=>{
            sb.sendEvent('eliminarDocumentoEnGestorDocumental', model)
            .when('MostrarDocumentosGestoriasIU', resolve)
            .error(reject)
        })
    },
    obtenerMotivoExceptuacion: (doc, cfg)=>{
        const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst=>inst.identificadorInstanciaSubtipoDocumento)
        var model = {
            codigoFase: doc.codigoFase,
            documentoExceptuacion: listaInstancias[0],
            codigoSubproceso: doc.codigoSubproceso,
            indConsulta: cfg.indicadorConsulta,
            idDocGestor: doc.identificadorDocumentoGestorDocumental
        }
        let datos = undefined
        return http(URLS.OBTENERMOTIVOEXCEPTUACION, model)
        .then(data=>{
            datos = data.data
            return atenderErroresyAvisos(data.data)
        })
        .then(tf=>{
            //datos.codMotivoExceptuacion = 'ER'
            if (!tf || !datos.codMotivoExceptuacion){
                return false
            }
            else{
                return openModalExceptuar(doc, datos);
            }
        })
        .then(tf=>{
            if (!datos.codigoError && !datos.avisos && !datos.codMotivoExceptuacion){
                return new Promise((resolve, reject)=>{
                    dialogMsg({type: 'info', message: 'Información', detail: "Sin errores, avisos ni formulario de exceptuación", textoOk: 'Aceptar'})
                    .then(()=>resolve(false))
                })
            }
            return tf;
        })
        .catch(mostrarError)
    },
    exceptuarDocumento: (doc)=>{
        return openModalExceptuar(doc, {}, true);
    }
}
const openModalExceptuar = (doc, datos, nuevo)=>{
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst=>inst.identificadorInstanciaSubtipoDocumento)
    return new Promise((resolve, reject)=>{
        const handle_change = ()=>{
            if (select.value == '-1'){
                select.classList.add('req')
                modificar.setAttribute('disabled', true)
            }
            else{
                select.classList.remove('req')
                modificar.removeAttribute('disabled')
            }
        }
        const handle = ()=>{
            if (modificar.hasAttribute('disabled')){
                return
            }
            error.innerText = ""
            modificar.setAttribute('disabled', true)
            var model = {
                codMotivoExceptuacion: select.value,
                documentoExceptuacion: listaInstancias[0],
                observaciones: textarea.value
            }
            return http(nuevo? URLS.EXCEPTUARDOCUMENTO: URLS.MODIFICARDOCUMENTO, model)
            .then(data=>{
                modificar.removeAttribute('disabled')
                if (data.data && data.data.codigoError && data.data.resolucion){
                    error.innerText = data.data.resolucion
                }
                else{
                    resolve(true)
                    close()
                }
            })
            .catch(e=>{
                console.log(e)
                error.innerText = "Error en la operación"
                modificar.removeAttribute('disabled')
            })
        }
        const cerrar = () =>{
            close()
            resolve(false)
        }
        const clean = ()=>{
            resolve(false)
            aspa.removeEventListener('click', cerrar)
            cancelar.removeEventListener('click', cerrar)
            markup.removeEventListener('bk-clean', clean)
            modificar.removeEventListener('click', handle)
            select.removeEventListener('change', handle_change)
        }
        const style = require('./fragments/modalExceptuar.scss')
        const html = require('./fragments/modalExceptuar.html')
        const markup = document.createElement('div')
        markup.innerHTML = html
        const aspa = markup.querySelector('.aspa')
        aspa.addEventListener('click', cerrar)
        const cancelar = markup.querySelector('.cancelar')
        cancelar.addEventListener('click', cerrar)
        const modificar = markup.querySelector('.modificar')
        nuevo && (modificar.innerText = "Aceptar")
        modificar.addEventListener('click', handle)
        markup.addEventListener('bk-clean', clean)
        const select = markup.querySelector('select')
        select.addEventListener('change', handle_change)
        const textarea = markup.querySelector('textarea')
        const error = markup.querySelector('.error')
        getTabit('ObtenerMotivosExceptuacionDocumentoDYDA')
        .then(data=>{
            data.forEach(option=>{
                const op = document.createElement('option')
                op.innerText = option.DESLARGA
                op.value = option.CODIGO
                select.appendChild(op)
           })
           if (nuevo){
                const op = document.createElement('option')
                op.innerText = "Seleccione una opción"
                op.value = "-1"
                if (data.length >0){
                    select.insertBefore(op,select.firstChild)
                    select.classList.add('req')
                }
                else{
                    select.appendChild(op)
                }
           }
           select.value = datos.codMotivoExceptuacion || "-1"
           markup.querySelector('.message').innerText = doc.nombreTipoDocumento || ""
           textarea.value = datos.observaciones? datos.observaciones: ''
           handle_change()
        })
        const close = popupi(markup, style)
    })
}
const atenderErroresyAvisos = data =>{
    //data.codigoError = 'TN99991E'
    return new Promise((resolve, reject)=>{
        if (data.codigoError){
            let cfg = {type: 'error', message: 'ERROR', detail: data.resolucion, textoOk: 'Aceptar'}
            if (data.codigoError == 'TN99991E'){
                cfg = {type: 'alert', message: 'Importe insuficiente', detail: MSGS.IMPORTEINSUFICIENTE, textoOk: 'Aceptar'}
            }
            /*else if (data.codigoError == 'TN99992E'){
                cfg = { type: 'info', message: '', detail: 'msg', textoOk: 'Aceptar' }
            }*/
            else if (data.codigoError == 'TN00030E'){
               cfg = {type: 'alert', message: 'Saldo insuficiente', detail: MSGS.MODOADVERTENCIAANULAR, textoOk: 'Aceptar'}
            }
            dialogMsg(cfg).then(out => resolve(false))
        }
        else if(data.avisos){
            const mensaje = data.avisos.join('<br/>')
            dialogMsg({type: 'alert', message: 'Aviso', detail: mensaje, textoOk: 'Aceptar'}).then(out=> resolve(true))
        }
        else{
            resolve(true)
        }
    })
}
const obtenerMultiArchivo = (node, doc, indicadorConsulta, subprocesoInyeccion)=>{
    if(node.querySelector('.children').innerHTML !== ""){return Promise.resolve(true)}
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(it=>it.identificadorInstanciaSubtipoDocumento)
    const model = {
        'datosExpedienteConsultar': {
            'codFase': doc.codigoFase,
            'idDocGestorDoc': doc.identificadorDocumentoGestorDocumental,
            'listaInstanciasSbtipoDoc': listaInstancias,
            'codSubproceso': doc.codigoSubproceso,
            'indicadorConsulta': indicadorConsulta,
            'indicadorFichero': 'N'
        }
    };
    return new Promise((resolve, reject)=>{
        subprocesoInyeccion.sendEvent('consultarDocumentoExpedienteDocumental', model)
        .when('VisualizarDocumentoIUViewIU', data=>{
            const ficheros = data.ficheroInyectado.ficheros.filter(d=>d.nombrefichero != ' ')
            const multidocs = ficheros.map(d=>{
               const acciones = d.acciones.filter(a=>esAccionGestoria(a)).map(a=>({codigoAccion: a}))
               return {
                    nombreSubtipoDocumento: d.nombrefichero,
                    codigoEstado: d.estadoFichero,
                    identificadorDocumentoGestorDocumental: d.idDocGestorDocOut,
                    id: uniqMulti(),
                    parentId: doc.id,
                    indicadorOriginalCopia: doc.indicadorOriginalCopia,
                    indicadorObligatoriedad: doc.indicadorObligatoriedad,
                    indicadorRequiereFirma: doc.indicadorRequiereFirma,
                    acciones,
                    codigoFase: doc.codigoFase,
                    instanciasSubtipoDocumentos: doc.instanciasSubtipoDocumentos,
                    codigoSubproceso: doc.codigoSubproceso
                }
            })
            resolve(multidocs)
        })
        .error(reject)
    })
    
    
}
export {mostrarInfoDoc, mostrarMenuAcciones, mapEstado, mapAccion, is, acciones, mostrarError, EVENT, URLS,
filterAndAdjust, documentosPendientes, esAccionGestoria, uniq, resetSec, obtenerMultiArchivo}
