
import AuthModel from '../Models/AuthModel.js'; // Update the relative path as necessary
import AuthView from '../Views/AuthView.js';
class AuthController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.addEventListeners();
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        document.getElementById("loginForm").addEventListener("submit", (event) => this.handleLogin(event));
    }

    handleLogin(event) {
        event.preventDefault();
        const credentials = this.view.getCredentials();

        this.model.login(credentials)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de l\'authentification');
                }
                this.view.redirectOnSuccess();
            })
            .catch(error => this.view.showError(error));
    }
}

// Initialisation
const app = new AuthController(new AuthModel(), new AuthView());
export default AuthController;
