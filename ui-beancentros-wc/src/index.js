import Tree from './components/Tree';
import Modal, {popup, popupi} from './components/Modal';
import BeanCentros from './components/BeanCentros';
window.customElements.define('bk-wc-ui-tree', Tree);
window.customElements.define('bk-wc-ui-modal', Modal);
window.customElements.define('bk-wc-ui-bean-centros', BeanCentros);
//esto resolvería el problema de los z-index pero es demasiado agresivo
/*window.addEventListener("load",handleLoad)
//
function handleLoad(){
    window.removeEventListener("load",handleLoad)
    if (document.styleSheets.length==0){return;}
    const us = document.styleSheets[document.styleSheets.length - 1]
    us.insertRule('body > *:not(script) {isolation: isolate;}', us.cssRules.length-1)
    if (document.querySelectorAll('body > *:not(script)').length > 1){
        console.warn(`El componente 'ui-beancentros-wc' inyecta una regla css para poder sacar emergentes independientemente` +
        " de la creación de stacking context que haga la aplicación. Esta operación es segura en el caso de que body tenga un solo" +
        " hijo inmediato, en caso contrario puede haber muy ligeras limitaciones en el uso de z-index, por favor cree su aplicación en un solo div partiendo de body.\n" + 
        " Si tiene dudas sobre lo anterior póngase en contacto con arquitectura o el departamento NEO")
    }
}*/
//
export {Tree, Modal, popup, popupi, BeanCentros};