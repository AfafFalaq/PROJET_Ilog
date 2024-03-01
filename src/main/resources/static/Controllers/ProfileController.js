

import ProfileModel from "../Models/ProfileModel";

import ProfileView from "../Views/ProfileView";

class ProfileController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindFormSubmit(this.handleSubmit.bind(this));
        this.view.bindHomePageButton();
        this.loadUserProfile();
    }

    loadUserProfile() {
        this.model.fetchProfile()
            .then(data => this.view.setFormData(data))
            .catch(error => console.error('Error loading profile:', error));
    }

    handleSubmit() {
        const userDetails = this.view.getFormData();
        this.model.updateProfile(userDetails)
            .then(() => alert('Profile updated successfully'))
            .catch(error => alert(error));
    }

    init() {
        
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    const model = new ProfileModel();
    const view = new ProfileView();
    new ProfileController(view, model);
});



export default ProfileController;