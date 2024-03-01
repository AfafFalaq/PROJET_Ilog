
    document.querySelector('#logoutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission automatique du formulaire

    // Envoie une requête POST vers l'URL de déconnexion
    fetch('/logout', {
    method: 'POST'
})
    .then(response => {
    // Redirige l'utilisateur vers la page de connexion
        window.location.href = '/login.html';
        alert('Vous vous êtes déconnectés');
})
    .catch(error => console.error('Erreur lors de la déconnexion :', error));
});


    // Fonction pour charger les événements depuis le backend et les afficher sous forme de cartes
    function loadEvents() {
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            // Vider la liste actuelle d'événements sur la page
            document.getElementById('eventList').innerHTML = '';

            // Ajouter les événements récupérés depuis le backend sous forme de cartes sur la page web
            events.forEach(event => {
                var eventCard = document.createElement("div");
                eventCard.className = "col-md-4 mb-3"; // Ajouter des classes Bootstrap pour la mise en page

                // Créer une carte Bootstrap
                var cardHtml = `
                        <div class="card" data-event-id="${event.id}" data-event-name="${event.name}" data-event-description="${event.description}" data-event-date="${event.dateString}" data-event-time="${event.time}">
                        <div class="card-body">
                        <button class="Modif btn-icon" id="modif-${event.id}">
                          <i class="fas fa-pencil-alt"></i> </button>
                          <button class="btn-icon btn-details" onclick="showEventDetails(${event.id})">
                      <i class="fas fa-ellipsis-h"></i>
                      </button>
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">Date: ${event.dateString}</p>
                        <p class="card-text">Heure: ${event.time}</p>
                        <p class="card-text">Description: ${event.description}</p>
            <!-- Add other event information here if necessary -->
                         <div >
                        <button class="btn btn-success btn-participate" data-event-id="${event.id}">Participer</button>
                        <button class="btn btn-danger btn-not-participate" data-event-id="${event.id}">Ne pas participer</button>
                        </div>
                        </div>
                     </div>
                    `;
                eventCard.innerHTML = cardHtml;

                // Ajouter la carte à la liste d'événements
                document.getElementById("eventList").appendChild(eventCard);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des événements:', error);
        });
}

    // Charger les événements au chargement de la page
    loadEvents();

    // Fonction exécutée lorsque le formulaire est soumis
    document.getElementById("eventForm").addEventListener("submit", function (event) {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    var eventName = document.getElementById("eventName").value;
    var eventDescription = document.getElementById("eventDescription").value;
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;

    // Créer un objet représentant les données de l'événement

    var eventA = new FormData();
    eventA.append("name", eventName);
    eventA.append("description", eventDescription);
    eventA.append("date", eventDate);
    eventA.append("time", eventTime);

    // Envoyer les données de l'événement au backend pour création
    fetch('/api/events/creation', {
    method: 'POST',
    body: eventA,

})
    .then(response => {
    if (!response.ok) {
    throw new Error('Erreur lors de la création de l\'événement');
}
    return response.json();
})
    .then(data => {
    // Réussite : afficher un message de succès ou effectuer d'autres actions nécessaires
    console.log('Événement créé avec succès:', data);

    // Recharger la liste des événements pour afficher le nouvel événement
    loadEvents();

    // Réinitialiser les champs du formulaire
    document.getElementById("eventName").value = "";
    document.getElementById("eventDescription").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventTime").value = "";
})
    .catch(error => {
    // Gérer les erreurs ici, par exemple afficher un message d'erreur à l'utilisateur
    console.error('Erreur:', error);
});
});



    // Gérer le clic sur les boutons "Commenter"
    document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-comment")) {
    var eventId = event.target.getAttribute("data-event-id");
    var commentInput = event.target.parentElement.querySelector("input[type='text']");
    var comment = commentInput.value.trim();
    commenter(eventId, comment);
}
});



    // Fonction pour gérer les commentaires sur un événement
    function commenter(eventId, comment) {
    alert('Votre commentaire a été ajouté avec succès !');

}
    function participer(eventId) {
    // Ouvrir le modal de participation
    $('#participationModal').modal('show');

    // Attacher un gestionnaire d'événement pour le formulaire dans le modal
    $('#participationForm').off('submit').on('submit', function(e) {
    e.preventDefault();
    var commentaire = $('#participationComment').val();
    // Construire le payload avec l'ID de l'événement et le commentaire
    var payload = {
    eventId: eventId,
    commentaire: commentaire
};

    // Envoyer la requête POST avec l'ID de l'événement et le commentaire
    fetch('/api/events/participants', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify(payload)
})
    .then(response => {
    if (response.ok) {
    alert('You have successfully joined the event!');
    $('#participationModal').modal('hide');

} else if (response.status === 409) {
    alert('You are already a participant in this event.');
    $('#participationModal').modal('hide');

} else {
    throw new Error('Something went wrong');
}
})
    .catch(error => console.error('Error:', error));
    $('#participationModal').modal('hide');
});


}

    document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-participate")) {
    var eventId = event.target.getAttribute("data-event-id");
    participer(eventId);
}
});


    // Gérer le clic sur les boutons "Ne pas participer"


    document.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-not-participate")) {
    var eventId = event.target.getAttribute("data-event-id");
    nePasParticiper(eventId, event.target.closest(".card"));
}
});

    function nePasParticiper(eventId, eventCard) {
    fetch('/api/events/nonparticipants', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId: eventId })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la non-participation');
            }
            alert('Vous avez choisi de ne pas participer à l\'événement.');
            // Supprimer le div de l'événement de la liste
            eventCard.remove();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}


    document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/users/user/profile')
        .then(response => response.json())
        .then(user => {
            const welcomeMessage = `Bienvenue, ${user.prenom} ${user.nom}!`;
            // Set the message in the modal body
            document.querySelector('#welcomeModal .modal-body').textContent = welcomeMessage;
            // Show the modal
            $('#welcomeModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
});
        //Modification
    document.addEventListener("click", function(event) {
    if (event.target.classList.contains("Modif")|| event.target.parentNode.classList.contains("Modif")) {
    const eventCard = event.target.closest('.card');

    // Assuming these attributes exist on the card. If not, default/empty values will be used.
    const eventId = eventCard ? eventCard.getAttribute('data-event-id') : '';
    const eventName = eventCard ? eventCard.getAttribute('data-event-name') : '';
    const eventDescription = eventCard ? eventCard.getAttribute('data-event-description') : '';
    const eventDate = eventCard ? eventCard.getAttribute('data-event-date') : '';
    const eventTime = eventCard ? eventCard.getAttribute('data-event-time') : '';

    // Populate the form fields, defaulting to empty if no data is present
    document.getElementById("modEventId").value = eventId || '';
    document.getElementById("modEventName").value = eventName || '';
    document.getElementById("modEventDescription").value = eventDescription || '';
    document.getElementById("modEventDate").value = eventDate || '';
    document.getElementById("modEventTime").value = eventTime || '';

    // Show the modal
    $('#modificationModal').modal('show');
}
});

    document.getElementById("saveModifications").addEventListener("click", function() {
    const eventId = document.getElementById("modEventId").value; // Make sure this value is correctly being set
    const eventName = document.getElementById("modEventName").value;
    const eventDescription = document.getElementById("modEventDescription").value;
    const eventDate = document.getElementById("modEventDate").value;
    const eventTime = document.getElementById("modEventTime").value;

    // Construct an object with the event's new details
    const updatedEvent = {
    id: eventId,
    name: eventName,
    description: eventDescription,
    date: eventDate,
    time: eventTime
};
    if (!eventId) {
    console.error('Event ID is missing.');
    return; // Exit the function if no event ID is present
}
    // Replace this with your actual API endpoint and send a PUT or POST request as needed
    const url = `/api/events/update/${eventId}`;
    fetch(url, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
},
    body: JSON.stringify(updatedEvent),
})
    .then(response => {
    if (response.ok) {
    return response.json();
} else if (response.status === 403) {
    throw new Error('unauthorized');
} else {
    throw new Error('Network response was not ok');
}
})
    .then(data => {
    console.log('Success:', data);
    const eventElement = document.querySelector(`#event-${data.id}`);
    if (eventElement) {
    eventElement.querySelector('.event-name').textContent = data.name;
    eventElement.querySelector('.event-description').textContent = data.description;
    eventElement.querySelector('.event-date').textContent = data.date;
    eventElement.querySelector('.event-time').textContent = data.time;

}
    $('#modificationModal').modal('hide');

})
    .catch((error) => {
    if (error.message === 'unauthorized') {
    // Show the unauthorized modal
    $('#unauthorizedModal').modal('show');
} else {
    console.error('Error:', error);
}
})

    .finally(() => {
    // Ferme le modal indépendamment du résultat de la promesse
    $('#modificationModal').modal('hide');
    loadEvents();
});

});

    function showEventDetails(eventId) {
    // Clear previous details
    const tableBody = document.querySelector('#detailsTable tbody');
    tableBody.innerHTML = '';

    // Fetch participants and non-participants
    Promise.all([
    fetch(`/api/events/${eventId}/participants`).then(response => response.json()),
    fetch(`/api/events/${eventId}/nonparticipants`).then(response => response.json())
    ]).then(([participants, nonParticipants]) => {
    // Add participants to the table
    participants.forEach(participant => {
    let row = tableBody.insertRow();
    row.insertCell(0).textContent = participant.nom;
    row.insertCell(1).textContent = participant.prenom;
    row.insertCell(2).textContent = participant.commentaire || 'Aucun commentaire';
    row.insertCell(3).textContent = 'Participant';
});

    // Add non-participants to the table
    nonParticipants.forEach(nonParticipant => {
    let row = tableBody.insertRow();
    row.insertCell(0).textContent = nonParticipant.nom;
    row.insertCell(1).textContent = nonParticipant.prenom;
    // Assume no comments for non-participants
    row.insertCell(2).textContent = 'N/A';
    row.insertCell(3).textContent = 'Non-participant';
});
})
    .catch(error => {
    console.error('Erreur lors de la récupération des détails:', error);
});

    // Show the modal
    $('#eventDetailsModal').modal('show');

}




