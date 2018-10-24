import './base.scss'
import '../../lib/index'
const root = document.querySelector('#root')
const pre = document.querySelector('pre')
document.querySelectorAll('bk-busc-emp').forEach(it=>{
    it.addEventListener('bk-seleccion',(e)=>{
        pre.innerText = JSON.stringify(e.detail.base, null, 4)
        console.log(e.detail)
    })
})