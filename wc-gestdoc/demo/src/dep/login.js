
import {http} from '../../../lib/index'
import JSEncrypt from '../vendor/jsencrypt.min.js'
const config = {
    apiBaseUrl: '/api/1.0',
    context: '/btb/flow/expedientes',
    keyEndpoint:'/login/key',
    loginEndpoint: '/login'
}
const jsEncrypt = new JSEncrypt()
const post = (url, data)=>{
    let headers = new Headers();
    //headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    headers.append('j_gid_cod_app','e3')
    headers.append('j_gid_cod_ds','NS')
    return fetch(url,{credentials: 'same-origin', method: 'post', body: data, headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json()
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else{
            throw new Error(`Error haciendo post de ${url}, ${resp.status}`)
        }
    })
}
const get = (url)=>{
    let headers = new Headers();
    //headers.append('Accept', 'application/json')
    headers.append('j_gid_cod_app','e3')
    headers.append('j_gid_cod_ds','NS')
    return fetch(url,{credentials: 'same-origin', headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json().then(j=>j.j_gid_response_rsa)
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else if (resp.status == '403' || resp.status == '307'){
            return resp.json().then(j=>j.j_gid_response_rsa)
        }
        else{
            throw new Error(`Error haciendo get de ${url}, ${resp.status}`)
        }
    })
}
function getPasswordKey() {
    return new Promise((resolve, reject)=>{
        get(config.apiBaseUrl + config.context + config.keyEndpoint)
        .then(data=>resolve(data))
        .catch(reject)
    })
}
function encrypt(password) {
    return new Promise((resolve, reject)=>{
        getPasswordKey()
        .then(function(key) {jsEncrypt.setKey(key); resolve(jsEncrypt.encrypt(password));},
        reject);
    })
}
function buildBody(user, encryptedPassword) {
    var params = {
            'j_gid_aplicacion': '',
            'j_gid_canal': '0050',
            'j_gid_idioma': 'ES',
            'j_gid_neo_terminal_logico': '',
            'j_gid_origen': '73010.026.030.16943890',
            'j_gid_subaplicacion': '00',
            'j_gid_tipo_origen': '73',
            'j_gid_uo_terminal': '000010000004',
            'j_gid_usuario_dep': user,
            'j_gid_password': encryptedPassword
    }
    const str = []
    Object.entries(params).forEach(([k, v])=>str.push(encodeURIComponent(k) + '=' + encodeURIComponent(v)))
    return str.join('&')
}
function login(user, password) {
    return new Promise((resolve, reject)=>{
        encrypt(password)
        .then(encryptedPas=>{
            post(config.apiBaseUrl + config.context + config.loginEndpoint, buildBody(user, encryptedPas))
            .then(resolve)
            .catch(reject)
        })
        .catch(reject) 
    })
}
export {login}