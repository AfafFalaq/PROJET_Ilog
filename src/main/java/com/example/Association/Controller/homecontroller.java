//package com.example.Association.Controller;
//
////@Controller
//public class homecontroller {//{@GetMapping("/")
////@ResponseBody
//public String getHelloWorld(){
//    return "Bienvenu : Hello world";
//}
//    //@GetMapping("/home")
//    public String getHomePage(){
//        return "home.html";
//    }
//    //@GetMapping("/index")
//    public String getIndexPage(){
//        return "index.html";
//    }
//}
package com.example.Association.Controller;

import com.example.Association.model.SessionManager;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class homecontroller {
    

    @GetMapping("/home")
    public String getHomePage(HttpServletRequest request){
        // Assuming SessionManager.isUserLoggedIn(request) checks for an active session
        if (!SessionManager.isUserLoggedIn(request)) {
            // No active session found, redirecting to the login page
            return "redirect:/login.html";
        }
        // Active session exists, proceed to home.html
        return "home.html";
    }

    @GetMapping("/index")
    public String getIndexPage(){
        return "index.html";
    }
}
