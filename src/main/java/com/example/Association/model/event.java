package com.example.Association.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Entity
public class event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String dateString;

    @Column(nullable = false)
    private String timeString;

   /* public event(Long id, String name, String description, String dateString, String timeString) {
        super();
        this.id=id;
        this.name=name;
        this.description=description;
        this.dateString=dateString;
        this.timeString=timeString;
    }*/

    public event() {

    }

    public event(Long id, String name, String description, LocalDate date, LocalTime time, Long userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateString = date.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        this.timeString = time.format(DateTimeFormatter.ofPattern("HH:mm"));
        this.userId=userId;    }



    // Constructeur, getters et setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDateString() {

        return dateString;
    }

    public void setDate(String date) {
        LocalDate parsedDate;
        try {
            // First try the expected format
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            parsedDate = LocalDate.parse(date, formatter);
        } catch (DateTimeParseException e) {
            // If the first format fails, try the "yyyy-MM-dd" format
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            try {
                parsedDate = LocalDate.parse(date, formatter);
            } catch (DateTimeParseException e2) {
                // Handle the case where neither format works
                throw new IllegalArgumentException("Invalid date format. Please use 'dd-MM-yyyy' or 'yyyy-MM-dd'.");
            }
        }
        this.dateString = parsedDate.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
    }


    public String getTime() {
        return timeString;
    }

    public void setTime(String time) {
        this.timeString = time;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}



