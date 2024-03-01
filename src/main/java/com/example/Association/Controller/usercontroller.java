package com.example.Association.Controller;

import com.example.Association.Repositories.UserRepository;
import com.example.Association.model.SessionManager;
import com.example.Association.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class usercontroller {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/{id}")
    public User findOne(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User registerUser(
            @RequestParam(name = "firstName") String firstName,
            @RequestParam(name = "lastName") String lastName,
            @RequestParam(name = "gender") String gender,
            // Omit 'profilePic' as it's not straightforward to handle file uploads with @RequestParam
            @RequestParam(name = "birthdate") String birthdate,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "reason") String reason) {

        // Check if user exists
        userRepository.findByEmail(email).ifPresent(s -> {
            // If email is already in use, throw a 409 Conflict exception
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already in use");
        });

        // Hash the password
        String encodedPassword = bCryptPasswordEncoder.encode(password);

        // Create and save the user
        User newUser = new User();
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setGender(gender);
        // newUser.setProfilePic(profilePic); // You'll need to handle file upload separately
        newUser.setBirthdate(birthdate);
        newUser.setEmail(email);
        newUser.setPassword(encodedPassword);
        newUser.setReason(reason);

        return userRepository.save(newUser);


    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody Map<String, String> loginRequest, HttpServletRequest request) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (bCryptPasswordEncoder.matches(password, user.getPassword())) {
                // Créer une session pour l'utilisateur lors de la connexion
                SessionManager.createSession(request, user.getId(), user.getFirstName(), user.getLastName(),user.getGender(),user.getBirthdate(),user.getEmail(),user.getReason());
                return ResponseEntity.ok().body("Connexion réussie");
            } else {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Mot de passe incorrect");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Utilisateur non trouvé");
        }
    }


    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the session using custom SessionManager
        SessionManager.invalidateSession(request);

        // Invalidate the session using SecurityContextLogoutHandler for any Spring Security contexts
        new SecurityContextLogoutHandler().logout(request, response, null);

        // Redirect to the login page or a logout confirmation page
        return "redirect:login.html";
    }

    @GetMapping("/user/profile")
    public ResponseEntity<?> userProfile(HttpServletRequest request) {
        Long userId = SessionManager.getUserId(request);
        String nom = SessionManager.getUserNom(request);
        String prenom = SessionManager.getUserPrenom(request);
        String genre=SessionManager.getUsergender(request);
        String birthdate=SessionManager.getUserBirthdate(request);
        String email=SessionManager.getUserEmail(request);
        String reason=SessionManager.getUserReason(request);

        if (userId != null && nom != null && prenom != null) {
            // Return the nom and prenom as part of a JSON response
            return ResponseEntity.ok().body(Map.of("nom", nom, "prenom", prenom,"genre",genre,"birthdate",birthdate,"email",email,"reason",reason));
        } else {
            // Return an error or a message indicating the user is not logged in
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "User not logged in"));
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUserDetails(
            @RequestBody User updatedUser, HttpServletRequest request) {

        Long userId = SessionManager.getUserId(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        return userRepository.findById(userId).map(user -> {
            // Update user details here, for example:
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setBirthdate(updatedUser.getBirthdate());
            user.setGender(updatedUser.getGender());
            user.setEmail(updatedUser.getEmail());
            user.setReason(updatedUser.getReason());
            // Add other fields as necessary

            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElseGet(null);
    }

}



