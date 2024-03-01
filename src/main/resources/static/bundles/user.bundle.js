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

/***/ "./src/main/resources/static/Controllers/UserController.js":
/*!*****************************************************************!*\
  !*** ./src/main/resources/static/Controllers/UserController.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Models_UserModel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Models/UserModel.js */ \"./src/main/resources/static/Models/UserModel.js\");\n/* harmony import */ var _Views_UserView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Views/UserView.js */ \"./src/main/resources/static/Views/UserView.js\");\n // Update the relative path as necessary\r\n\r\nclass UserController {\r\n    constructor(model, view) {\r\n        this.model = model;\r\n        this.view = view;\r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n        document.getElementById(\"registrationForm\").addEventListener(\"submit\", this.handleSubmit.bind(this));\r\n    }\r\n\r\n    handleSubmit(event) {\r\n        event.preventDefault();\r\n        const userInput = this.view.getUserInput();\r\n        this.model.addUserDetails(userInput);\r\n\r\n        fetch('/api/users/register', {\r\n            method: 'POST',\r\n            body: this.model.getFormData(),\r\n        })\r\n            .then(response => {\r\n                if (!response.ok) {\r\n                    if (response.status === 409) {\r\n                        throw new Error('already-registered');\r\n\r\n                    } else {\r\n                        throw new Error('Erreur lors de l\\'inscription');\r\n                    }\r\n                }\r\n                return response.json();\r\n            })\r\n            .then(data => {\r\n                console.log('Inscription réussie', data);\r\n                this.view.showSuccessModal();\r\n                this.view.resetFormFields();\r\n            })\r\n            .catch(error => {\r\n                if (error.message === 'already-registered') {\r\n                    // Show the modal for \"already registered\"\r\n                    this.view.showAlreadyRegisteredModal();\r\n                } else {\r\n                    this.view.showError(error);\r\n                }\r\n            });\r\n    }\r\n}\r\n\r\n// Initialisation\r\nconst app = new UserController(new _Models_UserModel_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), new _Views_UserView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserController);\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Controllers/UserController.js?");

/***/ }),

/***/ "./src/main/resources/static/Models/UserModel.js":
/*!*******************************************************!*\
  !*** ./src/main/resources/static/Models/UserModel.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nclass UserModel {\r\n    constructor() {\r\n        this.formData = new FormData();\r\n    }\r\n\r\n    addUserDetails({ firstName, lastName, gender, profilePic, birthdate, email, password, reason }) {\r\n        this.formData.append(\"firstName\", firstName);\r\n        this.formData.append(\"lastName\", lastName);\r\n        this.formData.append(\"gender\", gender);\r\n        this.formData.append(\"profilePic\", profilePic);\r\n        this.formData.append(\"birthdate\", birthdate);\r\n        this.formData.append(\"email\", email);\r\n        this.formData.append(\"password\", password);\r\n        this.formData.append(\"reason\", reason);\r\n    }\r\n\r\n    getFormData() {\r\n        return this.formData;\r\n    }\r\n\r\n    clearFormData() {\r\n        // Create a new FormData object to reset the form data\r\n        this.formData = new FormData();\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserModel);\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Models/UserModel.js?");

/***/ }),

/***/ "./src/main/resources/static/UserBundle.js":
/*!*************************************************!*\
  !*** ./src/main/resources/static/UserBundle.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Models_UserModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Models/UserModel */ \"./src/main/resources/static/Models/UserModel.js\");\n/* harmony import */ var _Views_UserView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Views/UserView */ \"./src/main/resources/static/Views/UserView.js\");\n/* harmony import */ var _Controllers_UserController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controllers/UserController */ \"./src/main/resources/static/Controllers/UserController.js\");\n\r\n\r\n\r\n\r\n// Instantiate the MVC components\r\nconst userModel = new _Models_UserModel__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nconst userView = new _Views_UserView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst userController = new _Controllers_UserController__WEBPACK_IMPORTED_MODULE_2__[\"default\"](userModel, userView);\r\n\r\n// Initialize the controller which in turn initializes the rest of the application\r\nuserController.init();\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/UserBundle.js?");

/***/ }),

/***/ "./src/main/resources/static/Views/UserView.js":
/*!*****************************************************!*\
  !*** ./src/main/resources/static/Views/UserView.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\n\r\nclass UserView {\r\n\r\n    setModel(model) {\r\n        this.model = model;\r\n    }\r\n\r\n    getUserInput() {\r\n        return {\r\n            firstName: document.getElementById(\"firstName\").value,\r\n            lastName: document.getElementById(\"lastName\").value,\r\n            gender: document.querySelector('input[name=\"gender\"]:checked').value,\r\n            profilePic: document.getElementById(\"profilePic\").files[0],\r\n            birthdate: document.getElementById(\"birthdate\").value,\r\n            email: document.getElementById(\"email\").value,\r\n            password: document.getElementById(\"password\").value,\r\n            reason: document.getElementById(\"reason\").value,\r\n        };\r\n    }\r\n\r\n    showSuccessModal() {\r\n        this.resetFormFields();\r\n        $('#successModal').modal('show');\r\n    }\r\n\r\n    showAlreadyRegisteredModal() {\r\n        this.resetFormFields();\r\n        // Assuming you have a modal with an ID of \"alreadyRegisteredModal\"\r\n        $('#alreadyRegisteredModal').modal('show');\r\n    }\r\n\r\n    resetFormFields() {\r\n        // Réinitialiser les valeurs des champs du formulaire à une chaîne vide\r\n        document.getElementById(\"firstName\").value = \"\";\r\n        document.getElementById(\"lastName\").value = \"\";\r\n        document.querySelector('input[name=\"gender\"]:checked').checked = false; // Désélectionner le bouton radio sélectionné\r\n        document.getElementById(\"profilePic\").value = \"\"; // Réinitialiser le champ de fichier\r\n        document.getElementById(\"birthdate\").value = \"\";\r\n        document.getElementById(\"email\").value = \"\";\r\n        document.getElementById(\"password\").value = \"\";\r\n        document.getElementById(\"reason\").value = \"\";\r\n    }\r\n    showError(error) {\r\n        console.error('Erreur lors de l\\'inscription:', error);\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserView);\r\n\n\n//# sourceURL=webpack://associationmabqawalo/./src/main/resources/static/Views/UserView.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main/resources/static/UserBundle.js");
/******/ 	
/******/ })()
;