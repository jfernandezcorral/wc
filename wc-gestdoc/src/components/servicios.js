/*const urlRewrite = (url, get) =>{
    const p = window.location.pathname.split(',')[1]||""
    const [path, query] = url.split('?')
    const v = path.substring(path.lastIndexOf('/')+1)
    let dana = ',' + p + ',SSL,' + (get?'':'dom=1,') + 'CT=sxml+' + v
    const path2 = path.substring(0, path.lastIndexOf('/')+1)
    return path2 + dana + (query?"?"+query:"")
}*/
/*const urlRewrite = url=>{
    if (typeof(DanaUrl) === 'function'){//Juniper
        url = DanaUrl(url)
    }
    return url
}*/
const Danaopen = (x, method, url)=>{
    if (typeof(window.DanaMethodOpen) === 'function'){//Juniper
        window.DanaMethodOpen("open", x, method, url, true)
        return
    }
    x.open(method,url, true)
}
const DanaSetRequestHeader = (x, k, v)=>{
    if (typeof(window.DanaMethodSetRequestHeader) === 'function'){//Juniper
        window.DanaMethodSetRequestHeader("setRequestHeader", x, k, v)
        return
    }
    x.setRequestHeader(k, v)
}
const fetch2 = (url, options={})=>{
    options.method = options.method || 'GET'
    options.body = options.body || null
    options.headers = options.headers || new Headers()
    const req = new XMLHttpRequest()
    return new Promise((resolve, reject)=>{
        Danaopen(req, options.method, url)
        //req.open(options.method, url, true)
        for ( const [k, v] of options.headers.entries()){
            DanaSetRequestHeader(req, k, v)
            //req.setRequestHeader(k, v)
        }
        req.onload = function(){
            resolve([this.response, this.getResponseHeader('content-type'),this.status])
        }
        req.onerror = function(e){
            reject(e)
        }
        req.send(options.body)
    })
    
}
let config = {
    appCode: 'e3',
    appDomine: 'NS',
    tabit: '/tabit/?queryType='
}
const setAppNEO = ()=>{
    config = {
        appCode: 'e2',
        appDomine: 'NS',
        tabit: '/tabit/'
    }
}
const toQueryString= o =>{
    const str = []
    Object.entries(o).forEach(([k, v])=>str.push(encodeURIComponent(k) + '=' + encodeURI(v.toString())))
    return str.join('&')
}
const cacheTabit = {}
const getTabit = (tab, params={}) => {
    if (cacheTabit[tab]){
        return Promise.resolve(cacheTabit[tab])
    }
    let url = config.tabit + tab
    let peticion
    if (url.indexOf('?')>0){//get
        const query = toQueryString(params)
        url = url + (query? '&' + query: '')
        peticion = http(url)
    }
    else{
        peticion = http(url, params)
    }
    return new Promise((resolve, reject)=>{
        peticion.then(r=>{
            cacheTabit[tab] = r
            resolve(r)
        })
        .catch(reject)
    })
    
}
const URL_UPLOAD = '/api/1.0/sap/commons/transmission/put'
const get = (url)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('x-j_gid_cod_app',config.appCode)
    return new Promise((resolve, reject)=>{
        fetch2(url,{credentials: 'same-origin', headers})
        .then(resp=>{
            if (resp [1] && resp[1].indexOf('application/json')>=0){
                let ret = {}
                try{ret = JSON.parse(resp[0])}
                catch(e){reject(['Error de parseo de json', resp[0]]); return;}
                if (resp[2]===200){
                   resolve(ret)
                }
                else{
                    reject([ret.operationMessage || `Error haciendo get de ${url}, ${resp[2]}`, ret]) 
                }
            }
            else{
                console.warn(`${url} devolvió content-type: ${resp[1]}`)
                if (resp[2]===200){
                    resolve(resp[0])
                }
                else{
                    reject([`Error haciendo get de ${url}, ${resp[2]}`, resp[0]]) 
                }
            }
        })
        .catch(e=>{
            reject(["Error de comunicaciones", `Error haciendo get de ${url}, ${e}`])
        })
    })
}
const post = (url, data)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json;charset=UTF-8')
    headers.append('x-j_gid_cod_app',config.appCode)
    return new Promise((resolve, reject)=>{
        fetch2(url,{credentials: 'same-origin', method: 'post', body: JSON.stringify(data), headers})
        .then(resp=>{
            if (resp [1] && resp[1].indexOf('application/json')>=0){
                let ret = {}
                try{ret = JSON.parse(resp[0])}
                catch(e){reject(['Error de parseo de json', resp[0]]); return;}
                if (resp[2]===200){
                   resolve(ret)
                }
                else{
                    reject([ret.operationMessage || `Error haciendo post de ${url}, ${resp[2]}`, ret]) 
                }
            }
            else{
                console.warn(`${url} devolvió content-type: ${resp[1]}`)
                if (resp[2]===200){
                    resolve(resp[0])
                }
                else{
                    reject([`Error haciendo post de ${url}, ${resp[2]}`, resp[0]]) 
                }
            }
        })
        .catch(e=>{
            reject(["Error de comunicaciones", `Error haciendo post de ${url}, ${e}`])
        })
    })
}
const descargaFichero = (url, nombre = "sin_nombre") =>{
    let ext = '.bin'
    try{
        const tmp = url + '?'
        const posPunto = tmp.lastIndexOf('.')
        const fin = tmp.lastIndexOf('?')
        ext = tmp.substring(posPunto, fin)
    }
    catch(e){console.warn('Imposible obtener la extensión');}
    return getBlob(url).then(blob=>{
        let frame = document.querySelector('#frame_descarga_docs')
        if (!frame) {
            frame = document.createElement('div')
            frame.id = 'frame_descarga_docs'
            frame.style.display = 'none'
            frame.innerHTML =  '<a>sad</a>'
            document.body.appendChild(frame)
        }
        const a = frame.querySelector('a')
        a.setAttribute('download', nombre + ext)
        a.setAttribute('href', blob)
        const clickevent = document.createEvent("MouseEvent")
        clickevent.initEvent("click", true, true)
        a.dispatchEvent(clickevent)
        setTimeout(()=>URL.revokeObjectURL(blob), 10000)
        return true
    })
}
const getBlob = (url)=>{
    url = url + (url.indexOf('?')>0?'&':'?') + 'x-j_gid_cod_app=' + config.appCode
    //url = urlRewrite(url)
    /*console.log(urlRewrite(url, true))
    if (typeof(DanaOrigUrl) === 'function'){//Juniper
        url = urlRewrite(url, true)
    }*/
    return new Promise((resolve, reject)=>{
		const xhr = new XMLHttpRequest()
        Danaopen(xhr, 'GET', url)
        //xhr.open('GET', url, true)
        xhr.responseType = 'blob'
        DanaSetRequestHeader(xhr, 'x-j_gid_cod_app',config.appCode)
		//xhr.setRequestHeader('x-j_gid_cod_app',config.appCode)
		xhr.onload = function(e) {
		  if (this.status == 200) {
			const blob = new Blob([this.response], {type: 'application/content-stream'})
			resolve(window.URL.createObjectURL(blob))
		  }
		  else{
			  reject(["Error en la petición - cod: " + String(this.status), this.statusText])
		  }
        }
        xhr.onerror = function(e) {
            reject(["Error descargando fichero", e])
        }
		xhr.send();
	})
}
const subirFichero = file =>{
    if (file.size >= 25242880) {
        return Promise.reject(["El tamaño del fichero excede 24 MB", "El tamaño del fichero excede 24 MB"])
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('server', 'iplusput')
    let headers = new Headers();
    headers.append('x-j_gid_cod_app', config.appCode)
    return new Promise((resolve, reject)=>{
        fetch2(URL_UPLOAD, {credentials: 'same-origin', method: 'post', body: formData, headers})
        .then(resp=>{
            if (resp [1] && resp[1].indexOf('application/json')>=0){
                let ret = {}
                try{ret = JSON.parse(resp[0])}
                catch(e){reject(['Error de parseo de json', resp[0]]); return;}
                if (resp[2]===200){
                   resolve(ret)
                }
                else{
                    reject(["Error subiendo fichero", ret]) 
                }
            }
            else{
                console.warn(`${url} devolvió content-type: ${resp[1]}`)
                if (resp[2]===200){
                    resolve(resp[0])
                }
                else{
                    reject(["Error subiendo fichero", resp[0]]) 
                }
            }
        })
        .catch(e=>{
            reject(["Error de comunicaciones", e])
        })
    })
}
const http = (url, data) => data? post(url, data): get(url)
export {setAppNEO, http, descargaFichero, subirFichero, getTabit}