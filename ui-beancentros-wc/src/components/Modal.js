import template from './Modal.html'
import styles from './Modal.scss'
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
export default class Modal extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._popup = shadowRoot.querySelector('#popup')
      this._client = shadowRoot.querySelector('#client')
      this._click = this._click.bind(this)
      this.close = this.close.bind(this)
      this._endtransition = this._endtransition.bind(this)
      this._closing = false
    }
    connectedCallback(){
        this._popup.addEventListener('click', this._click)
    }
    disconnectedCallback(){
      this._popup.removeEventListener('click', this._click)
    }
    _click(e){
        const target = e.composedPath()[0]
        if (target==this._popup){
        //if (is(target, '#popup')/* || is(target, '.aspa')*/){
            this.close()
        }
    }
    _endtransition(){
        try{this.parentNode && this.parentNode.removeChild(this)}
        catch(e){}
        this._client.removeEventListener("transitionend", this._endtransition)
        this._client.removeEventListener("transitioncancel", this._endtransition)
    }
    close(){
        if (this._closing){
            return
        }
        this._closing = true
        this.dispatchEvent(new CustomEvent('bk-close',{bubbles: true}))
        this._client.style.transform = "scale(0.1)"
        this._popup.style.opacity = '0.1'
        this._client.addEventListener("transitionend", this._endtransition)
        this._client.addEventListener("transitioncancel", this._endtransition)
    }
    inject(markup, styles="" ){
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
function popup(markup){
    const h = ()=> {
        markup.dispatchEvent(new CustomEvent('bk-clean',{bubbles: true}))
        el.removeEventListener('bk-close', h) 
    }
    const el = document.createElement('bk-wc-ui-modal')
    el.addEventListener('bk-close', h)
    el.appendChild(markup)
    document.body.appendChild(el)
    return el.close
}
function popupi(markup, styles){
    const h = ()=> {
        markup.dispatchEvent(new CustomEvent('bk-clean',{bubbles: true}))
        el.removeEventListener('bk-close', h) 
    }
    const el = document.createElement('bk-wc-ui-modal')
    el.addEventListener('bk-close', h) 
    el.style.top = '-1500px'
    if (markup){
        el.inject(markup, styles)
    }
    document.body.appendChild(el)
    return el.close
}
export {popup, popupi}