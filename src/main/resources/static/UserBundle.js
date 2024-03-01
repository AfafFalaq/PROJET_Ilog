import UserModel from './Models/UserModel';
import UserView from './Views/UserView';
import UserController from './Controllers/UserController';

// Instantiate the MVC components
const userModel = new UserModel();
const userView = new UserView();
const userController = new UserController(userModel, userView);

// Initialize the controller which in turn initializes the rest of the application
userController.init();
