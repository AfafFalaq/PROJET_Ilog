import UserModel from '../Models/UserModel.js'; // Update the relative path as necessary
import UserView from '../Views/UserView.js';
class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    init() {
        document.getElementById("registrationForm").addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const userInput = this.view.getUserInput();
        this.model.addUserDetails(userInput);

        fetch('/api/users/register', {
            method: 'POST',
            body: this.model.getFormData(),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        throw new Error('already-registered');

                    } else {
                        throw new Error('Erreur lors de l\'inscription');
                    }
                }
                return response.json();
            })
            .then(data => {
                console.log('Inscription réussie', data);
                this.view.showSuccessModal();
                this.view.resetFormFields();
            })
            .catch(error => {
                if (error.message === 'already-registered') {
                    // Show the modal for "already registered"
                    this.view.showAlreadyRegisteredModal();
                } else {
                    this.view.showError(error);
                }
            });
    }
}

// Initialisation
const app = new UserController(new UserModel(), new UserView());
export default UserController;
