

class UserView {

    setModel(model) {
        this.model = model;
    }

    getUserInput() {
        return {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            gender: document.querySelector('input[name="gender"]:checked').value,
            profilePic: document.getElementById("profilePic").files[0],
            birthdate: document.getElementById("birthdate").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            reason: document.getElementById("reason").value,
        };
    }

    showSuccessModal() {
        this.resetFormFields();
        $('#successModal').modal('show');
    }

    showAlreadyRegisteredModal() {
        this.resetFormFields();
        // Assuming you have a modal with an ID of "alreadyRegisteredModal"
        $('#alreadyRegisteredModal').modal('show');
    }

    resetFormFields() {
        // Réinitialiser les valeurs des champs du formulaire à une chaîne vide
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.querySelector('input[name="gender"]:checked').checked = false; // Désélectionner le bouton radio sélectionné
        document.getElementById("profilePic").value = ""; // Réinitialiser le champ de fichier
        document.getElementById("birthdate").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("reason").value = "";
    }
    showError(error) {
        console.error('Erreur lors de l\'inscription:', error);
    }
}

export default UserView;
