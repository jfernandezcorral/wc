import {http} from './servicios'
class Dsl {
    constructor(prom, g_callbacks, g_allways, g_errors, oldTransiciones=[]){
        this._oldTransiciones = oldTransiciones
        this._callbacks = {}
        Object.keys(g_callbacks).forEach(k=>this._callbacks[k]=g_callbacks[key].map(it=>it))
        this._always = [...g_allways]
        this._errors = [...g_errors]
        this._transiciones = {}
        this._prom = prom
        this._prom.then(data=>{
            if (!data.errorData && !data.data.codigoError){
                this._process(data)
            }
            else{
                if (data.data && data.data.codigoError){
                    this._process_error([data.data.resolucion, data.data])
                    return
                }
                this._process_error([data.errorData.operationMessage, data.errorData])
            }
        })
        .catch(this._process_error.bind(this))
    }
    _process(data){
        this._transiciones = data.stateData.availableTransitions
        const id = data.stateData.viewId
        if (this._callbacks[id]){
            this._callbacks[id].forEach(cb=>cb(data.data))
        }
        this._always.forEach(cb=>cb(data.data))
    }
    _process_error(e){
        this._transiciones = this._oldTransiciones
        this._errors.forEach(cb=>cb(e))
        this._always.forEach(cb=>cb(e))
    }
    get trancisionesPermitidas(){
        return {...this._transiciones}
    }
    when(vw, cb){
        if (this._callbacks[vw]){
            this._callbacks[vw].push(cb)
        }
        else{
            this._callbacks[vw] = [cb]
        }
        return this
    }
    always(cb){
        this._always.push(cb)
        return this
    }
    error(cb){
        this._errors.push(cb)
        return this
    }
}
export default  class Subprocess {
    constructor(url){
        this._callbacks = {}
        this._always = []
        this._errors = []
        this._url = url
        this.abierto = false
    }
    when(vw, cb){
        if (this._dsl){this._dsl.when(vw, cb)}
        if (this._callbacks[vw]){
            this._callbacks[vw].push(cb)
        }
        else{
            this._callbacks[vw] = [cb]
        }
        return this
    }
    always(cb){
        if (this._dsl){this._dsl.always(cb)}
        this._always.push(cb)
        return this
    }
    error(cb){
        if (this._dsl){this._dsl.error(cb)}
        this._errors.push(cb)
        return this
    }
    inicia(modelo){
        this._dsl = new Dsl(http(this._url, modelo), this._callbacks, this._always, this._errors)
        return this._dsl
    }
    sendEvent(event, modelo, silenciarErrores){
        this.abierto = true
        if (!this._dsl){
            this._errors.forEach(e=>e(["Subproceso no iniciado o terminado!", {}]))
            throw new Error("Subproceso no iniciado o terminado!")
        }
        if (this._dsl.trancisionesPermitidas[event]){
            this._dsl = new Dsl(
                http(this._dsl.trancisionesPermitidas[event], modelo),
                this._callbacks,
                this._always,
                silenciarErrores? []: this._errors,
                this._dsl.trancisionesPermitidas
            )
            if (event == 'end'){
                this._dsl = undefined
            }
            return this._dsl
        }
        else{
            this._errors.forEach(e=>e(["transición no permitida!", {}]))
            throw new Error("transición no permitida!")
        }
    }
    finaliza(){
        this.sendEvent('end',{})
    }
}