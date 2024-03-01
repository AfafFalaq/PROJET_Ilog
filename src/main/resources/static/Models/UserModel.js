
class UserModel {
    constructor() {
        this.formData = new FormData();
    }

    addUserDetails({ firstName, lastName, gender, profilePic, birthdate, email, password, reason }) {
        this.formData.append("firstName", firstName);
        this.formData.append("lastName", lastName);
        this.formData.append("gender", gender);
        this.formData.append("profilePic", profilePic);
        this.formData.append("birthdate", birthdate);
        this.formData.append("email", email);
        this.formData.append("password", password);
        this.formData.append("reason", reason);
    }

    getFormData() {
        return this.formData;
    }

    clearFormData() {
        // Create a new FormData object to reset the form data
        this.formData = new FormData();
    }
}
export default UserModel;