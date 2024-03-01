package com.example.Association.model;
import jakarta.persistence.*;

@Entity
@Table(name = "nonparticipants")
public class NonParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private event event; // Utilisez l'entité event directement au lieu de eventId

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    // Constructeur ajusté pour utiliser l'entité event
    public NonParticipant(String nom, String prenom, event event) {
        this.nom = nom;
        this.prenom = prenom;
        this.event = event;
    }

    public NonParticipant() {
    }

    public NonParticipant(Long userId, String userNom, String userPrenom, com.example.Association.model.event event) {
    }

    public NonParticipant(Long userId, String userNom, String userPrenom, Long eventId) {
    }

    public String getPrenom() {
        return prenom;
    }

    public String getNom() {
        return nom;
    }

    public Long getId() {
        return id;
    }

    public com.example.Association.model.event getEvent() {
        return event;
    }
}
