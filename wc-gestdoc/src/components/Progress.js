import template from './Progress.html'
import styles from './Progress.scss'
export default class Progress extends HTMLElement {
    constructor(msg, boolC, sinProgres) {
      super()
      if (!msg){return;}
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._root = shadowRoot.querySelector('#root')
      this._client = shadowRoot.querySelector('#client')
      this._text = shadowRoot.querySelector('#text')
      this._endtransition = this._endtransition.bind(this)
      this._text.innerHTML = msg
      boolC &&  this._root.classList.add('parcial')
      sinProgres && this._client.removeChild(this._client.querySelector('#pro'))
    }
    _endtransition(){
        try{this.parentNode && this.parentNode.removeChild(this)}
        catch(e){}
        this._client.removeEventListener("transitionend", this._endtransition)
        this._client.removeEventListener("transitioncancel", this._endtransition)
    }
    close(){
        this._client.style.transform = "scale(0.1)"
        this._root.style.opacity = '0.1'
        this._client.addEventListener("transitionend", this._endtransition)
        this._client.addEventListener("transitioncancel", this._endtransition)
        setTimeout(this._endtransition.bind(this), 500)
    }
}

const progress = (msg = "Procesando, espere...", contenedor, sinProgres = false)=>{
    const p = new Progress(msg, contenedor, sinProgres)
    if (contenedor){
        contenedor.appendChild(p)//contenedor debe estar posicionado...
    }
    else{
        document.body.appendChild(p)
    }
    return p
}
export {progress}