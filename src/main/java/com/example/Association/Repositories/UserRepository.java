package com.example.Association.Repositories;

import com.example.Association.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {




    Optional<User> findByEmail(String email);
    // JpaRepository fournit déjà la méthode save, donc il n'est pas nécessaire de la définir ici
}
