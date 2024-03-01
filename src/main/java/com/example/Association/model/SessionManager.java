package com.example.Association.model;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class SessionManager {
    public static final String SESSION_ATTRIBUTE_USER_ID = "Id";
    public static final String SESSION_ATTRIBUTE_USER_NOM = "nom";
    public static final String SESSION_ATTRIBUTE_USER_PRENOM = "prenom";

    public static final String SESSION_ATTRIBUTE_USER_GENDER = "genre";
    public static final String SESSION_ATTRIBUTE_USER_BIRTHDATE = "birthdate";
    public static final String SESSION_ATTRIBUTE_USER_EMAIL= "email";
    public static final String SESSION_ATTRIBUTE_USER_REASON = "reason";


    public static void createSession(HttpServletRequest request, Long userId, String nom, String prenom,String genre, String birthdate ,String email, String reason) {
        HttpSession session = request.getSession(true);
        session.setAttribute(SESSION_ATTRIBUTE_USER_ID, userId);
        session.setAttribute(SESSION_ATTRIBUTE_USER_NOM, nom);
        session.setAttribute(SESSION_ATTRIBUTE_USER_PRENOM, prenom);
        session.setAttribute(SESSION_ATTRIBUTE_USER_GENDER,genre);
        session.setAttribute(SESSION_ATTRIBUTE_USER_BIRTHDATE,birthdate);
        session.setAttribute(SESSION_ATTRIBUTE_USER_EMAIL, email);
        session.setAttribute(SESSION_ATTRIBUTE_USER_REASON, reason);
    }


    public static Long getUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (Long) session.getAttribute(SESSION_ATTRIBUTE_USER_ID) : null;
    }

    public static String getUserNom(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_NOM) : null;
    }

    public static String getUserPrenom(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_PRENOM) : null;

    }
    //    public static void invalidateSession(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();
//        }
    public static String getUserBirthdate(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_BIRTHDATE) : null;
    }
    public static String getUsergender(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_GENDER) : null;
    }
    public static String getUserEmail(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_EMAIL) : null;
    }
    public static String getUserReason(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (String) session.getAttribute(SESSION_ATTRIBUTE_USER_REASON) : null;
    }






    public static void invalidateSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the session if it exists, don't create a new one
        if (session != null) {
            session.invalidate(); // Invalidate the session
        }
    }
    public static boolean isUserLoggedIn(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the existing session without creating a new one
        if (session != null && session.getAttribute("userId") != null) {
            // Session exists and contains a "userId" attribute, indicating a user is logged in
            return true;
        }
        return false; // No session or "userId" attribute not found
    }


}