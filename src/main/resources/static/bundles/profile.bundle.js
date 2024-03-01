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

/***/ "./src/main/resources/static/Controllers/ProfileController.js":
/*!********************************************************************!*\
  !*** ./src/main/resources/static/Controllers/ProfileController.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Models_ProfileModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/ProfileModel */ \"./src/main/resources/static/Models/ProfileModel.js\");\n/* harmony import */ var _Views_ProfileView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/ProfileView */ \"./src/main/resources/static/Views/ProfileView.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass ProfileController {\r\n    constructor(view, model) {\r\n        this.view = view;\r\n        this.model = model;\r\n\r\n        this.view.bindFormSubmit(this.handleSubmit.bind(this));\r\n        this.view.bindHomePageButton();\r\n        this.loadUserProfile();\r\n    }\r\n\r\n    loadUserProfile() {\r\n        this.model.fetchProfile()\r\n            .then(data => this.view.setFormData(data))\r\n            .catch(error => console.error('Error loading profile:', error));\r\n    }\r\n\r\n    handleSubmit() {\r\n        const userDetails = this.view.getFormData();\r\n        this.model.updateProfile(userDetails)\r\n            .then(() => alert('Profile updated successfully'))\r\n            .catch(error => alert(error));\r\n    }\r\n\r\n    init() {\r\n        \r\n    }\r\n}\r\n\r\n// Initialization\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    const model = new _Models_ProfileModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    const view = new _Views_ProfileView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n    new ProfileController(view, model);\r\n});\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileController);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Controllers/ProfileController.js?");

/***/ }),

/***/ "./src/main/resources/static/Models/AuthModel.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/Models/AuthModel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass AuthModel {\r\n    constructor() {}\r\n\r\n    login(credentials) {\r\n        return fetch('/api/users/login', {\r\n            method: 'POST',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            },\r\n            body: JSON.stringify(credentials)\r\n        });\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthModel);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Models/AuthModel.js?");

/***/ }),

/***/ "./src/main/resources/static/Models/ProfileModel.js":
/*!**********************************************************!*\
  !*** ./src/main/resources/static/Models/ProfileModel.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _AuthModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthModel */ \"./src/main/resources/static/Models/AuthModel.js\");\n\r\n\r\nclass ProfileModel {\r\n    async fetchProfile() {\r\n        const response = await fetch('/api/users/user/profile', {\r\n            method: 'GET',\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            }\r\n        });\r\n        if (!response.ok) {\r\n            throw new Error('Error fetching profile: ' + response.statusText);\r\n        }\r\n        return response.json();\r\n    }\r\n\r\n    async updateProfile(userDetails) {\r\n        const response = await fetch('/api/users/update', { // Adjust the URL as needed\r\n            method: 'PUT',\r\n            headers: {\r\n                'Content-Type': 'application/json',\r\n            },\r\n            body: JSON.stringify(userDetails),\r\n        });\r\n        if (!response.ok) {\r\n            throw new Error('Error updating profile');\r\n        }\r\n        return response.ok;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileModel);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Models/ProfileModel.js?");

/***/ }),

/***/ "./src/main/resources/static/ProfileBundle.js":
/*!****************************************************!*\
  !*** ./src/main/resources/static/ProfileBundle.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Models_ProfileModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Models/ProfileModel */ \"./src/main/resources/static/Models/ProfileModel.js\");\n/* harmony import */ var _Views_ProfileView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/ProfileView */ \"./src/main/resources/static/Views/ProfileView.js\");\n/* harmony import */ var _Controllers_ProfileController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controllers/ProfileController */ \"./src/main/resources/static/Controllers/ProfileController.js\");\n\r\n\r\n\r\n\r\n// Instantiate the MVC components\r\nconst profileModel = new _Models_ProfileModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nconst profileView = new _Views_ProfileView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst profileController = new _Controllers_ProfileController__WEBPACK_IMPORTED_MODULE_2__[\"default\"](profileModel, profileView);\r\n\r\n// Initialize the controller which in turn initializes the rest of the application\r\nprofileController.init();\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/ProfileBundle.js?");

/***/ }),

/***/ "./src/main/resources/static/Views/ProfileView.js":
/*!********************************************************!*\
  !*** ./src/main/resources/static/Views/ProfileView.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Models_ProfileModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/ProfileModel */ \"./src/main/resources/static/Models/ProfileModel.js\");\n\r\n\r\nclass ProfileView {\r\n    constructor() {\r\n        this.form = document.getElementById('userProfileForm');\r\n        this.firstName = document.getElementById('nom');\r\n        this.lastName = document.getElementById('prenom');\r\n        this.gender = document.getElementById('gender');\r\n        this.birthdate = document.getElementById('birthdate');\r\n        this.email = document.getElementById('email');\r\n        this.reason = document.getElementById('reason');\r\n    }\r\n\r\n    getFormData() {\r\n        return {\r\n            firstName: this.firstName.value,\r\n            lastName: this.lastName.value,\r\n            gender: this.gender.value,\r\n            birthdate: this.birthdate.value,\r\n            email: this.email.value,\r\n            reason: this.reason.value\r\n        };\r\n    }\r\n\r\n    setFormData(data) {\r\n        this.firstName.value = data.nom;\r\n        this.lastName.value = data.prenom;\r\n        this.gender.value = data.gender;\r\n        this.birthdate.value = data.birthdate;\r\n        this.email.value = data.email;\r\n        this.reason.value = data.reason;\r\n    }\r\n\r\n    bindFormSubmit(handler) {\r\n        this.form.addEventListener('submit', function(e) {\r\n            e.preventDefault();\r\n            handler();\r\n        });\r\n    }\r\n\r\n    bindHomePageButton() {\r\n        document.getElementById('homePageButton').addEventListener('click', () => {\r\n            window.location.href = 'home.html';\r\n        });\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileView);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Views/ProfileView.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/resources/static/ProfileBundle.js");
/******/ 	
/******/ })()
;