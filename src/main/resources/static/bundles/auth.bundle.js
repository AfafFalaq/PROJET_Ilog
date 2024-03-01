/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main/resources/static/AuthBundle.js":
/*!*************************************************!*\
  !*** ./src/main/resources/static/AuthBundle.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Models_AuthModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Models/AuthModel */ \"./src/main/resources/static/Models/AuthModel.js\");\n/* harmony import */ var _Views_AuthView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/AuthView */ \"./src/main/resources/static/Views/AuthView.js\");\n/* harmony import */ var _Controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controllers/AuthController */ \"./src/main/resources/static/Controllers/AuthController.js\");\n// AuthBundle.js\r\n\r\n// Import the MVC components related to authentication\r\n\r\n\r\n\r\n\r\n// Instantiate the MVC components\r\nconst authModel = new _Models_AuthModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nconst authView = new _Views_AuthView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst authController = new _Controllers_AuthController__WEBPACK_IMPORTED_MODULE_2__[\"default\"](authModel, authView);\r\n\r\n// Initialize the controller which in turn initializes the rest of the application\r\n\r\nauthController.init();\r\n\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/AuthBundle.js?");

/***/ }),

/***/ "./src/main/resources/static/Controllers/AuthController.js":
/*!*****************************************************************!*\
  !*** ./src/main/resources/static/Controllers/AuthController.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Models_AuthModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/AuthModel.js */ \"./src/main/resources/static/Models/AuthModel.js\");\n/* harmony import */ var _Views_AuthView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/AuthView.js */ \"./src/main/resources/static/Views/AuthView.js\");\n\r\n // Update the relative path as necessary\r\n\r\nclass AuthController {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n        this.addEventListeners();\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        this.addEventListeners();\r\n    }\r\n\r\n    addEventListeners() {\r\n        document.getElementById(\"loginForm\").addEventListener(\"submit\", (event) => this.handleLogin(event));\r\n    }\r\n\r\n    handleLogin(event) {\r\n        event.preventDefault();\r\n        const credentials = this.view.getCredentials();\r\n\r\n        this.model.login(credentials)\r\n            .then(response => {\r\n                if (!response.ok) {\r\n                    throw new Error('Erreur lors de l\\'authentification');\r\n                }\r\n                this.view.redirectOnSuccess();\r\n            })\r\n            .catch(error => this.view.showError(error));\r\n    }\r\n}\r\n\r\n// Initialisation\r\nconst app = new AuthController(new _Models_AuthModel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), new _Views_AuthView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthController);\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Controllers/AuthController.js?");

/***/ }),

/***/ "./src/main/resources/static/Models/AuthModel.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/Models/AuthModel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass AuthModel {\r\n    constructor() {}\r\n\r\n    login(credentials) {\r\n        return fetch('/api/users/login', {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            },\r\n            body: JSON.stringify(credentials)\r\n        });\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthModel);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Models/AuthModel.js?");

/***/ }),

/***/ "./src/main/resources/static/Views/AuthView.js":
/*!*****************************************************!*\
  !*** ./src/main/resources/static/Views/AuthView.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass AuthView {\r\n    getCredentials() {\r\n        return {\r\n            email: document.getElementById(\"email\").value,\r\n            password: document.getElementById(\"password\").value\r\n        };\r\n    }\r\n\r\n    showError(error) {\r\n        const errorMessageElement = document.getElementById('error-message');\r\n        errorMessageElement.innerText = \"Email ou mot de passe incorrect(s).\"; // Vous pouvez utiliser la variable error pour un message plus spécifique si nécessaire\r\n        errorMessageElement.style.display = 'block'; // Rend l'élément visible\r\n    }\r\n\r\n\r\n    redirectOnSuccess() {\r\n        window.location.href = 'home.html';\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthView);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Views/AuthView.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/resources/static/AuthBundle.js");
/******/ 	
/******/ })()
;