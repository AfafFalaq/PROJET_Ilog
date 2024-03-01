import ProfileModel from './Models/ProfileModel';
import ProfileView from './Views/ProfileView';
import ProfileController from './Controllers/ProfileController';

// Instantiate the MVC components
const profileModel = new ProfileModel();
const profileView = new ProfileView();
const profileController = new ProfileController(profileView, profileModel);

// Initialize the controller which in turn initializes the rest of the application
profileController.init();
