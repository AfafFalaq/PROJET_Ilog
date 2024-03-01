package com.example.Association.Repositories;

import com.example.Association.model.event;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

@Component
public interface eventRepository extends CrudRepository<event, Long> {
}

