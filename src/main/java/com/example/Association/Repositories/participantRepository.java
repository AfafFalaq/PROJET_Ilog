package com.example.Association.Repositories;

import com.example.Association.model.Participant;
import com.example.Association.model.event;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface participantRepository extends CrudRepository<Participant, Long> {
    boolean existsByEventIdAndUserId(Long eventId, Long userId);


    List<Participant> findByEvent(event event);
}
