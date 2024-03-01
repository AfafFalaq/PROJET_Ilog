import ProfileModel from "../Models/ProfileModel";

class ProfileView {
    constructor() {
        this.form = document.getElementById('userProfileForm');
        this.firstName = document.getElementById('nom');
        this.lastName = document.getElementById('prenom');
        this.gender = document.getElementById('gender');
        this.birthdate = document.getElementById('birthdate');
        this.email = document.getElementById('email');
        this.reason = document.getElementById('reason');
    }

    getFormData() {
        return {
            firstName: this.firstName.value,
            lastName: this.lastName.value,
            gender: this.gender.value,
            birthdate: this.birthdate.value,
            email: this.email.value,
            reason: this.reason.value
        };
    }

    setFormData(data) {
        this.firstName.value = data.nom;
        this.lastName.value = data.prenom;
        this.gender.value = data.gender;
        this.birthdate.value = data.birthdate;
        this.email.value = data.email;
        this.reason.value = data.reason;
    }

    bindFormSubmit(handler) {
        this.form.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }

    bindHomePageButton() {
        document.getElementById('homePageButton').addEventListener('click', () => {
            window.location.href = 'home.html';
        });
    }
}
export default ProfileView;