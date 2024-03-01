package com.example.Association.Controller;

import com.example.Association.Repositories.NonParticipantRepository;
import com.example.Association.Repositories.eventRepository;
import com.example.Association.Repositories.participantRepository;
import com.example.Association.model.NonParticipant;
import com.example.Association.model.Participant;
import com.example.Association.model.SessionManager;
import com.example.Association.model.event;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/events")
public class eventcontroller {
    @Autowired
    private eventRepository eventRepository;
    @Autowired
    private participantRepository participantRepository;
    @Autowired
    private NonParticipantRepository NonParticipantRepository;

    @GetMapping("/{id}")
    public event findOne(@PathVariable Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    @PostMapping("/creation")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> createFromRequestParam(
            HttpServletRequest request,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "date") String dateString,
            @RequestParam(name = "time") String timeString) {
        // Fetch the user ID from the session
        Long userId = SessionManager.getUserId(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(dateString, dateFormatter);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime time = LocalTime.parse(timeString, timeFormatter);
        // Create a new event and set the user ID
        event event = new event();
        event.setName(name);
        event.setDescription(description);
        event.setDate(date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
        event.setTime(time.format(DateTimeFormatter.ofPattern("HH:mm")));
        event.setUserId(userId); // Set the user ID
        // Save the event
        event savedEvent = eventRepository.save(event);
        // Return the saved event
        return ResponseEntity.ok(savedEvent);
    }



    @GetMapping
    public ResponseEntity<List<event>> getAllEvents(HttpServletRequest request) {
        String nom = SessionManager.getUserNom(request);
        String prenom = SessionManager.getUserPrenom(request);
        List<event> allEvents = (List<event>) eventRepository.findAll();
        List<event> filteredEvents = new ArrayList<>();

        for (event evt : allEvents) {
            boolean isNonParticipant = NonParticipantRepository.existsByNomAndPrenomAndEvent(nom, prenom, evt);
            if (!isNonParticipant) {
                filteredEvents.add(evt);
            }
        }

        return ResponseEntity.ok().body(filteredEvents);
    }


    @PostMapping("/nonparticipants")
    public ResponseEntity<?> addNonParticipant(@RequestBody Map<String, Object> payload, HttpServletRequest request) {
        Long userId = SessionManager.getUserId(request);
        String nom = SessionManager.getUserNom(request);
        String prenom = SessionManager.getUserPrenom(request);
        Long eventId = Long.valueOf(payload.get("eventId").toString());

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non connecté");
        }

        Optional<event> eventOptional = eventRepository.findById(eventId);
        if (!eventOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Événement non trouvé");
        }

        event event = eventOptional.get();
        NonParticipant nonParticipant = new NonParticipant(nom, prenom, event);
        NonParticipantRepository.save(nonParticipant);

        return ResponseEntity.ok().body("L'utilisateur a été ajouté à la liste des non-participants");
    }


    @PostMapping("/participants")
    public ResponseEntity<?> addParticipant(@RequestBody Map<String, Object> payload, HttpServletRequest request) {
        // Utilisation d'un gestionnaire de session fictif pour obtenir les informations de l'utilisateur
        Long eventId = Long.valueOf(payload.get("eventId").toString());
        Long userId = SessionManager.getUserId(request);
        String nom = SessionManager.getUserNom(request);
        String prenom = SessionManager.getUserPrenom(request);
        String commentaire = payload.get("commentaire").toString();

        // Conversion de l'eventId extrait du payload en Long


        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur non connecté");
        }

        if (participantRepository.existsByEventIdAndUserId(eventId, userId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User is already a participant");
        }

        Optional<event> eventOptional = eventRepository.findById(eventId);
        if (!eventOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Événement non trouvé");
        }

        event event = eventOptional.get();

        // Création d'une nouvelle instance de Participant et sauvegarde dans la base de données
        Participant participant = new Participant();
        participant.setUserId(userId);
        participant.setNom(nom);
        participant.setPrenom(prenom);
        participant.setEvent(event);
        participant.setCommentaire(commentaire);
        // Ici, vous pouvez également définir un commentaire ou d'autres champs si nécessaire
        // participant.setCommentaire(payload.get("commentaire").toString()); // Assurez-vous que "commentaire" est envoyé dans le payload si vous utilisez cette ligne

        participantRepository.save(participant);

        return ResponseEntity.ok().body("L'utilisateur a été ajouté à la liste des participants");
    }

    @DeleteMapping("/participants/{participantId}")
    public ResponseEntity<?> annulerParticipation(@PathVariable Long participantId) {
        Optional<Participant> participantOpt = participantRepository.findById(participantId);
        if (!participantOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        participantRepository.delete(participantOpt.get());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable Long id, @RequestBody Map<String, Object> payload, HttpServletRequest request) {
        Long userId = SessionManager.getUserId(request);
        Optional<event> eventOptional = eventRepository.findById(id);
        if (!eventOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Event not found for this id: " + id);
        }

        event event = eventOptional.get();
        if (!userId.equals(event.getUserId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User does not have permission to modify this event.");
        }

        // Update name, description directly from the payload if they are present
        if (payload.containsKey("name")) {
            event.setName(payload.get("name").toString());
        }
        if (payload.containsKey("description")) {
            event.setDescription(payload.get("description").toString());
        }

        // Parse and update the date and time if they are present
        if (payload.containsKey("date")) {
            String dateString = payload.get("date").toString();
            try {
                DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate date = LocalDate.parse(dateString, dateFormatter);
                event.setDate(date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"))); // Adjust if your model expects a different format
            } catch (DateTimeParseException e) {
                return ResponseEntity.badRequest().body("Invalid date format. Please use 'yyyy-MM-dd'.");
            }
        }
        if (payload.containsKey("time")) {
            String timeString = payload.get("time").toString();
            try {
                DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
                LocalTime time = LocalTime.parse(timeString, timeFormatter);
                event.setTime(time.format(DateTimeFormatter.ofPattern("HH:mm"))); // Adjust if your model expects a different format
            } catch (DateTimeParseException e) {
                return ResponseEntity.badRequest().body("Invalid time format. Please use 'HH:mm'.");
            }
        }

        eventRepository.save(event);

        return ResponseEntity.ok().body("Event updated successfully");
    }

    @GetMapping("/{eventId}/participants")
    public ResponseEntity<List<Participant>> getParticipants(@PathVariable Long eventId) {
        // Find event by ID and return participants
        Optional<event> eventOpt = eventRepository.findById(eventId);
        if (!eventOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<Participant> participants = participantRepository.findByEvent(eventOpt.get());
        return ResponseEntity.ok(participants);
    }

    @GetMapping("/{eventId}/nonparticipants")
    public ResponseEntity<List<NonParticipant>> getNonParticipants(@PathVariable Long eventId) {
        // Find event by ID and return non-participants
        Optional<event> eventOpt = eventRepository.findById(eventId);
        if (!eventOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<NonParticipant> nonParticipants = NonParticipantRepository.findByEvent(eventOpt.get());
        return ResponseEntity.ok(nonParticipants);
    }
}

