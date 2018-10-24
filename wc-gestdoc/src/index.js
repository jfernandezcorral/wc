import 'ui-date-wc'
import Modal, {popup, popupi} from './components/Modal';
import GestDoc from './components/GestDoc';
import GestDocTree from './components/GestDocTree';
import {setAppNEO, http} from './components/servicios';
import Subprocess from './components/Subprocess'
import Aside, {aside} from './components/Aside';
import Progress, {progress} from './components/Progress';
import {mostrarError} from './components/utilGestDoc'
window.customElements.define('priv-modal', Modal);
window.customElements.define('bk-wc-gest-doc', GestDoc);
window.customElements.define('bk-wc-aside', Aside);
window.customElements.define('bk-wc-progress', Progress);
window.customElements.define('bk-wc-gest-doc-tree', GestDocTree);

export {popup, popupi, setAppNEO, http, Subprocess, aside, progress, mostrarError};