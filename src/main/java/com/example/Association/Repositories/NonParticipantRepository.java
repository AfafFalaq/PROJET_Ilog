package com.example.Association.Repositories;

import com.example.Association.model.NonParticipant;
import com.example.Association.model.event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface NonParticipantRepository extends CrudRepository<NonParticipant, Long> {
    boolean existsByNomAndPrenomAndEvent(String nom, String prenom, event evt);


    List<NonParticipant> findByEvent(event event);
}
