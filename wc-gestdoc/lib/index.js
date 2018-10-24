(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wc-gestdoc", [], factory);
	else if(typeof exports === 'object')
		exports["wc-gestdoc"] = factory();
	else
		root["wc-gestdoc"] = factory();
})(window, function() {
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

/***/ "./node_modules/escape-string-regexp/index.js":
/*!****************************************************!*\
  !*** ./node_modules/escape-string-regexp/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),

/***/ "./node_modules/filename-reserved-regex/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/filename-reserved-regex/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-control-regex */
// TODO: remove parens when Node.js 6 is targeted. Node.js 4 barfs at it.
module.exports = () => (/[<>:"\/\\|?*\x00-\x1F]/g);
module.exports.windowsNames = () => (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i);


/***/ }),

/***/ "./node_modules/filenamify/index.js":
/*!******************************************!*\
  !*** ./node_modules/filenamify/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
const trimRepeated = __webpack_require__(/*! trim-repeated */ "./node_modules/trim-repeated/index.js");
const filenameReservedRegex = __webpack_require__(/*! filename-reserved-regex */ "./node_modules/filename-reserved-regex/index.js");
const stripOuter = __webpack_require__(/*! strip-outer */ "./node_modules/strip-outer/index.js");

// Doesn't make sense to have longer filenames
const MAX_FILENAME_LENGTH = 100;

const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g; // eslint-disable-line no-control-regex
const reRelativePath = /^\.+/;

const fn = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	options = options || {};

	const replacement = options.replacement === undefined ? '!' : options.replacement;

	if (filenameReservedRegex().test(replacement) && reControlChars.test(replacement)) {
		throw new Error('Replacement string cannot contain reserved filename characters');
	}

	string = string.replace(filenameReservedRegex(), replacement);
	string = string.replace(reControlChars, replacement);
	string = string.replace(reRelativePath, replacement);

	if (replacement.length > 0) {
		string = trimRepeated(string, replacement);
		string = string.length > 1 ? stripOuter(string, replacement) : string;
	}

	string = filenameReservedRegex.windowsNames().test(string) ? string + replacement : string;
	string = string.slice(0, MAX_FILENAME_LENGTH);

	return string;
};

fn.path = (pth, options) => {
	pth = path.resolve(pth);
	return path.join(path.dirname(pth), fn(path.basename(pth), options));
};

module.exports = fn;


/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/strip-outer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/strip-outer/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ "./node_modules/escape-string-regexp/index.js");

module.exports = function (str, sub) {
	if (typeof str !== 'string' || typeof sub !== 'string') {
		throw new TypeError();
	}

	sub = escapeStringRegexp(sub);
	return str.replace(new RegExp('^' + sub + '|' + sub + '$', 'g'), '');
};


/***/ }),

/***/ "./node_modules/trim-repeated/index.js":
/*!*********************************************!*\
  !*** ./node_modules/trim-repeated/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ "./node_modules/escape-string-regexp/index.js");

module.exports = function (str, target) {
	if (typeof str !== 'string' || typeof target !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(new RegExp('(?:' + escapeStringRegexp(target) + '){2,}', 'g'), target);
};


/***/ }),

/***/ "./node_modules/ui-commons-wc/dist/commons.js":
/*!****************************************************!*\
  !*** ./node_modules/ui-commons-wc/dist/commons.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! ui-commons-wc 1.4.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
})(window, function() {
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ComponentState, shallowObject, Config, px */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_ComponentState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/ComponentState */ "./src/scripts/ComponentState.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentState", function() { return _scripts_ComponentState__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _scripts_Config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/Config */ "./src/scripts/Config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return _scripts_Config__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _scripts_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/utils */ "./src/scripts/utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowObject", function() { return _scripts_utils__WEBPACK_IMPORTED_MODULE_2__["shallowObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "px", function() { return _scripts_utils__WEBPACK_IMPORTED_MODULE_2__["px"]; });








/***/ }),

/***/ "./src/scripts/ComponentState.js":
/*!***************************************!*\
  !*** ./src/scripts/ComponentState.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ComponentState; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/scripts/utils.js");


/**
 * Sólo válido si el state es un objeto.
 */
class ComponentState {
  constructor(component, styledComponent, equalsFn) {
    this.component = component;
    this.styledComponent = styledComponent;
    this.equalsFn = equalsFn;
    this.validity = {
      valid: true
    };
    this.value = null;
  }

  fireChangeEvent(userInput) {
    this.component.dispatchEvent(new CustomEvent('bkChange', {
      detail: {
        value: this.value,
        userInput: userInput
      },
      bubbles: true
    }));
  }

  fireInputEvent() {
    this.component.dispatchEvent(new CustomEvent('bkInput', {
      bubbles: true
    }));
  }

  fireInvalidEvent(reasons) {
    this.component.dispatchEvent(new CustomEvent('bkInvalid', {
      detail: {
        reasons: reasons
      },
      bubbles: true
    }));
  }

  valid(value, userInput) {
    let changeEvent = false;
    if(!this.equalsFn(this.value,value)) {
      //El valor ha cambiado, lanzo evento
      this.value = value;
      changeEvent = true;
    }

    if(!this.validity.valid) {
      //El valor era inválido, ahora es válido. También lanzo el evento
      this.validity = {
        valid: true
      }
      changeEvent = true;
    }

    this.syncStyles();
    if(changeEvent) {
      this.fireChangeEvent(userInput);
    }
    //Input event
    if(userInput) {
      this.fireInputEvent();
    }
  }

  invalid(reasons, invalidValue, userInput) {
    let changeEvent = false, invalidEvent = false;
    reasons.valid = false;

    if(!this.equalsFn(this.value,invalidValue)) {
      //Lanzamos evento change si el valor inválido es diferente al actual.
      changeEvent = true;
    }

    this.value = invalidValue;

    if(this.validity.valid) {
      //Si pasamos de válido a inválido, lanzamos el evento invalid.
      invalidEvent = true;
    }
    else {
      //Si permanecemos en inválido, lanzamos elevento sólo si cambian
      //las razones del error
      if(!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["shallowObject"])(this.validity,reasons)) {
        invalidEvent = true;
      }
    }
    this.validity = reasons;

    this.syncStyles();

    if(changeEvent) {
      this.fireChangeEvent(userInput);
    }
    if(invalidEvent) {
      this.fireInvalidEvent(reasons);
    }
    //Input event
    if(userInput) {
      this.fireInputEvent();
    }
  }

  getInvalidClassNames() {
    let classNames = this.styledComponent.classList;
    let result = [];
    for(let i=0;i<classNames.length;i++) {
      const className = classNames.item(i);
      if(className.startsWith('bk-invalid')) {
        result.push(className);
      }
    }
    return result;
  }

  removeInvalidClassNames() {
    for(const className of this.getInvalidClassNames()) {
      this.styledComponent.classList.remove(className);
    }
  }

  reasonFromClassName(className) {
    if(className.startsWith('bk-invalid-')) {
      return className.substring('bk-invalid-'.length);
    }
    return null;
  }

  syncStyles() {
    let classNames = this.styledComponent.classList;
    let reason;
    if(this.validity.valid) {
      this.removeInvalidClassNames();
      classNames.add('bk-valid');
    }
    else {
      const currentInvalid = this.getInvalidClassNames();
      classNames.remove('bk-valid');
      classNames.add('bk-invalid');
      for(const className of currentInvalid) {
        reason = this.reasonFromClassName(className);
        if(reason && !this.validity[reason]) {
          classNames.remove(className);
        }
      }
      for (reason in this.validity) {
        if (this.validity.hasOwnProperty(reason)) {
          if(reason!=='valid') {
            classNames.add('bk-invalid-'+reason);
          }
        }
      }
    }
  }

  getValue() {
    return this.value;
  }

  getValidity() {
    return this.validity;
  }
}


/***/ }),

/***/ "./src/scripts/Config.js":
/*!*******************************!*\
  !*** ./src/scripts/Config.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Config; });
class ConfigValue {
  constructor(value) {
    if(value === undefined) {
      let self = this;
      this.promise = new Promise(function(resolve, reject) {
        self.configAvailable = resolve;
      });
    }
    else {
      this.value = value;
    }
  }
}

class Config {
  constructor() {
    this.config = {};
  }

  getConfig(confKey) {
    let res = this.config[confKey];
    if(!res) {
      res = new ConfigValue();
      this.config[confKey] = res;
    }
    return res;
  }

  putConfig(confKey, value) {
    if(value !== undefined) {
      let conf = this.config[confKey];
      if(conf) {
        if(conf.value === undefined) {
          conf.value = value;
          conf.configAvailable(value);
        }
      }
      else {
        this.config[confKey] = new ConfigValue(value);
      }
    }
  }
}


/***/ }),

/***/ "./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/*! exports provided: shallowObject, px */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowObject", function() { return shallowObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "px", function() { return px; });
function shallowObject(a, b) {
  var ka = 0
  var kb = 0

  for (var key in a) {
    if (
      a.hasOwnProperty(key) &&
      a[key] !== b[key]
    ) return false

    ka++
  }

  for (var key in b) {
    if (b.hasOwnProperty(key)) kb++
  }

  return ka === kb
}

function px(value) {
  return value + 'px';
}




/***/ })

/******/ });
});

/***/ }),

/***/ "./node_modules/ui-date-wc/dist/date.js":
/*!**********************************************!*\
  !*** ./node_modules/ui-date-wc/dist/date.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! ui-date-wc 1.0.8 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(/*! ui-commons-wc */ "./node_modules/ui-commons-wc/dist/commons.js"));
	else { var i, a; }
})(window, function(__WEBPACK_EXTERNAL_MODULE_ui_commons_wc__) {
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

/***/ "./src/components/DateComponent.html":
/*!*******************************************!*\
  !*** ./src/components/DateComponent.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='date-content'>\r\n  <input id=\"date-calendar-input\" type=\"text\" size=\"10\"/>\r\n  <button id=\"date-calendar-button\" type=\"button\">\r\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\r\n      <path transform=\"translate(0,512) scale(1,-1)\" d=\"M102 67l69 0 0 69-69 0z m103 0l69 0 0 69-69 0z m153 307c10 0 18 7 18 18l0 102c0 10-6 18-18 18-9 0-17-6-17-18l0-102c1-11 8-18 17-18z m-238 0c10 0 18 7 18 18l0 102c0 10-7 18-18 18-10 0-18-6-18-18l0-102c0-11 8-18 18-18z m-18-204l69 0 0 68-69 0z m103 0l69 0 0 68-69 0z m240 273l-34 0 0-69c0-20-14-33-33-33l-36 0c-20 0-33 14-33 33l0 69-136 0 0-69c0-20-15-33-34-33l-37 0c-20 0-33 14-33 33l0 69-34 0c-21 0-33-14-33-33l0-376c0-21 14-34 33-34l410 0c21 0 33 14 33 34l0 376c0 16-12 33-33 33z m0-376c0-21-15-33-34-33l-341 0c-20 0-33 14-33 33l0 205c0 21 14 34 33 34l341 0c21 0 34-15 34-34z m-138 0l69 0 0 69-69 0z m0 103l69 0 0 68-69 0z\"/>\r\n    </svg>\r\n  </button>\r\n</div>\r\n";

/***/ }),

/***/ "./src/components/DateComponent.js":
/*!*****************************************!*\
  !*** ./src/components/DateComponent.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateComponent; });
/* harmony import */ var _DateComponent_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateComponent.html */ "./src/components/DateComponent.html");
/* harmony import */ var _DateComponent_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_DateComponent_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DateComponent_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateComponent.scss */ "./src/components/DateComponent.scss");
/* harmony import */ var _DateComponent_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DateComponent_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_dateutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/dateutils */ "./src/scripts/dateutils.js");
/* harmony import */ var ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui-commons-wc */ "ui-commons-wc");
/* harmony import */ var ui_commons_wc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Formateo del input de la fecha.
 */
const DIGITS = '0123456789';

function isSpecialKey(key) { return (isArrowKey(key) || (key === 9) || (key >= 16 && key <= 18) || (key >= 35 && key <= 36)); }
function isArrowKey(key) { return (key === 37 || key === 38 || key === 39 || key === 40); }
function isRemoveKey(key) { return (isDeleteKey(key) || isSuprKey(key)); }
function isDeleteKey(key) { return (key === 8); }
function isSuprKey(key) { return (key === 46); }

const mask = 'dd/mm/aaaa';

function formatInputData(input, e) {
  let currentValue = input.value;
  const selStart = input.selectionStart,
        selEnd = input.selectionEnd;
  let cursorPos;
  if(!currentValue) {
    currentValue = mask;
  }
  input.value = mask;
  if(selStart>=0
    && selStart<=selEnd
    && selEnd<=mask.length) {
      if(selStart<selEnd) {
        //Hay texto seleccionado, lo borramos
        currentValue = insertText(currentValue, selStart, mask.substring(selStart,selEnd),true);
        if(isRemoveKey(e.keyCode)) {
          cursorPos = selStart;
        }
        else {
          currentValue = insertText(currentValue,selStart,e.key);
          cursorPos = selStart + (isSep(selStart+1)?2:1);
        }
      }
      else {
        if(isDeleteKey(e.keyCode)) {
          if(selStart>0) {
            currentValue = insertText(currentValue,selStart-1,mask.charAt(selStart-1));
            cursorPos = selStart - 1;
          }
          else {
            cursorPos = 0;
          }
        }
        else if(isSuprKey(e.keyCode)) {
          if(!isSep(selStart)) {
            const sepPos = nextSep(selStart);
            const deleted = currentValue.substring(selStart+1,sepPos);
            currentValue = insertText(currentValue, selStart, mask.substring(selStart,sepPos));
            currentValue = insertText(currentValue, selStart, deleted);
          }
          cursorPos = selStart;
        }
        else {
          if(selStart<mask.length) {
            currentValue = insertText(currentValue,selStart,e.key);
            cursorPos = selStart + (isSep(selStart+1)?2:1);
          }
          else {
            cursorPos = mask.length;
          }
        }
      }
    }
  input.value = currentValue;
  input.setSelectionRange(cursorPos,cursorPos);
}

function nextSep(pos) {
  let res = mask.indexOf('/',pos);
  return res===-1?mask.length:res;
}

function isSep(pos) {
  return mask.charAt(pos)==='/';
}

function insertText(str, pos, txt, disableSep) {
  if(!disableSep&&isSep(pos)) {
    return str;
  }
  return str.substring(0,pos)
    + txt
    + str.substring(pos+txt.length);
}

function dateCompare(a,b) {
  return a===b || (a && b && a.getTime()===b.getTime());
}

function formatDate(date, month, year) {
  return String(date).padStart(2,'0')
  +'/'+
  String(month+1).padStart(2,'0')
  +'/'+
  year;
}

/**
 */
class DateComponent extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<style>'+_DateComponent_scss__WEBPACK_IMPORTED_MODULE_1___default.a+'</style>'+_DateComponent_html__WEBPACK_IMPORTED_MODULE_0___default.a;

    this.calendarButton = shadowRoot.querySelector('#date-calendar-button');
    this.calendarInput = shadowRoot.querySelector('#date-calendar-input');

    this.handleClickCalendarButton = this.handleClickCalendarButton.bind(this);
    this.handleDateSelected = this.handleDateSelected.bind(this);
    this.formatInput = this.formatInput.bind(this);
    this.blurInput = this.blurInput.bind(this);

    //Atributos
    this.$$required$$ = false;

    //Valor del componente
    this.state = new ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["ComponentState"](this, this.calendarInput, dateCompare);
    this.state.valid(null);
    //Valores por defecto.
    this.calendarInput.setAttribute('placeholder',mask);
  }

  connectedCallback() {
    this.calendarButton.addEventListener('click',this.handleClickCalendarButton);
    this.calendarInput.addEventListener('keydown',this.formatInput);
    this.calendarInput.addEventListener('blur',this.blurInput);
  }

  disconnectedCallback() {
    this.calendarButton.removeEventListener('click',this.handleClickCalendarButton);
    this.calendarInput.removeEventListener('keydown',this.formatInput);
    this.calendarInput.removeEventListener('blur',this.blurInput);
  }

  handleClickCalendarButton(e) {
    if(!this.calendarWindow) {
      const body = window.document.querySelector("body");

      this.calendarWindow = window.document.createElement('bk-wc-ui-date-calendar');
      body.appendChild(this.calendarWindow);
    }
    this.calendarWindow.addEventListener('bkSelect',this.handleDateSelected);
    this.calendarWindow.show(this.state.value?this.state.value:new Date(), this.state.value, this.calendarButton);
    this.calendarButton.classList.add('calendar-button-active');
  }

  handleDateSelected(e) {
    //Quitamos la ventana
    if(this.calendarWindow) {
      const body = window.document.querySelector("body");
      this.calendarWindow.removeEventListener('bkSelect',this.handleDateSelected);
      body.removeChild(this.calendarWindow);
      this.calendarWindow = null;
      if(e.detail) {
        this.calendarInput.value = formatDate(e.detail.date, e.detail.month, e.detail.year);
        this.viewToComponentState(true);
      }
      this.calendarButton.classList.remove('calendar-button-active');
      this.calendarButton.focus();
    }
  }

  formatInput(e) {
    if('+' === e.key) {
      const today = new Date();
      e.preventDefault();
      //Si pulsa + se pone la fecha de hoy
      this.calendarInput.value = formatDate(today.getDate(), today.getMonth(), today.getFullYear());
      this.viewToComponentState(true);
    }
    else if(DIGITS.indexOf(e.key)!==-1
      ||isDeleteKey(e.keyCode)
      ||isRemoveKey(e.keyCode)) {
      formatInputData(this.calendarInput, e);
      e.preventDefault();
      this.viewToComponentState(true);
    }
    else {
      if(!isSpecialKey(e.keyCode)) {
        e.preventDefault();
      }
    }
  }

  blurInput(e) {
    //Sólo si el valor no está confirmado
    if(this.state.validity.unCommitted) {
      this.viewToComponentState(true);
    }
    if(this.calendarInput.value===mask) {
      //No ha introducido nada. Volvemos a dejarlo con placeholder:
      this.calendarInput.value = '';
    }
  }

  viewToComponentState(userInput) {
    let checkInputDate;
    //Verificamos la entrada del usuario y la "traducimos" al estado del componente.
    //Ha introducido algo?
    if(this.calendarInput.value && this.calendarInput.value!==mask) {
      checkInputDate = _scripts_dateutils__WEBPACK_IMPORTED_MODULE_2__["checkDate"](this.calendarInput.value, userInput);
      if(!checkInputDate.value) {
        if(this.shadowRoot.activeElement===this.calendarInput) {
          //Tiene el foco?
          //Todavía lo está escribiendo.
          if(checkInputDate.complete) {
            //Si ha introducido una fecha completa, está mal escrita:
            this.state.invalid({badInput: true},null,userInput);
          }
          else {
            //Si está a medio escribir...
            this.state.invalid({unCommitted: true},null,userInput);
          }
        }
        else {
          //Mal formada
          this.state.invalid({badInput: true},null,userInput);
        }
      }
      else {
        this.checkValue(checkInputDate.value, userInput);
      }
    }
    else {
      //Está todo borrado.
      this.checkValue(null, userInput);
    }
  }

  checkValue(val, userInput) {
    if(this.$$required$$) {
      if(val===null) {
        //inválido
        this.state.invalid({valueMissing: true}, null, userInput);
        return;
      }
    }
    this.state.valid(val, userInput);
  }

  showValue(val) {
    if(val===null) {
      this.calendarInput.value = '';
    }
    else {
      this.calendarInput.value = formatDate(val.getDate(), val.getMonth(), val.getFullYear());
    }
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if(attrName==='required') {
      this.$$required$$ = newVal!==null;
      this.viewToComponentState();
    }
    else if(attrName==='readonly') {
      if(newVal!==null) {
        this.calendarInput.setAttribute('readonly','');
        this.calendarInput.removeAttribute('placeholder');
      }
      else {
        this.calendarInput.removeAttribute('readonly');
        this.calendarInput.setAttribute('placeholder',mask);
      }
    }
    else if(attrName==='hiddencalendar') {
      if(newVal!==null) {
        this.calendarButton.classList.add('calendar-button-hidden');
      }
      else {
        this.calendarButton.classList.remove('calendar-button-hidden');
      }
    }
  }

  static get observedAttributes() {
    return ['required', 'readonly', 'hiddencalendar'];
  }

  /// PUBLIC

  /**
   * Si pasa una razón, pone el componente en estado inválido (con la razón indicada).
   * Si no pone la razón, el componente retorna a su estado correspondiente (puede ser
   * válido o inválido dependiendo de los valores que tenga introducidos)
   * @param {String} customReason
   */
  setBkCustomValidity(customReason) {
    if(customReason) {
      let val = {};
      val[customReason] = true;
      this.state.invalid(val, this.state.value);
    }
    else {
      this.viewToComponentState();
    }
  }

  set value(val) {
    //Sólo puede asignar Date. Mostramos el Date introducido
    //y le aplicamos los chequeos.
    this.showValue(val);
    this.checkValue(val);
  }

  get value() {
    return this.state.value;
  }

  get validity() {
    return this.state.validity;
  }

  set required(v) {
    if(v) {
      this.setAttribute('required','');
    }
    else {
      this.removeAttribute('required');
    }
  }

  get required() {
    return this.hasAttribute('required');
  }

  set readOnly(v) {
    if(v) {
      this.setAttribute('readonly','');
    }
    else {
      this.removeAttribute('readonly');
    }
  }

  get readOnly() {
    return this.hasAttribute('readonly');
  }

  set hiddenCalendar(v) {
    if(v) {
      this.setAttribute('hiddencalendar','');
    }
    else {
      this.removeAttribute('hiddencalendar');
    }
  }

  get hiddenCalendar() {
    return this.hasAttribute('hiddencalendar');
  }

  set name(v) {
    this.setAttribute('name',v);
  }

  get name() {
    return this.getAttribute('name');
  }
}


/***/ }),

/***/ "./src/components/DateComponent.scss":
/*!*******************************************!*\
  !*** ./src/components/DateComponent.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#date-calendar-input {\n  background-color: #fff;\n  border: 1px solid #dadada;\n  border-radius: 2px;\n  box-shadow: none;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  padding: 4px 0px 4px 7px; }\n  #date-calendar-input:focus {\n    border-color: #94a103;\n    outline: 0;\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(148, 161, 3, 0.6); }\n  #date-calendar-input[readonly] {\n    box-shadow: none;\n    background-color: #E0E0E0;\n    border-color: #E0E0E0; }\n  .bk-invalid#date-calendar-input {\n    border-color: #a51a1a; }\n    .bk-invalid#date-calendar-input:focus {\n      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(165, 26, 26, 0.6); }\n    .bk-invalid.bk-invalid-valueMissing#date-calendar-input:not(:disabled) {\n      border-color: #dadada;\n      background-color: #fff9c0; }\n      .bk-invalid.bk-invalid-valueMissing#date-calendar-input:not(:disabled):focus {\n        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(148, 161, 3, 0.6); }\n    .bk-invalid.bk-invalid-unCommitted#date-calendar-input {\n      border-color: #dadada;\n      background-color: #fff; }\n      .bk-invalid.bk-invalid-unCommitted#date-calendar-input:focus {\n        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(148, 161, 3, 0.6); }\n  #date-calendar-input:disabled {\n    background-color: #eee;\n    border-color: #e3e1de;\n    color: #939393;\n    cursor: initial; }\n\n:host {\n  all: initial;\n  /* 1st rule so subsequent properties are reset. */\n  display: inline-block; }\n\n.date-content {\n  font-family: Verdana, Arial, sans-serif;\n  font-size: 12px;\n  color: #35261a;\n  display: inline-block;\n  letter-spacing: -10px; }\n\n#date-calendar-button {\n  background: none;\n  border: 0;\n  vertical-align: top;\n  padding: 5px 6px 6px;\n  width: 27px;\n  font-family: inherit;\n  font-size: inherit;\n  color: inherit;\n  cursor: pointer; }\n  #date-calendar-button.calendar-button-hidden {\n    display: none; }\n  #date-calendar-button.calendar-button-active {\n    border-radius: 2px 2px 0 0;\n    background-color: #f7f7f7;\n    border-left: 1px solid #d2d2d2;\n    border-right: 1px solid #d2d2d2;\n    border-top: 1px solid #d2d2d2;\n    fill: #c4d600;\n    padding: 4px 5px 6px 5px;\n    outline: none;\n    position: relative; }\n    #date-calendar-button.calendar-button-active.calendar-to-top {\n      border-bottom: 1px solid #d2d2d2;\n      border-top: initial;\n      border-radius: 0 0 2px 2px; }\n\n#date-calendar-input {\n  font-family: inherit;\n  font-size: inherit;\n  color: inherit; }\n"

/***/ }),

/***/ "./src/components/DateComponentCalendar.html":
/*!***************************************************!*\
  !*** ./src/components/DateComponentCalendar.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"date-calendar-window\">\r\n  <div class=\"hide-border\"></div>\r\n  <button id=\"date-calendar-close\" type=\"button\" class=\"calendar-close\">\r\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\r\n      <path transform=\"translate(0,512) scale(1,-1)\" d=\"M398 176l-81 88 72 72c16 16 16 42 0 62-16 16-42 16-56 0l-72-72-72 77c-16 16-42 16-56 0-16-16-16-41 0-62l72-77-88-88c-16-16-16-42 0-62 16-16 41-16 56 0l88 88 81-88c16-16 42-16 56 0 15 20 15 46 0 62z\"/>\r\n    </svg>\r\n  </button>\r\n  <div class=\"calendar-header\">\r\n    <a id=\"date-calendar-prevMonth\" class=\"calendar-prev-month\" title=\"Anterior\" href=\"#\">\r\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\r\n          <path transform=\"translate(0,512) scale(1,-1)\" d=\"M235 256l154 162c21 22 21 57 0 78-21 22-55 22-75 0l-192-200c-16-16-20-40-12-61 4-6 7-13 12-19l192-200c20-22 54-22 75 0 21 22 21 58 0 78z\"/>\r\n        </svg>\r\n    </a>\r\n    <div class=\"calendar-title\">\r\n      <span id=\"date-calendar-month\" class=\"calendar-month\"></span>\r\n      <span id=\"date-calendar-year\" class=\"calendar-year\"></span>\r\n    </div>\r\n    <a id=\"date-calendar-nextMonth\" class=\"calendar-next-month\" title=\"Siguiente\" href=\"#\">\r\n      <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\r\n        <path transform=\"translate(0,512) scale(1,-1)\" d=\"M402 235c8 21 3 43-12 61l-193 200c-21 22-55 22-75 0-21-22-21-58 0-78l155-162-154-162c-21-22-21-57 0-78 21-21 55-22 75 0l192 200c5 6 8 13 12 19z\"/>\r\n      </svg>\r\n    </a>\r\n  </div>\r\n  <table class=\"calendar-table\">\r\n    <thead>\r\n      <tr>\r\n        <th>\r\n          <span title=\"Lunes\">L</span>\r\n        </th>\r\n        <th>\r\n          <span title=\"Martes\">M</span>\r\n        </th>\r\n        <th>\r\n          <span title=\"Miércoles\">M</span>\r\n        </th>\r\n        <th>\r\n          <span title=\"Jueves\">J</span>\r\n        </th>\r\n        <th>\r\n          <span title=\"Viernes\">V</span>\r\n        </th>\r\n        <th class=\"calendar-week-end\">\r\n          <span title=\"Sábado\">S</span>\r\n        </th>\r\n        <th class=\"calendar-week-end\">\r\n          <span title=\"Domingo\">D</span>\r\n        </th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n    </tbody>\r\n  </table>\r\n  <div class=\"calendar-footer\">\r\n    <a href=\"#\" id=\"date-calendar-prevYear\" class=\"calendar-prev-year\">\r\n    </a>\r\n    <a href=\"#\" id=\"date-calendar-nextYear\" class=\"calendar-next-year\">\r\n    </a>\r\n  </div>\r\n</div>\r\n";

/***/ }),

/***/ "./src/components/DateComponentCalendar.js":
/*!*************************************************!*\
  !*** ./src/components/DateComponentCalendar.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateComponentCalendar; });
/* harmony import */ var _DateComponentCalendar_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DateComponentCalendar.html */ "./src/components/DateComponentCalendar.html");
/* harmony import */ var _DateComponentCalendar_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_DateComponentCalendar_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DateComponentCalendar_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DateComponentCalendar.scss */ "./src/components/DateComponentCalendar.scss");
/* harmony import */ var _DateComponentCalendar_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DateComponentCalendar_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scripts_dateutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scripts/dateutils */ "./src/scripts/dateutils.js");
/* harmony import */ var ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ui-commons-wc */ "ui-commons-wc");
/* harmony import */ var ui_commons_wc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__);






function renderHeader(root, date) {
  const domMonth = root.querySelector('#date-calendar-month');
  const domYear = root.querySelector('#date-calendar-year');
  domYear.innerText = date.getFullYear();
  domMonth.innerText = _scripts_dateutils__WEBPACK_IMPORTED_MODULE_2__["getMonthDesc"](date.getMonth());
}

function renderTable(root, date, selectedDate) {
  const days = _scripts_dateutils__WEBPACK_IMPORTED_MODULE_2__["calculateMonthDaysOf"](date.getMonth(),date.getFullYear());
  const tbody = root.querySelector('tbody');
  const today = new Date();
  let rows = '';
  tbody.innerHTML = '';

  for(const row of days) {
    rows += '<tr>';
    for(const day of row) {
      rows += '<td class="'+generateClass(day, selectedDate, today)+'">';
      rows += '<a href="#" bk-cal-date='+day.date+
                ' bk-cal-month='+day.month+
                ' bk-cal-year='+day.year+'>'+day.date+'</a>'
      rows += '</td>';
    }
    rows += '</tr>';
  }

  tbody.innerHTML = rows;
}

function generateClass(day, selectedDate, today) {
  let res = '';
  if(equalsDate(day, today)) {
    res += ' calendar-day-today';
  }
  if(selectedDate && equalsDate(day, selectedDate)) {
    res += ' calendar-day-selected';
  }
  if(day.weekend) {
    res += ' calendar-day-weekend';
  }
  if(day.otherMonth) {
    res += ' calendar-day-other';
  }
  return res;
}

function equalsDate(day, date) {
  return day.date === date.getDate() && day.month === date.getMonth() && day.year === date.getFullYear();
}

function renderFooter(root, date) {
  const domPrevYear = root.querySelector('#date-calendar-prevYear');
  const domNextYear = root.querySelector('#date-calendar-nextYear');
  domPrevYear.innerText = date.getFullYear()-1;
  domNextYear.innerText = date.getFullYear()+1;
}

function position(root, button) {
  const borderWidth = 1;
  const calWindow = root.querySelector('#date-calendar-window');
  const hideBorder = root.querySelector('.hide-border');
  const buttonBounds = button.getBoundingClientRect();
  //Conservamos la posición del scroll.
  const oldX = window.scrollX;
  const oldY = window.scrollY;
  let clientPosX = buttonBounds.left;

  //Lo hacemos visible.
  calWindow.classList.add('visible');

  //Nos aseguramos que el scroll se sitúa donde estaba antes de mostrarse el desplegable.
  window.scrollTo(oldX, oldY);

  hideBorder.style.width = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(button.clientWidth-2*borderWidth);

  if(buttonBounds.left + calWindow.offsetWidth > window.innerWidth) {
    //Se sale por la derecha. Lo sitúo por la derecha
    calWindow.style.left = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(buttonBounds.right + window.scrollX - calWindow.offsetWidth);
    hideBorder.style.top = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(-borderWidth);
    hideBorder.style.right = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(0);
  }
  else {
    calWindow.style.left = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(buttonBounds.left + window.scrollX);
    hideBorder.style.top = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(-borderWidth);
  }
  if(buttonBounds.bottom + calWindow.offsetHeight > window.innerHeight) {
    //Se sale por debajo. Lo sitúo hacia arriba.
    calWindow.style.top = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(buttonBounds.top + window.scrollY - calWindow.offsetHeight + borderWidth/*que se solape con el borde*/);
    button.classList.add('calendar-to-top');
    calWindow.classList.add('calendar-to-top');
    hideBorder.style.top = null;
    hideBorder.style.bottom = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(-borderWidth);
  }
  else {
    calWindow.style.top = Object(ui_commons_wc__WEBPACK_IMPORTED_MODULE_3__["px"])(buttonBounds.bottom + window.scrollY - borderWidth/*que se solape con el borde*/);
    button.classList.remove('calendar-to-top');
    calWindow.classList.remove('calendar-to-top');
  }
}

/**
 */
class DateComponentCalendar extends HTMLElement {
  constructor() {
    super();

    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = '<style>'+_DateComponentCalendar_scss__WEBPACK_IMPORTED_MODULE_1___default.a+'</style>'+_DateComponentCalendar_html__WEBPACK_IMPORTED_MODULE_0___default.a;

    this.handleDateSelection = this.handleDateSelection.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickAnywhere = this.handleClickAnywhere.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.handleNextYear = this.handleNextYear.bind(this);
    this.handlePrevYear = this.handleDateSelection.bind(this);
  }

  connectedCallback() {
    const tbody = this.shadowRoot.querySelector('tbody');
    const closeButton = this.shadowRoot.querySelector('#date-calendar-close');
    const nextM = this.shadowRoot.querySelector('#date-calendar-nextMonth');
    const prevM = this.shadowRoot.querySelector('#date-calendar-prevMonth');
    const nextY = this.shadowRoot.querySelector('#date-calendar-nextYear');
    const prevY = this.shadowRoot.querySelector('#date-calendar-prevYear');

    tbody.addEventListener('click',this.handleDateSelection);

    closeButton.addEventListener('click',this.handleClose);

    nextM.addEventListener('click',this.handleNextMonth);
    prevM.addEventListener('click',this.handlePrevMonth);
    nextY.addEventListener('click',this.handleNextYear);
    prevY.addEventListener('click',this.handlePrevYear);
    const that = this
    setTimeout(function(){
        window.document.addEventListener('click', that.handleClickAnywhere)},
    0);
  }

  disconnectedCallback() {
    const tbody = this.shadowRoot.querySelector('tbody');
    const closeButton = this.shadowRoot.querySelector('#date-calendar-close');
    const nextM = this.shadowRoot.querySelector('#date-calendar-nextMonth');
    const prevM = this.shadowRoot.querySelector('#date-calendar-prevMonth');
    const nextY = this.shadowRoot.querySelector('#date-calendar-nextYear');
    const prevY = this.shadowRoot.querySelector('#date-calendar-prevYear');

    tbody.removeEventListener('click',this.handleDateSelection);

    closeButton.removeEventListener('click',this.handleClose);

    nextM.removeEventListener('click',this.handleNextMonth);
    prevM.removeEventListener('click',this.handlePrevMonth);
    nextY.removeEventListener('click',this.handleNextYear);
    prevY.removeEventListener('click',this.handlePrevYear);

    window.document.removeEventListener('click', this.handleClickAnywhere);

    this.button.classList.remove('calendar-to-top');
  }

  show(date, selectedDate, button) {
    this.currentDate = date;
    this.selectedDate = selectedDate;
    this.button = button;

    this.render();

    //Ponemos el foco en el primer día:
    this.shadowRoot.querySelector('a[bk-cal-date]').focus();
  }

  render() {
    renderHeader(this.shadowRoot, this.currentDate);
    renderTable(this.shadowRoot, this.currentDate, this.selectedDate);
    renderFooter(this.shadowRoot, this.currentDate);

    //Hacemos visible el desplegable y lo posicionamos.
    position(this.shadowRoot, this.button);
  }

  handleDateSelection(e) {
    const date = e.target.getAttribute('bk-cal-date');
    if(date) {
      //El evento llega de uno de los enlaces
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('bkSelect', {
        detail: {
          date: Number(date),
          month: Number(e.target.getAttribute('bk-cal-month')),
          year: Number(e.target.getAttribute('bk-cal-year'))
        },
        bubbles: false
      }));
    }
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('bkSelect', {
      bubbles: false
    }));
  }

  handleClickAnywhere(e) {
    if(e.target!==this) {
      this.handleClose();
    }
  }

  handleNextMonth(e) {
    e.preventDefault();
    let month = this.currentDate.getMonth() + 1;
    let year = this.currentDate.getFullYear();
    if(month > 11) {
      month = 0;
      year ++;
    }
    this.currentDate = new Date(year, month, 1);
    this.render();
  }

  handlePrevMonth(e) {
    e.preventDefault();
    let month = this.currentDate.getMonth() - 1;
    let year = this.currentDate.getFullYear();
    if(month < 0) {
      month = 11;
      year --;
    }
    this.currentDate = new Date(year, month, 1);
    this.render();
  }

  handleNextYear(e) {
    e.preventDefault();
    let year = this.currentDate.getFullYear() + 1;
    this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
    this.render();
  }

  handlePrevYear(e) {
    e.preventDefault();
    let year = this.currentDate.getFullYear() - 1;
    this.currentDate = new Date(year, this.currentDate.getMonth(), 1);
    this.render();
  }

}


/***/ }),

/***/ "./src/components/DateComponentCalendar.scss":
/*!***************************************************!*\
  !*** ./src/components/DateComponentCalendar.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  all: initial;\n  /* 1st rule so subsequent properties are reset. */\n  font-family: Verdana, Arial, sans-serif;\n  font-size: 12px;\n  color: #35261a; }\n\n.hide-border {\n  position: absolute;\n  background-color: inherit;\n  height: 2px; }\n\n#date-calendar-window {\n  position: absolute;\n  display: none;\n  border-radius: 2px 2px 2px 2px;\n  background-color: #f7f7f7;\n  border: 1px solid #d2d2d2;\n  z-index: 9000;\n  box-shadow: 3px 4px 5px 0 #c4c4c4; }\n  #date-calendar-window.calendar-to-top {\n    box-shadow: 3px -2px 5px 0 #c4c4c4; }\n  #date-calendar-window a {\n    font-size: 12px;\n    color: #017693; }\n  #date-calendar-window a:hover {\n    color: #78726c;\n    text-decoration: none; }\n  #date-calendar-window.visible {\n    display: block; }\n\ntable {\n  font-size: 12px;\n  background-color: transparent;\n  margin: 0 5px;\n  border-spacing: 0;\n  line-height: 19px; }\n  table th {\n    box-sizing: border-box;\n    color: #35261a;\n    width: 27px;\n    font-weight: bold; }\n  table td {\n    box-sizing: border-box;\n    text-align: right;\n    width: 27px; }\n    table td a {\n      box-sizing: border-box;\n      display: inline-block;\n      width: 100%;\n      padding: 0 5px 0 0; }\n    table td a:hover {\n      background-color: #968271;\n      color: #fff !important; }\n  table .calendar-day-today a {\n    background-color: #e2e2e2; }\n  table .calendar-day-selected a {\n    background-color: #e5e8b5; }\n  table .calendar-day-weekend a {\n    color: #35261a !important; }\n  table .calendar-day-other a {\n    color: #939393 !important; }\n\n.calendar-close {\n  border: 0;\n  width: 10px;\n  background: transparent;\n  position: absolute;\n  right: 0px;\n  padding: 0;\n  margin: 2px;\n  cursor: pointer; }\n  .calendar-close:hover {\n    background: #78726c;\n    fill: white; }\n\n.calendar-header {\n  border-bottom: 1px solid #d2d2d2;\n  margin: 7px auto 0;\n  padding-bottom: 6px;\n  position: relative;\n  text-align: center; }\n  .calendar-header .calendar-title {\n    display: inline-block;\n    vertical-align: middle; }\n  .calendar-header .calendar-prev-month {\n    position: absolute;\n    left: 26px;\n    top: 1px; }\n  .calendar-header .calendar-next-month {\n    position: absolute;\n    right: 28px;\n    top: 1px; }\n  .calendar-header a {\n    fill: #35261a;\n    display: inline-block;\n    width: 12px;\n    vertical-align: middle; }\n    .calendar-header a:hover {\n      fill: #78726c; }\n\n.calendar-footer {\n  border-top: 1px solid #d2d2d2;\n  margin-top: 6px; }\n  .calendar-footer a {\n    font-size: 13px !important; }\n  .calendar-footer .calendar-prev-year {\n    margin-bottom: 6px;\n    margin-left: 9px;\n    margin-top: 4px;\n    float: left; }\n  .calendar-footer .calendar-next-year {\n    margin-bottom: 6px;\n    margin-right: 9px;\n    margin-top: 4px;\n    float: right; }\n"

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_DateComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/DateComponent */ "./src/components/DateComponent.js");
/* harmony import */ var _components_DateComponentCalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/DateComponentCalendar */ "./src/components/DateComponentCalendar.js");



window.customElements.define('bk-wc-ui-date-calendar', _components_DateComponentCalendar__WEBPACK_IMPORTED_MODULE_1__["default"]);
window.customElements.define('bk-wc-ui-date', _components_DateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (_components_DateComponent__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/scripts/dateutils.js":
/*!**********************************!*\
  !*** ./src/scripts/dateutils.js ***!
  \**********************************/
/*! exports provided: calculateMonthDaysOf, checkDate, getMonthDesc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateMonthDaysOf", function() { return calculateMonthDaysOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkDate", function() { return checkDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMonthDesc", function() { return getMonthDesc; });
const validDateRegExp = /^([0-9][0-9])\/([0-9][0-9])\/([0-9][0-9][0-9][0-9])$/;

const MONTHS = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

function truncate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function lastDayOf(month, year) {
  let date;
  //Pasamos al siguiente mes.
  month++
  if (month > 11) {
    month = 0;
    year++;
  }
  //Primer día del siguiente mes
  date = new Date(year, month, 1);
  //Le quitamos un día.
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

  return date;
}

/**
 * 0: L, 1: M, ... 6: D
 */
function dayOfWeek(date) {
  let res = date.getDay() - 1;
  if (res < 0) {
    res = 6;
  }
  return res;
}

function isWeekend(idx) {
  return idx>4;
}

function calculateMonthDaysOf(month, year) {
  //Truncamos por debajo del día (información de horas, minutos, ...)
  const firstDate = new Date(year, month, 1);
  const lastDate = lastDayOf(month, year);
  const firstDayOfWeek = dayOfWeek(firstDate);
  let currentDate = 1, currentDay;
  let result = [];
  let row = [];
  if (firstDayOfWeek > 0) {
    //Tenemos que rellenar del mes anterior
    const prevMonthYear = month - 1 >= 0 ? year : year - 1;
    const prevMonth = month - 1 >= 0 ? month - 1 : 11;
    const lastDatePrevMonth = lastDayOf(prevMonth, prevMonthYear);
    for (let i = 0; i < firstDayOfWeek; i++) {
      row[i] = {
        year: prevMonthYear,
        month: prevMonth,
        date: lastDatePrevMonth.getDate() - (firstDayOfWeek - i - 1),
        otherMonth: true,
        weekend: isWeekend(i)
      };
    }
  }
  currentDay = firstDayOfWeek;
  while (currentDate <= lastDate.getDate()) {
    row[currentDay] = {
      year: year,
      month: month,
      date: currentDate,
      otherMonth: false,
      weekend: isWeekend(currentDay)
    };
    currentDay++;
    currentDate++;
    if (currentDay > 6) {
      currentDay = 0;
      result.push(row);
      row = [];
    }
  }
  if (currentDay < 6) {
    //Rellenamos del siguiente mes
    currentDate = 1;
    for (let i = currentDay; i < 7; i++) {
      row[i] = {
        year: month + 1 <= 11 ? year : year + 1,
        month: month + 1 <= 11 ? month + 1 : 0,
        date: currentDate,
        otherMonth: true,
        weekend: isWeekend(i)
      };
      currentDate++;
    }
  }
  result.push(row);

  return result;
}

function checkDate(str) {
  const m = validDateRegExp.exec(str);
  if (m) {
    const year = Number(m[3]), month = Number(m[2]) - 1, date = Number(m[1]);
    //Tengo una fecha introducida, ¿es una fecha correcta?
    let test = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
    //Date adapta los valores fuera de rango. Si son correctos, permanecerán sin modificar
    if (test.getFullYear() === year && test.getMonth() === month && test.getDate() === date) {
      //Fecha introducida y en rango
      return {
        complete: true,
        value: test
      }
    }
    else {
      //Fecha introducida pero con días o meses fuera de rango
      return {
        complete: true,
        value: null
      }
    }
  }
  return {
    //Todavía no hay una fecha completa.
    complete: false,
    value: null
  };
}

function getMonthDesc(idx) {
  return MONTHS[idx];
}




/***/ }),

/***/ "ui-commons-wc":
/*!********************************!*\
  !*** external "ui-commons-wc" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_ui_commons_wc__;

/***/ })

/******/ });
});

/***/ }),

/***/ "./src/components/Aside.html":
/*!***********************************!*\
  !*** ./src/components/Aside.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='client'>hola</div>";

/***/ }),

/***/ "./src/components/Aside.js":
/*!*********************************!*\
  !*** ./src/components/Aside.js ***!
  \*********************************/
/*! exports provided: default, aside */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Aside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aside", function() { return aside; });
/* harmony import */ var _Aside_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Aside.html */ "./src/components/Aside.html");
/* harmony import */ var _Aside_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Aside_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Aside_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Aside.scss */ "./src/components/Aside.scss");
/* harmony import */ var _Aside_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Aside_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stacking__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stacking */ "./src/components/stacking.js");



class Aside extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Aside_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Aside_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._client = shadowRoot.querySelector('#client');
    this._markup = undefined;
  }

  _click(e) {
    e.stopPropagation();
  }

  connectedCallback() {
    this._client.addEventListener('click', this._click);
  }

  disconnectedCallback() {
    this._client.removeEventListener('click', this._click);

    if (this._markup) {
      this._markup.dispatchEvent(new CustomEvent('bk-clean', {
        bubbles: true
      }));
    }
  }

  inject(e, markup, styles = "") {
    if (this._css) {
      this.shadowRoot.removeChild(this._css);
    }

    this._css = document.createElement('style');
    this._css.type = 'text/css';

    this._css.appendChild(document.createTextNode(styles));

    this.shadowRoot.appendChild(this._css);

    if (this._markup) {
      this._markup.dispatchEvent(new CustomEvent('bk-clean', {
        bubbles: true
      }));
    }

    this._markup = markup;
    this._client.innerHTML = "";

    this._client.appendChild(markup);
  }

}

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

const adjust = (el, e, pp, markup, mascara, target) => {
  let x = e.pageX;
  let y = e.pageY;
  let br;
  let mask;
  const client = markup.parentElement;
  let derecha = true;
  let abajo = true;

  if (pp) {
    //br = target.getBoundingClientRect()
    br = getBoundingDocumentRect(target);
    x = br.left;
    y = br.top + br.height; //console.log(br)
  }

  if (mascara) {
    mask = target.cloneNode();
    mask.style.position = 'absolute';
    client.style.position = 'relative';
    client.appendChild(mask);
  }

  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const wt = document.documentElement.clientWidth;
  const ht = document.documentElement.clientHeight;

  if (x + w > wt) {
    x = pp ? x - w + br.width : x - w;
    derecha = false;
  }

  if (y + h > ht) {
    y = pp ? y - h - br.height : y - h;
    abajo = false;
  }

  if (mascara) {
    if (derecha) {
      client.classList.add('derecha');
      mask.style.left = '0px';
    } else {
      mask.style.right = '0px';
    }

    if (abajo) {
      client.classList.add('abajo');
      mask.style.top = '-' + String(mask.offsetHeight - Math.ceil((mask.offsetHeight - mask.clientHeight) / 2) - 1) + 'px';
      mask.style.borderBottomWidth = '0px';
    } else {
      mask.style.bottom = '-' + String(mask.offsetHeight - Math.ceil((mask.offsetHeight - mask.clientHeight) / 2) - 1) + 'px';
      mask.style.borderTopWidth = '0px';
    }
  }

  client.classList.add('anim');
  el.style.top = String(y) + 'px';
  el.style.left = String(x) + 'px';
  return mask;
};

let actual = undefined;
let targetActual = undefined;
let mask = undefined;

const click_body = e => {
  if (e && esExcepcionCerrar(e)) {
    return;
  }

  document.body.removeEventListener('click', click_body);
  window.removeEventListener('resize', click_body);
  document.removeEventListener('scroll', click_body, true);
  document.removeEventListener('bk-scroll', click_body);
  mask && mask.removeEventListener('click', click_body);
  document.body.removeEventListener('click', click_body);
  document.body.removeChild(actual);
  actual = undefined;
};

const esExcepcionCerrar = e => {
  if (e.type == 'scroll' || e.type == 'bk-scroll') {
    const targetscroll = e.composedPath()[0];

    if (targetscroll == document) {
      return true;
    }

    return !contains(targetscroll, targetActual);
  }

  return false;
};

const contains = (p, h) => {
  let tmp = h;

  while (tmp && tmp != p) {
    tmp = tmp.parentNode || tmp.host;
  }

  return !!tmp;
};

const aside = (e, target, markup, styles, z, pp = false, mascara = false) => {
  //console.log(e)
  if (!e) {
    return;
  }

  if (actual) {
    click_body();
  }

  targetActual = target;
  e.stopPropagation();
  actual = document.createElement('bk-wc-aside');
  actual.style.font = window.getComputedStyle(targetActual).font;
  actual.style.top = '-1500px';

  if (markup) {
    actual.inject(e, markup, styles);
  }

  document.body.appendChild(actual);
  mask = adjust(actual, e, pp, markup, mascara, targetActual);
  actual.style.zIndex = z || Object(_stacking__WEBPACK_IMPORTED_MODULE_2__["default"])(targetActual);
  mask && mask.addEventListener('click', click_body);
  document.body.addEventListener('click', click_body);
  window.addEventListener('resize', click_body);
  document.addEventListener('scroll', click_body, true);
  document.addEventListener('bk-scroll', click_body);
  return click_body;
};



/***/ }),

/***/ "./src/components/Aside.scss":
/*!***********************************!*\
  !*** ./src/components/Aside.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  position: absolute;\n  /*z-index: 100;*/\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit; }\n\n* {\n  box-sizing: border-box; }\n\n#client.anim {\n  animation: tr .2s ease-in-out; }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 0.8; } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/GestDoc.html":
/*!*************************************!*\
  !*** ./src/components/GestDoc.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div class='cab'>DOCUMENTACIÓN A APORTAR</div>\r\n    <div id='client'></div>\r\n</div>\r\n";

/***/ }),

/***/ "./src/components/GestDoc.js":
/*!***********************************!*\
  !*** ./src/components/GestDoc.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GestDoc; });
/* harmony import */ var _GestDoc_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GestDoc.html */ "./src/components/GestDoc.html");
/* harmony import */ var _GestDoc_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_GestDoc_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GestDoc_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GestDoc.scss */ "./src/components/GestDoc.scss");
/* harmony import */ var _GestDoc_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_GestDoc_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Subprocess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subprocess */ "./src/components/Subprocess.js");
/* harmony import */ var filenamify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! filenamify */ "./node_modules/filenamify/index.js");
/* harmony import */ var filenamify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(filenamify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");
/* harmony import */ var _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilGestDoc */ "./src/components/utilGestDoc.js");






const templateNode = document.createElement('template');
const CONTENT_NODE = `<div class='reg'>
                            <div class='node'>
                                <div class='manejador collapsed'></div>
                                <div class='text'></div>
                                <div class='info'></div>
                                <div class='obli'></div>
                                <div class='firma'></div>
                                <div class='estado'></div>
                                <div class='acciones'>
                                <div class='ancla'>
                                    <div class='cap'></div>
                                </div>
                                <div class='menu'></div>
                                </div>
                            </div>
                            <div class='children collapsed'></div>
                        </div>`;
templateNode.innerHTML = CONTENT_NODE;
class GestDoc extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _GestDoc_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _GestDoc_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._root = shadowRoot.querySelector('#root');
    this._client = shadowRoot.querySelector('#client');
    this._handle = this._handle.bind(this);
    this._handlescroll = this._handlescroll.bind(this);
    this._error = this._error.bind(this); //

    this._cfg = null;
    this._subprocesoInyeccion = new _Subprocess__WEBPACK_IMPORTED_MODULE_2__["default"](_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["URLS"].GESTIONARDOCUMENTOSGESTORIAS);

    this._subprocesoInyeccion.error(this._error);

    this._documentos = [];
    this._reconect = false;
    this._documentosMulti = [];
    this._expandedMulti = [];
    this._multisInyectar = [];
  }

  _dispatchEvent(msg) {
    if (msg == _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].NOTIFY_PENDING) {
      this.dispatchEvent(new CustomEvent("bk-event", {
        detail: {
          msg,
          documentosPendientes: Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["documentosPendientes"])(this._documentos)
        },
        bubbles: true
      }));
      return;
    }

    this.dispatchEvent(new CustomEvent("bk-event", {
      detail: {
        msg
      },
      bubbles: true
    }));
  }

  _handle(e) {
    const target = e.composedPath()[0];

    if (e.type == "click" && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, 'input')) {
      target.value = "";
      return;
    }

    if (e.type == "change" && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, 'input')) {
      if (!target.files[0]) {
        return;
      }

      const id = target.closest('.node').getAttribute("data-id");

      const doc = this._documentos.find(d => d.id == id);

      const file = target.files[0];
      const accion = target.closest('.ancla').getAttribute('data-id');

      this._accion(doc, accion, file);

      return;
    }

    if (e.type == "bk-click") {
      const accion = e.detail.accion;
      const node = e.composedPath()[0];

      if (!node || !Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.node')) {
        return;
      }

      const doc = this._documentos.find(d => d.id == node.getAttribute("data-id"));

      this._accion(doc, accion, e.detail.file);

      return;
    }

    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '#client')) {
      return;
    }

    const node = target.closest('.node');

    if (!node) {
      return;
    }

    const doc = (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.file') ? this._documentosMulti : this._documentos).find(d => d.id == node.getAttribute("data-id")); //const doc = this._documentos.find(d=>d.id==node.getAttribute("data-id"))

    if (!doc) {
      return;
    }

    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.multiArchivo') && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.manejador')) {
      const reg = node.closest('.reg');
      reg.querySelector('.children').classList.toggle('collapsed');
      target.classList.toggle('collapsed');

      this._inyectarMultiArchivo(reg, doc, true);
    } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.info.activo')) {
      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarInfoDoc"])(doc, e, this._cfg.indicadorConsulta);
    } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.menu')) {
      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarMenuAcciones"])(doc, e, node);
    } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.ancla') || Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.cap')) {
      const ancla = target.closest('.ancla');

      this._accion(doc, ancla.getAttribute('data-id'));
    }
  }

  _inyectarMultiArchivo(node, doc, dispatch) {
    if (node.querySelector('.children').innerHTML !== "") {
      return Promise.resolve(true);
    }

    dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);
    return new Promise((resolve, reject) => {
      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["obtenerMultiArchivo"])(node, doc, this._cfg.indicadorConsulta, this._subprocesoInyeccion).then(r => {
        dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

        if (r === true) {
          resolve(true);
        }

        const ref = node.querySelector('.children');
        r.forEach(obj => {
          this._documentosMulti.push(obj);

          const n = this._paint(obj);

          n.querySelector('.node').classList.add('file');
          ref.appendChild(n);
        });
        resolve(true);
      }).catch(e => {
        console.log(e);
        dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
      });
    });
  }

  _inyectarMultiArchivos(mod) {
    //console.log('sdfadfasdf',this._multisInyectar)
    mod && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    const arc = this._multisInyectar.pop();

    if (arc) {
      const [node, doc] = arc;
      node.querySelector('.manejador').classList.remove('collapsed');
      node.querySelector('.children').classList.remove('collapsed');

      this._inyectarMultiArchivo(node, doc).then(() => this._inyectarMultiArchivos());
    } else {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    }
  }

  _accion(doc, accion, file) {
    //console.log(doc, accion)
    if (['VI', 'IM', 'EM', 'DE'].includes(accion)) {
      this._consultarDocumento(doc);
    } else if (['DP', 'EP', 'IP', 'VP'].includes(accion)) {
      this._generarPlantilla(doc);
    } else if (['AD', 'AF'].includes(accion)) {
      this._adjuntarDocumento(doc, accion, file);
    } else if (['AN'].includes(accion)) {
      this._eliminarDocumento(doc);
    } else if (['VD'].includes(accion)) {
      this._verDetalleExceptuado(doc);
    } else if (['EX'].includes(accion)) {
      this._exceptuarDocumento(doc);
    } //else{throw new Error(`Acción '${accion}' no prevista`);}

  }

  _generarPlantilla(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].generarPlantilla(doc, this._cfg, this._subprocesoInyeccion).then(url => {
      return Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["descargaFichero"])(url, filenamify__WEBPACK_IMPORTED_MODULE_3___default()('plantilla_exp' + this._cfg.propuesta.identificadorExpediente)).catch(e => {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
        return Promise.reject(e);
      });
    }).then(() => this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE)).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _exceptuarDocumento(doc) {
    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].exceptuarDocumento(doc).then(r => r && this._render());
  }

  _verDetalleExceptuado(doc) {
    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].obtenerMotivoExceptuacion(doc, this._cfg).then(r => r && this._render());
  }

  _eliminarDocumento(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].eliminarDocumento(doc, this._subprocesoInyeccion).then(r => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      this._render();
    }).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _consultarDocumento(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].consultarDocumento(doc, this._cfg, this._subprocesoInyeccion).then(url => {
      return Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["descargaFichero"])(url, filenamify__WEBPACK_IMPORTED_MODULE_3___default()(doc.nombreSubtipoDocumento + '_exp' + this._cfg.propuesta.identificadorExpediente)).catch(e => {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
        return Promise.reject(e);
      });
    }).then(() => this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE)).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _adjuntarDocumento(doc, accion, file) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["subirFichero"])(file).then(data => {
      if (accion == 'AD') {
        return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].adjuntarDocumento(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage);
      } else {
        this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

        return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].adjuntarFirma(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage);
      }
    }).then(r => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      r && this._render();
    }).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
    });
  }

  _error(e) {
    Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);

    if (this._subprocesoInyeccion.abierto && !this._reconect) {
      this._reconect = true;
      const that = this; //dana

      setTimeout(function () {
        that._render();
      }, 100);
    }
  }

  set cfg(cfg) {
    this._cfg = cfg;

    this._render();
  }

  get EVENT() {
    return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"];
  }

  _handlescroll() {
    this.dispatchEvent(new CustomEvent("bk-scroll", {
      bubbles: true
    }));
  }

  connectedCallback() {
    this._client.addEventListener('click', this._handle);

    this._client.addEventListener('bk-click', this._handle);

    this._client.addEventListener('change', this._handle);

    this.shadowRoot.addEventListener('scroll', this._handlescroll, true);
  }

  disconnectedCallback() {
    this._client.removeEventListener('click', this._handle);

    this._client.removeEventListener('bk-click', this._handle);

    this._client.removeEventListener('change', this._handle);

    this.shadowRoot.removeEventListener('scroll', this._handlescroll, true);
  }

  _paint(n) {
    const tmp = templateNode.content.cloneNode(true);
    tmp.querySelector('.node').setAttribute('data-id', n.id);

    if (n.indicadorMultiArchivo) {
      tmp.querySelector('.node').classList.add('multiArchivo');

      if (this._expandedMulti.includes(n.id)) {
        this._multisInyectar.push([tmp.querySelector('div'), n]);
      }
    }

    tmp.querySelector('.text').innerText = n.nombreSubtipoDocumento;
    tmp.querySelector('.text').title = n.nombreSubtipoDocumento;

    if (n.indicadorDescripcion) {
      tmp.querySelector('.info').classList.add('activo');
    }

    if (n.indicadorObligatoriedad) {
      tmp.querySelector('.obli').classList.add('activo');
    }

    if (n.indicadorRequiereFirma) {
      tmp.querySelector('.firma').classList.add('activo');
    }

    tmp.querySelector('.estado').innerText = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapEstado"][n.codigoEstado] || '';
    tmp.querySelector('.estado').title = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapEstado"][n.codigoEstado] || '';
    const clase = n.codigoEstado == 'EE' ? 'agree' : n.codigoEstado == 'NA' ? 'progress' : n.codigoEstado == 'EX' ? 'excepted' : '';

    if (clase) {
      tmp.querySelector('.estado').classList.add(clase);
    }

    if (n.acciones.length > 0 && _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapAccion"][n.acciones[0].codigoAccion]) {
      tmp.querySelector('.cap').innerText = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapAccion"][n.acciones[0].codigoAccion] || '';
      tmp.querySelector('.ancla').setAttribute('data-id', n.acciones[0].codigoAccion);

      if (['AD', 'AF'].includes(n.acciones[0].codigoAccion)) {
        const file = document.createElement('input');
        file.setAttribute('type', 'file');
        tmp.querySelector('.ancla').appendChild(file);
      }
    }

    if (n.acciones.length > 1) {
      tmp.querySelector('.menu').classList.add('activo');
    }

    return tmp.querySelector('div');
  }

  _backupEstado() {
    this._expandedMulti = [];

    this._client.querySelectorAll('.node.multiArchivo').forEach(nodo => {
      if (!Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(nodo.querySelector('.manejador'), '.collapsed') && !Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(nodo.closest('.reg').querySelector('.children'), ':empty')) {
        this._expandedMulti.push(nodo.getAttribute('data-id'));
      }
    });

    console.log(this._expandedMulti);
  }

  _render(noShowLoading) {
    Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["resetSec"])();

    this._backupEstado();

    noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);
    this._documentos = [];

    this._load().then(docs => {
      noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
      this._client.innerHTML = "";
      this._multisInyectar = [];
      docs.forEach(n => {
        this._client.appendChild(this._paint(n));
      });

      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].NOTIFY_PENDING);

      this._inyectarMultiArchivos(!noShowLoading);

      this._reconect = false;
    }).catch(() => noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE)); //los mensajes de error ya los muestra sb

  }

  _getPage() {
    const codigoTarea = [this._cfg.tarea.codigoTarea + (this._cfg.notG ? "" : "G")];
    const model = {
      'datoDocumentoExpediente': {
        'codigoFase': this._cfg.fase,
        'identificadorInstanciaProceso': this._cfg.tarea.identificadorExpedienteDocumental,
        'codigosSubprocesos': codigoTarea,
        'identificadorPropuesta': this._cfg.propuesta.identificadorPropuesta,
        'indicadorConsulta': this._cfg.indicadorConsulta
      },
      'clavePaginacion': "0"
    };

    if (this._cfg.idGarantia) {
      model.datoDocumentoExpediente.codigoIdentificadorGarantia = this._cfg.idGarantia;
    }

    return new Promise((resolve, reject) => {
      this._subprocesoInyeccion.inicia(model).when('MostrarDocumentosGestoriasIU', data => {
        resolve(data);
      }).error(reject);
    });
  }

  _load() {
    return new Promise((resolve, reject) => {
      this._getPage().then(data => {
        this._documentos = Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["filterAndAdjust"])(data.documentos);
        resolve(this._documentos);
      }).catch(reject);
    });
  }

  _loadmock() {
    return new Promise((resolve, reject) => {
      const pp = __webpack_require__(/*! ../mocks/k.json */ "./src/mocks/k.json");

      this._documentos = [...this._documentos, ...Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["filterAndAdjust"])(pp.data.documentos)];
      resolve(this._documentos);
    });
  }

} //export {mapAccion, URLS, EVENT}

/***/ }),

/***/ "./src/components/GestDoc.scss":
/*!*************************************!*\
  !*** ./src/components/GestDoc.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit;\n  display: block;\n  height: inherit;\n  --back-principal: #f1f1f1;\n  --borde-suave: #ebebeb;\n  --guia: #c0c0c0;\n  --front: #fafafa;\n  font-size: 13px;\n  /*por fefecto, si el que usa el componente no lo declara*/ }\n\n* {\n  box-sizing: border-box; }\n\n#root {\n  display: flex;\n  flex-direction: column;\n  background-color: #e7e5e5;\n  border-radius: .1em;\n  position: relative;\n  height: inherit; }\n\n.cab {\n  flex-shrink: 0;\n  padding: .7em .7em .7em 3em;\n  font-size: .9em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/documentos.png */ "./src/components/img/documentos.png")) + ");\n  background-repeat: no-repeat;\n  background-position: .6em; }\n\n#client {\n  flex-grow: 1;\n  margin: .3em;\n  padding: .4em;\n  overflow-y: auto;\n  background-color: white;\n  border-radius: .1em; }\n  #client > .reg:nth-child(even) {\n    background-color: #f6f6f6; }\n\n.reg {\n  position: relative; }\n  .reg .children {\n    padding-left: 1.8em;\n    position: relative;\n    border-radius: .2em;\n    transition: opacity .3s ease; }\n    .reg .children.collapsed {\n      overflow: hidden;\n      height: 0;\n      opacity: 0; }\n    .reg .children .reg:first-child::before {\n      height: 2em;\n      top: -.9em; }\n    .reg .children .reg::after {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      height: 0;\n      width: 1.9em;\n      border-top: 1px solid var(--guia);\n      top: 1em;\n      left: -1.4em; }\n    .reg .children .reg::before {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      border-left: 1px solid var(--guia);\n      height: 2.3em;\n      width: 0;\n      top: -1.3em;\n      left: -1.4em; }\n\n.node {\n  display: flex; }\n  .node.multiArchivo .manejador {\n    background-image: url(" + escape(__webpack_require__(/*! ./img/minus.svg */ "./src/components/img/minus.svg")) + ");\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    border: 1px solid #aaa;\n    border-radius: 2px;\n    transition: background-color .3s ease;\n    cursor: pointer;\n    margin-top: .6em; }\n    .node.multiArchivo .manejador:hover {\n      background-color: #aaa; }\n    .node.multiArchivo .manejador.collapsed {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/plus.svg */ "./src/components/img/plus.svg")) + "); }\n  .node > div {\n    padding: .6em 0; }\n  .node > div + div {\n    margin-left: .7em; }\n  .node .manejador {\n    flex-shrink: 0;\n    width: 0.9em;\n    height: 0.9em;\n    margin-right: -0.6em;\n    padding: 0; }\n  .node .text {\n    padding-left: .3em;\n    flex-grow: 1;\n    flex-basis: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .node .obli {\n    width: .9em; }\n    .node .obli.activo::before {\n      content: \"*\";\n      background-color: #ffcc01;\n      color: #017a99;\n      padding: 0 .1em; }\n  .node .firma {\n    width: 1.3em; }\n    .node .firma.activo {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/required-signature.svg */ "./src/components/img/required-signature.svg")) + ");\n      background-repeat: no-repeat;\n      background-position: center; }\n  .node .info {\n    width: 1.4em; }\n    .node .info.activo {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/help.svg */ "./src/components/img/help.svg")) + ");\n      background-repeat: no-repeat;\n      background-position: center;\n      cursor: pointer;\n      transition: opacity .2s ease-in-out; }\n      .node .info.activo:hover {\n        opacity: .7; }\n  .node .estado {\n    width: 12em;\n    padding-left: 1.5em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    background-repeat: no-repeat;\n    background-size: 1.1em;\n    background-position: 0 .7em; }\n    .node .estado.agree {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/agree.svg */ "./src/components/img/agree.svg")) + "); }\n    .node .estado.progress {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/in-progress.svg */ "./src/components/img/in-progress.svg")) + "); }\n    .node .estado.excepted {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/excepted.svg */ "./src/components/img/excepted.svg")) + "); }\n  .node .acciones {\n    width: 10em;\n    display: flex; }\n    .node .acciones .ancla {\n      flex-grow: 1;\n      position: relative;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      transition: opacity .2s ease-in-out; }\n      .node .acciones .ancla:hover {\n        opacity: .7; }\n      .node .acciones .ancla .cap {\n        cursor: pointer;\n        color: #018ec0;\n        text-decoration: underline; }\n      .node .acciones .ancla input {\n        position: absolute;\n        top: 0;\n        left: -160%;\n        width: 300%;\n        height: 110%;\n        opacity: 0;\n        cursor: pointer; }\n    .node .acciones .menu.activo {\n      flex-shrink: 0;\n      width: 1.5em;\n      background-image: url(" + escape(__webpack_require__(/*! ./img/contextual-menu.svg */ "./src/components/img/contextual-menu.svg")) + ");\n      background-repeat: no-repeat;\n      background-position: center;\n      cursor: pointer;\n      transition: opacity .2s ease-in-out; }\n      .node .acciones .menu.activo:hover {\n        opacity: .7; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/GestDocTree.html":
/*!*****************************************!*\
  !*** ./src/components/GestDocTree.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div class='cab'>\r\n        <div class='documento'><div>Documento</div></div>\r\n        <div class='help'></div>\r\n        <div class='obl'><div >Obl.</div></div>\r\n        <div class='archivo'><div>Archivo físico</div></div>\r\n        <div class='incorporado'><div>Incorporado por</div></div>\r\n        <div class='estado'><div>Estado</div></div>\r\n        <div class='acciones'><div>Acciones</div></div>\r\n        <div class='scroll'></div>\r\n    </div>\r\n    <div id='client'></div>\r\n    <div id='pie'>\r\n        <div class='ayuda'>\r\n            <div class='pObli'>Obligatorio</div>\r\n            <div class='pInfo'>Información</div>\r\n            <div class='pAportado'>Aportado Resolución</div>\r\n            <div class='pExceptuado'>Exceptuado</div>\r\n            <div class='pPlantilla'>Plantilla Documento</div>\r\n            <div class='pEnTramite'>En trámite</div>\r\n            <div class='pEnTramite2'>En Trámite</div>\r\n            <div class='pPendiente'>Pendiente</div>\r\n            <div class='pFirma'>Firma obligatoria</div>\r\n        </div>\r\n        <div class='mas'></div>\r\n    </div>\r\n</div>\r\n";

/***/ }),

/***/ "./src/components/GestDocTree.js":
/*!***************************************!*\
  !*** ./src/components/GestDocTree.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GestDocTree; });
/* harmony import */ var _GestDocTree_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GestDocTree.html */ "./src/components/GestDocTree.html");
/* harmony import */ var _GestDocTree_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_GestDocTree_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GestDocTree_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GestDocTree.scss */ "./src/components/GestDocTree.scss");
/* harmony import */ var _GestDocTree_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_GestDocTree_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Subprocess__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Subprocess */ "./src/components/Subprocess.js");
/* harmony import */ var filenamify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! filenamify */ "./node_modules/filenamify/index.js");
/* harmony import */ var filenamify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(filenamify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");
/* harmony import */ var _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utilGestDoc */ "./src/components/utilGestDoc.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







let idCounter = 0;

function esGarantia(doc) {
  return doc.identificadorExpedienteGarantia && doc.identificadorExpedienteGarantia.trim() && doc.codigoExpedienteInterviniente === ' ';
}

function esInterviniente(doc) {
  return doc.codigoExpedienteInterviniente && doc.codigoExpedienteInterviniente.trim() && doc.identificadorExpedienteGarantia === ' ';
}

function esDocumento(doc) {
  return doc.identificadorSubtipoDocumento && doc.identificadorSubtipoDocumento.trim();
}

function defineExpediente(doc) {
  return !!doc.indicadorDocumentoDefinidoExpediente;
}

function esAgrupacion(doc) {
  return doc.indicadorAgrupacion && doc.indicadorAgrupacion.trim();
}

function composeNameGarantia(name) {
  const splitted = name.split('#', 2);
  return splitted.length > 1 ? splitted[1] + ' - ' + splitted[0] : splitted[0];
}

function processTree(docs, cfg) {
  idCounter = 0;
  const garantias = {};
  const expedientes = {};
  const intervinientes = {};
  const libres = [];
  docs.forEach(doc => {
    if (!esDocumento(doc)) {
      return;
    }

    if (defineExpediente(doc)) {
      addChildren(doc, expedientes, cfg.propuesta.identificadorExpediente, 'Expediente Nº ' + cfg.propuesta.identificadorExpediente);
    } else {
      //no define expediente
      if (esInterviniente(doc)) {
        addChildren(doc, intervinientes, doc.codigoExpedienteInterviniente, doc.nombreInterviniente);
      } else if (esGarantia(doc)) {
        doc.nombreGarantia = composeNameGarantia(doc.nombreGarantia);
        addChildren(doc, garantias, doc.identificadorExpedienteGarantia, doc.nombreGarantia);
      } else {
        libres.push(doc);
      }
    }
  });
  const modelo = [...Object.values(intervinientes), ...Object.values(garantias), ...Object.values(expedientes), ...libres];
  modelo.forEach(it => {
    if (it.agrupaciones) {
      it.children.unshift(...Object.values(it.agrupaciones)); //it.agrupaciones.forEach(a=>it.children.unshift(Object.values(a)))
    }
  }); //modelo[2].children = [ ...modelo[2].children[0].children, ...modelo[2].children]
  //modelo[2].children.unshift(...[modelo[2].children[0].children])

  return modelo;
}

function addChildren(doc, obj, id, nombreSubtipoDocumento) {
  if (!obj[id]) {
    obj[id] = {
      nombreSubtipoDocumento,
      children: [],
      nivel: 1,
      agrupaciones: [],
      id: String(idCounter++)
    };
  }

  if (esAgrupacion(doc) && !obj[id].agrupaciones[doc.indicadorAgrupacion]) {
    obj[id].agrupaciones[doc.indicadorAgrupacion] = {
      nombreSubtipoDocumento: doc.nombreAgrupacion,
      children: [],
      nivel: 2,
      id: String(idCounter++),
      parent: obj[id]
    };
  }

  if (esAgrupacion(doc)) {
    obj[id].agrupaciones[doc.indicadorAgrupacion].children.push(_objectSpread({}, doc, {
      parent: obj[id].agrupaciones[doc.indicadorAgrupacion]
    }));
  } else {
    obj[id].children.push(_objectSpread({}, doc, {
      parent: obj[id]
    }));
  }
}

class GestDocTree extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _GestDocTree_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _GestDocTree_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._root = shadowRoot.querySelector('#root');
    this._client = shadowRoot.querySelector('#client');
    this._mas = shadowRoot.querySelector('.mas');
    this._handle = this._handle.bind(this);
    this._handlescroll = this._handlescroll.bind(this);
    this._handleMas = this._handleMas.bind(this);
    this._error = this._error.bind(this); //

    this._cfg = null;
    this._subprocesoInyeccion = new _Subprocess__WEBPACK_IMPORTED_MODULE_2__["default"](_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["URLS"].GESTIONARDOCUMENTOSGESTORIAS);

    this._subprocesoInyeccion.error(this._error);

    this._documentos = [];
    this._documentosMulti = [];
    this._modelo = undefined;
    this._expanded = [];
    this._expandedMulti = [];
    this._indicadorMasDocumentos = false;
    this._clavePaginacion = 0;
    this._multisInyectar = [];
    this._reconect = false;
  }

  _dispatchEvent(msg) {
    if (msg == _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].NOTIFY_PENDING) {
      this.dispatchEvent(new CustomEvent("bk-event", {
        detail: {
          msg,
          documentosPendientes: Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["documentosPendientes"])(this._documentos)
        },
        bubbles: true
      }));
      return;
    }

    this.dispatchEvent(new CustomEvent("bk-event", {
      detail: {
        msg
      },
      bubbles: true
    }));
  }

  _generarPlantilla(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].generarPlantilla(doc, this._cfg, this._subprocesoInyeccion).then(url => {
      return Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["descargaFichero"])(url, filenamify__WEBPACK_IMPORTED_MODULE_3___default()('plantilla_exp' + this._cfg.propuesta.identificadorExpediente)).catch(e => {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
        return Promise.reject(e);
      });
    }).then(() => this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE)).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _exceptuarDocumento(doc) {
    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].exceptuarDocumento(doc).then(r => r && this._render());
  }

  _verDetalleExceptuado(doc) {
    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].obtenerMotivoExceptuacion(doc, this._cfg).then(r => r && this._render());
  }

  _eliminarDocumento(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].eliminarDocumento(doc, this._subprocesoInyeccion).then(r => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      this._render();
    }).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _consultarDocumento(doc) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].consultarDocumento(doc, this._cfg, this._subprocesoInyeccion).then(url => {
      return Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["descargaFichero"])(url, filenamify__WEBPACK_IMPORTED_MODULE_3___default()(doc.nombreSubtipoDocumento + '_exp' + this._cfg.propuesta.identificadorExpediente)).catch(e => {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
        return Promise.reject(e);
      });
    }).then(() => this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE)).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    });
  }

  _adjuntarDocumento(doc, accion, file) {
    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    Object(_servicios__WEBPACK_IMPORTED_MODULE_4__["subirFichero"])(file).then(data => {
      if (accion == 'AD') {
        return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].adjuntarDocumento(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage);
      } else {
        this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

        return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["acciones"].adjuntarFirma(doc, this._cfg, this._subprocesoInyeccion, data.operationMessage);
      }
    }).then(r => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      r && this._render();
    }).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);
    });
  }

  _error(e) {
    Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarError"])(e);

    if (this._subprocesoInyeccion.abierto && !this._reconect) {
      this._reconect = true;
      const that = this; //dana

      setTimeout(function () {
        that._render();
      }, 100);
    }
  }

  _accion(doc, accion, file) {
    //console.log(doc, accion)
    if (['VI', 'IM', 'EM', 'DE'].includes(accion)) {
      this._consultarDocumento(doc);
    } else if (['DP', 'EP', 'IP', 'VP'].includes(accion)) {
      this._generarPlantilla(doc);
    } else if (['AD', 'AF'].includes(accion)) {
      this._adjuntarDocumento(doc, accion, file);
    } else if (['AN'].includes(accion)) {
      this._eliminarDocumento(doc);
    } else if (['VD'].includes(accion)) {
      this._verDetalleExceptuado(doc);
    } else if (['EX'].includes(accion)) {
      this._exceptuarDocumento(doc);
    } //else{throw new Error(`Acción '${accion}' no prevista`);}

  }

  _handleMas() {
    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(this._mas, '.disabled')) {
      return;
    }

    this._backupEstado();

    this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    this._loadPage(this._clavePaginacion).then(docs => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      this._modelo = processTree(docs, this._cfg);
      this._client.innerHTML = "";
      this._multisInyectar = [];

      this._paint(this._modelo, this._client);

      this._inyectarMultiArchivos(true);

      !this._indicadorMasDocumentos && this._mas.classList.add('disabled');

      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].NOTIFY_PENDING);
    }).catch(e => {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

      this._error(e);
    });
  }

  _handlescroll() {
    this.dispatchEvent(new CustomEvent("bk-scroll", {
      bubbles: true
    }));
  }

  _handle(e) {
    const target = e.composedPath()[0];

    if (e.type == "click" && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, 'input')) {
      target.value = "";
      return;
    }

    if (e.type == "change" && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, 'input')) {
      if (!target.files[0]) {
        return;
      }

      const node = target.closest('.nodoD');
      const doc = (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.file') ? this._documentosMulti : this._documentos).find(d => d.id == node.getAttribute("data-id"));
      const file = target.files[0];
      const accion = target.closest('.ancla').getAttribute('data-id');

      this._accion(doc, accion, file);

      return;
    }

    if (e.type == "bk-click") {
      const accion = e.detail.accion;
      const node = e.composedPath()[0];

      if (!node || !Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.nodoD')) {
        return;
      }

      const doc = (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.file') ? this._documentosMulti : this._documentos).find(d => d.id == node.getAttribute("data-id"));

      this._accion(doc, accion, e.detail.file);

      return;
    }

    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '#client')) {
      return;
    }

    const node = target.closest('.nodoA, .nodoD');

    if (!node) {
      return;
    }

    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.manejador') && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.nodoA')) {
      //expand/collapse
      node.querySelector('.children').classList.toggle('collapsed');
      target.classList.toggle('collapsed');
    }

    if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.manejador') && Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.nodoD.multiArchivo')) {
      //expand/collapse
      node.querySelector('.children').classList.toggle('collapsed');
      target.classList.toggle('collapsed');

      const doc = this._documentos.find(d => d.id == node.getAttribute("data-id"));

      this._inyectarMultiArchivo(node, doc, true);
    } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.nodoD')) {
      const doc = (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(node, '.file') ? this._documentosMulti : this._documentos).find(d => d.id == node.getAttribute("data-id"));

      if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.help.activo')) {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarInfoDoc"])(doc, e, this._cfg.indicadorConsulta);
      } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.menu')) {
        Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mostrarMenuAcciones"])(doc, e, node);
      } else if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.ancla') || Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(target, '.cap')) {
        const ancla = target.closest('.ancla');

        this._accion(doc, ancla.getAttribute('data-id'));
      }
    }
  }

  _inyectarMultiArchivos(mod) {
    //console.log('sdfadfasdf',this._multisInyectar)
    mod && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);

    const arc = this._multisInyectar.pop();

    if (arc) {
      const [node, doc] = arc;
      node.querySelector('.manejador').classList.remove('collapsed');
      node.querySelector('.children').classList.remove('collapsed');

      this._inyectarMultiArchivo(node, doc).then(() => this._inyectarMultiArchivos());
    } else {
      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
    }
  }

  _inyectarMultiArchivo(node, doc, dispatch) {
    if (node.querySelector('.children').innerHTML !== "") {
      return Promise.resolve(true);
    }

    dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);
    return new Promise((resolve, reject) => {
      Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["obtenerMultiArchivo"])(node, doc, this._cfg.indicadorConsulta, this._subprocesoInyeccion).then(r => {
        dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);

        if (r === true) {
          resolve(true);
        } //console.log(r)


        const ref = node.querySelector('.children');

        if (node.nextElementSibling) {
          ref.classList.add('vertical');
        }

        r.forEach(obj => {
          this._documentosMulti.push(obj);

          const n = document.createElement('div');
          n.classList.add('nodoD', 'file');
          n.innerHTML = __webpack_require__(/*! ./fragments/nodoDoc.html */ "./src/components/fragments/nodoDoc.html");
          n.setAttribute('data-id', obj.id);

          this._paintDoc(obj, n.querySelector('.doc'));

          ref.appendChild(n);
        });
        resolve(true);
      }).catch(e => {
        console.log(e);
        dispatch && this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
      });
    });
  }

  _paint(obj, ref) {
    if (Array.isArray(obj)) {
      obj.forEach(it => this._paint(it, ref));
    } else if (obj.children) {
      const n = document.createElement('div');
      n.classList.add('nodoA');
      obj.nivel == 1 && n.classList.add('raiz');
      n.innerHTML = __webpack_require__(/*! ./fragments/nodoArbol.html */ "./src/components/fragments/nodoArbol.html");
      n.querySelector('.txt').innerText = obj.nombreSubtipoDocumento;
      n.setAttribute('data-id', obj.id);

      if (obj.nivel == 2) {
        const vert = document.createElement('span');
        vert.classList.add('vert');
        n.appendChild(vert);
        obj.parent.children.forEach((c, i) => {
          if (c === obj && i < obj.parent.children.length - 1) {
            n.querySelector('.children').classList.add('vertical');
          }
        });
      }

      if (this._expanded.includes(obj.id)) {
        n.querySelector('.manejador').classList.remove('collapsed');
        n.querySelector('.children').classList.remove('collapsed');
      }

      ref.appendChild(n);

      this._paint(obj.children, n.querySelector('.children'));
    } else {
      //doc
      const n = document.createElement('div');
      n.classList.add('nodoD');

      if (Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(ref, '#client')) {
        n.classList.add('raiz');
      }

      n.innerHTML = __webpack_require__(/*! ./fragments/nodoDoc.html */ "./src/components/fragments/nodoDoc.html");
      n.setAttribute('data-id', obj.id);

      this._paintDoc(obj, n.querySelector('.doc'));

      if (obj.indicadorMultiArchivo) {
        n.classList.add('multiArchivo');

        if (this._expandedMulti.includes(obj.id)) {
          this._multisInyectar.push([n, obj]);
        }
      }

      ref.appendChild(n);
    }
  }

  _paintDoc(obj, ref) {
    ref.querySelector('.documento').innerText = obj.nombreSubtipoDocumento;
    ref.querySelector('.documento').title = obj.nombreSubtipoDocumento;

    if (obj.indicadorDescripcion) {
      ref.querySelector('.help').classList.add('activo');
    }

    if (obj.indicadorObligatoriedad) {
      ref.querySelector('.obli').classList.add('activo');
    }

    if (obj.indicadorRequiereFirma) {
      ref.querySelector('.firma').classList.add('activo');
    }

    ref.querySelector('.archivo').innerText = obj.indicadorArchivo ? 'Sí' : 'No';
    ref.querySelector('.incorporado').innerText = obj.incorporadoPor && obj.incorporadoPor.trim() ? obj.incorporadoPor : '-';
    ref.querySelector('.estado').innerText = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapEstado"][obj.codigoEstado] || '';
    ref.querySelector('.estado').title = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapEstado"][obj.codigoEstado] || '';
    let clase = '';

    if (obj.codigoEstado == 'EE') {
      clase = 'agree';
    } else if (obj.codigoEstado == 'EX') {
      clase = 'excepted';
    } else if (['NA', 'NG', 'BL', 'GN', 'GS', 'NE', 'EF', 'PF', 'EP'].includes(obj.codigoEstado)) {
      clase = 'progress';
    } else if (obj.codigoEstado == 'ND') {
      clase = 'pending';
    }

    if (clase) {
      ref.querySelector('.estado').classList.add(clase);
    }

    if (obj.acciones.length > 0 && _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapAccion"][obj.acciones[0].codigoAccion]) {
      ref.querySelector('.cap').innerText = _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["mapAccion"][obj.acciones[0].codigoAccion] || '';
      ref.querySelector('.ancla').setAttribute('data-id', obj.acciones[0].codigoAccion);

      if (['AD', 'AF'].includes(obj.acciones[0].codigoAccion)) {
        const file = document.createElement('input');
        file.setAttribute('type', 'file');
        ref.querySelector('.ancla').appendChild(file);
      }
    }

    if (obj.acciones.length > 1) {
      ref.querySelector('.menu').classList.add('activo');
    }
  }

  _backupEstado() {
    this._expanded = [];
    this._expandedMulti = [];

    this._client.querySelectorAll('.nodoA').forEach(nodo => {
      if (!Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(nodo.querySelector('.manejador'), '.collapsed')) {
        this._expanded.push(nodo.getAttribute('data-id'));
      }
    });

    this._client.querySelectorAll('.nodoD.multiArchivo').forEach(nodo => {
      if (!Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["is"])(nodo.querySelector('.manejador'), '.collapsed')) {
        this._expandedMulti.push(nodo.getAttribute('data-id'));
      }
    });

    console.log(this._expandedMulti);
  }

  _render(noShowLoading) {
    Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["resetSec"])();

    this._backupEstado();

    noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].SHOW_LOADING_EXPEDIENTE);
    this._documentos = [];
    let consulta = undefined;

    if (this._clavePaginacion > 0) {
      consulta = this._loadMultiple(this._clavePaginacion);
      this._clavePaginacion = 0;
    } else {
      consulta = this._loadPage(0);
    }

    consulta.then(docs => {
      noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE);
      this._modelo = processTree(docs, this._cfg);
      this._client.innerHTML = "";
      this._multisInyectar = [];

      this._paint(this._modelo, this._client);

      this._inyectarMultiArchivos(!noShowLoading);

      !this._indicadorMasDocumentos && this._mas.classList.add('disabled'); //console.log(this._modelo)

      this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].NOTIFY_PENDING);

      this._reconect = false;
    }).catch(e => {
      noShowLoading || this._dispatchEvent(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"].HIDE_LOADING_EXPEDIENTE); //this._error(e)
    });
  }

  _getPage(num) {
    const codigoTarea = [this._cfg.tarea.codigoTarea + (this._cfg.notG ? "" : "G")];
    const model = {
      'datoDocumentoExpediente': {
        'codigoFase': this._cfg.fase,
        'identificadorInstanciaProceso': this._cfg.tarea.identificadorExpedienteDocumental,
        'codigosSubprocesos': codigoTarea,
        'identificadorPropuesta': this._cfg.propuesta.identificadorPropuesta,
        'indicadorConsulta': this._cfg.indicadorConsulta
      },
      'clavePaginacion': String(num)
    };

    if (this._cfg.idGarantia) {
      model.datoDocumentoExpediente.codigoIdentificadorGarantia = this._cfg.idGarantia;
    }

    return new Promise((resolve, reject) => {
      this._subprocesoInyeccion.inicia(model).when('MostrarDocumentosGestoriasIU', data => {
        resolve(data);
      }).error(reject);
    });
  }

  _loadMultiple(claveHasta) {
    return this._loadPage(this._clavePaginacion).then(() => {
      if (this._clavePaginacion < claveHasta) {
        return this._loadMultiple(claveHasta);
      }

      return this._documentos;
    });
  }

  _loadPage(clave) {
    return new Promise((resolve, reject) => {
      this._getPage(clave).then(data => {
        this._indicadorMasDocumentos = data.indicadorMasDocumentos;
        this._clavePaginacion = data.clavePaginacionOut || 0;
        this._documentos = [...this._documentos, ...Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["filterAndAdjust"])(data.documentos)];
        resolve(this._documentos);
      }).catch(reject);
    });
  }

  _loadinit2() {
    return new Promise((resolve, reject) => {
      const pp = __webpack_require__(/*! ../mocks/k.json */ "./src/mocks/k.json");

      this._indicadorMasDocumentos = pp.data.indicadorMasDocumentos;
      this._clavePaginacion = pp.data.clavePaginacionOut || 0;
      this._documentos = [...this._documentos, ...Object(_utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["filterAndAdjust"])(pp.data.documentos)];
      resolve(this._documentos);
    });
  }

  set cfg(cfg) {
    this._cfg = cfg;

    this._render();
  }

  get EVENT() {
    return _utilGestDoc__WEBPACK_IMPORTED_MODULE_5__["EVENT"];
  }

  connectedCallback() {
    this._client.addEventListener('click', this._handle);

    this._client.addEventListener('bk-click', this._handle);

    this._client.addEventListener('change', this._handle);

    this.shadowRoot.addEventListener('scroll', this._handlescroll, true);

    this._mas.addEventListener('click', this._handleMas);
  }

  disconnectedCallback() {
    this._client.removeEventListener('click', this._handle);

    this._client.removeEventListener('bk-click', this._handle);

    this._client.removeEventListener('change', this._handle);

    this.shadowRoot.removeEventListener('scroll', this._handlescroll, true);

    this._mas.removeEventListener('click', this._handleMas);
  }

} //export {mapAccion, URLS, EVENT}

/***/ }),

/***/ "./src/components/GestDocTree.scss":
/*!*****************************************!*\
  !*** ./src/components/GestDocTree.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit;\n  display: block;\n  height: inherit;\n  --back-principal: #f1f1f1;\n  --borde-suave: #ebebeb;\n  --guia: #c0c0c0;\n  --front: #fafafa;\n  font-size: 13px;\n  /*por fefecto, si el que usa el componente no lo declara*/ }\n\n* {\n  box-sizing: border-box; }\n\n#root {\n  display: flex;\n  flex-direction: column;\n  background-color: var(--back-principal);\n  border-radius: .1em;\n  position: relative;\n  padding: .3em;\n  height: inherit;\n  border: 1px solid var(--borde-suave); }\n\n.cab {\n  display: flex;\n  flex-shrink: 0;\n  background-color: #e8e6e7; }\n  .cab > div {\n    padding: .2em .2em .2em .5em;\n    border-right: 1px solid var(--borde-suave);\n    display: flex;\n    align-items: center; }\n\n#client {\n  flex-grow: 1;\n  padding: .4em 0;\n  overflow-y: scroll;\n  border-radius: .1em; }\n\n.nodoA {\n  position: relative; }\n  .nodoA > .vert {\n    position: absolute;\n    border-left: 1px solid var(--guia);\n    display: inline-block;\n    height: 2.4em;\n    width: 0;\n    top: -1.4em;\n    left: -1.1em; }\n  .nodoA:first-child > .vert {\n    top: -0.85em;\n    height: 1.85em; }\n  .nodoA > .cuerpo {\n    padding-left: .3em;\n    display: flex; }\n    .nodoA > .cuerpo .txt {\n      padding: .6em .3em;\n      flex-grow: 1;\n      flex-basis: 0; }\n    .nodoA > .cuerpo .manejador {\n      display: inline-block;\n      background-image: url(" + escape(__webpack_require__(/*! ./img/minus.svg */ "./src/components/img/minus.svg")) + ");\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: center;\n      width: 0.9em;\n      height: 0.9em;\n      padding: .1em;\n      margin-right: 0.1em;\n      border: 1px solid #aaa;\n      border-radius: 2px;\n      transition: background-color .3s ease;\n      cursor: pointer;\n      margin-top: .6em; }\n      .nodoA > .cuerpo .manejador:hover {\n        background-color: #aaa; }\n      .nodoA > .cuerpo .manejador.collapsed {\n        background-image: url(" + escape(__webpack_require__(/*! ./img/plus.svg */ "./src/components/img/plus.svg")) + "); }\n  .nodoA > .children {\n    border: 1px solid var(--borde-suave);\n    border-right-width: 0;\n    padding-left: 1.8em;\n    background-color: var(--front);\n    position: relative;\n    border-radius: .2em;\n    transition: opacity .3s ease; }\n    .nodoA > .children.collapsed {\n      /*display: none;*/\n      overflow: hidden;\n      height: 0;\n      opacity: 0; }\n    .nodoA > .children.vertical::before {\n      content: '';\n      position: absolute;\n      border-left: 1px solid var(--guia);\n      display: inline-block;\n      height: calc(100% + 1px);\n      width: 0;\n      top: -1.38em;\n      left: -1.2em; }\n  .nodoA.raiz > .children {\n    background-color: transparent;\n    border-width: 0; }\n  .nodoA:not(.raiz)::after {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    height: 0;\n    width: 1.4em;\n    border-top: 1px solid var(--guia);\n    top: 1em;\n    left: -1.1em; }\n\n.nodoD {\n  border-bottom: 1px solid var(--borde-suave);\n  background-color: var(--front);\n  position: relative;\n  border-radius: 2px; }\n  .nodoD:last-child {\n    border-bottom-width: 0; }\n  .nodoD > .children {\n    /*border: 1px solid var(--borde-suave);*/\n    border-right-width: 0;\n    padding-left: 1.8em;\n    background-color: var(--front);\n    position: relative;\n    border-radius: .2em;\n    transition: opacity .3s ease; }\n    .nodoD > .children.collapsed {\n      overflow: hidden;\n      height: 0;\n      opacity: 0; }\n    .nodoD > .children.vertical::before {\n      content: '';\n      position: absolute;\n      border-left: 1px solid var(--guia);\n      display: inline-block;\n      height: 100%;\n      width: 0;\n      top: -1.3em;\n      left: -1.1em; }\n  .nodoD > .cuerpo {\n    padding-left: .3em;\n    display: flex; }\n    .nodoD > .cuerpo .doc {\n      flex-grow: 1; }\n  .nodoD .manejador {\n    display: inline-block;\n    flex-shrink: 0;\n    width: 0.9em;\n    height: 0.9em;\n    padding: .1em;\n    margin-right: 0.1em; }\n  .nodoD.multiArchivo > .cuerpo > .manejador {\n    background-image: url(" + escape(__webpack_require__(/*! ./img/minus.svg */ "./src/components/img/minus.svg")) + ");\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n    border: 1px solid #aaa;\n    border-radius: 2px;\n    transition: background-color .3s ease;\n    cursor: pointer;\n    margin-top: .6em; }\n    .nodoD.multiArchivo > .cuerpo > .manejador:hover {\n      background-color: #aaa; }\n    .nodoD.multiArchivo > .cuerpo > .manejador.collapsed {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/plus.svg */ "./src/components/img/plus.svg")) + "); }\n  .nodoD:not(.raiz)::after {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    height: 0;\n    width: 1.4em;\n    border-top: 1px solid var(--guia);\n    top: 1em;\n    left: -1.1em; }\n  .nodoD:not(.raiz)::before {\n    content: '';\n    position: absolute;\n    display: inline-block;\n    border-left: 1px solid var(--guia);\n    height: 2.4em;\n    width: 0;\n    top: -1.4em;\n    left: -1.1em; }\n  .nodoD:not(.raiz):first-child::before {\n    height: 1.9em;\n    top: -0.9em; }\n\n.nodoD .doc {\n  display: flex;\n  margin-left: .3em;\n  width: 96%;\n  /*bug de web flow??*/ }\n  .nodoD .doc > div {\n    padding: .6em 0;\n    border-right: 1px solid var(--borde-suave); }\n  .nodoD .doc .help.activo {\n    background-image: url(" + escape(__webpack_require__(/*! ./img/help.svg */ "./src/components/img/help.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: 1.4em;\n    cursor: pointer;\n    transition: opacity .2s ease-in-out; }\n    .nodoD .doc .help.activo:hover {\n      opacity: .7; }\n  .nodoD .doc .obl .obli {\n    display: inline-block;\n    vertical-align: top;\n    width: .9em; }\n    .nodoD .doc .obl .obli.activo::before {\n      content: \"*\";\n      background-color: #ffcc01;\n      color: #017a99;\n      padding: 0 .1em; }\n  .nodoD .doc .obl .firma {\n    display: inline-block;\n    width: 1.3em;\n    height: 100%; }\n    .nodoD .doc .obl .firma.activo {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/required-signature.svg */ "./src/components/img/required-signature.svg")) + ");\n      background-repeat: no-repeat;\n      background-position: center; }\n  .nodoD .doc .estado {\n    padding-left: 1.8em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    background-repeat: no-repeat;\n    background-size: 1.1em;\n    background-position: 0.3em .5em; }\n    .nodoD .doc .estado.agree {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/agree.svg */ "./src/components/img/agree.svg")) + "); }\n    .nodoD .doc .estado.progress {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/in-progress.svg */ "./src/components/img/in-progress.svg")) + "); }\n    .nodoD .doc .estado.excepted {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/excepted.svg */ "./src/components/img/excepted.svg")) + "); }\n    .nodoD .doc .estado.pending {\n      background-image: url(" + escape(__webpack_require__(/*! ./img/pending.svg */ "./src/components/img/pending.svg")) + "); }\n  .nodoD .doc .acciones {\n    display: flex; }\n    .nodoD .doc .acciones .ancla {\n      flex-grow: 1;\n      position: relative;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      transition: opacity .2s ease-in-out; }\n      .nodoD .doc .acciones .ancla:hover {\n        opacity: .7; }\n      .nodoD .doc .acciones .ancla .cap {\n        margin-left: .3em;\n        cursor: pointer;\n        color: #018ec0;\n        text-decoration: underline; }\n      .nodoD .doc .acciones .ancla input {\n        position: absolute;\n        top: 0;\n        left: -160%;\n        width: 300%;\n        height: 110%;\n        opacity: 0;\n        cursor: pointer; }\n    .nodoD .doc .acciones .menu.activo {\n      margin-right: .2em;\n      flex-shrink: 0;\n      width: 1.5em;\n      background-image: url(" + escape(__webpack_require__(/*! ./img/contextual-menu.svg */ "./src/components/img/contextual-menu.svg")) + ");\n      background-repeat: no-repeat;\n      background-position: center;\n      cursor: pointer;\n      transition: opacity .2s ease-in-out; }\n      .nodoD .doc .acciones .menu.activo:hover {\n        opacity: .7; }\n\n.documento {\n  flex-grow: 1;\n  flex-basis: 0;\n  flex-shrink: 1;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.help {\n  width: 2em;\n  flex-shrink: 0; }\n\n.obl {\n  width: 3em;\n  text-align: center;\n  flex-shrink: 0; }\n\n.archivo {\n  width: 5em;\n  text-align: center;\n  flex-shrink: 0; }\n\n.incorporado {\n  width: 7em;\n  text-align: center;\n  flex-shrink: 0; }\n\n.estado {\n  width: 11em;\n  flex-shrink: 0; }\n\n.acciones {\n  width: 13em;\n  flex-shrink: 0; }\n\n.scroll {\n  width: 17px;\n  flex-shrink: 0; }\n\n#pie {\n  display: flex;\n  flex-shrink: 0; }\n  #pie .ayuda {\n    flex-grow: 1;\n    display: flex; }\n    #pie .ayuda > div {\n      padding: .5em .5em .5em 1.6em;\n      position: relative; }\n  #pie .mas {\n    align-self: flex-start;\n    flex-shrink: 0;\n    padding: .6em .5em;\n    border: 1px solid -var(--borde-suave);\n    border-radius: 2px;\n    background-image: url(" + escape(__webpack_require__(/*! ./img/following-results.svg */ "./src/components/img/following-results.svg")) + ");\n    background-repeat: no-repeat;\n    background-position: center;\n    background-size: .7em;\n    box-shadow: 0 2px 1px #888;\n    transition: opacity .3s ease-in;\n    cursor: pointer; }\n    #pie .mas:hover {\n      opacity: .7; }\n    #pie .mas.disabled {\n      opacity: .5;\n      cursor: no-drop; }\n\n.pObli::before {\n  position: absolute;\n  content: \"*\";\n  background-color: #ffcc01;\n  color: #017a99;\n  padding: 0 .1em;\n  left: .7em;\n  top: .4em; }\n\n.pInfo {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/help.svg */ "./src/components/img/help.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pAportado {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/warning.svg */ "./src/components/img/warning.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pExceptuado {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/excepted.svg */ "./src/components/img/excepted.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pPlantilla {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/template.svg */ "./src/components/img/template.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pEnTramite::before {\n  position: absolute;\n  border-radius: .6em;\n  content: \"\";\n  background-color: #e5790e;\n  padding: .6em .8em;\n  left: -.2em;\n  top: .4em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/in-progressW.svg */ "./src/components/img/in-progressW.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 1em; }\n\n.pEnTramite2 {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/in-progress.svg */ "./src/components/img/in-progress.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pPendiente {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/pending.svg */ "./src/components/img/pending.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.2em; }\n\n.pFirma {\n  background-image: url(" + escape(__webpack_require__(/*! ./img/required-signature.svg */ "./src/components/img/required-signature.svg")) + ");\n  background-repeat: no-repeat;\n  background-position: 0;\n  background-size: 1.4em; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Modal.html":
/*!***********************************!*\
  !*** ./src/components/Modal.html ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='popup'>\r\n    <div id='client'>\r\n        <slot></slot>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/Modal.js":
/*!*********************************!*\
  !*** ./src/components/Modal.js ***!
  \*********************************/
/*! exports provided: default, popup, popupi, dialogMsg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popup", function() { return popup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popupi", function() { return popupi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dialogMsg", function() { return dialogMsg; });
/* harmony import */ var _Modal_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Modal.html */ "./src/components/Modal.html");
/* harmony import */ var _Modal_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Modal_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.scss */ "./src/components/Modal.scss");
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Modal_scss__WEBPACK_IMPORTED_MODULE_1__);



function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

class Modal extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Modal_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._popup = shadowRoot.querySelector('#popup');
    this._client = shadowRoot.querySelector('#client');
    this._click = this._click.bind(this);
    this.close = this.close.bind(this);
    this._endtransition = this._endtransition.bind(this);
    this._closing = false;
  }

  connectedCallback() {
    this._popup.addEventListener('click', this._click);
  }

  disconnectedCallback() {
    this._popup.removeEventListener('click', this._click);
  }

  _click(e) {
    const target = e.composedPath()[0];

    if (target == this._popup) {
      //if (is(target, '#popup')/* || is(target, '.aspa')*/){
      this.close();
    }
  }

  _endtransition() {
    try {
      this.parentNode && this.parentNode.removeChild(this);
    } catch (e) {}

    this._client.removeEventListener("transitionend", this._endtransition);

    this._client.removeEventListener("transitioncancel", this._endtransition);
  }

  close() {
    if (this._closing) {
      return;
    }

    this._closing = true;
    this.dispatchEvent(new CustomEvent('bk-close', {
      bubbles: true
    }));
    this._client.style.transform = "scale(0.1)";
    this._popup.style.opacity = '0.1';

    this._client.addEventListener("transitionend", this._endtransition);

    this._client.addEventListener("transitioncancel", this._endtransition);

    setTimeout(this._endtransition.bind(this), 500);
  }

  inject(markup, styles = "") {
    if (this._css) {
      this.shadowRoot.removeChild(this._css);
    }

    this._css = document.createElement('style');
    this._css.type = 'text/css';

    this._css.appendChild(document.createTextNode(styles));

    this.shadowRoot.appendChild(this._css);

    if (this._markup) {
      this._markup.dispatchEvent(new CustomEvent('bk-clean', {
        bubbles: true
      }));
    }

    this._markup = markup;
    this._client.innerHTML = "";

    this._client.appendChild(markup);

    markup.style.removeProperty('top');
  }

}

function popup(markup) {
  const h = () => {
    markup.dispatchEvent(new CustomEvent('bk-clean', {
      bubbles: true
    }));
    el.removeEventListener('bk-close', h);
  };

  const el = document.createElement('priv-modal');
  el.addEventListener('bk-close', h);
  el.appendChild(markup);
  document.body.appendChild(el);
  return el.close;
}

function popupi(markup, styles) {
  const h = () => {
    markup.dispatchEvent(new CustomEvent('bk-clean', {
      bubbles: true
    }));
    el.removeEventListener('bk-close', h);
  };

  const el = document.createElement('priv-modal');
  el.addEventListener('bk-close', h);

  if (markup) {
    markup.style.top = '-1500px';
    el.inject(markup, styles);
  }

  document.body.appendChild(el);
  return el.close;
}

function dialogMsg(cfg) {
  return new Promise((resolve, reject) => {
    const cerrar = () => {
      close();
      resolve(true);
    };

    const clean = () => {
      resolve(true);
      aspa.removeEventListener('click', cerrar);
      aceptar.removeEventListener('click', cerrar);
      markup.removeEventListener('bk-clean', clean);
    };

    const style = __webpack_require__(/*! ./fragments/msg.scss */ "./src/components/fragments/msg.scss");

    const html = __webpack_require__(/*! ./fragments/msg.html */ "./src/components/fragments/msg.html");

    const markup = document.createElement('div');
    markup.innerHTML = html;
    markup.querySelector('.message').innerText = cfg.message || 'Sin mensaje';
    markup.querySelector('.detail').innerHTML = cfg.detail;
    markup.querySelector('#cabecera').classList.add(cfg.type);
    const aspa = markup.querySelector('.aspa');
    const close = popupi(markup, style);
    aspa.addEventListener('click', cerrar);
    const aceptar = markup.querySelector('.aceptar');
    aceptar.innerText = cfg.textoOk ? cfg.textoOk : "Aceptar";
    aceptar.addEventListener('click', cerrar);
    markup.addEventListener('bk-clean', clean);
  });
}

 //cfg = { type: 'info', message: '', detail: msg, textoOk: 'Aceptar' }

/***/ }),

/***/ "./src/components/Modal.scss":
/*!***********************************!*\
  !*** ./src/components/Modal.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit; }\n\n* {\n  box-sizing: border-box; }\n\n#popup {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  z-index: 7000;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: tr .3s ease-in-out;\n  transition: opacity .3s ease-in-out; }\n\n#client {\n  background-color: white;\n  border-radius: 0.3em;\n  box-shadow: 0.2em 0.2em 0.3em #888;\n  padding: .5em;\n  /*padding-top: 2.2em;*/\n  position: relative;\n  animation: pop .5s;\n  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);\n  transition: transform .3s ease-in-out; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.5em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ./img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: opacity 0.3s ease; }\n  .aspa:hover {\n    opacity: 0.6; }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 0.8; } }\n\n@keyframes pop {\n  0% {\n    transform: scale(0.1); }\n  100% {\n    transform: scale(1); } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Progress.html":
/*!**************************************!*\
  !*** ./src/components/Progress.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div id='client'>\r\n        <div id='text'></div>\r\n        <div id='pro'><div class='barra'></div></div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/Progress.js":
/*!************************************!*\
  !*** ./src/components/Progress.js ***!
  \************************************/
/*! exports provided: default, progress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Progress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "progress", function() { return progress; });
/* harmony import */ var _Progress_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Progress.html */ "./src/components/Progress.html");
/* harmony import */ var _Progress_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Progress_html__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Progress_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Progress.scss */ "./src/components/Progress.scss");
/* harmony import */ var _Progress_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Progress_scss__WEBPACK_IMPORTED_MODULE_1__);


class Progress extends HTMLElement {
  constructor(msg, boolC, sinProgres) {
    super();

    if (!msg) {
      return;
    }

    const shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.innerHTML = '<style>' + _Progress_scss__WEBPACK_IMPORTED_MODULE_1___default.a + '</style>' + _Progress_html__WEBPACK_IMPORTED_MODULE_0___default.a;
    this._root = shadowRoot.querySelector('#root');
    this._client = shadowRoot.querySelector('#client');
    this._text = shadowRoot.querySelector('#text');
    this._endtransition = this._endtransition.bind(this);
    this._text.innerHTML = msg;
    boolC && this._root.classList.add('parcial');
    sinProgres && this._client.removeChild(this._client.querySelector('#pro'));
  }

  _endtransition() {
    try {
      this.parentNode && this.parentNode.removeChild(this);
    } catch (e) {}

    this._client.removeEventListener("transitionend", this._endtransition);

    this._client.removeEventListener("transitioncancel", this._endtransition);
  }

  close() {
    this._client.style.transform = "scale(0.1)";
    this._root.style.opacity = '0.1';

    this._client.addEventListener("transitionend", this._endtransition);

    this._client.addEventListener("transitioncancel", this._endtransition);

    setTimeout(this._endtransition.bind(this), 500);
  }

}

const progress = (msg = "Procesando, espere...", contenedor, sinProgres = false) => {
  const p = new Progress(msg, contenedor, sinProgres);

  if (contenedor) {
    contenedor.appendChild(p); //contenedor debe estar posicionado...
  } else {
    document.body.appendChild(p);
  }

  return p;
};



/***/ }),

/***/ "./src/components/Progress.scss":
/*!**************************************!*\
  !*** ./src/components/Progress.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":host {\n  all: initial;\n  display: block;\n  box-sizing: border-box;\n  font: inherit;\n  color: inherit; }\n\n* {\n  box-sizing: border-box; }\n\n#root {\n  width: 100vw;\n  height: 100vh;\n  position: fixed;\n  z-index: 10000;\n  top: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.2);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: tr .3s ease-in-out;\n  transition: opacity .3s ease-in-out; }\n  #root.parcial {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: auto;\n    top: 0;\n    left: 0; }\n\n#client {\n  background-color: white;\n  border-radius: 0.3em;\n  box-shadow: 0.2em 0.2em 0.3em #888;\n  padding: .5em 2em;\n  position: relative;\n  animation: pop .5s;\n  animation-timing-function: cubic-bezier(0.71, 0.55, 0.62, 1.57);\n  transition: transform .3s ease-in-out; }\n\n#pro {\n  border: 1px solid #dbdbdb;\n  height: .3em;\n  margin-top: .1em; }\n  #pro .barra {\n    height: 100%;\n    background-color: #7a7ac2;\n    animation: pro 1.5s;\n    animation-timing-function: linear; }\n\n@keyframes pro {\n  0% {\n    width: 0; }\n  100% {\n    width: 100%; } }\n\n@keyframes tr {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 0.8; } }\n\n@keyframes pop {\n  0% {\n    transform: scale(0.1); }\n  100% {\n    transform: scale(1); } }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/Subprocess.js":
/*!**************************************!*\
  !*** ./src/components/Subprocess.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subprocess; });
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Dsl {
  constructor(prom, g_callbacks, g_allways, g_errors, oldTransiciones = []) {
    this._oldTransiciones = oldTransiciones;
    this._callbacks = {};
    Object.keys(g_callbacks).forEach(k => this._callbacks[k] = g_callbacks[key].map(it => it));
    this._always = [...g_allways];
    this._errors = [...g_errors];
    this._transiciones = {};
    this._prom = prom;

    this._prom.then(data => {
      if (!data.errorData && !data.data.codigoError) {
        this._process(data);
      } else {
        if (data.data && data.data.codigoError) {
          this._process_error([data.data.resolucion, data.data]);

          return;
        }

        this._process_error([data.errorData.operationMessage, data.errorData]);
      }
    }).catch(this._process_error.bind(this));
  }

  _process(data) {
    this._transiciones = data.stateData.availableTransitions;
    const id = data.stateData.viewId;

    if (this._callbacks[id]) {
      this._callbacks[id].forEach(cb => cb(data.data));
    }

    this._always.forEach(cb => cb(data.data));
  }

  _process_error(e) {
    this._transiciones = this._oldTransiciones;

    this._errors.forEach(cb => cb(e));

    this._always.forEach(cb => cb(e));
  }

  get trancisionesPermitidas() {
    return _objectSpread({}, this._transiciones);
  }

  when(vw, cb) {
    if (this._callbacks[vw]) {
      this._callbacks[vw].push(cb);
    } else {
      this._callbacks[vw] = [cb];
    }

    return this;
  }

  always(cb) {
    this._always.push(cb);

    return this;
  }

  error(cb) {
    this._errors.push(cb);

    return this;
  }

}

class Subprocess {
  constructor(url) {
    this._callbacks = {};
    this._always = [];
    this._errors = [];
    this._url = url;
    this.abierto = false;
  }

  when(vw, cb) {
    if (this._dsl) {
      this._dsl.when(vw, cb);
    }

    if (this._callbacks[vw]) {
      this._callbacks[vw].push(cb);
    } else {
      this._callbacks[vw] = [cb];
    }

    return this;
  }

  always(cb) {
    if (this._dsl) {
      this._dsl.always(cb);
    }

    this._always.push(cb);

    return this;
  }

  error(cb) {
    if (this._dsl) {
      this._dsl.error(cb);
    }

    this._errors.push(cb);

    return this;
  }

  inicia(modelo) {
    this._dsl = new Dsl(Object(_servicios__WEBPACK_IMPORTED_MODULE_0__["http"])(this._url, modelo), this._callbacks, this._always, this._errors);
    return this._dsl;
  }

  sendEvent(event, modelo, silenciarErrores) {
    this.abierto = true;

    if (!this._dsl) {
      this._errors.forEach(e => e(["Subproceso no iniciado o terminado!", {}]));

      throw new Error("Subproceso no iniciado o terminado!");
    }

    if (this._dsl.trancisionesPermitidas[event]) {
      this._dsl = new Dsl(Object(_servicios__WEBPACK_IMPORTED_MODULE_0__["http"])(this._dsl.trancisionesPermitidas[event], modelo), this._callbacks, this._always, silenciarErrores ? [] : this._errors, this._dsl.trancisionesPermitidas);

      if (event == 'end') {
        this._dsl = undefined;
      }

      return this._dsl;
    } else {
      this._errors.forEach(e => e(["transición no permitida!", {}]));

      throw new Error("transición no permitida!");
    }
  }

  finaliza() {
    this.sendEvent('end', {});
  }

}

/***/ }),

/***/ "./src/components/fragments/adjuntarFirma.html":
/*!*****************************************************!*\
  !*** ./src/components/fragments/adjuntarFirma.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div id='cabecera'><div class='message'>Adjuntar</div><span class='aspa'></span></div>\r\n    <div class='error'></div>\r\n    <div id='cli'>\r\n        <div class='motivo'>\r\n            <p>Has seleccionado el documento <b>Declaración de bienes Persona Física </b>para continuar adjuntando es necesario que <b>introduzcas la fecha de la firma.</b></p>\r\n            <p class=\"desc-bottom\">Si quieres cambiar la fecha de la firma una vez adjuntado el documento, tendrás que anular el documento y repetir el proceso de adjuntar.</p>\r\n        </div>\r\n        <div class='observaciones'>\r\n            <p><b>Introduce la fecha de la firma del documento.</b></p>\r\n            <span>Fecha de firma:</span>\r\n            <bk-wc-ui-date required></bk-wc-ui-date>\r\n        </div>\r\n        <div class='botonera'>\r\n            <div class='aceptar' disabled=''>Aceptar</div>\r\n            <div class='cancelar'>Cancelar</div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/adjuntarFirma.scss":
/*!*****************************************************!*\
  !*** ./src/components/fragments/adjuntarFirma.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#root {\n  max-height: 90vh;\n  width: 35vw;\n  background-color: #f0f0f0; }\n\n#cabecera {\n  padding: .7em 2em .7em .7em;\n  border: 1px solid #dbdbdb;\n  margin-bottom: .7em;\n  position: relative;\n  border-bottom: 4px solid #888282; }\n\n.error {\n  padding: .2em;\n  color: #970302; }\n\n#cli {\n  padding: .7em;\n  border: 1px solid #dbdbdb;\n  border-radius: .3em; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.7em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .7em; }\n  .aspa:hover {\n    background-color: #999;\n    border: 1px solid #dbdbdb; }\n\n.observaciones {\n  padding: .9em; }\n\n.motivo {\n  padding: .9em; }\n\n.botonera {\n  display: flex;\n  justify-content: flex-end;\n  padding: .2em .7em; }\n  .botonera > div {\n    margin-left: .7em;\n    font: inherit;\n    color: inherit;\n    outline: none;\n    padding: .2em .7em .2em 1.3em;\n    border-radius: 0.1em;\n    background-image: linear-gradient(#f9f9f9, #f1f1f1);\n    border: 1px solid #bdbdbd;\n    box-shadow: #787a74 0px 2px 1px -1px, white 0px 1px 0px 0px inset;\n    cursor: pointer;\n    transition: opacity 0.3s ease;\n    position: relative; }\n    .botonera > div:not([disabled]):hover {\n      opacity: .7; }\n    .botonera > div::before {\n      content: '';\n      position: absolute;\n      top: 0.4em;\n      left: 0.2em;\n      padding: .9em 0 0 .9em;\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: center; }\n    .botonera > div.aceptar {\n      margin-right: .7em;\n      border-bottom: 2px solid #acb600; }\n      .botonera > div.aceptar::before {\n        background-image: url(" + escape(__webpack_require__(/*! ../img/agree.svg */ "./src/components/img/agree.svg")) + "); }\n      .botonera > div.aceptar[disabled] {\n        background-image: linear-gradient(#a9a9a9, #e9e9e9); }\n      .botonera > div.aceptar.progress::after {\n        content: '';\n        position: absolute;\n        top: 0.4em;\n        left: 0.2em;\n        padding: .9em 0 0 .9em;\n        background-size: cover;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-image: url(" + escape(__webpack_require__(/*! ../img/busy.svg */ "./src/components/img/busy.svg")) + "); }\n    .botonera > div.cancelar {\n      border-bottom: 2px solid #970302; }\n      .botonera > div.cancelar::before {\n        background-image: url(" + escape(__webpack_require__(/*! ../img/error.svg */ "./src/components/img/error.svg")) + "); }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/error.html":
/*!*********************************************!*\
  !*** ./src/components/fragments/error.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div id='cabecera'>Se produjo el siguiente error<span class='aspa'></span></div>\r\n    <div id='cli'>\r\n        <div class='txt'></div>\r\n        <div class='detalle'>\r\n            <div class='manejador' title='mostrar detalle del error'></div>\r\n            <pre class='json oculto'></pre>\r\n        </div>\r\n        <div class='botonera'>\r\n            <div class='aceptar'>Aceptar</div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/error.scss":
/*!*********************************************!*\
  !*** ./src/components/fragments/error.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#root {\n  max-height: 50vh;\n  max-width: 60vw; }\n\n#cabecera {\n  padding: .7em 2em .7em .7em;\n  border: 1px solid #dbdbdb;\n  border-bottom: 4px solid #6b1414;\n  margin-bottom: .7em;\n  position: relative; }\n\n#cli {\n  padding: .7em;\n  border: 1px solid #dbdbdb;\n  border-radius: .3em; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.7em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .7em; }\n  .aspa:hover {\n    background-color: #999;\n    border: 1px solid #dbdbdb; }\n\n.txt {\n  word-break: break-word; }\n\n.detalle {\n  padding-top: .9em;\n  position: relative; }\n\n.manejador {\n  position: absolute;\n  top: 0.4em;\n  right: 0.7em;\n  height: 0.9em;\n  width: 0.9em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/help.svg */ "./src/components/img/help.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .9em; }\n  .manejador:hover {\n    background-color: #777; }\n\n.json {\n  overflow: auto;\n  padding: .3em;\n  background-color: #f0f0f0; }\n  .json.oculto {\n    padding: 0;\n    height: 0;\n    overflow: hidden; }\n\n.botonera {\n  display: flex;\n  justify-content: flex-end;\n  padding: .2em .7em; }\n  .botonera .aceptar {\n    font: inherit;\n    color: inherit;\n    outline: none;\n    padding: .2em .7em;\n    border-radius: 0.1em;\n    background-image: linear-gradient(#f9f9f9, #f1f1f1);\n    border: 1px solid #bdbdbd;\n    box-shadow: #787a74 0px 2px 1px -1px, white 0px 1px 0px 0px inset;\n    cursor: pointer;\n    transition: opacity 0.3s ease;\n    position: relative; }\n    .botonera .aceptar:hover {\n      opacity: .7; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/info.scss":
/*!********************************************!*\
  !*** ./src/components/fragments/info.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "p {\n  padding: .7em;\n  background-color: #f4f4f4;\n  max-width: 40vw;\n  border: 1px solid #dbdbdb;\n  border-radius: 3px;\n  box-shadow: 3px 3px 3px #999; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/li.html":
/*!******************************************!*\
  !*** ./src/components/fragments/li.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<li>\r\n    <p></p>\r\n</li>";

/***/ }),

/***/ "./src/components/fragments/liInput.html":
/*!***********************************************!*\
  !*** ./src/components/fragments/liInput.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<li>\r\n    <p></p>\r\n    <input type='file'/>\r\n</li>";

/***/ }),

/***/ "./src/components/fragments/menu.scss":
/*!********************************************!*\
  !*** ./src/components/fragments/menu.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "ul {\n  background-color: #f4f4f4;\n  list-style-type: none;\n  padding: .1em 0;\n  margin: 0;\n  border: 2px solid #dbdbdb;\n  border-radius: 3px;\n  box-shadow: 0px 3px 0px #aaa; }\n\nli {\n  color: #018ec0;\n  cursor: pointer;\n  transition: background-color, color .3s ease-in-out;\n  position: relative;\n  overflow: hidden; }\n  li p {\n    padding: .5em 6em .5em 1.2em;\n    text-decoration: underline;\n    margin: 0; }\n  li input {\n    position: absolute;\n    top: 0;\n    left: -160%;\n    width: 300%;\n    height: 110%;\n    opacity: 0;\n    cursor: pointer; }\n\nli:hover {\n  background-color: #e5e5e5;\n  color: #666; }\n\n.menu {\n  width: 1.5em;\n  height: 1.5em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/contextual-menu.svg */ "./src/components/img/contextual-menu.svg")) + ");\n  background-color: #f4f4f4;\n  background-repeat: no-repeat;\n  background-position: center;\n  border: 2px solid #dbdbdb;\n  border-radius: 2px;\n  cursor: pointer;\n  /*box-shadow: 2px 0px 0px #aaa;*/ }\n\n#client.derecha ul li {\n  padding: .5em 1.2em .5em 1.2; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/modalExceptuar.html":
/*!******************************************************!*\
  !*** ./src/components/fragments/modalExceptuar.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div id='cabecera'><div class='message'></div><span class='aspa'></span></div>\r\n    <div class='error'></div>\r\n    <div id='cli'>\r\n        <div class='motivo'>\r\n            <div>Motivo por el que se exceptua:</div>\r\n            <select></select>\r\n        </div>\r\n        <div class='observaciones'>\r\n            <div>Observaciones:</div>\r\n            <textarea></textarea>\r\n        </div>\r\n        <div class='botonera'>\r\n            <div class='modificar'>Modificar</div>\r\n            <div class='cancelar'>Cancelar</div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/modalExceptuar.scss":
/*!******************************************************!*\
  !*** ./src/components/fragments/modalExceptuar.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#root {\n  max-height: 90vh;\n  width: 35vw;\n  background-color: #f0f0f0; }\n\n#cabecera {\n  padding: .7em 2em .7em .7em;\n  border: 1px solid #dbdbdb;\n  margin-bottom: .7em;\n  position: relative;\n  border-bottom: 4px solid #888282; }\n\n#cli {\n  padding: .7em;\n  border: 1px solid #dbdbdb;\n  border-radius: .3em; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.7em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .7em; }\n  .aspa:hover {\n    background-color: #999;\n    border: 1px solid #dbdbdb; }\n\n.error {\n  padding: .2em;\n  color: #970302; }\n\n.observaciones {\n  padding: .9em; }\n  .observaciones textarea {\n    margin-top: .2em;\n    font: inherit;\n    color: inherit;\n    outline: none;\n    resize: none;\n    width: 100%;\n    height: 10em;\n    overflow: auto;\n    border-radius: 3px; }\n\n.motivo {\n  padding: .9em; }\n  .motivo select {\n    margin-top: .2em;\n    padding: .2em;\n    font: inherit;\n    color: inherit;\n    outline: none;\n    width: 100%;\n    border-radius: 3px; }\n    .motivo select.req {\n      background-color: #fdf9c1; }\n\n.botonera {\n  display: flex;\n  justify-content: flex-end;\n  padding: .2em .7em; }\n  .botonera > div {\n    margin-left: .7em;\n    font: inherit;\n    color: inherit;\n    outline: none;\n    padding: .2em .7em .2em 1.3em;\n    border-radius: 0.1em;\n    background-image: linear-gradient(#f9f9f9, #f1f1f1);\n    border: 1px solid #bdbdbd;\n    box-shadow: #787a74 0px 2px 1px -1px, white 0px 1px 0px 0px inset;\n    cursor: pointer;\n    transition: opacity 0.3s ease;\n    position: relative; }\n    .botonera > div:not([disabled]):hover {\n      opacity: .7; }\n    .botonera > div::before {\n      content: '';\n      position: absolute;\n      top: 0.4em;\n      left: 0.2em;\n      padding: .9em 0 0 .9em;\n      background-size: cover;\n      background-repeat: no-repeat;\n      background-position: center; }\n    .botonera > div.modificar {\n      margin-right: .7em;\n      border-bottom: 2px solid #acb600; }\n      .botonera > div.modificar::before {\n        background-image: url(" + escape(__webpack_require__(/*! ../img/agree.svg */ "./src/components/img/agree.svg")) + "); }\n      .botonera > div.modificar[disabled] {\n        background-image: linear-gradient(#a9a9a9, #e9e9e9); }\n    .botonera > div.cancelar {\n      border-bottom: 2px solid #970302; }\n      .botonera > div.cancelar::before {\n        background-image: url(" + escape(__webpack_require__(/*! ../img/error.svg */ "./src/components/img/error.svg")) + "); }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/msg.html":
/*!*******************************************!*\
  !*** ./src/components/fragments/msg.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id='root'>\r\n    <div id='cabecera'><div class='message'></div><span class='aspa'></span></div>\r\n    <div id='cli'>\r\n        <div class='txt'></div>\r\n        <div class='detail'>\r\n        </div>\r\n        <div class='botonera'>\r\n            <div class='aceptar'>Aceptar</div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ "./src/components/fragments/msg.scss":
/*!*******************************************!*\
  !*** ./src/components/fragments/msg.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(/*! ../../../node_modules/css-loader/lib/url/escape.js */ "./node_modules/css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#root {\n  max-height: 50vh;\n  max-width: 30vw; }\n\n#cabecera {\n  padding: .7em 2em .7em 2em;\n  border: 1px solid #dbdbdb;\n  margin-bottom: .7em;\n  position: relative;\n  background-repeat: no-repeat;\n  background-size: 1.4em;\n  background-position: .2em center; }\n  #cabecera.info {\n    border-bottom: 4px solid #5426ca;\n    background-image: url(" + escape(__webpack_require__(/*! ../img/info.svg */ "./src/components/img/info.svg")) + ");\n    /*background-color: #5426ca;\r\n        -webkit-mask-image:  url('../img/info.svg');\r\n        -webkit-mask-repeat: no-repeat;\r\n        -webkit-mask-size: 1.4em;\r\n        -webkit-mask-position: .2em center;\r\n        mask-image:  url('../img/info.svg');\r\n        mask-repeat: no-repeat;\r\n        mask-size: 1.4em;\r\n        mask-position: .2em center;*/ }\n  #cabecera.alert {\n    border-bottom: 4px solid #f0bb34;\n    background-image: url(" + escape(__webpack_require__(/*! ../img/warning.svg */ "./src/components/img/warning.svg")) + "); }\n  #cabecera.error {\n    border-bottom: 4px solid #6b1414;\n    background-image: url(" + escape(__webpack_require__(/*! ../img/error.svg */ "./src/components/img/error.svg")) + "); }\n\n#cli {\n  padding: .7em;\n  border: 1px solid #dbdbdb;\n  border-radius: .3em; }\n\n.aspa {\n  position: absolute;\n  top: 0.5em;\n  right: 0.7em;\n  padding: 0.7em 0 0 0.7em;\n  background-image: url(" + escape(__webpack_require__(/*! ../img/cross.svg */ "./src/components/img/cross.svg")) + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  border-radius: .7em; }\n  .aspa:hover {\n    background-color: #999;\n    border: 1px solid #dbdbdb; }\n\n.detail {\n  word-break: break-word;\n  padding: .9em; }\n\n.botonera {\n  display: flex;\n  justify-content: flex-end;\n  padding: .2em .7em; }\n  .botonera .aceptar {\n    font: inherit;\n    color: inherit;\n    outline: none;\n    padding: .2em .7em;\n    border-radius: 0.1em;\n    background-image: linear-gradient(#f9f9f9, #f1f1f1);\n    border: 1px solid #bdbdbd;\n    box-shadow: #787a74 0px 2px 1px -1px, white 0px 1px 0px 0px inset;\n    cursor: pointer;\n    transition: opacity 0.3s ease;\n    position: relative; }\n    .botonera .aceptar:hover {\n      opacity: .7; }\n", ""]);

// exports


/***/ }),

/***/ "./src/components/fragments/nodoArbol.html":
/*!*************************************************!*\
  !*** ./src/components/fragments/nodoArbol.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='cuerpo'><div class='manejador collapsed'></div><div class='txt'></div></div>\r\n<div class='children collapsed'></div>";

/***/ }),

/***/ "./src/components/fragments/nodoDoc.html":
/*!***********************************************!*\
  !*** ./src/components/fragments/nodoDoc.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='cuerpo'>\r\n        <div class='manejador collapsed'></div>\r\n        <div class='doc'>\r\n            <div class='documento'></div>\r\n            <div class='help'></div>\r\n            <div class='obl'>\r\n                <div class='obli'></div>\r\n                <div class='firma'></div>\r\n            </div>\r\n            <div class='archivo'></div>\r\n            <div class='incorporado'></div>\r\n            <div class='estado'></div>\r\n            <div class='acciones'>\r\n                <div class='ancla'>\r\n                    <div class='cap'></div>\r\n                </div>\r\n                <div class='menu'></div>\r\n            </div>\r\n        </div>\r\n</div>\r\n<div class='children collapsed'></div>";

/***/ }),

/***/ "./src/components/img/agree.svg":
/*!**************************************!*\
  !*** ./src/components/img/agree.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjYmVkNzAwIiBkPSJNNTA0IDM3bC0yMi0yM2MtMTUtMTQtMzctMTQtNTIgMEwxNjYgMjk2IDkwIDE1NGMtMTItMTgtMzQtMjYtNDgtMTVsLTI2IDE1QzIgMTY4LTIgMTkwIDUgMjA4bDk5IDE4N2MwIDMgMyAxMSA4IDE1bDggMTRjOCAxMSAxNCAxNCAyNiAxOCAxMSA4IDI4IDMgMzYtOGwxOC0yM0w1MDEgOTNjMTctMTYgMTctNDIgMy01NnoiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/busy.svg":
/*!*************************************!*\
  !*** ./src/components/img/busy.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCnZpZXdCb3g9IjAgMCA0MCA0MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNDAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgogIDxwYXRoIG9wYWNpdHk9IjAuMiIgZmlsbD0iIzAwMCIgZD0iTTIwLjIwMSw1LjE2OWMtOC4yNTQsMC0xNC45NDYsNi42OTItMTQuOTQ2LDE0Ljk0NmMwLDguMjU1LDYuNjkyLDE0Ljk0NiwxNC45NDYsMTQuOTQ2CiAgICBzMTQuOTQ2LTYuNjkxLDE0Ljk0Ni0xNC45NDZDMzUuMTQ2LDExLjg2MSwyOC40NTUsNS4xNjksMjAuMjAxLDUuMTY5eiBNMjAuMjAxLDMxLjc0OWMtNi40MjUsMC0xMS42MzQtNS4yMDgtMTEuNjM0LTExLjYzNAogICAgYzAtNi40MjUsNS4yMDktMTEuNjM0LDExLjYzNC0xMS42MzRjNi40MjUsMCwxMS42MzMsNS4yMDksMTEuNjMzLDExLjYzNEMzMS44MzQsMjYuNTQxLDI2LjYyNiwzMS43NDksMjAuMjAxLDMxLjc0OXoiLz4KICA8cGF0aCBmaWxsPSIjMDAwIiBkPSJNMjYuMDEzLDEwLjA0N2wxLjY1NC0yLjg2NmMtMi4xOTgtMS4yNzItNC43NDMtMi4wMTItNy40NjYtMi4wMTJoMHYzLjMxMmgwCiAgICBDMjIuMzIsOC40ODEsMjQuMzAxLDkuMDU3LDI2LjAxMywxMC4wNDd6Ij4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZVR5cGU9InhtbCIKICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIgogICAgICB0eXBlPSJyb3RhdGUiCiAgICAgIGZyb209IjAgMjAgMjAiCiAgICAgIHRvPSIzNjAgMjAgMjAiCiAgICAgIGR1cj0iMC41cyIKICAgICAgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgIDwvcGF0aD4KICA8L3N2Zz4KCg=="

/***/ }),

/***/ "./src/components/img/contextual-menu.svg":
/*!************************************************!*\
  !*** ./src/components/img/contextual-menu.svg ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjNWM1MjU1IiBkPSJNMjI2IDMzNmgyODZ2LTMwSDIyNnptMC02MGgyODZ2LTMwSDIyNnptMC02MGgyODZ2LTMxSDIyNnptMC05MXYzMGgyODZ2LTMwek05MCAyMzFsOTEtMTA2SDB6Ii8+PC9zdmc+"

/***/ }),

/***/ "./src/components/img/cross.svg":
/*!**************************************!*\
  !*** ./src/components/img/cross.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOC4zLDUuNzFMMTguMyw1LjcxYy0wLjM5LTAuMzktMS4wMi0wLjM5LTEuNDEsMEwxMiwxMC41OUw3LjExLDUuN2MtMC4zOS0wLjM5LTEuMDItMC4zOS0xLjQxLDBsMCwwCgkJYy0wLjM5LDAuMzktMC4zOSwxLjAyLDAsMS40MUwxMC41OSwxMkw1LjcsMTYuODljLTAuMzksMC4zOS0wLjM5LDEuMDIsMCwxLjQxaDBjMC4zOSwwLjM5LDEuMDIsMC4zOSwxLjQxLDBMMTIsMTMuNDFsNC44OSw0Ljg5CgkJYzAuMzksMC4zOSwxLjAyLDAuMzksMS40MSwwbDAsMGMwLjM5LTAuMzksMC4zOS0xLjAyLDAtMS40MUwxMy40MSwxMmw0Ljg5LTQuODlDMTguNjgsNi43MywxOC42OCw2LjA5LDE4LjMsNS43MXoiLz4KPC9nPgo8L3N2Zz4K"

/***/ }),

/***/ "./src/components/img/documentos.png":
/*!*******************************************!*\
  !*** ./src/components/img/documentos.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEKSURBVEhLY3j+9Cm1EFXNWjyzp7+xEBMBxdGUEkQMQG1oQhCESxwPwmkWGQhhFuWeRZgFZ6AhXOKYiLBZxCMsZpHtWSxmwRloCJc4HJFj1sYdAQ/uX4KLwxEJZsHRlIXMs5eLnzk/G02cSLOeXLm6Yc/BgrVb3ZeuNwSaBUEbdvgjOxCah4AsXGbduLlvyXoDuH40hOxARN7GatatWwdmLhVE04+MgGadPj8LopiAWeu2ec1aJrp9b9KJMxMuXFx68dLyU+emww3asN3vwf2LcMUIszA9C0S7DmQ/eXwXzoUgNOfAEZbyC9ksZAQXR3MOHJFjFi6ExSyceWgGoTyExqcEjZpFCnr6FADg2/4RO3JaIQAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/components/img/error.svg":
/*!**************************************!*\
  !*** ./src/components/img/error.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiM2YjE0MTQiIGQ9Ik0zNzQgMjIybDEyOCAxMjhjMTMgMTUgMTIgMjkgMCA0MGwtNzggNzljLTggOC0yNyA5LTQwIDBMMjU2IDM0MSAxMjggNDY5Yy0xMyAxNC0yOSAxMy00MCAwbC03OC03OWMtOC04LTEwLTI3IDAtNDBsMTI4LTEyOEwxMCA5NGMtMTMtMTEtOC0zMiAwLTQwbDc4LTc4YzgtOCAyNC0xMyAzOCAwbDEyOCAxMjhMMzgyLTI0YzEyLTEzIDMyLTggNDAgMGw3OSA3OGM4IDggMTMgMjQgMCA0MHoiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/excepted.svg":
/*!*****************************************!*\
  !*** ./src/components/img/excepted.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNiMjM3MzciIGQ9Ik0xMDUgMjh2MzBoMTIxVjI4em0xODEgNjBIMTA1djMxaDE4MXptLTMwIDYxSDEwNXYzMGgxNTF6bS0xNTEgOTBoOTF2LTMwaC05MXpNNzUgMzYwaDMwdi0zMUg3NXpNMjU2LTJ2NjBoNjB2NjFoMzBWNThjMCAzLTkwLTkwLTkwLTkwSDQ1djM2MWgzMFYtMnptNDUgMTUxTDEzNiAzMTRsMTY1IDE2NiAxNjYtMTY2em0xNSAyNDFoLTMwdi0zMGgzMHptLTMwLTYxdi05MGgzMHY5MHoiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/following-results.svg":
/*!**************************************************!*\
  !*** ./src/components/img/following-results.svg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9JyM1NTU1NTUnIGQ9Ik00NzUgMzAwTDI1NiA0ODAgMzcgMzAwVjE3MWwyMTkgMTgwIDIxOS0xODB6bTAtMjAzTDI1NiAyNzcgMzcgOTdWLTMybDIxOSAxODBMNDc1LTMyeiIvPjwvc3ZnPg=="

/***/ }),

/***/ "./src/components/img/help.svg":
/*!*************************************!*\
  !*** ./src/components/img/help.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNiZWQ3MDAiIGQ9Ik0yNTYtMzJDMTE1LTMyIDAgODMgMCAyMjRzMTE1IDI1NiAyNTYgMjU2IDI1Ni0xMTUgMjU2LTI1NlMzOTctMzIgMjU2LTMyem0yOSAzODJjMCA3LTIgMTMtMyAxOC0yIDUtNSA4LTggMTEtNCAzLTggNS0xMyA3LTUgMS0xMCAxLTE1IDFoLTFjLTUgMC0xMCAwLTE1LTEtNC0yLTktNC0xMi03LTQtMy03LTYtOC0xMS0yLTUtNC0xMC00LTE4di0zYzAtMTQgNC0yNCAxMi0yOSA4LTQgMTYtOCAyNy04aDFjNSAwIDEwIDAgMTUgMnM5IDMgMTMgNmMzIDQgNiA3IDggMTIgMSA0IDMgMTEgMyAxN3ptNzItMTkyYzAgMTgtMyAzMS0xMCA0NC02IDExLTE2IDIwLTMyIDMwbC0xMyA4Yy0xMSA2LTE5IDEzLTI0IDE4LTQgNC02IDExLTYgMjB2N2MwIDUtMyA4LTExIDhoLTM3Yy02IDAtMTEtMy0xMS0xMHYtMTFjMC0xMCAwLTE2IDEtMjIgMC03IDItMTIgNS0xNiAyLTUgNy04IDEwLTEzIDUtMyA5LTggMTctMTNsMTItNmM5LTcgMTctMTIgMjAtMTYgNC01IDUtMTIgNS0xOHYtMmMwLTE2LTktMjUtMzAtMjVoLTJjLTggMC0xNyAxLTI3IDMtMTAgMy0xOSA1LTI5IDgtMyAyLTYgMi05IDAtMi0yLTUtMy03LThsLTgtMjdjMC0yLTEtMy0xLTV2LTVjMC01IDMtOSA5LTExIDUtMiAxMC01IDE2LTYgNy0yIDEzLTQgMjEtNSA2LTIgMTQtMyAyMS0zIDgtMiAxNC0yIDIxLTJoM2MzMCAwIDUzIDYgNjkgMThzMjQgMzAgMjQgNTR6Ii8+PC9zdmc+"

/***/ }),

/***/ "./src/components/img/in-progress.svg":
/*!********************************************!*\
  !*** ./src/components/img/in-progress.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNlNTc5MGUiIGQ9Ik0yNTYgMTY2cy0xMjgtMTctMTI4IDEwM2MwIDEzNCAxMjggMTE3IDEyOCAxMTctMyAwIDEwMiAxNCAxMjUtNjMgMTctNTQgMjktNzMgNjItNjIgMjMgOCA0MCAxMSAzNCA2Mi0xMSA1MS02OSAxNTQtMjE5IDE1N0M1OCA0ODAgMzggMzA2IDM4IDI2OVMzOCA3NSAyNTggNzVjMyAwIDAtNjUgMC05NCAwLTE1IDExLTE4IDMzIDAgMzQgMzMgMTI1IDEyNSAxMjUgMTI1czExIDE0IDAgMzNjLTE4IDIzLTEyNSAxNTQtMTI1IDE1NHMtMzMgMC0zMy0zNGMwLTMzLTItOTMtMi05M3oiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/in-progressW.svg":
/*!*********************************************!*\
  !*** ./src/components/img/in-progressW.svg ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik0yNTYgMTY2cy0xMjgtMTctMTI4IDEwM2MwIDEzNCAxMjggMTE3IDEyOCAxMTctMyAwIDEwMiAxNCAxMjUtNjMgMTctNTQgMjktNzMgNjItNjIgMjMgOCA0MCAxMSAzNCA2Mi0xMSA1MS02OSAxNTQtMjE5IDE1N0M1OCA0ODAgMzggMzA2IDM4IDI2OVMzOCA3NSAyNTggNzVjMyAwIDAtNjUgMC05NCAwLTE1IDExLTE4IDMzIDAgMzQgMzMgMTI1IDEyNSAxMjUgMTI1czExIDE0IDAgMzNjLTE4IDIzLTEyNSAxNTQtMTI1IDE1NHMtMzMgMC0zMy0zNGMwLTMzLTItOTMtMi05M3oiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/info.svg":
/*!*************************************!*\
  !*** ./src/components/img/info.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiM1NDI2Y2EiIGQ9Ik0yNTYtMzJDMTE1LTMyIDAgODMgMCAyMjRzMTE1IDI1NiAyNTYgMjU2IDI1Ni0xMTUgMjU2LTI1NlMzOTctMzIgMjU2LTMyem0tNjQgNDI3Yy0yMSAwLTM1LTktMzUtMzAgMC0yNyAxOS03NCAyMi04M2w0MC0xMDBjMy05LTEtMTYtNi0xNi0yMSAwLTQ4IDUwLTU4IDUwLTMgMC04LTMtOC04IDAtMTAgMjYtMzQgMzItNDIgMjMtMjAgNTEtMzggODUtMzggMjQgMCA1MCAxNCAzMCA2OWwtMzggMTEyYy0zIDgtMTAgMjItMTAgMzIgMCAzIDIgOCA3IDggMTcgMCA0OC00OCA1Ni00OCAzIDAgNiAzIDYgOCAwIDE2LTY1IDg2LTEyMyA4NnptOTgtMjg2Yy0yMyAwLTM5LTE2LTM5LTM5IDAtMjUgMjEtNDQgNDctNDQgMjIgMCAzOCAxNCAzOCAzOCAwIDI2LTIxIDQ1LTQ2IDQ1eiIvPjwvc3ZnPg=="

/***/ }),

/***/ "./src/components/img/minus.svg":
/*!**************************************!*\
  !*** ./src/components/img/minus.svg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOCwxM0g2Yy0wLjU1LDAtMS0wLjQ1LTEtMXYwYzAtMC41NSwwLjQ1LTEsMS0xaDEyYzAuNTUsMCwxLDAuNDUsMSwxdjBDMTksMTIuNTUsMTguNTUsMTMsMTgsMTN6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/components/img/pending.svg":
/*!****************************************!*\
  !*** ./src/components/img/pending.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNjYWNhYzciIGQ9Ik0yNTYgMTY2cy0xMjgtMTctMTI4IDEwM2MwIDEzNCAxMjggMTE3IDEyOCAxMTctMyAwIDEwMiAxNCAxMjUtNjMgMTctNTQgMjktNzMgNjItNjIgMjMgOCA0MCAxMSAzNCA2Mi0xMSA1MS02OSAxNTQtMjE5IDE1N0M1OCA0ODAgMzggMzA2IDM4IDI2OVMzOCA3NSAyNTggNzVjMyAwIDAtNjUgMC05NCAwLTE1IDExLTE4IDMzIDAgMzQgMzMgMTI1IDEyNSAxMjUgMTI1czExIDE0IDAgMzNjLTE4IDIzLTEyNSAxNTQtMTI1IDE1NHMtMzMgMC0zMy0zNGMwLTMzLTItOTMtMi05M3oiLz48L3N2Zz4="

/***/ }),

/***/ "./src/components/img/plus.svg":
/*!*************************************!*\
  !*** ./src/components/img/plus.svg ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyNHB4IgoJIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnIGlkPSJCb3VuZGluZ19Cb3hlcyI+Cgk8ZyBpZD0idWlfeDVGX3NwZWNfeDVGX2hlYWRlcl9jb3B5XzMiIGRpc3BsYXk9Im5vbmUiPgoJPC9nPgoJPHBhdGggZmlsbD0ibm9uZSIgZD0iTTAsMGgyNHYyNEgwVjB6Ii8+CjwvZz4KPGcgaWQ9IlJvdW5kZWRfMV8iPgoJPGcgaWQ9InVpX3g1Rl9zcGVjX3g1Rl9oZWFkZXJfY29weV82IiBkaXNwbGF5PSJub25lIj4KCTwvZz4KCTxwYXRoIGQ9Ik0xOCwxM2gtNXY1YzAsMC41NS0wLjQ1LDEtMSwxaDBjLTAuNTUsMC0xLTAuNDUtMS0xdi01SDZjLTAuNTUsMC0xLTAuNDUtMS0xdjBjMC0wLjU1LDAuNDUtMSwxLTFoNVY2YzAtMC41NSwwLjQ1LTEsMS0xaDAKCQljMC41NSwwLDEsMC40NSwxLDF2NWg1YzAuNTUsMCwxLDAuNDUsMSwxdjBDMTksMTIuNTUsMTguNTUsMTMsMTgsMTN6Ii8+CjwvZz4KPC9zdmc+Cg=="

/***/ }),

/***/ "./src/components/img/required-signature.svg":
/*!***************************************************!*\
  !*** ./src/components/img/required-signature.svg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjMDA4MGZmIiBkPSJNMzQ2IDM5N2wtNC0zYy02LTQtNDgtMjMtNjItNTUtNi04LTYtMjItOC0zNyAwLTgtMy0xOS02LTI1LTQgMy03IDYtOCAxMS0xNSAxOC0xOCA0MC0yNiA1NC0xMSAxOC0xNCAzMi0yOSAyOS0xNC0zLTE5LTI5LTE5LTYyIDMtNDMtNi03Ny0xNC05MSAwIDMtNCA2LTcgMTEtMjIgNjktNDggMTEzLTQ4IDExM2wtMzIgODQgMy05MmM0LTM2IDgtNzMgMC0xMDgtMTkgNjItNDAgMTI4LTYyIDEyNC04IDAtMTgtMjItMjItNDBsMTcgMTVjMTUtMTEgNDgtMTE0IDY5LTE5MSAzLTYgNi0yMiAxOS0xOSAxNSAzIDE1IDI5IDggMTY4IDctMTEgMTUtNTEgMTktNjUgOC0yNiAyMC0zNyAzNy0zNCAzMiA2IDMyIDg4IDI5IDEyOCA2LTggMjItMzIgMzItNDMgMTEtMTUgMjYtMjkgNDAtMjMgMTggNyAyMiAyOSAyNiA1NSAzIDExIDMgMjIgNiAzMiA4IDE3IDMyIDMyIDQ1IDQwbDE2MC0yOSA2IDI5eiIvPjwvc3ZnPg=="

/***/ }),

/***/ "./src/components/img/template.svg":
/*!*****************************************!*\
  !*** ./src/components/img/template.svg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGQ9Ik0xNDQgMzg0aDk2VjE2MGgtOTZ6bTMyLTE5MmgzMnYxNjBoLTMyem05NiA2NGg5NnYtOTZoLTk2em0zMi02NGgzMnYzMmgtMzJ6bS0zMiAxOTJoOTZ2LTk2aC05NnptMzItNjRoMzJ2MzJoLTMyem0zMi0zNTJIODBDNjEtMzIgNDgtMTkgNDggMHY0NDhjMCAxOSAxMyAzMiAzMiAzMmgzNTJjMTkgMCAzMi0xMyAzMi0zMlY5NnptOTYgNDgwSDgwVjBoMjI0djEyOGgxMjh6Ii8+PC9zdmc+"

/***/ }),

/***/ "./src/components/img/warning.svg":
/*!****************************************!*\
  !*** ./src/components/img/warning.svg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgLTMyIDUxMiA1MTIiPjxwYXRoIGZpbGw9IiNmMGJiMzQiIGQ9Ik00ODggMzgwQzQ3NyAzNjAgMjk3IDU3IDI4NyA0MGMtMTYtMjYtNDYtMjctNjIgMEMyMTEgNjQgMzIgMzY2IDI0IDM4MGMtMTQgMjYtMTMgNDYgMzEgNDYgMTMgMCAzODEgMiA0MDAgMiA0NiAwIDQ4LTIwIDMzLTQ4em0tMjEwIDdjLTcgNi0xNCA5LTIyIDlzLTE1LTMtMjItOWMtNi01LTktMTMtOS0yMyAwLTggMy0xNSA5LTIyIDYtNiAxMy05IDIyLTkgOCAwIDE2IDMgMjIgOSA2IDcgOSAxNCA5IDIyIDAgMTAtMyAxOC05IDIzem0tNy0xMTZjLTExIDM3LTIzIDM1LTM0LTEtMTEtMzUtMTYtMTEzLTEyLTEzNyA1LTI2IDUzLTM4IDYyIDAgNiAyOC01IDEwMC0xNiAxMzh6Ii8+PC9zdmc+"

/***/ }),

/***/ "./src/components/servicios.js":
/*!*************************************!*\
  !*** ./src/components/servicios.js ***!
  \*************************************/
/*! exports provided: setAppNEO, http, descargaFichero, subirFichero, getTabit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAppNEO", function() { return setAppNEO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "http", function() { return http; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "descargaFichero", function() { return descargaFichero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subirFichero", function() { return subirFichero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTabit", function() { return getTabit; });
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
const Danaopen = (x, method, url) => {
  if (typeof window.DanaMethodOpen === 'function') {
    //Juniper
    window.DanaMethodOpen("open", x, method, url, true);
    return;
  }

  x.open(method, url, true);
};

const DanaSetRequestHeader = (x, k, v) => {
  if (typeof window.DanaMethodSetRequestHeader === 'function') {
    //Juniper
    window.DanaMethodSetRequestHeader("setRequestHeader", x, k, v);
    return;
  }

  x.setRequestHeader(k, v);
};

const fetch2 = (url, options = {}) => {
  options.method = options.method || 'GET';
  options.body = options.body || null;
  options.headers = options.headers || new Headers();
  const req = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    Danaopen(req, options.method, url); //req.open(options.method, url, true)

    for (const [k, v] of options.headers.entries()) {
      DanaSetRequestHeader(req, k, v); //req.setRequestHeader(k, v)
    }

    req.onload = function () {
      resolve([this.response, this.getResponseHeader('content-type'), this.status]);
    };

    req.onerror = function (e) {
      reject(e);
    };

    req.send(options.body);
  });
};

let config = {
  appCode: 'e3',
  appDomine: 'NS',
  tabit: '/tabit/?queryType='
};

const setAppNEO = () => {
  config = {
    appCode: 'e2',
    appDomine: 'NS',
    tabit: '/tabit/'
  };
};

const toQueryString = o => {
  const str = [];
  Object.entries(o).forEach(([k, v]) => str.push(encodeURIComponent(k) + '=' + encodeURI(v.toString())));
  return str.join('&');
};

const cacheTabit = {};

const getTabit = (tab, params = {}) => {
  if (cacheTabit[tab]) {
    return Promise.resolve(cacheTabit[tab]);
  }

  let url = config.tabit + tab;
  let peticion;

  if (url.indexOf('?') > 0) {
    //get
    const query = toQueryString(params);
    url = url + (query ? '&' + query : '');
    peticion = http(url);
  } else {
    peticion = http(url, params);
  }

  return new Promise((resolve, reject) => {
    peticion.then(r => {
      cacheTabit[tab] = r;
      resolve(r);
    }).catch(reject);
  });
};

const URL_UPLOAD = '/api/1.0/sap/commons/transmission/put';

const get = url => {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('x-j_gid_cod_app', config.appCode);
  return new Promise((resolve, reject) => {
    fetch2(url, {
      credentials: 'same-origin',
      headers
    }).then(resp => {
      if (resp[1] && resp[1].indexOf('application/json') >= 0) {
        let ret = {};

        try {
          ret = JSON.parse(resp[0]);
        } catch (e) {
          reject(['Error de parseo de json', resp[0]]);
          return;
        }

        if (resp[2] === 200) {
          resolve(ret);
        } else {
          reject([ret.operationMessage || `Error haciendo get de ${url}, ${resp[2]}`, ret]);
        }
      } else {
        console.warn(`${url} devolvió content-type: ${resp[1]}`);

        if (resp[2] === 200) {
          resolve(resp[0]);
        } else {
          reject([`Error haciendo get de ${url}, ${resp[2]}`, resp[0]]);
        }
      }
    }).catch(e => {
      reject(["Error de comunicaciones", `Error haciendo get de ${url}, ${e}`]);
    });
  });
};

const post = (url, data) => {
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json;charset=UTF-8');
  headers.append('x-j_gid_cod_app', config.appCode);
  return new Promise((resolve, reject) => {
    fetch2(url, {
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify(data),
      headers
    }).then(resp => {
      if (resp[1] && resp[1].indexOf('application/json') >= 0) {
        let ret = {};

        try {
          ret = JSON.parse(resp[0]);
        } catch (e) {
          reject(['Error de parseo de json', resp[0]]);
          return;
        }

        if (resp[2] === 200) {
          resolve(ret);
        } else {
          reject([ret.operationMessage || `Error haciendo post de ${url}, ${resp[2]}`, ret]);
        }
      } else {
        console.warn(`${url} devolvió content-type: ${resp[1]}`);

        if (resp[2] === 200) {
          resolve(resp[0]);
        } else {
          reject([`Error haciendo post de ${url}, ${resp[2]}`, resp[0]]);
        }
      }
    }).catch(e => {
      reject(["Error de comunicaciones", `Error haciendo post de ${url}, ${e}`]);
    });
  });
};

const descargaFichero = (url, nombre = "sin_nombre") => {
  let ext = '.bin';

  try {
    const tmp = url + '?';
    const posPunto = tmp.lastIndexOf('.');
    const fin = tmp.lastIndexOf('?');
    ext = tmp.substring(posPunto, fin);
  } catch (e) {
    console.warn('Imposible obtener la extensión');
  }

  return getBlob(url).then(blob => {
    let frame = document.querySelector('#frame_descarga_docs');

    if (!frame) {
      frame = document.createElement('div');
      frame.id = 'frame_descarga_docs';
      frame.style.display = 'none';
      frame.innerHTML = '<a>sad</a>';
      document.body.appendChild(frame);
    }

    const a = frame.querySelector('a');
    a.setAttribute('download', nombre + ext);
    a.setAttribute('href', blob);
    const clickevent = document.createEvent("MouseEvent");
    clickevent.initEvent("click", true, true);
    a.dispatchEvent(clickevent);
    setTimeout(() => URL.revokeObjectURL(blob), 10000);
    return true;
  });
};

const getBlob = url => {
  url = url + (url.indexOf('?') > 0 ? '&' : '?') + 'x-j_gid_cod_app=' + config.appCode; //url = urlRewrite(url)

  /*console.log(urlRewrite(url, true))
  if (typeof(DanaOrigUrl) === 'function'){//Juniper
      url = urlRewrite(url, true)
  }*/

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    Danaopen(xhr, 'GET', url); //xhr.open('GET', url, true)

    xhr.responseType = 'blob';
    DanaSetRequestHeader(xhr, 'x-j_gid_cod_app', config.appCode); //xhr.setRequestHeader('x-j_gid_cod_app',config.appCode)

    xhr.onload = function (e) {
      if (this.status == 200) {
        const blob = new Blob([this.response], {
          type: 'application/content-stream'
        });
        resolve(window.URL.createObjectURL(blob));
      } else {
        reject(["Error en la petición - cod: " + String(this.status), this.statusText]);
      }
    };

    xhr.onerror = function (e) {
      reject(["Error descargando fichero", e]);
    };

    xhr.send();
  });
};

const subirFichero = file => {
  if (file.size >= 25242880) {
    return Promise.reject(["El tamaño del fichero excede 24 MB", "El tamaño del fichero excede 24 MB"]);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('server', 'iplusput');
  let headers = new Headers();
  headers.append('x-j_gid_cod_app', config.appCode);
  return new Promise((resolve, reject) => {
    fetch2(URL_UPLOAD, {
      credentials: 'same-origin',
      method: 'post',
      body: formData,
      headers
    }).then(resp => {
      if (resp[1] && resp[1].indexOf('application/json') >= 0) {
        let ret = {};

        try {
          ret = JSON.parse(resp[0]);
        } catch (e) {
          reject(['Error de parseo de json', resp[0]]);
          return;
        }

        if (resp[2] === 200) {
          resolve(ret);
        } else {
          reject(["Error subiendo fichero", ret]);
        }
      } else {
        console.warn(`${url} devolvió content-type: ${resp[1]}`);

        if (resp[2] === 200) {
          resolve(resp[0]);
        } else {
          reject(["Error subiendo fichero", resp[0]]);
        }
      }
    }).catch(e => {
      reject(["Error de comunicaciones", e]);
    });
  });
};

const http = (url, data) => data ? post(url, data) : get(url);



/***/ }),

/***/ "./src/components/stacking.js":
/*!************************************!*\
  !*** ./src/components/stacking.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (getZEfectivoEnBody);

/***/ }),

/***/ "./src/components/utilGestDoc.js":
/*!***************************************!*\
  !*** ./src/components/utilGestDoc.js ***!
  \***************************************/
/*! exports provided: mostrarInfoDoc, mostrarMenuAcciones, mapEstado, mapAccion, is, acciones, mostrarError, EVENT, URLS, filterAndAdjust, documentosPendientes, esAccionGestoria, uniq, resetSec, obtenerMultiArchivo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mostrarInfoDoc", function() { return mostrarInfoDoc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mostrarMenuAcciones", function() { return mostrarMenuAcciones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapEstado", function() { return mapEstado; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapAccion", function() { return mapAccion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acciones", function() { return acciones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mostrarError", function() { return mostrarError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT", function() { return EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URLS", function() { return URLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterAndAdjust", function() { return filterAndAdjust; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "documentosPendientes", function() { return documentosPendientes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "esAccionGestoria", function() { return esAccionGestoria; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniq", function() { return uniq; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetSec", function() { return resetSec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "obtenerMultiArchivo", function() { return obtenerMultiArchivo; });
/* harmony import */ var _Aside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Aside */ "./src/components/Aside.js");
/* harmony import */ var _servicios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./servicios */ "./src/components/servicios.js");
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Modal */ "./src/components/Modal.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 //import getZEfectivoEnBody from './stacking'

let sec = 0;

const uniq = () => {
  return String(sec++);
};

const resetSec = () => {
  sec = 0;
};

let secMulti = 0;

const uniqMulti = () => {
  return String(secMulti++);
};

const resetSecMulti = () => {
  secMulti = 0;
};

const accionesPermitidas = ['AN', 'AD', 'VI', 'IM', 'EM', 'DE', 'DP', 'EP', 'IP', 'VP', 'AF', 'VD', 'EX'];

function filterAndAdjust(documentos) {
  const ret = documentos.filter(it => it.identificadorSubtipoDocumento != " ").map(it => {
    const st = it.instanciasSubtipoDocumentos || it.instanciasSubtipoDocuments;
    return _objectSpread({}, it, {
      instanciasSubtipoDocumentos: st,
      id: uniq(),
      acciones: it.acciones.filter(a => esAccionGestoria(a.codigoAccion))
    });
  });
  return ret;
}

function documentosPendientes(docs) {
  let documentosTotales = 0;
  let documentosEnExpediente = 0;
  docs.forEach(doc => {
    doc.indicadorObligatoriedad && (documentosTotales += 1);
    doc.codigoEstado === 'EE' && doc.indicadorObligatoriedad && (documentosEnExpediente += 1);
  });
  return documentosTotales - documentosEnExpediente;
}

function esAccionGestoria(codigo) {
  return accionesPermitidas.indexOf(codigo) !== -1;
}

const EVENT = {
  SHOW_LOADING_EXPEDIENTE: "LoadingViewExpediente",
  HIDE_LOADING_EXPEDIENTE: "hideLoadingViewExpediente",
  NOTIFY_PENDING: "eventPendingDocuments"
};
const URLS = {
  GESTIONARDOCUMENTOSGESTORIAS: '/api/1.0/extranet/extranet/gestionarDocumentosGestorias',
  OBTENERMOTIVOEXCEPTUACION: '/api/1.0/extranet/ObtenerMotivoExceptuacionSBP/1.0',
  INFO: '/api/1.0/extranet/saps/informacionDocumento',
  MODIFICARDOCUMENTO: '/api/1.0/extranet/ModificarDocumentoSBP/1.0',
  EXCEPTUARDOCUMENTO: '/api/1.0/extranet/ExceptuarDocumentoSBP/1.0'
};
const templateli = document.createElement('template');
const templateliInput = document.createElement('template');
templateli.innerHTML = __webpack_require__(/*! ./fragments/li.html */ "./src/components/fragments/li.html");
templateliInput.innerHTML = __webpack_require__(/*! ./fragments/liInput.html */ "./src/components/fragments/liInput.html");
const mapEstado = {
  NA: 'No aportado',
  NG: 'Pendiente de Firma',
  BL: 'Pendiente de Firma',
  GN: 'Pendiente de Firma',
  GS: 'Pendiente de Firma',
  NE: 'No entregado',
  NP: 'No aportado por la aplicación',
  EE: 'En Expediente',
  EO: 'En otra operación',
  EA: 'Pendiente de Archivo',
  VE: 'Pendiente de Validación',
  EF: 'Pendiente de Firma',
  ED: 'Enviar Documento',
  IC: 'Incorporado por el cliente',
  IR: 'Incorporado por el cliente',
  PD: 'Pendiente Digitalización',
  PF: 'Pendiente de Firma',
  DC: 'Devuelto CTD',
  EC: 'en CTD',
  NV: 'Documento no válido',
  EX: 'Exceptuado',
  ER: 'En Expediente',
  DD: 'Enviando',
  EP: 'Firmado',
  IS: 'Imprimible'
};
const mapAccion = {
  AN: 'Eliminar',
  AD: 'Adjuntar',
  VI: 'Visualizar',
  IM: 'Imprimir',
  EM: 'Enviar email',
  DE: 'Descargar',
  DP: 'Descargar plantilla',
  EP: 'Enviar plantilla',
  IP: 'Imprimir plantilla',
  VP: 'Visualizar plantilla',
  AF: 'Adjuntar firma',
  VD: 'Ver detalle',
  EX: 'Exceptuar'
};

function is(nodo, selector) {
  return nodo.closest(selector) == nodo;
}

const toQueryString = o => {
  const str = [];
  Object.entries(o).forEach(([k, v]) => str.push(encodeURIComponent(k) + '=' + encodeURI(v.toString())));
  return str.join('&');
};

const MSGS = {
  IMPORTEINSUFICIENTE: 'El importe disponible de provisión de fondos no es suficiente para abonar esta factura, <b>debes solicitar autorización para el cargo</b> en la Tarea de Ampliación de Provisión de Fondos.',
  MODOADVERTENCIAANULAR: 'No es posible anular el pago ya que no hay saldo suficiente en la cuenta de la gestoría. Se le notificará a la gestoría que la anulación no es posible.'
};

const mostrarInfoDoc = (doc, e, indicadorConsulta) => {
  if (doc.txtinformacionDocumento) {
    const p = document.createElement('p');
    p.innerHTML = doc.txtinformacionDocumento;

    const style = __webpack_require__(/*! ./fragments/info.scss */ "./src/components/fragments/info.scss");

    Object(_Aside__WEBPACK_IMPORTED_MODULE_0__["aside"])(e, e.composedPath()[0], p, style);
    return;
  }

  const listaInstancias = doc.instanciasSubtipoDocumentos.map(it => it.identificadorInstanciaSubtipoDocumento);
  const tipoFase = doc.codigoFase == 'POST-FORMALIZACIÓN' ? 'POST' : doc.codigoFase == 'FORMALIZACIÓN' ? 'FOR' : '';
  const model = {
    tipoFase: tipoFase,
    codFase: doc.codigoFase,
    idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
    codSubproceso: doc.codigoSubproceso,
    indicadorFichero: 'N',
    listaInstanciasSbtipoDoc: listaInstancias,
    indicadorConsulta: indicadorConsulta,
    tipoFichero: '',
    tipoFirma: ''
  };
  const query = '?' + toQueryString(model);
  const target = e.composedPath()[0];
  target.style.cursor = 'progress';
  Object(_servicios__WEBPACK_IMPORTED_MODULE_1__["http"])(URLS.INFO + query).then(data => {
    doc.txtinformacionDocumento = data.informacionDocumento;
    const p = document.createElement('p');
    p.innerHTML = data.informacionDocumento;

    const style = __webpack_require__(/*! ./fragments/info.scss */ "./src/components/fragments/info.scss");

    target.style.removeProperty('cursor');
    Object(_Aside__WEBPACK_IMPORTED_MODULE_0__["aside"])(e, target, p, style);
  }).catch(e => {
    mostrarError(e);
    target.style.removeProperty('cursor');
  });
};

const mostrarMenuAcciones = (doc, e, node) => {
  const onclick = e => {
    const target = e.composedPath()[0];
    const li = target.closest('li');

    if (e.type == "click" && is(target, 'input')) {
      target.value = "";
      return;
    }

    if (is(target, 'p') && li.hasAttribute('data-id')) {
      node.dispatchEvent(new CustomEvent('bk-click', {
        detail: {
          accion: li.getAttribute('data-id')
        },
        bubbles: true
      }));
      close();
    } else if (e.type == 'change' && is(target, 'input') && li.hasAttribute('data-id') && target.files[0]) {
      node.dispatchEvent(new CustomEvent('bk-click', {
        detail: {
          accion: li.getAttribute('data-id'),
          file: target.files[0]
        },
        bubbles: true
      }));
      close();
    }
  };

  const clean = e => {
    ul.removeEventListener('bk-clean', clean);
    ul.removeEventListener('click', onclick);
  };

  let acciones = doc.acciones.map(a => a.codigoAccion);
  acciones.shift();
  acciones = acciones.reduce((a, it) => {
    return _objectSpread({}, a, {
      [it]: mapAccion[it]
    });
  }, {});
  const ul = document.createElement('ul');
  Object.keys(acciones).forEach(it => {
    const li = ['AD', 'AF'].includes(it) ? templateliInput.content.cloneNode(true) : templateli.content.cloneNode(true);
    li.querySelector('p').innerText = acciones[it];
    li.querySelector('li').setAttribute('data-id', it);
    ul.appendChild(li
    /*.querySelector('li')*/
    );
  });

  const style = __webpack_require__(/*! ./fragments/menu.scss */ "./src/components/fragments/menu.scss");

  const close = Object(_Aside__WEBPACK_IMPORTED_MODULE_0__["aside"])(e, e.composedPath()[0], ul, style, 11, true, true);
  /*const kk = ul.querySelector('li')
  console.log(getZEfectivoEnBody(kk))*/

  ul.addEventListener('click', onclick);
  ul.addEventListener('change', onclick);
  ul.addEventListener('bk-clean', clean); //console.log(doc, e, acciones)
};

const mostrarError = e => {
  console.log(e);
  console.trace();

  const handle = () => {
    json.classList.toggle('oculto');
  };

  const clean = () => {
    manejador.removeEventListener('click', handle);
    aspa.removeEventListener('click', close);
    aceptar.removeEventListener('click', close);
    markup.removeEventListener('bk-clean', clean);
  };

  if (!Array.isArray(e) || e.length != 2) {
    e = ["Error general", e];
  }

  const style = __webpack_require__(/*! ./fragments/error.scss */ "./src/components/fragments/error.scss");

  const html = __webpack_require__(/*! ./fragments/error.html */ "./src/components/fragments/error.html");

  const markup = document.createElement('div');
  markup.innerHTML = html;
  markup.querySelector('.txt').innerText = e[0];
  const json = markup.querySelector('.json');
  json.innerText = JSON.stringify(e[1], null, 4);
  const manejador = markup.querySelector('.manejador');
  manejador.addEventListener('click', handle);
  const aspa = markup.querySelector('.aspa');
  const close = Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["popupi"])(markup, style);
  aspa.addEventListener('click', close);
  const aceptar = markup.querySelector('.aceptar');
  aceptar.addEventListener('click', close);
  markup.addEventListener('bk-clean', clean);
};

const acciones = {
  consultarDocumento: (doc, cfg, sb) => {
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst => inst.identificadorInstanciaSubtipoDocumento);
    var model = {
      datosExpedienteConsultar: {
        codFase: doc.codigoFase,
        idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
        listaInstanciasSbtipoDoc: listaInstancias,
        codSubproceso: doc.codigoSubproceso,
        indicadorFichero: 'S',
        indicadorConsulta: cfg.indicadorConsulta
      }
    };
    return new Promise((resolve, reject) => {
      sb.sendEvent('consultarDocumentoExpedienteDocumental', model).when('VisualizarDocumentoIUViewIU', response => {
        const ficheroInyectado = response.ficheroInyectado;
        resolve('/api/1.0/sap/commons/transmission/get/iplusget/' + ficheroInyectado.ficheros[0].localizadorFichero);
      }).error(reject);
    });
  },
  generarPlantilla: (doc, cfg, sb) => {
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst => inst.identificadorInstanciaSubtipoDocumento);
    var model = {
      datosExpedientePlantilla: {
        idInstanciaDocumento: listaInstancias[0],
        codFase: doc.codigoFase,
        codSubproceso: doc.codigoSubproceso,
        idInstanciaProceso: cfg.tarea.identificadorExpedienteDocumental,
        codIdioma: 'ES',
        opcionImpresion: 'CO01',
        numCopias: '0001',
        opcionGeneracion: '02',
        indFirmaDigital: 'N',
        datosImpresion: ''
      }
    };
    return new Promise((resolve, reject) => {
      sb.sendEvent('generarPlantillaGestorDocumental', model).when('MostrarPlantillaIUView', response => {
        resolve(response.localizadorFichero);
      }).error(reject);
    });
  },
  adjuntarDocumento: (doc, cfg, sb, loc) => {
    var model = {
      datosExpedienteAdjuntar: {
        codigoFase: doc.codigoFase,
        codigoSubproceso: doc.codigoSubproceso,
        atributosnombreDocumento: [{
          nombre: ' ',
          orden: ' ',
          valor: ' '
        }],
        instanciasSubtipoDocument: doc.instanciasSubtipoDocumentos,
        localizadorFichero: loc,
        identificadorPropuesta: cfg.propuesta.identificadorPropuesta,
        identificadorContratoExpedienteActivo: cfg.propuesta.identificadorExpediente,
        codigoFamiliaProducto: cfg.propuesta.codigoFamiliaProducto,
        codigoGrupoProducto: cfg.propuesta.codigoGrupoProducto,
        codigoLineaNegocio: cfg.propuesta.codigoLineaDeNegocio,
        identificadorSubtipoDocumento: doc.identificadorSubtipoDocumento
      }
    };
    return new Promise((resolve, reject) => {
      sb.sendEvent('adjuntarDocumentoEnGestorDocumental', model).when('MostrarDocumentosGestoriasIU', response => {
        resolve(response);
      }).error(reject);
    });
  },
  adjuntarFirma: (doc, cfg, sb, loc) => {
    var model = {
      datosExpedienteAdjuntar: {
        codigoFase: doc.codigoFase,
        codigoSubproceso: doc.codigoSubproceso,
        atributosnombreDocumento: [{
          nombre: ' ',
          orden: ' ',
          valor: ' '
        }],
        instanciasSubtipoDocument: doc.instanciasSubtipoDocumentos,
        localizadorFichero: loc,
        identificadorPropuesta: cfg.propuesta.identificadorPropuesta,
        identificadorContratoExpedienteActivo: cfg.propuesta.identificadorExpediente,
        codigoFamiliaProducto: cfg.propuesta.codigoFamiliaProducto,
        codigoGrupoProducto: cfg.propuesta.codigoGrupoProducto,
        codigoLineaNegocio: cfg.propuesta.codigoLineaDeNegocio,
        identificadorSubtipoDocumento: doc.identificadorSubtipoDocumento
      }
    };
    return new Promise((resolve, reject) => {
      const cerrar = () => {
        close();
        resolve(false);
      };

      const clean = () => {
        resolve(false);
        aspa.removeEventListener('click', cerrar);
        cancelar.removeEventListener('click', cerrar);
        markup.removeEventListener('bk-clean', clean);
        aceptar.removeEventListener('click', handle);
        date.removeEventListener('bkInput', handleChange);
      };

      const handle = () => {
        if (aceptar.hasAttribute('disabled')) {
          return;
        }

        aceptar.setAttribute('disabled', true);
        error.innerText = "";
        model.datosExpedienteAdjuntar.fechaFirma = date.value.toISOString().replace(':', '.').replace(':', '.').replace('T', '-').replace('Z', '');
        aceptar.classList.add('progress');
        sb.sendEvent('adjuntarDocumentoEnGestorDocumental', model, true).when('MostrarDocumentosGestoriasIU', response => {
          aceptar.classList.remove('progress');
          resolve(true);
          close();
        }).error(e => {
          console.log(e);
          aceptar.classList.remove('progress');
          error.innerText = "Error en la operación";
          aceptar.removeAttribute('disabled');
        });
      };

      const handleChange = () => {
        if (date.validity.valid) {
          aceptar.removeAttribute('disabled');
        } else {
          aceptar.setAttribute('disabled', '');
        }
      };

      const style = __webpack_require__(/*! ./fragments/adjuntarFirma.scss */ "./src/components/fragments/adjuntarFirma.scss");

      const html = __webpack_require__(/*! ./fragments/adjuntarFirma.html */ "./src/components/fragments/adjuntarFirma.html");

      const markup = document.createElement('div');
      markup.innerHTML = html;
      const aspa = markup.querySelector('.aspa');
      aspa.addEventListener('click', cerrar);
      const cancelar = markup.querySelector('.cancelar');
      cancelar.addEventListener('click', cerrar);
      const aceptar = markup.querySelector('.aceptar');
      aceptar.addEventListener('click', handle);
      markup.addEventListener('bk-clean', clean);
      const date = markup.querySelector('bk-wc-ui-date');
      date.addEventListener('bkInput', handleChange);
      const error = markup.querySelector('.error');
      const close = Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["popupi"])(markup, style);
    });
  },
  eliminarDocumento: (doc, sb) => {
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst => inst.identificadorInstanciaSubtipoDocumento);
    var model = {
      datosExpedienteEliminar: {
        codFase: doc.codigoFase,
        idDocGestorDoc: doc.identificadorDocumentoGestorDocumental,
        listaInstanciasSbtipoDoc: listaInstancias,
        codSubproceso: doc.codigoSubproceso,
        indicadorFichero: 'S'
      }
    };
    return new Promise((resolve, reject) => {
      sb.sendEvent('eliminarDocumentoEnGestorDocumental', model).when('MostrarDocumentosGestoriasIU', resolve).error(reject);
    });
  },
  obtenerMotivoExceptuacion: (doc, cfg) => {
    const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst => inst.identificadorInstanciaSubtipoDocumento);
    var model = {
      codigoFase: doc.codigoFase,
      documentoExceptuacion: listaInstancias[0],
      codigoSubproceso: doc.codigoSubproceso,
      indConsulta: cfg.indicadorConsulta,
      idDocGestor: doc.identificadorDocumentoGestorDocumental
    };
    let datos = undefined;
    return Object(_servicios__WEBPACK_IMPORTED_MODULE_1__["http"])(URLS.OBTENERMOTIVOEXCEPTUACION, model).then(data => {
      datos = data.data;
      return atenderErroresyAvisos(data.data);
    }).then(tf => {
      //datos.codMotivoExceptuacion = 'ER'
      if (!tf || !datos.codMotivoExceptuacion) {
        return false;
      } else {
        return openModalExceptuar(doc, datos);
      }
    }).then(tf => {
      if (!datos.codigoError && !datos.avisos && !datos.codMotivoExceptuacion) {
        return new Promise((resolve, reject) => {
          Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["dialogMsg"])({
            type: 'info',
            message: 'Información',
            detail: "Sin errores, avisos ni formulario de exceptuación",
            textoOk: 'Aceptar'
          }).then(() => resolve(false));
        });
      }

      return tf;
    }).catch(mostrarError);
  },
  exceptuarDocumento: doc => {
    return openModalExceptuar(doc, {}, true);
  }
};

const openModalExceptuar = (doc, datos, nuevo) => {
  const listaInstancias = doc.instanciasSubtipoDocumentos.map(inst => inst.identificadorInstanciaSubtipoDocumento);
  return new Promise((resolve, reject) => {
    const handle_change = () => {
      if (select.value == '-1') {
        select.classList.add('req');
        modificar.setAttribute('disabled', true);
      } else {
        select.classList.remove('req');
        modificar.removeAttribute('disabled');
      }
    };

    const handle = () => {
      if (modificar.hasAttribute('disabled')) {
        return;
      }

      error.innerText = "";
      modificar.setAttribute('disabled', true);
      var model = {
        codMotivoExceptuacion: select.value,
        documentoExceptuacion: listaInstancias[0],
        observaciones: textarea.value
      };
      return Object(_servicios__WEBPACK_IMPORTED_MODULE_1__["http"])(nuevo ? URLS.EXCEPTUARDOCUMENTO : URLS.MODIFICARDOCUMENTO, model).then(data => {
        modificar.removeAttribute('disabled');

        if (data.data && data.data.codigoError && data.data.resolucion) {
          error.innerText = data.data.resolucion;
        } else {
          resolve(true);
          close();
        }
      }).catch(e => {
        console.log(e);
        error.innerText = "Error en la operación";
        modificar.removeAttribute('disabled');
      });
    };

    const cerrar = () => {
      close();
      resolve(false);
    };

    const clean = () => {
      resolve(false);
      aspa.removeEventListener('click', cerrar);
      cancelar.removeEventListener('click', cerrar);
      markup.removeEventListener('bk-clean', clean);
      modificar.removeEventListener('click', handle);
      select.removeEventListener('change', handle_change);
    };

    const style = __webpack_require__(/*! ./fragments/modalExceptuar.scss */ "./src/components/fragments/modalExceptuar.scss");

    const html = __webpack_require__(/*! ./fragments/modalExceptuar.html */ "./src/components/fragments/modalExceptuar.html");

    const markup = document.createElement('div');
    markup.innerHTML = html;
    const aspa = markup.querySelector('.aspa');
    aspa.addEventListener('click', cerrar);
    const cancelar = markup.querySelector('.cancelar');
    cancelar.addEventListener('click', cerrar);
    const modificar = markup.querySelector('.modificar');
    nuevo && (modificar.innerText = "Aceptar");
    modificar.addEventListener('click', handle);
    markup.addEventListener('bk-clean', clean);
    const select = markup.querySelector('select');
    select.addEventListener('change', handle_change);
    const textarea = markup.querySelector('textarea');
    const error = markup.querySelector('.error');
    Object(_servicios__WEBPACK_IMPORTED_MODULE_1__["getTabit"])('ObtenerMotivosExceptuacionDocumentoDYDA').then(data => {
      data.forEach(option => {
        const op = document.createElement('option');
        op.innerText = option.DESLARGA;
        op.value = option.CODIGO;
        select.appendChild(op);
      });

      if (nuevo) {
        const op = document.createElement('option');
        op.innerText = "Seleccione una opción";
        op.value = "-1";

        if (data.length > 0) {
          select.insertBefore(op, select.firstChild);
          select.classList.add('req');
        } else {
          select.appendChild(op);
        }
      }

      select.value = datos.codMotivoExceptuacion || "-1";
      markup.querySelector('.message').innerText = doc.nombreTipoDocumento || "";
      textarea.value = datos.observaciones ? datos.observaciones : '';
      handle_change();
    });
    const close = Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["popupi"])(markup, style);
  });
};

const atenderErroresyAvisos = data => {
  //data.codigoError = 'TN99991E'
  return new Promise((resolve, reject) => {
    if (data.codigoError) {
      let cfg = {
        type: 'error',
        message: 'ERROR',
        detail: data.resolucion,
        textoOk: 'Aceptar'
      };

      if (data.codigoError == 'TN99991E') {
        cfg = {
          type: 'alert',
          message: 'Importe insuficiente',
          detail: MSGS.IMPORTEINSUFICIENTE,
          textoOk: 'Aceptar'
        };
      }
      /*else if (data.codigoError == 'TN99992E'){
          cfg = { type: 'info', message: '', detail: 'msg', textoOk: 'Aceptar' }
      }*/
      else if (data.codigoError == 'TN00030E') {
          cfg = {
            type: 'alert',
            message: 'Saldo insuficiente',
            detail: MSGS.MODOADVERTENCIAANULAR,
            textoOk: 'Aceptar'
          };
        }

      Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["dialogMsg"])(cfg).then(out => resolve(false));
    } else if (data.avisos) {
      const mensaje = data.avisos.join('<br/>');
      Object(_Modal__WEBPACK_IMPORTED_MODULE_2__["dialogMsg"])({
        type: 'alert',
        message: 'Aviso',
        detail: mensaje,
        textoOk: 'Aceptar'
      }).then(out => resolve(true));
    } else {
      resolve(true);
    }
  });
};

const obtenerMultiArchivo = (node, doc, indicadorConsulta, subprocesoInyeccion) => {
  if (node.querySelector('.children').innerHTML !== "") {
    return Promise.resolve(true);
  }

  const listaInstancias = doc.instanciasSubtipoDocumentos.map(it => it.identificadorInstanciaSubtipoDocumento);
  const model = {
    'datosExpedienteConsultar': {
      'codFase': doc.codigoFase,
      'idDocGestorDoc': doc.identificadorDocumentoGestorDocumental,
      'listaInstanciasSbtipoDoc': listaInstancias,
      'codSubproceso': doc.codigoSubproceso,
      'indicadorConsulta': indicadorConsulta,
      'indicadorFichero': 'N'
    }
  };
  return new Promise((resolve, reject) => {
    subprocesoInyeccion.sendEvent('consultarDocumentoExpedienteDocumental', model).when('VisualizarDocumentoIUViewIU', data => {
      const ficheros = data.ficheroInyectado.ficheros.filter(d => d.nombrefichero != ' ');
      const multidocs = ficheros.map(d => {
        const acciones = d.acciones.filter(a => esAccionGestoria(a)).map(a => ({
          codigoAccion: a
        }));
        return {
          nombreSubtipoDocumento: d.nombrefichero,
          codigoEstado: d.estadoFichero,
          identificadorDocumentoGestorDocumental: d.idDocGestorDocOut,
          id: uniqMulti(),
          parentId: doc.id,
          indicadorOriginalCopia: doc.indicadorOriginalCopia,
          indicadorObligatoriedad: doc.indicadorObligatoriedad,
          indicadorRequiereFirma: doc.indicadorRequiereFirma,
          acciones,
          codigoFase: doc.codigoFase,
          instanciasSubtipoDocumentos: doc.instanciasSubtipoDocumentos,
          codigoSubproceso: doc.codigoSubproceso
        };
      });
      resolve(multidocs);
    }).error(reject);
  });
};



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: popup, popupi, setAppNEO, http, Subprocess, aside, progress, mostrarError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ui_date_wc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ui-date-wc */ "./node_modules/ui-date-wc/dist/date.js");
/* harmony import */ var ui_date_wc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ui_date_wc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Modal */ "./src/components/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popup", function() { return _components_Modal__WEBPACK_IMPORTED_MODULE_1__["popup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "popupi", function() { return _components_Modal__WEBPACK_IMPORTED_MODULE_1__["popupi"]; });

/* harmony import */ var _components_GestDoc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/GestDoc */ "./src/components/GestDoc.js");
/* harmony import */ var _components_GestDocTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/GestDocTree */ "./src/components/GestDocTree.js");
/* harmony import */ var _components_servicios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/servicios */ "./src/components/servicios.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setAppNEO", function() { return _components_servicios__WEBPACK_IMPORTED_MODULE_4__["setAppNEO"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "http", function() { return _components_servicios__WEBPACK_IMPORTED_MODULE_4__["http"]; });

/* harmony import */ var _components_Subprocess__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Subprocess */ "./src/components/Subprocess.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subprocess", function() { return _components_Subprocess__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _components_Aside__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/Aside */ "./src/components/Aside.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "aside", function() { return _components_Aside__WEBPACK_IMPORTED_MODULE_6__["aside"]; });

/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/Progress */ "./src/components/Progress.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "progress", function() { return _components_Progress__WEBPACK_IMPORTED_MODULE_7__["progress"]; });

/* harmony import */ var _components_utilGestDoc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/utilGestDoc */ "./src/components/utilGestDoc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mostrarError", function() { return _components_utilGestDoc__WEBPACK_IMPORTED_MODULE_8__["mostrarError"]; });










window.customElements.define('priv-modal', _components_Modal__WEBPACK_IMPORTED_MODULE_1__["default"]);
window.customElements.define('bk-wc-gest-doc', _components_GestDoc__WEBPACK_IMPORTED_MODULE_2__["default"]);
window.customElements.define('bk-wc-aside', _components_Aside__WEBPACK_IMPORTED_MODULE_6__["default"]);
window.customElements.define('bk-wc-progress', _components_Progress__WEBPACK_IMPORTED_MODULE_7__["default"]);
window.customElements.define('bk-wc-gest-doc-tree', _components_GestDocTree__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./src/mocks/k.json":
/*!**************************!*\
  !*** ./src/mocks/k.json ***!
  \**************************/
/*! exports provided: data, stateData, default */
/***/ (function(module) {

module.exports = {"data":{"documentos":[{"identificadorSubtipoDocumento":"SD-0243","nombreSubtipoDocumento":"Anexo declaración de bienes","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Anexo declaración de bienes","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"015814726#0000","codigoEstado":"EP","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809310"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0243","nombreSubtipoDocumento":"Anexo declaración de bienes","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Anexo declaración de bienes","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EP","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809254"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0257","nombreSubtipoDocumento":"Minuta base préstamos","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Minuta base préstamos","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJDNEUQBLHRS1NNTRFSGSUVI5FCAT4KRNU594","codigoTipoOrigenSubtipoDocumento":"IP","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"Oficina","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":"AN"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809324"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0259","nombreSubtipoDocumento":"Carta Concesión: con gtía. Hipotecaria, con oferta vinculante","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Carta Concesión: con gtía. Hipotecaria, con oferta vinculante","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"IP","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":true,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809326"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0260","nombreSubtipoDocumento":"Carta Concesión: con gtía. Hipotecaria, sin oferta vinculante","codigoTipoDocumento":"TD-0000","nombreTipoDocumento":"Carta Concesión: con gtía. Hipotecaria, sin oferta vinculante","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"IP","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":true,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809313"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0425","nombreSubtipoDocumento":"Recibí cheques (firmado por Cliente)","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Recibí cheques (firmado por Cliente)","indicadorSoporte":"EL","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NA","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":true,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809368"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0426","nombreSubtipoDocumento":"Solicitud cheques (firmado por el cliente)","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Solicitud cheques (firmado por el cliente)","indicadorSoporte":"EL","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NA","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":true,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809360"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0258","nombreSubtipoDocumento":"Carta al Notario","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Carta al Notario","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJDNEUQBLHRS1NNTRFSGSVTIEK4NSOVN66AFL","codigoTipoOrigenSubtipoDocumento":"IP","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"Oficina","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":"AN"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809325"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0422","nombreSubtipoDocumento":"Provisión de fondos comprador","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Provisión de fondos comprador","indicadorSoporte":"EL","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJDNEUQBLHRS1NNTRFSGSVPH4A0LAI5IH2AV4","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"Oficina","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":"VD"},{"codigoAccion":"AN"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809363"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0423","nombreSubtipoDocumento":"Provisión de fondos vendedor","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Provisión de fondos vendedor","indicadorSoporte":"EL","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NG","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"GD"},{"codigoAccion":"PR"},{"codigoAccion":"IB"},{"codigoAccion":"EX"},{"codigoAccion":"ES"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809365"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0718","nombreSubtipoDocumento":"Otros documentos de Formalización","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Otros documentos de Formalización","indicadorSoporte":"PA","indicadorOriginalCopia":"CO","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"NA","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO8","nombreAgrupacion":"Documentos de Formalización","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":true,"numeroOrdenDocumento":43,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809351"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0115","nombreSubtipoDocumento":"Oferta vinculante (OV)","codigoTipoDocumento":"TD-0020","nombreTipoDocumento":"Oferta vinculante (OV)","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJMNEUQBLH2HEPDN3C9TBIJ2G6AC3M0MH6U3V","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO9","nombreAgrupacion":"Documentos normativos","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"CT","informacionDocumento":"S","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":true,"indicadorMultiArchivo":false,"numeroOrdenDocumento":45,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":"AN"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809337"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0114","nombreSubtipoDocumento":"Ficha Personalizada (FIPER)","codigoTipoDocumento":"TD-0000","nombreTipoDocumento":"Ficha Personalizada (FIPER)","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJMVEUQBLH0UKQIFJ4K5M47GK6NCBBFCLS51H","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO9","nombreAgrupacion":"Documentos normativos","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"Oficina","informacionDocumento":"S","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":true,"indicadorMultiArchivo":false,"numeroOrdenDocumento":45,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809340"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0113","nombreSubtipoDocumento":"Ficha precontractual (FIPRE)","codigoTipoDocumento":"TD-0000","nombreTipoDocumento":"Ficha precontractual (FIPRE)","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJN7EUQBLHPBOVVJ558O2QD0LBR5Q0QALTCQ3","codigoTipoOrigenSubtipoDocumento":"IE","codigoExpedienteInterviniente":"022308175#0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":"PDACO9","nombreAgrupacion":"Documentos normativos","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":"Oficina","informacionDocumento":"S","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":true,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":true,"indicadorMultiArchivo":false,"numeroOrdenDocumento":45,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809321"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0341","nombreSubtipoDocumento":"Certificado de tasación- Proporcionado por la tasadora","codigoTipoDocumento":"TD-0022","nombreTipoDocumento":"Certificado de tasación- Proporcionado por la tasadora","indicadorSoporte":"PA","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":"UJBAJHNEUQBLG9TR6IDV8JIV9CC9DKIOKKP3L6S1","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":" #0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":" ","nombreAgrupacion":"Documento sin agrupación","nombreGarantia":"CL DOS, 2, YESTE, ALBACETE # GARANTIA HIPOTECARIA","identificadorExpedienteGarantia":"00212000000000000001","incorporadoPor":"Oficina","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":44,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809398"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0280","nombreSubtipoDocumento":"Certificado de saldo de cargas pendientes","codigoTipoDocumento":"TD-0000","nombreTipoDocumento":"Certificado de saldo de cargas pendientes","indicadorSoporte":"PA","indicadorOriginalCopia":"CO","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":" #0000","codigoEstado":"NA","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":" ","nombreAgrupacion":"Documento sin agrupación","nombreGarantia":"CL DOS, 2, YESTE, ALBACETE # GARANTIA HIPOTECARIA","identificadorExpedienteGarantia":"00212000000000000001","incorporadoPor":" ","informacionDocumento":"S","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":true,"indicadorMultiArchivo":true,"numeroOrdenDocumento":44,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809383"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0296","nombreSubtipoDocumento":"Póliza de seguro de incendios/Daños","codigoTipoDocumento":"TD-0022","nombreTipoDocumento":"Póliza de seguro de incendios/Daños","indicadorSoporte":"PA","indicadorOriginalCopia":"CO","identificadorDocumentoGestorDocumental":"UJBAJGNEUQBLH6G9DLGM9K1P5N8BG3VL1UPSPCN2","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":" #0000","codigoEstado":"EE","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":" ","nombreAgrupacion":"Documento sin agrupación","nombreGarantia":"CL DOS, 2, YESTE, ALBACETE # GARANTIA HIPOTECARIA","identificadorExpedienteGarantia":"00212000000000000001","incorporadoPor":"CSO","informacionDocumento":"S","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":true,"indicadorObligatoriedad":true,"indicadorDocumentoVisibile":true,"indicadorDescripcion":true,"indicadorMultiArchivo":false,"numeroOrdenDocumento":44,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"VI"},{"codigoAccion":"IM"},{"codigoAccion":"EM"},{"codigoAccion":"DE"},{"codigoAccion":"AN"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809400"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":"SD-0419","nombreSubtipoDocumento":"Orden de transferencia para cancelación de cargas","codigoTipoDocumento":"TD-0021","nombreTipoDocumento":"Orden de transferencia para cancelación de cargas","indicadorSoporte":"EL","indicadorOriginalCopia":"OR","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":"PC","codigoExpedienteInterviniente":" #0000","codigoEstado":"NA","codigoFase":"FORMALIZACIÓN","codigoSubproceso":"TN415RD4G","indicadorAgrupacion":" ","nombreAgrupacion":"Documento sin agrupación","nombreGarantia":"CL DOS, 2, YESTE, ALBACETE # GARANTIA HIPOTECARIA","identificadorExpedienteGarantia":"00212000000000000001","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":true,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":true,"indicadorDescripcion":false,"indicadorMultiArchivo":true,"numeroOrdenDocumento":44,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":"AD"},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":"2809401"},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"},{"identificadorSubtipoDocumento":" ","nombreSubtipoDocumento":" ","codigoTipoDocumento":" ","nombreTipoDocumento":" ","indicadorSoporte":" ","indicadorOriginalCopia":" ","identificadorDocumentoGestorDocumental":" ","codigoTipoOrigenSubtipoDocumento":" ","codigoExpedienteInterviniente":" #0000","codigoEstado":" ","codigoFase":" ","codigoSubproceso":" ","indicadorAgrupacion":" ","nombreAgrupacion":" ","nombreGarantia":" ","identificadorExpedienteGarantia":" ","incorporadoPor":" ","informacionDocumento":"N","indicadorDigitalizacionCTD":false,"indicadorRequiereFirma":false,"indicadorTratamientoBackOffice":false,"indicadorDocumentoDefinidoExpediente":false,"indicadorArchivo":false,"indicadorObligatoriedad":false,"indicadorDocumentoVisibile":false,"indicadorDescripcion":false,"indicadorMultiArchivo":false,"numeroOrdenDocumento":0,"numeroSubOrdenDocumento":0,"acciones":[{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "},{"codigoAccion":" "}],"instanciasSubtipoDocuments":[{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "},{"identificadorInstanciaSubtipoDocumento":" "}],"nombreInterviniente":"DNI - 007472927C - MARIA CARMEN BALLESTEROS SANTOS"}],"codigoEstadoInstanciaProceso":"AB","indicadorMasDocumentos":false,"codigoExpedienteIntervinientePrincipal":"022308175","codigoProducto":"21000","identificadorContrato":"00000002246582622","identificadorMultiproducto":"000000001114363048","identificadorPropuesta":"000000001114363048","codigoInterviniente":"022308175#0000"},"stateData":{"viewId":"MostrarDocumentosGestoriasIU","availableTransitions":{"adjuntarDocumentoEnGestorDocumental":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=adjuntarDocumentoEnGestorDocumental&execution=e6s1","consultarDocumentoExpedienteDocumental":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=consultarDocumentoExpedienteDocumental&execution=e6s1","generarPlantillaGestorDocumental":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=generarPlantillaGestorDocumental&execution=e6s1","terminar":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=terminar&execution=e6s1","eliminarDocumentoEnGestorDocumental":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=eliminarDocumentoEnGestorDocumental&execution=e6s1","obtenerDocumentosInyectados":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=obtenerDocumentosInyectados&execution=e6s1","end":"/api/1.0/extranet/extranet/gestionarDocumentosGestorias?_eventId=end&execution=e6s1"}}};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map