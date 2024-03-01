
    document.addEventListener("DOMContentLoaded", function() {


    // Handle form submission
    document.getElementById('userProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const userDetails = {
            firstName: document.getElementById('nom').value,
            lastName: document.getElementById('prenom').value,
            gender: document.getElementById('gender').value,
            birthdate: document.getElementById('birthdate').value,
            email: document.getElementById('email').value,
            reason: document.getElementById('reason').value


        };

        fetch('/api/users/update', { // Adjust the URL as needed
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        })
            .then(response => {
                if (response.ok) {
                    alert('Profile updated successfully');
                    // Optionally, redirect or refresh the page
                } else {
                    alert('Error updating profile');
                }
            });
    });

});
    document.addEventListener('DOMContentLoaded', function() {
    // Exemple de code pour charger le profil de l'utilisateur
    fetch('/api/users/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors du chargement du profil: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nom').value = data.nom;
            document.getElementById('prenom').value = data.prenom;
            document.getElementById('gender').value=data.gender;
            document.getElementById('birthdate').value=data.birthdate;
            document.getElementById('email').value=data.email;
            document.getElementById('reason').value=data.reason;

        })
        .catch(error => {
            console.error('Erreur lors du chargement du profil:', error);
        });
});
