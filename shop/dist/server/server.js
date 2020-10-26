/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/Cart.js":
/*!****************************!*\
  !*** ./src/server/Cart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var add = function add(cart, req) {\n  cart.products.push(req.body);\n  console.log(cart.countGoods);\n  cart.countGoods = cart.products.length;\n  console.log(cart.countGoods);\n  console.log(cart.amount);\n  var amount = 0;\n  cart.products.forEach(function (el) {\n    return amount += el.quantity * el.price;\n  });\n  cart.amount = amount;\n  console.log(cart.amount);\n  return {\n    name: req.body.name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n\nvar change = function change(cart, req) {\n  var find = cart.products.find(function (el) {\n    return el.id === +req.params.id;\n  });\n  find.quantity += req.body.quantity;\n  return {\n    name: find.name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n/**\n * Добавили новый метод удаления\n * @param cart\n * @param req\n * @returns {{newCart: *, name: *}}\n */\n\n\nvar remove = function remove(cart, req) {\n  var find = cart.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n  cart.splice(cart.indexOf(find), 1);\n  return {\n    name: find.name,\n    newCart: JSON.stringify(cart, null, 4)\n  };\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack:///./src/server/Cart.js?");

/***/ }),

/***/ "./src/server/CartRouter.js":
/*!**********************************!*\
  !*** ./src/server/CartRouter.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar handler = __webpack_require__(/*! ./Handler */ \"./src/server/Handler.js\");\n\nvar router = express.Router();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar cartJSONPath = path.resolve(__dirname, './db/cart.json');\nrouter.get('/', function (req, res) {\n  console.log(\"getCart. \", cartJSONPath);\n  fs.readFile(cartJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\nrouter.post('/', function (req, res) {\n  console.log(\"postCart\");\n  handler(req, res, 'add', cartJSONPath);\n});\nrouter.put('/:id', function (req, res) {\n  console.log(\"putCart\");\n  handler(req, res, 'change', cartJSONPath);\n});\nrouter[\"delete\"]('/:id', function (req, res) {\n  console.log(\"deleteCart\");\n  handler(req, res, 'remove', cartJSONPath);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/CartRouter.js?");

/***/ }),

/***/ "./src/server/Handler.js":
/*!*******************************!*\
  !*** ./src/server/Handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cart = __webpack_require__(/*! ./Cart */ \"./src/server/Cart.js\"); //const logger = require('./logger');\n\n\nvar actions = {\n  add: cart.add,\n  change: cart.change,\n  remove: cart.remove\n};\n\nvar handler = function handler(req, res, action, file) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      var _actions$action = actions[action](JSON.parse(data), req),\n          name = _actions$action.name,\n          newCart = _actions$action.newCart;\n\n      fs.writeFile(file, newCart, function (err) {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          console.log(name); //logger(name, action);\n\n          res.send('{\"result\": 1}');\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/Handler.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar app = express();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar cartRouter = __webpack_require__(/*! ./CartRouter */ \"./src/server/CartRouter.js\");\n\napp.use(express.json());\napp.use('/', express[\"static\"](path.resolve(__dirname, '../public')));\napp.use('/api/cart', cartRouter);\napp.get('/api/products_main', function (req, res) {\n  fs.readFile(path.resolve(__dirname, './db/products_main.json'), 'utf-8', function (err, data) {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\n/*\napp.get('/api/cart', (req, res) =>{\n    fs.readFile(path.resolve(__dirname, './db/cart.json'), 'utf-8', (err, data) => {\n        if (err) {\n            res.send(JSON.stringify({result: 0, text: err}))\n        }else{\n            res.send(data);\n        }\n    });\n})\n*/\n\nvar port = process.env.PORT || 5555;\napp.listen(port, function () {\n  console.log(\"Listening \".concat(port, \" port\"));\n}); // const http = require(\"http\");\n// const server = http.createServer((req, res) => {\n//     if (req.url === '/') {\n//         res.write('Hello world');\n//         res.end();\n//     }\n//\n//     if (req.url === '/home') {\n//         res.write('Hello world. It is home page.');\n//         res.end();\n//     }\n//\n//     if (req.url === '/api/products_main') {\n//         fs.readFile('db/products_main.json', 'utf-8', (err, data) => {\n//             if (err) {\n//                 console.log(err);\n//             }else{\n//                 res.write(data);\n//                 res.end();\n//             }\n//         })\n//     };\n//\n//     if (req.url === '/api/products') {\n//         fs.readFile('db/products.json', 'utf-8', (err, data) => {\n//             if (err) {\n//                 console.log(err);\n//             }else{\n//                 res.write(data);\n//                 res.end();\n//             }\n//         })\n//     }\n// });\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });