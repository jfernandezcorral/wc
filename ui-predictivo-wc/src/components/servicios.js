import SWL from "swl"

const getInstancePaged = (user, oficina, entidad, search)=>{
    const url = `/buscemp/BuscempNeoPagedQuery?qtext=${search}&userId=${user}&oficina=${oficina}&entidad=${entidad}`
    let start = 0
    let list = undefined
    let queryId = undefined
    function process(r){
        let num = 0
        let lista = undefined;
        ['cartera', 'oficina', 'otros'].forEach(k=>{
            if (!r[k]){return}
            const cuenta = r[k].docs.length
            if (cuenta > 0){
                num = cuenta
                lista = k
            }
        })
        return [num, lista]
    }
    /*function processResult(results){//temporal mientras averiguamos como se llama el parámetro de lista!!
        let ret = results
        const {cartera, oficina, otros} = results
        list === 'oficina' && (ret = {oficina, otros})
        list === 'otros' && (ret = {otros})
        return ret
    }*/
    function get(url){
        return new Promise((resolve, reject)=>{
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.onload = function(e) {
              if (this.status == 200) {
                resolve(JSON.parse(this.response))
                //console.log(this.response)
              }
              else{
                  reject(["Error en la petición - cod: " + String(this.status), this.statusText])
              }
            }
            xhr.onerror = function(e) {
                reject(["Error haciendo petición", e])
            }
            xhr.send();
        })
    }
    return {
        /*iniciar: (data)=>{
            queryId = data.query.queryId
            const [cuenta, lista] = process(data.results)
            start += cuenta
            list = lista
            return Promise.resolve(data.results)
        },*/
        inicia: ()=>{
            return get(url).then(data=>{
                queryId = data.query.queryId
                const [cuenta, lista] = process(data.results)
                start += cuenta
                list = lista
                return data.results
            })
        },
        siguiente: ()=>{
            return get(url + `&queryId=${queryId}&start=${String(start)}&listapaginado=${list}`).then(data=>{
                queryId = data.query.queryId
                const ret = /*processResult(*/data.results//)
                const [cuenta, lista] = process(data.results)
                if (list===lista){
                    start += cuenta
                }
                else{
                    start = cuenta
                }
                list = lista
                return ret
            })
        }
    }
}
const getInstancePredictivo = (user, oficina, entidad)=>{
    return {
        xhr: undefined,
        getData: function(search){
            const url = `/buscemp/BuscempNeoQuery?qtext=${search}&userId=${user}&oficina=${oficina}&entidad=${entidad}`
            return new Promise((resolve, reject)=>{
                if (this.xhr){this.xhr.abort()}
                this.xhr = new XMLHttpRequest()
                this.xhr.open('GET', url, true)
                this.xhr.onload = function(e) {
                  if (this.status == 200) {
                    resolve(JSON.parse(this.response))
                  }
                  else{
                      reject(["Error en la petición - cod: " + String(this.status), this.statusText])
                  }
                }
                this.xhr.onerror = function(e) {
                    reject(["Error haciendo petición", e])
                }
                this.xhr.send();
            })
        }
    }
}
const busquedaCliente = ()=>{
    const ret = new Promise((resolve, reject)=>{
        SWL.proceso.open("NSBN1239", {origen: "bean", tipoBean: "beanNombre", abrirVistaPrincipal: "S"}, true)
        .then(
            task => {
                task.closePromise
                .then(
                    function (task) {
                       resolve(task.closeData)
                    },
                    function (data) {
                        reject(data) 
                    });
            },
            data => {
               reject(data) 
            }
        )
    })
    return ret
}
const formatFecha = (f) =>{
    try{
        const ano = parseInt(f.substring(0,4), 10)
        const mes = parseInt(f.substring(4,6), 10)
        const dia = parseInt(f.substring(6,8), 10)
        const d = new Date(ano, mes-1, dia, 0, 0, 0)
        return d.toISOString()
    }
    catch(e){return f}
}
const normalizarInfo = data =>{
    const base = {
        id: data.id? data.id: data.idCli,
        tipopersona: data.tipopersona? data.tipopersona: data.tipoPersona,
        documento: data.documento? data.documento: data.numDoc,
        tipodocumento: data.tipodocumento? data.tipodocumento: data.codTipoDoc,
        telefono: data.telefono,
        domicilio: data.domicilio,
        localidad: data.localidad? data.localidad: data.poblacion,
        codpostal: data.cpostal? data.cpostal: data.codPostal,
        nombre: data.titular? data.titular: data.nombre + (data.apellidos?" " + data.apellidos: ""),
        fechanac: data.fechanac? data.fechanac:formatFecha(data.fechaNac) 
    }
    return {base, raw: data}
}
export default getInstancePredictivo
export {busquedaCliente, normalizarInfo, getInstancePaged}