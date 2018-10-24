(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("swl"));
	else if(typeof define === 'function' && define.amd)
		define("wcPredictivo", ["swl"], factory);
	else if(typeof exports === 'object')
		exports["wcPredictivo"] = factory(require("swl"));
	else
		root["wcPredictivo"] = factory(root["SWL"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_swl__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/css-loader/lib/url/escape.js":
/*!***************************************************!*\
  !*** ./node_modules/css-loader/lib/url/escape.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "./src/components/BuscEmp.html":
/*!*************************************!*\
  !*** ./src/components/BuscEmp.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='client'>\r\n   <input type='text' placeholder=\"Nombre, DNI, dirección, tlf., oficina, cartera, ...\" spellcheck=\"false\"/>\r\n   <div class='manejador'></div>\r\n   <div class='progress'></div>\r\n   <div class='manejadorInterno'></div>\r\n</div>";

/***/ }),

/***/ "./src/components/BuscEmp.js":
/*!***********************************!*\
  !*** ./src/components/BuscEmp.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BuscEmp; });
/* harmony import */ var _BuscEmp_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BuscEmp.html */ "./src/components/BuscEmp.html");
/* harmony import */ var _BuscEmp_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_BuscEmp_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BuscEmp_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BuscEmp.scss */ "./src/components/BuscEmp.scss");
/* harmony import */ var _BuscEmp_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_BuscEmp_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stacking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stacking */ "./src/components/stacking.js");
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");
/* harmony import */ var _Visor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Visor */ "./src/components/Visor.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const ESPERA_TECLADO = 400;

function scrollsEntre(p, h) {
  let ret = {
    t: 0,
    l: 0
  };

  if (!p) {
    return ret;
  }

  let tmp = h;

  while (tmp && tmp != p) {
    tmp = tmp.parentNode || tmp.host;
    tmp.scrollTop && (ret.t += tmp.scrollTop);
    tmp.scrollLeft && (ret.l += tmp.scrollLeft);
  }

  return ret;
}

function getTop(nodo, padre = document.documentElement) {
  //!!padre debe ser posicionado!!!
  let tmpnodo = nodo;
  let ret = tmpnodo.offsetTop - scrollsEntre(tmpnodo.offsetParent, tmpnodo).t;

  while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre) {
    tmpnodo = tmpnodo.offsetParent;
    ret += tmpnodo.offsetTop - scrollsEntre(tmpnodo.offsetParent, tmpnodo).t;
  }

  return ret;
}

function getLeft(nodo, padre = document.documentElement) {
  //!!padre debe ser posicionado!!!
  let tmpnodo = nodo;
  let ret = tmpnodo.offsetLeft - scrollsEntre(tmpnodo.offsetParent, tmpnodo).l;

  while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre) {
    tmpnodo = tmpnodo.offsetParent;
    ret += tmpnodo.offsetLeft - scrollsEntre(tmpnodo.offsetParent, tmpnodo).l;
  }

  return ret;
}

function getBoundingDocumentRect(n) {
  return {
    left: getLeft(n),
    top: getTop(n),
    width: n.offsetWidth,
    height: n.offsetHeight
  };
}

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

function colocar(el, gbr) {
  const cli = el.shadowRoot.querySelector('.cli');
  const wt = document.documentElement.clientWidth;
  const ht = document.documentElement.clientHeight;
  let derecha = false;
  let abajo = true;

  if (gbr.left < wt / 2) {
    derecha = true;
  }

  if (gbr.top > ht / 2) {
    abajo = false;
  }

  if (derecha) {
    el.style.left = String(gbr.left) + 'px';
    el.style.maxWidth = String(wt - gbr.left - 10) + 'px';
  } else {
    el.style.right = String(wt - gbr.left - gbr.width) + 'px';
    el.style.maxWidth = String(gbr.left + gbr.width - 10) + 'px';
  }

  if (abajo) {
    el.style.top = String(gbr.top + gbr.height + 1) + 'px';
    el.style.maxHeight = String(ht - gbr.top - gbr.height - 10) + 'px';
    el.style.boxShadow = '3px 4px 2px #aaa';
  } else {
    el.style.bottom = String(ht - gbr.top + 1) + 'px';
    el.style.maxHeight = String(gbr.top - 10) + 'px';
    el.style.boxShadow = '2px -4px 2px #aaa';
  }
}

function isOculto(r) {
  const isBloqueado = r.bloqueado === "80";
  let isConfidencial = false;

  if (r.confidencialidad) {
    const n = parseInt(r.confidencialidad, 10);

    if (!isNaN(n) && n > 100) {
      isConfidencial = true;
    }
  }

  return isBloqueado || isConfidencial;
}

class BuscEmp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _BuscEmp_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _BuscEmp_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._input = shadowRoot.querySelector('#client input');
    this._client = shadowRoot.querySelector('#client');
    this._manejadorInterno = shadowRoot.querySelector('.manejadorInterno');
    this._manejador = shadowRoot.querySelector('.manejador');
    this._handleManejadorInterno = this._handleManejadorInterno.bind(this);
    this._handle = this._handle.bind(this);
    this._buscar = this._buscar.bind(this);
    this._value = '';
    this._capa = undefined;
    this._settimeout = undefined;
    this._registros = [];
    this._click = this._click.bind(this);
    this._instanciaPredictivo = undefined;
    this._raw = undefined;
    this._bloqueados = 0;
  }

  _buscar() {
    this._ocultarCapa();

    this._value = this._input.value = "";
    Object(_servicios__WEBPACK_IMPORTED_MODULE_3__["busquedaCliente"])().then(r => {
      if (!r.numCli) {
        return;
      }

      this.dispatchItem(r);
    }).catch(e => {
      console.log(e);
    });
  }

  get user() {
    return this.getAttribute('user');
  }

  set user(user) {
    this.setAttribute('user', user);
  }

  get oficina() {
    return this.getAttribute('oficina');
  }

  set oficina(oficina) {
    this.setAttribute('oficina', oficina);
  }

  get entidad() {
    return this.getAttribute('entidad');
  }

  set entidad(entidad) {
    this.setAttribute('entidad', entidad);
  }

  _fill(txt) {
    this._value.split(' ').forEach(t => {
      txt = txt.replace(new RegExp("(" + t + ")", 'ig'), `<b>$1</b>`);
    });

    return txt;
  }

  _paint(model, total) {
    const cli = this._capa.shadowRoot.querySelector('.cli');

    const search = this._capa.shadowRoot.querySelector('.pie b');

    const num = this._capa.shadowRoot.querySelector('.pie i');

    search.innerText = this._value;
    num.innerText = String(total);

    const bl = this._capa.shadowRoot.querySelector('.pie .bloqueados');

    if (this._bloqueados > 0) {
      bl.classList.add('visible');
      bl.querySelector('b').innerText = String(this._bloqueados);
    } else {
      bl.classList.remove('visible');
    }

    this._capa.shadowRoot.host.style.display = 'flex';
    cli.innerHTML = '';

    if (model.length == 0) {
      cli.innerText = "Ninguna coincidencia";
      this._capa.shadowRoot.querySelector('.pie').style.visibility = 'hidden';
      return;
    }

    this._capa.shadowRoot.querySelector('.pie').style.visibility = 'visible';
    model.filter(r => !r.oculto).forEach(r => {
      const fila = document.createElement('div');
      fila.classList.add('fila');
      fila.setAttribute('data-id', r.id);
      fila.innerHTML = __webpack_require__(/*! ./fragments/registro.html */ "./src/components/fragments/registro.html");
      fila.querySelector('.documento').innerHTML = this._fill(r.documento);
      fila.querySelector('.nombre').innerHTML = this._fill(r.nombre);
      fila.querySelector('.localidad').innerHTML = this._fill(r.localidad);
      fila.querySelector('.domicilio').innerHTML = this._fill(r.domicilio);
      cli.appendChild(fila);
    });
  }

  _search(t) {
    if (!this._capa) {
      return;
    }

    this._capa.shadowRoot.querySelector('.cli').style.opacity = 0.5;

    this._client.classList.add('progreso');

    this._instanciaPredictivo.getData(t).then(data => {
      this._client.classList.remove('progreso');

      if (!this._capa) {
        return;
      }

      this._raw = data;
      this._registros = [];
      this._bloqueados = 0;
      const total = (data.results.cartera ? data.results.cartera.numFound : 0) + (data.results.oficina ? data.results.oficina.numFound : 0) + (data.results.otros ? data.results.otros.numFound : 0);
      data.results.cartera && data.results.cartera.docs.forEach(r => {
        const oculto = isOculto(r);

        if (oculto) {
          this._bloqueados += 1;
        }

        this._registros.push(_objectSpread({}, r, {
          oculto
        }));
      });
      data.results.oficina && data.results.oficina.docs.forEach(r => {
        const oculto = isOculto(r);

        if (oculto) {
          this._bloqueados += 1;
        }

        this._registros.push(_objectSpread({}, r, {
          oculto
        }));
      });
      data.results.otros && data.results.otros.docs.forEach(r => {
        const oculto = isOculto(r);

        if (oculto) {
          this._bloqueados += 1;
        }

        this._registros.push(_objectSpread({}, r, {
          oculto
        }));
      });
      console.log(this._bloqueados);

      const model = this._registros.map(it => {
        return {
          documento: it.documento || "-",
          nombre: (it.nombre ? it.nombre : "") + (it.apellidos ? " " + it.apellidos : ""),
          localidad: it.localidad ? it.localidad : '-',
          domicilio: it.domicilio ? it.domicilio : '-',
          id: it.id,
          oculto: it.oculto
        };
      });

      this._paint(model, total);

      this._capa.shadowRoot.querySelector('.cli').style.opacity = 1;
    }).catch(e => {
      this._client.classList.remove('progreso');

      console.log(e);
      this._capa.shadowRoot.querySelector('.cli').style.opacity = 1;
    });
  }

  _handleManejadorInterno() {
    if (is(this._manejadorInterno, '.activo')) {
      this._ocultarCapa();

      this._value = this._input.value = "";
    }
  }

  _handle(e) {
    //console.log(e)
    if (e.key === 'Escape') {
      this._ocultarCapa();

      return;
    }

    if (e.key === 'Enter' && this._registros.length > 0) {
      this._verTodo();

      return;
    }

    if (this._input.value.trim().length >= 3 && this._input.value.trim() !== this._value) {
      this._manejadorInterno.classList.add('activo');

      this._mostrarIfNotCapa(e);

      this._settimeout && clearTimeout(this._settimeout);
      this._settimeout = setTimeout(() => {
        this._search(this._input.value.trim());
      }, ESPERA_TECLADO);
    } else if (this._input.value.trim().length < 3) {
      //this._manejadorInterno.classList.remove('activo')
      this._ocultarCapa();
    }

    this._value = this._input.value.trim();
  }

  _mostrarIfNotCapa(e) {
    if (this._capa) {
      return;
    }

    const target = e.composedPath()[0];
    this._capa = document.createElement('aside');
    const z = Object(_stacking__WEBPACK_IMPORTED_MODULE_2__["getZMin"])();
    this._capa.style.zIndex = z ? String(z) : 'auto'; //this._capa.style.zIndex = getZEfectivoEnBody(target)

    const gbr = getBoundingDocumentRect(target);

    const shadowRoot = this._capa.attachShadow({
      mode: 'open'
    });

    shadowRoot.innerHTML = '<style>' + __webpack_require__(/*! ./fragments/predictivo.scss */ "./src/components/fragments/predictivo.scss") + '</style>' + __webpack_require__(/*! ./fragments/predictivo.html */ "./src/components/fragments/predictivo.html");
    colocar(this._capa, gbr);
    this._capa.shadowRoot.host.style.font = window.getComputedStyle(this.shadowRoot.host).font;

    this._capa.shadowRoot.host.addEventListener('click', this._click);

    this._capa.shadowRoot.host.style.display = 'none';
    document.body.appendChild(this._capa);
  }

  _ocultarCapa() {
    this._manejadorInterno.classList.remove('activo');

    this._capa && this._capa.shadowRoot.host.removeEventListener('click', this._click);
    this._capa && document.body.removeChild(this._capa);
    this._capa = undefined;
  }

  _click(e) {
    const target = e.composedPath()[0];

    if (is(target, '.aspa')) {
      this._ocultarCapa();

      this._value = this._input.value = "";
      return;
    } else if (is(target, '.verTodo') || is(target, '.pie') || is(target.parentNode, '.verTodo')) {
      this._verTodo();

      return;
    }

    if (!is(target, '.celda') && !is(target.parentNode, '.celda')) {
      return;
    }

    const id = target.closest('.fila').getAttribute('data-id');

    const doc = this._registros.find(r => r.id === id);

    this._ocultarCapa();

    this.dispatchItem(doc);
  }

  dispatchItem(r) {
    const norm = Object(_servicios__WEBPACK_IMPORTED_MODULE_3__["normalizarInfo"])(r);
    this._value = this._input.value = norm.base.nombre;
    this.value = norm.base.id;
    this.dispatchEvent(new CustomEvent("bk-seleccion", {
      detail: norm,
      bubbles: true
    }));
  }

  connectedCallback() {
    this._manejadorInterno.addEventListener('click', this._handleManejadorInterno);

    this._manejador.addEventListener('click', this._buscar);

    this._input.addEventListener('keyup', this._handle);

    this._upgradeProperty('user');

    this._upgradeProperty('oficina');

    this._upgradeProperty('entidad');

    this._instanciaPredictivo = Object(_servicios__WEBPACK_IMPORTED_MODULE_3__["default"])(this.getAttribute('user'), this.getAttribute('oficina'), this.getAttribute('entidad'));
  }

  disconnectedCallback() {
    this._client.removeEventListener('keyup', this._handle);

    this._manejadorInterno.removeEventListener('click', this._handleManejadorInterno);

    this._manejador.removeEventListener('click', this._buscar);
  }

  _upgradeProperty(prop) {
    if (this.hasOwnProperty(prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }

  _verTodo() {
    if (this._value.trim().length < 3 || !this._raw) {
      return;
    }

    const visor = new _Visor__WEBPACK_IMPORTED_MODULE_4__["default"](this);

    this._ocultarCapa();

    this._value = this._input.value = "";
    visor.go();
  }

}

/***/ }),

/***/ "./src/components/BuscEmp.scss":
/*!*************************************!*\
  !*** ./src/components/BuscEmp.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit;\n  line-height: 1.2;\n  display: inline-block;\n  width: 30em;\n  --borde-st-color: #c0c0c0; }\n\n* {\n  box-sizing: border-box; }\n\n#client {\n  display: flex;\n  position: relative; }\n  #client.progreso .progress {\n    display: block; }\n  #client input {\n    font: inherit;\n    color: inherit;\n    flex-grow: 1;\n    border: 1px solid var(--borde-st-color);\n    border-radius: .3em;\n    outline: none;\n    padding: .2em; }\n    #client input::-webkit-input-placeholder {\n      font-style: italic;\n      color: silver; }\n  #client .manejador {\n    flex-shrink: 0;\n    margin-left: .2em;\n    margin-top: .1em;\n    /*border: 1px solid var(--borde-st-color);\r\n        border-radius: 2px;\r\n        box-shadow: 1px 2px 2px #aaa;*/\n    border-radius: 2px;\n    width: 1.6em;\n    height: 1.6em;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/busqueda-avanzada.svg */ "./src/components/img/busqueda-avanzada.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 80%;\n    cursor: pointer;\n    transition: background-color .2s ease-in-out; }\n    #client .manejador:hover {\n      background-color: #bbbbbb; }\n  #client .progress {\n    display: none;\n    position: absolute;\n    top: .5em;\n    right: 3.6em;\n    padding: .4em;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/busy.svg */ "./src/components/img/busy.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center; }\n  #client .manejadorInterno {\n    position: absolute;\n    top: .4em;\n    right: 2.3em;\n    width: 1em;\n    height: 1em;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/buscar.svg */ "./src/components/img/buscar.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center; }\n    #client .manejadorInterno.activo {\n      top: .5em;\n      width: .75em;\n      height: .80em;\n      background-size: 90%;\n      background-image: url(" + escape(__webpack_require__(/*! ./img/cross.svg */ "./src/components/img/cross.svg")) + ");\n      background-color: #77736e;\n      border-radius: .8em;\n      cursor: pointer;\n      transition: background-color .2s ease-in-out; }\n      #client .manejadorInterno.activo:hover {\n        background-color: #478E9B; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Visor.html":
/*!***********************************!*\
  !*** ./src/components/Visor.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='client'>\r\n    <div class='cuerpo'>\r\n        <div class='filtros'>\r\n            <div class='head'>FILTROS SOBRE RESULTADOS</div>\r\n            <div class='ancla'><div class='reset'>Eliminar filtros</div></div>\r\n            <div class='filter'></div>\r\n        </div>\r\n        <div class='resultados'>\r\n            <div class='progress'></div>\r\n            <div class='titulo'>Se han encontrado <b class='num'></b> resultados para \"<b class='patron'></b>\"</div>\r\n            <div class='wall'>\r\n                <div class='wallCartera'>\r\n                    <div class='cap'>Mi cartera<div class='num'></div></div>\r\n                    <div class='children'></div>\r\n                </div>\r\n                <div class='wallOficina'>\r\n                    <div class='cap'>Mi oficina<div class='num'></div></div>\r\n                    <div class='children'></div>\r\n                </div>\r\n                <div class='wallOtros'>\r\n                    <div class='cap'>Otras oficinas<div class='num'></div></div>\r\n                    <div class='children'></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class='pie'><button class='boton'>Abandonar</button></div>\r\n</div>";

/***/ }),

/***/ "./src/components/Visor.js":
/*!*********************************!*\
  !*** ./src/components/Visor.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Visor; });
/* harmony import */ var _Visor_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Visor.html */ "./src/components/Visor.html");
/* harmony import */ var _Visor_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Visor_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Visor_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Visor.scss */ "./src/components/Visor.scss");
/* harmony import */ var _Visor_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Visor_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stacking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stacking */ "./src/components/stacking.js");
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");





function getAnos(fecha) {
  const ano = parseInt(fecha.split('-')[0]);
  const thisAno = new Date().getFullYear();
  const ret = thisAno - ano;

  if (isNaN(ret)) {
    return '-';
  }

  return String(ret) + " años";
}

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

function getCheckboxes(registros) {
  const ret = {
    cartera: {},
    oficina: {},
    tipoPersona: {}
  };
  registros.forEach(reg => {
    if (reg.tipocartera_desc && !ret.cartera[reg.tipocartera_desc]) {
      ret.cartera[reg.tipocartera_desc] = 1;
    } else if (reg.tipocartera_desc) {
      ret.cartera[reg.tipocartera_desc] += 1;
    }

    if (reg.tipopersona_desc && !ret.tipoPersona[reg.tipopersona_desc]) {
      ret.tipoPersona[reg.tipopersona_desc] = 1;
    } else if (reg.tipopersona_desc) {
      ret.tipoPersona[reg.tipopersona_desc] += 1;
    }

    reg.oficina.forEach(o => {
      if (!ret.oficina[o]) {
        ret.oficina[o] = 1;
      } else {
        ret.oficina[o] += 1;
      }
    });
  });
  return ret;
}

class Visor {
  constructor(ref) {
    //super()
    this._search = ref._raw.parameters.qtext[0];
    this._ref = ref;
    this._capa = undefined;
    this._client = undefined;
    this._wall = undefined;
    this._progress = undefined;
    this._filtros = undefined;
    this._close = this._close.bind(this);
    this._scroll = this._scroll.bind(this);
    this._click = this._click.bind(this);
    this._clickFiltros = this._clickFiltros.bind(this);
    this._instancePaged = Object(_servicios__WEBPACK_IMPORTED_MODULE_3__["getInstancePaged"])(this._ref.user, this._ref.oficina, this._ref.entidad, this._search);
    this._cuentas = {
      total: 0
    };
    Object.keys(this._ref._raw.results).forEach(k => {
      this._cuentas[k] = this._ref._raw.results[k].numFound;
      this._cuentas.total += this._cuentas[k];
    });
    this._registros = [];
    this._visibles = {};
    this._statecol = undefined;
  }

  _close() {
    this._client.querySelector('.pie .boton').removeEventListener('click', this._close);

    this._wall.removeEventListener('scroll', this._scroll);

    this._wall.removeEventListener('click', this._click);

    this._filtros.removeEventListener('click', this._clickFiltros);

    document.body.removeChild(this._capa);
  }

  _click(e) {
    const target = e.composedPath()[0];

    if (!is(target, '.celda') && !is(target.parentNode, '.celda')) {
      return;
    }

    const id = target.closest('.row').getAttribute('data-id');

    const doc = this._registros.find(r => r.id === id);

    this._ref.dispatchItem(doc);

    this._close();
  }

  go() {
    this._capa = document.createElement('aside');
    const z = Object(_stacking__WEBPACK_IMPORTED_MODULE_2__["getZMin"])();
    this._capa.style.zIndex = z ? String(z) : 'auto';

    const shadowRoot = this._capa.attachShadow({
      mode: 'open'
    });

    shadowRoot.innerHTML = '<style>' + _Visor_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Visor_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    shadowRoot.host.style.font = window.getComputedStyle(this._ref.shadowRoot.host).font;
    document.body.appendChild(this._capa);
    this._client = shadowRoot.querySelector('.client');
    this._progress = shadowRoot.querySelector('.progress');
    this._client.querySelector('.num').innerText = String(this._cuentas.total);
    this._client.querySelector('.patron').innerText = this._search;
    this._client.querySelector('.wallCartera .num').innerText = String(this._cuentas.cartera);
    this._client.querySelector('.wallOficina .num').innerText = String(this._cuentas.oficina);
    this._client.querySelector('.wallOtros .num').innerText = String(this._cuentas.otros);

    this._client.querySelector('.pie .boton').addEventListener('click', this._close);

    this._wall = this._client.querySelector('.wall');

    this._wall.addEventListener('scroll', this._scroll);

    this._wall.addEventListener('click', this._click);

    this._progress.classList.add('visible');

    this._filtros = this._client.querySelector('.filtros');

    this._filtros.addEventListener('click', this._clickFiltros);

    this._instancePaged.inicia().then(data => {
      this._progress.classList.remove('visible');

      Object.keys(data).forEach(k => {
        data[k].docs.forEach(r => {
          this._registros.push(r);

          this._paint(r, k);
        });
      });

      this._paintFiltros();
    }).catch(e => {
      this._progress.classList.remove('visible');

      console.log(e);
    });
  }

  _fill(txt) {
    this._search.split(' ').forEach(t => {
      txt = txt.replace(new RegExp("(" + t + ")", 'ig'), `<b>$1</b>`);
    });

    return txt;
  }

  _paint(it, seccion) {
    const model = {
      documento: it.documento || "-",
      nombre: (it.nombre ? it.nombre : "") + (it.apellidos ? " " + it.apellidos : ""),
      localidad: it.localidad ? it.localidad : '-',
      domicilio: it.domicilio ? it.domicilio : '-',
      codPostal: it.cpostal || '-',
      telefono: it.telefono || '-',
      edad: it.fechanac ? getAnos(it.fechanac) : '-',
      id: it.id
    };
    let selector = ".wallCartera";

    if (seccion == 'oficina') {
      selector = ".wallOficina";
    } else if (seccion == 'otros') {
      selector = ".wallOtros";
    }

    if (!this._visibles[selector]) {
      this._visibles[selector] = true;
      this._client.querySelector(selector).style.display = 'block';
    }

    const row = document.createElement('div');
    row.classList.add('row');
    row.innerHTML = __webpack_require__(/*! ./fragments/registroL.html */ "./src/components/fragments/registroL.html");
    row.querySelector('.nombre').innerHTML = this._fill(model.nombre);
    row.querySelector('.documento').innerHTML = this._fill(model.documento);
    row.querySelector('.edad').innerHTML = this._fill(model.edad);
    row.querySelector('.telefono').innerHTML = this._fill(model.telefono);
    row.querySelector('.domicilio').innerHTML = this._fill(model.domicilio);
    row.querySelector('.localidad').innerHTML = this._fill(model.localidad);
    row.querySelector('.codPostal').innerHTML = this._fill(model.codPostal);
    row.setAttribute('data-id', model.id);

    this._client.querySelector(selector + " .children").appendChild(row);
  }

  _isFiltersActive() {
    return this._filtros.querySelectorAll('input[type=checkbox].fx:checked').length > 0;
  }

  _scroll() {
    if (!this._isFiltersActive() && this._registros.length < this._cuentas.total && this._wall.scrollTop + this._wall.clientHeight >= this._wall.scrollHeight) {
      this._progress.classList.add('visible');

      this._instancePaged.siguiente().then(data => {
        this._progress.classList.remove('visible');

        Object.keys(data).forEach(k => {
          data[k].docs.forEach(r => {
            this._registros.push(r);

            this._paint(r, k);
          });
        });

        this._paintFiltros(); //this._doFilter()

      }).catch(e => {
        this._progress.classList.remove('visible');

        console.log(e);
      });
    }
  }

  _doFilter() {
    this._wall.scrollTop = 0;
    const filtros = [];

    this._filtros.querySelectorAll('input[type=checkbox].fx:checked').forEach(input => {
      const contenedor = input.closest("[data-seccion]");
      const seccion = contenedor.getAttribute('data-seccion');
      const valor = contenedor.getAttribute('data-input');
      filtros.push({
        key: seccion,
        value: valor
      });
    });

    if (filtros.length == 0) {
      this._wall.querySelectorAll('.row[data-id]').forEach(row => row.removeAttribute('style'));
    } else {
      const a_visualizar = this._registros.filter(it => {
        let retoficina = !filtros.some(f => f.key === 'oficina');
        let retcartera = !filtros.some(f => f.key === 'cartera');
        let rettipoPersona = !filtros.some(f => f.key === 'tipoPersona');
        filtros.forEach(filtro => {
          if (filtro.key === 'oficina' && it.oficina.indexOf(filtro.value) >= 0) {
            retoficina = true;
          } else if (filtro.key === 'cartera' && it.tipocartera_desc === filtro.value) {
            retcartera = true;
          } else if (filtro.key === 'tipoPersona' && it.tipopersona_desc === filtro.value) {
            rettipoPersona = true;
          }
        });
        return retoficina && retcartera && rettipoPersona;
      }).map(it => it.id);

      this._wall.querySelectorAll('.row[data-id]').forEach(row => {
        if (a_visualizar.includes(row.getAttribute('data-id'))) {
          row.removeAttribute('style');
        } else {
          row.style.display = 'none';
        }
      });
    }
  }

  _clickFiltros(e) {
    const target = e.composedPath()[0]; //console.log(e)

    if (is(target, '.text')) {
      target.closest('.colapsable').classList.toggle('colapsado');
      return;
    }

    if (is(target, '.reset')) {
      this._filtros.querySelectorAll('input[type=checkbox].fx').forEach(input => {
        input.checked = false;
      });

      this._doFilter();

      return;
    }

    if (is(target, 'input[type=checkbox].fx')) {
      this._doFilter();

      return;
    }
  }

  _backupState() {
    if (this._filtros.querySelector('#cartera')) {
      this._statecol = {};
      ['cartera', 'oficina', 'tipoPersona'].forEach(it => {
        if (is(this._filtros.querySelector('#' + it), '.colapsado')) {
          this._statecol[it] = true;
        } else {
          this._statecol[it] = false;
        }
      });
    }
  }

  _paintFiltros() {
    //if (this._registros.length === this._cuentas.total){
    this._backupState();

    const parent = this._filtros.querySelector('.filter');

    parent.innerHTML = "";
    const div = document.createElement('div');
    div.innerHTML = __webpack_require__(/*! ./fragments/filter.html */ "./src/components/fragments/filter.html");
    parent.appendChild(div);
    const checks = getCheckboxes(this._registros);

    const templateInput = __webpack_require__(/*! ./fragments/input.html */ "./src/components/fragments/input.html");

    if (this._statecol) {
      Object.keys(this._statecol).forEach(k => {
        this._statecol[k] && this._filtros.querySelector('#' + k).classList.add('colapsado');
        !this._statecol[k] && this._filtros.querySelector('#' + k).classList.remove('colapsado');
      });
    }

    Object.keys(checks).forEach(seccion => {
      const order = [...Object.keys(checks[seccion])].sort();
      order.forEach(input => {
        const el = document.createElement('div');
        el.innerHTML = templateInput;
        el.querySelector('span').innerText = input + " (" + String(checks[seccion][input]) + ")";
        el.setAttribute('data-seccion', seccion);
        el.setAttribute('data-input', input);
        parent.querySelector('#' + seccion + " .children").appendChild(el);
      });
    });
    /*}
    else{
        this._filtros.querySelector('.filter').innerText =
        "No se puede filtrar debido a que la consulta a retornado demasiados resultados"
    }*/
  }

}

/***/ }),

/***/ "./src/components/Visor.scss":
/*!***********************************!*\
  !*** ./src/components/Visor.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\n:host {\n  all: initial;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit;\n  line-height: 1.2;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  background-color: rgba(0, 0, 0, 0.3);\n  justify-content: center;\n  align-items: center;\n  animation: tr .3s ease-in-out;\n  transition: opacity .3s ease-in-out;\n  --back: #f1f1f1;\n  --front: #f6f6f6;\n  --border: 1px solid #dbdbdb; }\n\n* {\n  box-sizing: border-box; }\n\n.client {\n  padding: .7em;\n  background-color: var(--back);\n  border: var(--border);\n  border-radius: .3em;\n  width: 85vw;\n  height: 90vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 4px 4px 3px 3px #888; }\n  .client .cuerpo {\n    flex-grow: 1;\n    display: flex; }\n  .client .pie {\n    flex-shrink: 0;\n    padding: .7em;\n    margin-top: 1em;\n    border-top: var(--border);\n    text-align: right; }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n.filtros {\n  width: 20%;\n  flex-shrink: 0;\n  border: var(--border);\n  background-color: var(--front);\n  border-radius: 3px;\n  /*padding: .7em;*/ }\n\n.resultados {\n  flex-grow: 1;\n  margin-left: .7em;\n  display: flex;\n  flex-direction: column;\n  position: relative; }\n  .resultados > .progress {\n    display: none;\n    position: absolute;\n    bottom: 1em;\n    right: 2em;\n    padding: .6em;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/busy.svg */ "./src/components/img/busy.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center; }\n    .resultados > .progress.visible {\n      display: block; }\n\n.titulo {\n  padding: .5em;\n  flex-shrink: 0; }\n\n.wall {\n  flex-grow: 1;\n  border: var(--border);\n  background-color: #fff;\n  border-radius: 3px;\n  overflow: auto; }\n  .wall::-webkit-scrollbar {\n    width: 9px; }\n  .wall::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px; }\n  .wall::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); }\n  .wall > div:not(.progress) {\n    padding: .7em; }\n\n.boton {\n  font: inherit;\n  color: inherit;\n  outline: none;\n  padding: .2em .7em .2em 1.3em;\n  border-radius: 0.1em;\n  background-image: linear-gradient(#f9f9f9, #f1f1f1);\n  border: 1px solid #bdbdbd;\n  box-shadow: #787a74 0px 2px 1px -1px, white 0px 1px 0px 0px inset;\n  cursor: pointer;\n  transition: opacity 0.3s ease;\n  position: relative;\n  border-bottom: 2px solid #970302; }\n  .boton:hover {\n    opacity: .7;\n    background-image: linear-gradient(#a9a9a9, #e9e9e9); }\n  .boton::before {\n    content: '';\n    position: absolute;\n    top: 0.4em;\n    left: 0.2em;\n    padding: .9em 0 0 .9em;\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/error.svg */ "./src/components/img/error.svg")) + "); }\n\n.cap {\n  font-size: 1.2em;\n  border-bottom: var(--border);\n  padding: .7em; }\n  .cap .num {\n    display: inline-block;\n    font-size: .8em;\n    padding: .2em .5em;\n    border-radius: 2px;\n    margin-left: 1em; }\n\n.wallCartera {\n  display: none; }\n  .wallCartera .cap {\n    color: #e48a04; }\n    .wallCartera .cap .num {\n      background-color: #e0d0bb; }\n  .wallCartera .children {\n    display: table;\n    width: 100%;\n    border-left: 5px solid #e48a04; }\n\n.wallOficina {\n  display: none; }\n  .wallOficina .cap {\n    color: #94a103; }\n    .wallOficina .cap .num {\n      background-color: #d2d4a4; }\n  .wallOficina .children {\n    display: table;\n    width: 100%;\n    border-left: 5px solid #94a103; }\n\n.wallOtros {\n  display: none; }\n  .wallOtros .cap {\n    color: #867e76; }\n    .wallOtros .cap .num {\n      background-color: #dacdc1; }\n  .wallOtros .children {\n    display: table;\n    width: 100%;\n    border-left: 5px solid #867e76; }\n\n.row {\n  display: table-row;\n  cursor: pointer;\n  transition: background-color .2s ease-in-out; }\n  .row:hover {\n    background-color: #dbdbdb; }\n\n.celda {\n  display: table-cell;\n  border-bottom: var(--border);\n  padding: .5em; }\n\nb {\n  color: black; }\n\n.filtros {\n  text-align: center;\n  display: flex;\n  flex-direction: column; }\n  .filtros .head {\n    flex-shrink: 0;\n    align-self: center;\n    font-size: 1.1em;\n    display: inline-block;\n    padding-left: 1.5em;\n    margin: .7em 0;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/filter.svg */ "./src/components/img/filter.svg")) + ");\n    background-repeat: no-repeat;\n    background-size: 1.4em;\n    background-position: center left;\n    position: relative; }\n    .filtros .head:hover::before {\n      text-align: justify;\n      content: 'El filtrado es un AND l\\F3gico de las secciones y un OR de los elementos de cada secci\\F3n. Se deshabilita el scroll infinito cuando se est\\E1   en modo filtro.';\n      position: absolute;\n      width: 20em;\n      border: var(--border);\n      box-shadow: 2px 3px 2px 2px #888;\n      border-radius: 2px;\n      background-color: white;\n      font-size: 12px;\n      padding: .7em .9em;\n      color: #2e3d2f;\n      z-index: 1;\n      animation: tr .3s ease-in-out; }\n  .filtros .ancla {\n    flex-shrink: 0;\n    margin: .7em 0;\n    text-align: right; }\n    .filtros .ancla .reset {\n      margin-right: .7em;\n      display: inline-block;\n      text-decoration: underline;\n      color: #018ec0;\n      cursor: pointer;\n      transition: color .3s ease-in-out; }\n      .filtros .ancla .reset:hover {\n        color: #666; }\n  .filtros .filter {\n    flex-grow: 1;\n    text-align: left;\n    padding: .7em; }\n    .filtros .filter .colapsable {\n      margin-bottom: .5em; }\n      .filtros .filter .colapsable .text {\n        position: relative;\n        border-radius: 3px;\n        padding: .7em 2em;\n        background-color: #e4e4e4;\n        transition: background-color .3s ease-in-out;\n        cursor: pointer; }\n        .filtros .filter .colapsable .text::after {\n          content: '';\n          transform: rotate(0);\n          transition: transform .2s ease-in;\n          position: absolute;\n          top: 1.1em;\n          left: 0.7em;\n          width: 0;\n          height: 0;\n          border-left: .3em solid transparent;\n          border-right: .3em solid transparent;\n          border-top: .3em solid #666;\n          display: block; }\n        .filtros .filter .colapsable .text:hover {\n          background-color: #d4d4d4; }\n      .filtros .filter .colapsable .children {\n        padding-left: 2em; }\n        .filtros .filter .colapsable .children label {\n          cursor: pointer;\n          margin: .2em 0;\n          display: inline-block; }\n          .filtros .filter .colapsable .children label span {\n            margin-left: .5em; }\n      .filtros .filter .colapsable.colapsado .text::after {\n        transform: rotate(-90deg); }\n      .filtros .filter .colapsable.colapsado .children {\n        display: none; }\n\n.filter {\n  overflow: auto; }\n  .filter::-webkit-scrollbar {\n    width: 9px; }\n  .filter::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px; }\n  .filter::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/filter.html":
/*!**********************************************!*\
  !*** ./src/components/fragments/filter.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='colapsable' id='cartera'>\r\n    <div class='text'>Cartera</div>\r\n    <div class='children'></div>\r\n</div>\r\n<div class='colapsable colapsado' id='oficina'>\r\n    <div class='text'>Oficina</div>\r\n    <div class='children'></div>\r\n</div>\r\n<div class='colapsable' id='tipoPersona'>\r\n    <div class='text'>Tipo persona</div>    \r\n    <div class='children'></div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/input.html":
/*!*********************************************!*\
  !*** ./src/components/fragments/input.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<label><input class='fx' type=\"checkbox\"><span></span></label>";

/***/ }),

/***/ "./src/components/fragments/predictivo.html":
/*!**************************************************!*\
  !*** ./src/components/fragments/predictivo.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='cab'>Clientes sugeridos<div class='aspa'></div></div>\r\n<div class='root'>\r\n    <div class='cli'>...</div>\r\n</div>\r\n<div class='pie'>\r\n    <p class='verTodo'>Ver todos los resultados de \"<b></b>\" (<i></i>)</p>\r\n    <div class='bloqueados'><b>2</b> clientes ocultos</div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/predictivo.scss":
/*!**************************************************!*\
  !*** ./src/components/fragments/predictivo.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit;\n  line-height: 1.2;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #dbdbdb;\n  border-radius: .2em;\n  background-color: #ffffff; }\n\n* {\n  box-sizing: border-box; }\n\n.root {\n  overflow: auto;\n  flex-grow: 1;\n  min-width: 45vw; }\n  .root::-webkit-scrollbar {\n    width: 9px; }\n  .root::-webkit-scrollbar-track {\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px; }\n  .root::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); }\n\n.cli {\n  display: table;\n  padding: .7em;\n  transition: opacity .15s ease-in-out; }\n\n.pie {\n  flex-shrink: 0;\n  background-color: #f7f7f7;\n  padding: .7em 1.5em;\n  position: relative;\n  /*font-size: 1.1em;*/ }\n  .pie p {\n    margin: 0;\n    text-decoration: underline;\n    color: #018ec0;\n    cursor: pointer;\n    transition: color .3s ease-in-out; }\n    .pie p:hover {\n      color: #666; }\n    .pie p b {\n      color: inherit; }\n  .pie .bloqueados {\n    display: none;\n    position: absolute;\n    top: .8em;\n    right: 1.2em;\n    padding-left: .9em;\n    color: #018ec0;\n    background-image: url(" + escape(__webpack_require__(/*! ../img/forbidden.svg */ "./src/components/img/forbidden.svg")) + ");\n    background-size: .7em;\n    background-position: left center;\n    background-repeat: no-repeat; }\n    .pie .bloqueados b {\n      color: inherit; }\n    .pie .bloqueados.visible {\n      display: block; }\n\n.cab {\n  flex-shrink: 0;\n  color: silver;\n  position: relative;\n  padding: .5em .7em 0 .7em; }\n\n.fila {\n  display: table-row;\n  cursor: pointer;\n  transition: background-color .2s ease-in-out; }\n  .fila:hover {\n    background-color: #dbdbdb; }\n\n.celda {\n  display: table-cell;\n  border-bottom: 1px solid #f0f0f0;\n  padding: .4em .9em; }\n\nb {\n  color: black; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.7em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/cross2.svg */ "./src/components/img/cross2.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .7em;\n  border: 1px solid transparent; }\n  .aspa:hover {\n    background-color: #999;\n    border-color: #dbdbdb; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/registro.html":
/*!************************************************!*\
  !*** ./src/components/fragments/registro.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " <div class='celda documento'></div>\r\n <div class='celda nombre'></div>\r\n <div class='celda localidad'></div>\r\n <div class='celda domicilio'></div>\r\n";

/***/ }),

/***/ "./src/components/fragments/registroL.html":
/*!*************************************************!*\
  !*** ./src/components/fragments/registroL.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='celda nombre'></div>\r\n<div class='celda documento'></div>\r\n<div class='celda edad'></div>\r\n<div class='celda telefono'></div>\r\n<div class='celda domicilio'></div>\r\n<div class='celda localidad'></div>\r\n<div class='celda codPostal'></div>";

/***/ }),

/***/ "./src/components/img/buscar.svg":
/*!***************************************!*\
  !*** ./src/components/img/buscar.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMi45NjkiIHZpZXdCb3g9IjAgMCAxMyAxMi45NjkiPgogIDxtZXRhZGF0YT48P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiLz4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+PC9tZXRhZGF0YT4KPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzU2NDkzYzsKICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxwYXRoIGlkPSJidXNjYXJfY29waWEiIGRhdGEtbmFtZT0iYnVzY2FyIGNvcGlhIiBjbGFzcz0iY2xzLTEiIGQ9Ik0xNTE5LjQ4LDEyNS40ODdhNS4xMzUsNS4xMzUsMCwwLDAtNy45Miw2LjQ1OGwtMy4yOSwzLjI3MmExLjAyOSwxLjAyOSwwLDAsMCwxLjQ2LDEuNDUxbDMuMjgtMy4yNzJBNS4xMzUsNS4xMzUsMCwwLDAsMTUxOS40OCwxMjUuNDg3Wm0tMS4zLDUuOTYxYTMuMywzLjMsMCwxLDEsMC00LjY2NkEzLjMwNSwzLjMwNSwwLDAsMSwxNTE4LjE4LDEzMS40NDhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTUwOCAtMTI0KSIvPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/components/img/busqueda-avanzada.svg":
/*!**************************************************!*\
  !*** ./src/components/img/busqueda-avanzada.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMl8xXyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxNiAxNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTYgMTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiM0NzhFOUI7fQ0KPC9zdHlsZT4NCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xMS4yLDUuMmMtMi40LDAtNC40LDEuOS00LjQsNC40YzAsMi40LDEuOSw0LjQsNC40LDQuNHM0LjQtMS45LDQuNC00LjRTMTMuNiw1LjIsMTEuMiw1LjJ6IE0xMS43LDEwdjIuOWgtMQ0KCVYxMEg3LjhWOWgyLjlWNi4yaDF2Mi45aDIuOXYxaC0yLjlWMTB6Ii8+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNS45LDkuNWMwLTAuNSwwLjItMSwwLjMtMS41QzUuOSw3LjksNS43LDcuOCw1LjQsNy42Yy0xLjItMS4yLTEuMi0zLjMsMC00LjVzMy4zLTEuMiw0LjUsMA0KCWMwLjQsMC40LDAuNiwwLjgsMC43LDEuM2MwLjIsMCwwLjMtMC4xLDAuNS0wLjFjMC41LDAsMC45LDAuMiwxLjMsMC4zYy0wLjItMS0wLjUtMS45LTEuMy0yLjdDOS4yLDAsNiwwLDQuMSwxLjkNCglDMi41LDMuNSwyLjMsNi4xLDMuNSw4LjFsLTMuMiwzLjJjLTAuNCwwLjQtMC40LDEsMCwxLjRzMSwwLjQsMS40LDBMNSw5LjVDNS4zLDkuNyw1LjcsOS44LDYsMTBDNiw5LjgsNS45LDkuNyw1LjksOS41eiIvPg0KPC9zdmc+DQo="

/***/ }),

/***/ "./src/components/img/busy.svg":
/*!*************************************!*\
  !*** ./src/components/img/busy.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCnZpZXdCb3g9IjAgMCA0MCA0MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogIDxwYXRoIG9wYWNpdHk9IjAuMiIgZmlsbD0iIzAwMCIgZD0iTTIwLjIwMSw1LjE2OWMtOC4yNTQsMC0xNC45NDYsNi42OTItMTQuOTQ2LDE0Ljk0NmMwLDguMjU1LDYuNjkyLDE0Ljk0NiwxNC45NDYsMTQuOTQ2CiAgICBzMTQuOTQ2LTYuNjkxLDE0Ljk0Ni0xNC45NDZDMzUuMTQ2LDExLjg2MSwyOC40NTUsNS4xNjksMjAuMjAxLDUuMTY5eiBNMjAuMjAxLDMxLjc0OWMtNi40MjUsMC0xMS42MzQtNS4yMDgtMTEuNjM0LTExLjYzNAogICAgYzAtNi40MjUsNS4yMDktMTEuNjM0LDExLjYzNC0xMS42MzRjNi40MjUsMCwxMS42MzMsNS4yMDksMTEuNjMzLDExLjYzNEMzMS44MzQsMjYuNTQxLDI2LjYyNiwzMS43NDksMjAuMjAxLDMxLjc0OXoiLz4KICA8cGF0aCBmaWxsPSIjMDAwIiBkPSJNMjYuMDEzLDEwLjA0N2wxLjY1NC0yLjg2NmMtMi4xOTgtMS4yNzItNC43NDMtMi4wMTItNy40NjYtMi4wMTJoMHYzLjMxMmgwCiAgICBDMjIuMzIsOC40ODEsMjQuMzAxLDkuMDU3LDI2LjAxMywxMC4wNDd6Ij4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZVR5cGU9InhtbCIKICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIgogICAgICB0eXBlPSJyb3RhdGUiCiAgICAgIGZyb209IjAgMjAgMjAiCiAgICAgIHRvPSIzNjAgMjAgMjAiCiAgICAgIGR1cj0iMC41cyIKICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgIDwvcGF0aD4KICA8L3N2Zz4KCg=="

/***/ }),

/***/ "./src/components/img/cross.svg":
/*!**************************************!*\
  !*** ./src/components/img/cross.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGZpbGw9IndoaXRlIiBkPSJNMTguMyw1LjcxTDE4LjMsNS43MWMtMC4zOS0wLjM5LTEuMDItMC4zOS0xLjQxLDBMMTIsMTAuNTlMNy4xMSw1LjdjLTAuMzktMC4zOS0xLjAyLTAuMzktMS40MSwwbDAsMAoJCWMtMC4zOSwwLjM5LTAuMzksMS4wMiwwLDEuNDFMMTAuNTksMTJMNS43LDE2Ljg5Yy0wLjM5LDAuMzktMC4zOSwxLjAyLDAsMS40MWgwYzAuMzksMC4zOSwxLjAyLDAuMzksMS40MSwwTDEyLDEzLjQxbDQuODksNC44OQoJCWMwLjM5LDAuMzksMS4wMiwwLjM5LDEuNDEsMGwwLDBjMC4zOS0wLjM5LDAuMzktMS4wMiwwLTEuNDFMMTMuNDEsMTJsNC44OS00Ljg5QzE4LjY4LDYuNzMsMTguNjgsNi4wOSwxOC4zLDUuNzF6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/components/img/cross2.svg":
/*!***************************************!*\
  !*** ./src/components/img/cross2.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOC4zLDUuNzFMMTguMyw1LjcxYy0wLjM5LTAuMzktMS4wMi0wLjM5LTEuNDEsMEwxMiwxMC41OUw3LjExLDUuN2MtMC4zOS0wLjM5LTEuMDItMC4zOS0xLjQxLDBsMCwwCgkJYy0wLjM5LDAuMzktMC4zOSwxLjAyLDAsMS40MUwxMC41OSwxMkw1LjcsMTYuODljLTAuMzksMC4zOS0wLjM5LDEuMDIsMCwxLjQxaDBjMC4zOSwwLjM5LDEuMDIsMC4zOSwxLjQxLDBMMTIsMTMuNDFsNC44OSw0Ljg5CgkJYzAuMzksMC4zOSwxLjAyLDAuMzksMS40MSwwbDAsMGMwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwxMy40MSwxMmw0Ljg5LTQuODlDMTguNjgsNi43MywxOC42OCw2LjA5LDE4LjMsNS43MXoiLz4KPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/components/img/error.svg":
/*!**************************************!*\
  !*** ./src/components/img/error.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiM2YjE0MTQiIGQ9Ik0zNzQgMjIybDEyOCAxMjhjMTMgMTUgMTIgMjkgMCA0MGwtNzggNzljLTggOC0yNyA5LTQwIDBMMjU2IDM0MSAxMjggNDY5Yy0xMyAxNC0yOSAxMy00MCAwbC03OC03OWMtOC04LTEwLTI3IDAtNDBsMTI4LTEyOEwxMCA5NGMtMTMtMTEtOC0zMiAwLTQwbDc4LTc4YzgtOCAyNC0xMyAzOCAwbDEyOCAxMjhMMzgyLTI0YzEyLTEzIDMyLTggNDAgMGw3OSA3OGM4IDggMTMgMjQgMCA0MHoiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/filter.svg":
/*!***************************************!*\
  !*** ./src/components/img/filter.svg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik00OTQgMTlIMThsMTg3IDE4N3YxNzJsMTAyIDUxVjIwNnoiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/forbidden.svg":
/*!******************************************!*\
  !*** ./src/components/img/forbidden.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiM4ODg4ODgiIGQ9Ik00MzggNDNDMzkwLTUgMzI4LTMyIDI1OC0zMiAxMTUtMzIgMiA4MiAyIDIyNGMwIDcwIDI3IDEzNCA3NSAxODEgNDggNDggMTEwIDc1IDE4MSA3NSAxNDIgMCAyNTYtMTE0IDI1Ni0yNTYtMi03MC0yOS0xMzMtNzYtMTgxem0tMTgyLThjNDAgMCA3NSAxMSAxMDYgMzJMMTAyIDMyNmMtMTktMzItMzItNjctMzItMTA1LTMtOTkgODQtMTg2IDE4Ni0xODZ6bTAgMzc5Yy00MCAwLTc1LTExLTEwNi0zMmwyNjAtMjU5YzE5IDMyIDMyIDY3IDMyIDEwNiA0IDk3LTg0IDE4NS0xODYgMTg1eiIvPjwvc3ZnPg=="

/***/ }),

/***/ "./src/components/servicios.js":
/*!*************************************!*\
  !*** ./src/components/servicios.js ***!
  \*************************************/
/*! exports provided: default, busquedaCliente, normalizarInfo, getInstancePaged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "busquedaCliente", function() { return busquedaCliente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizarInfo", function() { return normalizarInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstancePaged", function() { return getInstancePaged; });
/* harmony import */ var swl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swl */ "swl");
/* harmony import */ var swl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(swl__WEBPACK_IMPORTED_MODULE_0__);


const getInstancePaged = (user, oficina, entidad, search) => {
  const url = `/buscemp/BuscempNeoPagedQuery?qtext=${search}&userId=${user}&oficina=${oficina}&entidad=${entidad}`;
  let start = 0;
  let list = undefined;
  let queryId = undefined;

  function process(r) {
    let num = 0;
    let lista = undefined;
    ['cartera', 'oficina', 'otros'].forEach(k => {
      if (!r[k]) {
        return;
      }

      const cuenta = r[k].docs.length;

      if (cuenta > 0) {
        num = cuenta;
        lista = k;
      }
    });
    return [num, lista];
  }
  /*function processResult(results){//temporal mientras averiguamos como se llama el parámetro de lista!!
      let ret = results
      const {cartera, oficina, otros} = results
      list === 'oficina' && (ret = {oficina, otros})
      list === 'otros' && (ret = {otros})
      return ret
  }*/


  function get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function (e) {
        if (this.status == 200) {
          resolve(JSON.parse(this.response)); //console.log(this.response)
        } else {
          reject(["Error en la petición - cod: " + String(this.status), this.statusText]);
        }
      };

      xhr.onerror = function (e) {
        reject(["Error haciendo petición", e]);
      };

      xhr.send();
    });
  }

  return {
    /*iniciar: (data)=>{
        queryId = data.query.queryId
        const [cuenta, lista] = process(data.results)
        start += cuenta
        list = lista
        return Promise.resolve(data.results)
    },*/
    inicia: () => {
      return get(url).then(data => {
        queryId = data.query.queryId;
        const [cuenta, lista] = process(data.results);
        start += cuenta;
        list = lista;
        return data.results;
      });
    },
    siguiente: () => {
      return get(url + `&queryId=${queryId}&start=${String(start)}&listapaginado=${list}`).then(data => {
        queryId = data.query.queryId;
        const ret =
        /*processResult(*/
        data.results; //)

        const [cuenta, lista] = process(data.results);

        if (list === lista) {
          start += cuenta;
        } else {
          start = cuenta;
        }

        list = lista;
        return ret;
      });
    }
  };
};

const getInstancePredictivo = (user, oficina, entidad) => {
  return {
    xhr: undefined,
    getData: function (search) {
      const url = `/buscemp/BuscempNeoQuery?qtext=${search}&userId=${user}&oficina=${oficina}&entidad=${entidad}`;
      return new Promise((resolve, reject) => {
        if (this.xhr) {
          this.xhr.abort();
        }

        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', url, true);

        this.xhr.onload = function (e) {
          if (this.status == 200) {
            resolve(JSON.parse(this.response));
          } else {
            reject(["Error en la petición - cod: " + String(this.status), this.statusText]);
          }
        };

        this.xhr.onerror = function (e) {
          reject(["Error haciendo petición", e]);
        };

        this.xhr.send();
      });
    }
  };
};

const busquedaCliente = () => {
  const ret = new Promise((resolve, reject) => {
    swl__WEBPACK_IMPORTED_MODULE_0___default.a.proceso.open("NSBN1239", {
      origen: "bean",
      tipoBean: "beanNombre",
      abrirVistaPrincipal: "S"
    }, true).then(task => {
      task.closePromise.then(function (task) {
        resolve(task.closeData);
      }, function (data) {
        reject(data);
      });
    }, data => {
      reject(data);
    });
  });
  return ret;
};

const formatFecha = f => {
  try {
    const ano = parseInt(f.substring(0, 4), 10);
    const mes = parseInt(f.substring(4, 6), 10);
    const dia = parseInt(f.substring(6, 8), 10);
    const d = new Date(ano, mes - 1, dia, 0, 0, 0);
    return d.toISOString();
  } catch (e) {
    return f;
  }
};

const normalizarInfo = data => {
  const base = {
    id: data.id ? data.id : data.idCli,
    tipopersona: data.tipopersona ? data.tipopersona : data.tipoPersona,
    documento: data.documento ? data.documento : data.numDoc,
    tipodocumento: data.tipodocumento ? data.tipodocumento : data.codTipoDoc,
    telefono: data.telefono,
    domicilio: data.domicilio,
    localidad: data.localidad ? data.localidad : data.poblacion,
    codpostal: data.cpostal ? data.cpostal : data.codPostal,
    nombre: data.titular ? data.titular : data.nombre + (data.apellidos ? " " + data.apellidos : ""),
    fechanac: data.fechanac ? data.fechanac : formatFecha(data.fechaNac)
  };
  return {
    base,
    raw: data
  };
};

/* harmony default export */ __webpack_exports__["default"] = (getInstancePredictivo);


/***/ }),

/***/ "./src/components/stacking.js":
/*!************************************!*\
  !*** ./src/components/stacking.js ***!
  \************************************/
/*! exports provided: default, getZMin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZMin", function() { return getZMin; });
function doesStyleCreateStackingCtx(el) {
  if (el.nodeType !== 1) {
    return false;
  }

  const styles = window.getComputedStyle(el);

  if (styles.opacity < 1) {
    return true;
  }

  if (styles.transform !== 'none') {
    return true;
  }

  if (styles.transformStyle === 'preserve-3d') {
    return true;
  }

  if (styles.perspective !== 'none') {
    return true;
  }

  if (styles.flowFrom !== 'none' && styles.content !== 'normal') {
    return true;
  }

  if (styles.position === 'fixed') {
    return true;
  }

  if (styles.position !== 'static' && styles.zIndex !== 'auto') {
    return true;
  }

  if (el.tagName === 'HTML') {
    return true;
  }

  return false;
}

function z(el) {
  return window.getComputedStyle(el).zIndex;
}

function intZ(el) {
  const i = parseInt(z(el));
  return isNaN(i) ? 0 : i;
}

function getStackingContext(el) {
  if (el.tagName === 'HTML') {
    return el;
  }

  let parent = el.parentNode || el.host;

  while (!doesStyleCreateStackingCtx(parent)) {
    parent = parent.parentNode || parent.host;
  }

  return parent;
}

function getZEfectivoEnBody(el) {
  const tmp = [];
  let sC = getStackingContext(el);

  while (sC.tagName !== 'HTML') {
    tmp.unshift(sC);
    sC = getStackingContext(sC);
  }

  if (tmp.length == 0) {
    return 'auto';
  } else {
    return z(tmp[0]);
  }
}

function getZMin(el = document.body) {
  let ret = 0;
  const children = [...(el.childNodes ? el.childNodes : el.shadowRoot.childNodes)];
  children.forEach(c => {
    let z;

    if (doesStyleCreateStackingCtx(c)) {
      z = intZ(c);
    } else {
      z = getZMin(c);
    }

    z > ret && (ret = z);
  });
  return ret;
}

/* harmony default export */ __webpack_exports__["default"] = (getZEfectivoEnBody);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_BuscEmp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/BuscEmp */ "./src/components/BuscEmp.js");

window.customElements.define('bk-busc-emp', _components_BuscEmp__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "swl":
/*!******************************************************************************!*\
  !*** external {"commonjs2":"swl","commonjs":"swl","amd":"swl","root":"SWL"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_swl__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map