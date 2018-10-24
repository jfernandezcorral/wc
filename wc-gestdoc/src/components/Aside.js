import template from './Aside.html'
import styles from './Aside.scss'
import getZEfectivoEnBody from './stacking'
export default class Aside extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._client = shadowRoot.querySelector('#client')
      this._markup = undefined
    }
    _click(e){e.stopPropagation();}
    connectedCallback(){
        this._client.addEventListener('click', this._click)
    }
    disconnectedCallback(){
        this._client.removeEventListener('click', this._click)
        if (this._markup){
            this._markup.dispatchEvent(new CustomEvent('bk-clean',{bubbles: true}))
        }
    }
    inject(e, markup, styles="" ){
        if (this._css){
            this.shadowRoot.removeChild(this._css)
        }
        this._css = document.createElement('style')
        this._css.type = 'text/css'
        this._css.appendChild(document.createTextNode(styles))
        this.shadowRoot.appendChild(this._css)
        if (this._markup){
            this._markup.dispatchEvent(new CustomEvent('bk-clean',{bubbles: true}))
        }
        this._markup = markup
        this._client.innerHTML = ""
        this._client.appendChild(markup)
        
    }
}
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
const adjust = (el, e, pp, markup, mascara, target)=>{
    let x = e.pageX
    let y = e.pageY
    let br
    let mask
    const client = markup.parentElement
    let derecha = true
    let abajo = true
    if (pp){
        //br = target.getBoundingClientRect()
        br = getBoundingDocumentRect(target)
        x = br.left
        y = br.top + br.height
        //console.log(br)
    }
    if (mascara){
        mask = target.cloneNode()
        mask.style.position = 'absolute'
        client.style.position = 'relative'
        client.appendChild(mask)
    }
    const w = el.offsetWidth
    const h = el.offsetHeight
    const wt = document.documentElement.clientWidth
    const ht = document.documentElement.clientHeight
    if (x + w > wt){
        x = pp? x - w + br.width: x - w
        derecha = false
    }
    if (y + h > ht){
        y = pp? y - h - br.height: y - h
        abajo = false
    }
    if (mascara){
        if (derecha){
            client.classList.add('derecha')
            mask.style.left = '0px'
        }
        else{
            mask.style.right = '0px'
        }
        if (abajo){
            client.classList.add('abajo')
            mask.style.top = '-' + String(mask.offsetHeight-Math.ceil(((mask.offsetHeight - mask.clientHeight)/2))-1) + 'px'
            mask.style.borderBottomWidth = '0px'
        }
        else{
            mask.style.bottom = '-' + String(mask.offsetHeight-Math.ceil(((mask.offsetHeight - mask.clientHeight)/2))-1) + 'px'
            mask.style.borderTopWidth = '0px'
        }
    }
    client.classList.add('anim')
    el.style.top = String(y) + 'px'
    el.style.left = String(x) + 'px'
    return mask
}
let actual = undefined
let targetActual = undefined
let mask = undefined
const click_body = (e)=>{
    if (e && esExcepcionCerrar(e)){
        return
    }
    document.body.removeEventListener('click', click_body)
    window.removeEventListener('resize', click_body)
    document.removeEventListener('scroll',click_body, true)
    document.removeEventListener('bk-scroll',click_body)
    mask && mask.removeEventListener('click', click_body)
    document.body.removeEventListener('click', click_body)
    document.body.removeChild(actual)
    actual = undefined
}
const esExcepcionCerrar = (e)=>{
    if (e.type == 'scroll' || e.type == 'bk-scroll'){
        const targetscroll = e.composedPath()[0]
        if (targetscroll == document){return true;}
        return !contains(targetscroll,targetActual)
    }
    return false
}
const contains = (p,h)=>{
    let tmp = h
    while (tmp && tmp != p){
        tmp = tmp.parentNode || tmp.host
    }
    return !!tmp
}
const aside = (e, target, markup, styles, z, pp = false, mascara = false)=>{
    //console.log(e)
    if (!e){return;}
    if (actual){
        click_body()
    }
    targetActual = target
    e.stopPropagation()
    actual = document.createElement('bk-wc-aside')
    actual.style.font = window.getComputedStyle(targetActual).font
    actual.style.top = '-1500px'
    if (markup){
        actual.inject(e, markup, styles)
    }
    document.body.appendChild(actual)
    mask = adjust(actual,e, pp, markup, mascara, targetActual)
    actual.style.zIndex = z || getZEfectivoEnBody(targetActual)
    mask && mask.addEventListener('click', click_body)
    document.body.addEventListener('click', click_body)
    window.addEventListener('resize', click_body)
    document.addEventListener('scroll',click_body, true)
    document.addEventListener('bk-scroll',click_body)
    return click_body
}
export {aside}