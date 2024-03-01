class AuthView {
    getCredentials() {
        return {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
    }

    showError(error) {
        const errorMessageElement = document.getElementById('error-message');
        errorMessageElement.innerText = "Email ou mot de passe incorrect(s)."; // Vous pouvez utiliser la variable error pour un message plus spécifique si nécessaire
        errorMessageElement.style.display = 'block'; // Rend l'élément visible
    }


    redirectOnSuccess() {
        window.location.href = 'home.html';
    }
}

export default AuthView;