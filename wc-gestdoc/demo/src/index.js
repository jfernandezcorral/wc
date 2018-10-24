import './base.scss'
import {login} from './dep/login.js'
import {RUTAS_TAREAS, TAREAS_USAN_GESTOR_DOCUMENTAL, TIPOS_GESTOR_DOCUMENTAL} from './dep/parametricas.js'
import {Subprocess, aside, popupi, progress, mostrarError} from '../../lib/index'

const textarea = document.querySelector('#prop')
const numProp = document.querySelector('#numProp')
const formExp = document.querySelector('#clientExpedientes form')
const formTareas = document.querySelector('#clientTareas form')
const formInmuebles = document.querySelector('#clientInmuebles form')
let expedientes = []
let expediente = undefined
let tareas = []
let tarea = undefined
let modelo = {}
let inmuebles = []
const mock = `{"tarea":{
    "codigoTarea": "TN115RG2",
    "identificadorExpedienteDocumental": "TNALAPEX0000000082016-03-08000"
    },
"fase": "TRAMITACIÓN",
"propuesta": {
    "codigoFamiliaProducto": "05",
    "codigoGrupoProducto": "10",
    "codigoLineaDeNegocio": "ZM",
    "identificadorExpediente": "000000001570743709",
    "identificadorPropuesta": "000010000006120236"
    },        
"idGarantia": "X(20)",
"indicadorConsulta": "TA",
"modeInyeccion": true,
"notG": true
}`

textarea.value = localStorage.getItem("cfg")? localStorage.getItem("cfg"): mock
login("A125282", 'A$125282').then(p=>{
    log(p)
    log('inicio de sesión correcto')
    /*const sb = new Subprocess('/api/1.0/btb/flow/bandejaTareas/inicio')
    sb.error(mostrarError)
    sb.inicia({}).when('MostrarResultadoOperacionIU',d=>{log(d);log('inicio');})*/
    document.querySelector('#buscar').addEventListener('click', e=>{
        try{
            const cfg = JSON.parse(textarea.value)
            log(cfg)
            log("Parseo correcto")
            render(cfg)
        }
        catch(er){
            console.log(er)
            log(er)
            log("error de paseo")
        }

    })
    document.querySelector('#buscarProp').addEventListener('click', e=>{
        formExp.innerHTML = ""
        formTareas.innerHTML = ""
        formInmuebles.innerHTML = ""
        resolveExpedientes(numProp.value).then(exps=>{
            expedientes = exps.vectorListaDetalleExpedientes
            //console.log(expedientes)
            expedientes && dialogoSeleccionExpediente()
            expedientes || mostrarError(["No hay expedientes con este número de propuesta", "!!"])
        })
        .catch(mostrarError)
    })
})
.catch(mostrarError)
function log(obj){
    const log = document.querySelector('#log')
    log.innerHTML = ">>>>>>>>>>>>>>>>>><br/>" + JSON.stringify(obj, null, 4) + '<br/>' + log.innerHTML
}
function padn(t, long){
    while (t.length<long){
        t = '0' + t
    }
    return t
}
function render(cfg){
    window.localStorage.setItem("cfg", JSON.stringify(cfg, null, 4))
    const g = document.querySelector('#gestdoc')
    g.innerHTML = ""
    const wc = cfg.modeInyeccion? document.createElement("bk-wc-gest-doc"):document.createElement("bk-wc-gest-doc-tree")
    let progreso = null
    wc.addEventListener('bk-event',(e)=>{
        //console.log("Evento:",  e.detail)
        if (e.detail.msg == wc.EVENT.SHOW_LOADING_EXPEDIENTE){
            progreso && progreso.close()
            progreso = progress("Espere...", undefined, true)
        }
        else if (e.detail.msg == wc.EVENT.HIDE_LOADING_EXPEDIENTE){
            progreso && progreso.close()
        }
        else{
            console.log("Evento de Notificación",  e.detail)
        }
    })
    wc.cfg = cfg
    
    g.appendChild(wc)
}

function resolveExpedientes(prop){
    formExp.innerHTML = "Expedientes disponibles:<br/>"
    formTareas.innerHTML = ""
    formInmuebles.innerHTML = ""
    return new Promise((resolve, reject)=>{
        const sb = new Subprocess('/api/1.0/extranet/extranetGestorias/obtenerExpedientesPropuestas')
        sb.inicia({codigoAccionLlamadaModulo: "PR",
                    propuestaCodigoEntidad: "0000",
                    propuestaCodigoFamiliaProducto: "  ",
                    propuestaCodigoGestoria: "0000",
                    propuestaCodigoGrupoProducto: "  ",
                    propuestaCodigoLineaNegocio: "  ",
                    propuestaIdentificadorPropuesta: padn(prop,18)})
        .when('MostrarResultadoOperacionIU', d =>{
            log(d)
            log('obtenerExpedientesPropuestas')
            resolve(d)
        })
        .error(reject)
    })
}
function dialogoSeleccionExpediente(){
    const b = document.createElement('div')
    b.innerHTML = `<button>Acceder</button>`
    b.querySelector('button').addEventListener('click',(e)=>{
        e.preventDefault()
        expediente = formExp.querySelector('input:checked').value
        //console.log(expediente)
        resolveTareas()
    })
    expedientes.forEach((ex, i)=>{
        const reg = document.createElement('div')
        reg.innerHTML = `<input type='radio' ${i==0?'checked':''} name='exp' value='${ex.expediente}'>${ex.expediente}</input>`
        formExp.appendChild(reg)
    })
    formExp.appendChild(b)
}
function resolveTareas(){
    formTareas.innerHTML = "Tareas disponibles<br/>"
    formInmuebles.innerHTML = ""
    const este = expedientes.find(e=>e.expediente==expediente)
    const sb = new Subprocess('/api/1.0/extranet/extranet/consultartareas')
    sb.error(mostrarError)
    sb.inicia({
        identificadorPropuesta:{ 
            codigoEntidad: "0000",
            codigoFamiliaProducto: este.codigoFamiliaProducto,
            codigoGestoria: "0000",
            codigoGrupoProducto: este.codigoGrupoProducto,
            codigoLineaDeNegocio: este.codigoLineaDeNegocio,
            identificadorExpediente: este.expediente,
            identificadorPropuesta: este.identificadorPropuesta
        }
    }).error((e)=>console.log(e))
    .when('MostrarTareasPropuestaIU',d=>{
        log(d)
        log('consultartareas')
        tareas = d
        //console.log(tareas)
        dialogoSeleccionTarea()
    })
    .error(mostrarError)
}
function dialogoSeleccionTarea(){
    const b = document.createElement('div')
    b.innerHTML = `<button>Acceder</button>`
    b.querySelector('button').addEventListener('click',(e)=>{
        e.preventDefault()
        formInmuebles.innerHTML = ""
        tarea = parseInt(formTareas.querySelector('input:checked').value)
        //console.log(tarea)
        procesarModelo()
    })
    tareas.tareas.forEach((t, i)=>{
        const fase = tareas.fasesTareas.find(f=>f.codigoFaseTarea==t.codigoFase)
        t.xfase = fase
        const reg = document.createElement('span')
        TAREAS_USAN_GESTOR_DOCUMENTAL[t.codigoTarea] == TIPOS_GESTOR_DOCUMENTAL.ARBOL && (reg.classList.add('arbol'))
        reg.innerHTML = `<input type='radio' ${i==0?'checked':''}
            ${TAREAS_USAN_GESTOR_DOCUMENTAL[t.codigoTarea]?"":"disabled"}
            name='tarea' value='${String(i)}'>
            ${fase.nombreFase} - ${t.descripcionTarea}
        </input>`
        formTareas.appendChild(reg)
    })
    formTareas.appendChild(b)
}
function procesarModelo(){
    const regExpediente = expedientes.find(e=>e.expediente==expediente)
    const regTarea = tareas.tareas[tarea]
    const enlace = RUTAS_TAREAS[regTarea.codigoTarea]
    const mod = {
        tarea:{codigoTarea: regTarea.codigoTarea,
            identificadorExpedienteDocumental: regTarea.identificadorExpedienteDocumental
        },
        fase: regTarea.xfase.nombreFase,
        propuesta:{
            codigoFamiliaProducto: regExpediente.codigoFamiliaProducto,
            codigoGrupoProducto: regExpediente.codigoGrupoProducto,
            codigoLineaDeNegocio: regExpediente.codigoLineaDeNegocio,
            identificadorExpediente: regExpediente.expediente,
            identificadorPropuesta: regExpediente.identificadorPropuesta
        },
        //idGarantia: localStorage.getItem("idGarantia")||"X(20)",
        indicadorConsulta: "TA",
        modeInyeccion: TAREAS_USAN_GESTOR_DOCUMENTAL[regTarea.codigoTarea] == TIPOS_GESTOR_DOCUMENTAL.PLANO,
        notG: false
    }
    if (['verificacionRegistral'].includes(enlace)){mod.notG = true;}
    if (['verificacionRegistral', 'informeValoracion'].includes(enlace)){//requiere garantía
        modelo = mod
        resolveInmuebles()
        return      
    }
    setTextarea(mod)
}
function resolveInmuebles(){
    formInmuebles.innerHTML = "Inmuebles disponibles<br/>"
    const sb = new Subprocess('/api/1.0/extranet/extranet/verificacionregistral/gestionar')
    sb.error(mostrarError)
    const este = expedientes.find(e=>e.expediente==expediente)
    sb.inicia({
        identificadorPropuesta:{ 
            codigoEntidad: "0000",
            codigoFamiliaProducto: este.codigoFamiliaProducto,
            codigoGestoria: "0000",
            codigoGrupoProducto: este.codigoGrupoProducto,
            codigoLineaDeNegocio: este.codigoLineaDeNegocio,
            identificadorExpediente: este.expediente,
            identificadorPropuesta: este.identificadorPropuesta
        }
    })
    .when('MostrarDatosInmueblesIU',d=>{
        log(d)
        log('consultarInmuebles')
        inmuebles = d.listaInmuebles
        //console.log(inmuebles)
        dialogoSeleccionInmueble()
    })
    .error(mostrarError)
}
function dialogoSeleccionInmueble(){
    const b = document.createElement('div')
    b.innerHTML = `<button>Acceder</button>`
    b.querySelector('button').addEventListener('click',(e)=>{
        e.preventDefault()
        const val = formInmuebles.querySelector('input:checked').value
        modelo.idGarantia = '00212' + padn(val, 15)
        //textarea.value = JSON.stringify(modelo, null, 4)
        setTextarea(modelo)
    })
    inmuebles.forEach((inm, i)=>{
        const reg = document.createElement('div')
        reg.innerHTML = `<input type='radio' ${i==0?'checked':''} name='inmueble' value='${inm.datosExpediente.identificadorPertenencia}'>
            ${inm.descripcionTipoFinca} - ${inm.domicilio}
        </input>`
        formInmuebles.appendChild(reg)
    })
    formInmuebles.appendChild(b)
}
function setTextarea(modelo){
    textarea.value = JSON.stringify(modelo, null, 4)
    textarea.classList.add('anim')
    setTimeout(()=>textarea.classList.remove('anim'), 1000)
}














