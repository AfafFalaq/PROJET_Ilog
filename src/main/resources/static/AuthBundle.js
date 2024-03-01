// AuthBundle.js

// Import the MVC components related to authentication
import AuthModel from './Models/AuthModel';
import AuthView from './Views/AuthView';
import AuthController from './Controllers/AuthController';

// Instantiate the MVC components
const authModel = new AuthModel();
const authView = new AuthView();
const authController = new AuthController(authModel, authView);

// Initialize the controller which in turn initializes the rest of the application

authController.init();

