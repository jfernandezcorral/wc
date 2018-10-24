function doesStyleCreateStackingCtx(el) 
{    
    if (el.nodeType !== 1){
        return false
    }
    const styles = window.getComputedStyle(el)
    if (styles.opacity < 1){return true;}
    if (styles.transform !== 'none') {return true;}
    if (styles.transformStyle === 'preserve-3d') {return true;}
    if (styles.perspective !== 'none') {return true;}
    if (styles.flowFrom !== 'none' && styles.content !== 'normal') {return true;}
    if (styles.position === 'fixed') {return true;}
    if (styles.position !== 'static' && styles.zIndex !== 'auto'){return true;}
    if (el.tagName==='HTML'){return true;}
    return false
}
function z(el){
    return window.getComputedStyle(el).zIndex
}
function getStackingContext(el){
    if (el.tagName==='HTML'){
        return el
    }
    let parent = el.parentNode || el.host
    while (!doesStyleCreateStackingCtx(parent)){
        parent = parent.parentNode || parent.host
    }
    return parent
}
function getZEfectivoEnBody(el){
    const tmp = []
    let sC = getStackingContext(el)
    while (sC.tagName !== 'HTML'){
        tmp.unshift(sC)
        sC = getStackingContext(sC)
    }
    if (tmp.length == 0){
        return 'auto'
    }
    else{
        return z(tmp[0])
    }
}
export default getZEfectivoEnBody