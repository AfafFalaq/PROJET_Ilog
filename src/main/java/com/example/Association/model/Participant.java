package com.example.Association.model;

import jakarta.persistence.*;

@Entity
@Table(name = "participants") // Changer le nom de la table
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // Un participant appartient à un événement
    @JoinColumn(name = "event_id", nullable = false)
    private event event;

    @Column(nullable = true) // Un commentaire peut être facultatif
    private String commentaire;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private Long userId;


    public Participant() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public com.example.Association.model.event getEvent() {
        return event;
    }

    public void setEvent(com.example.Association.model.event event) {
        this.event = event;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
