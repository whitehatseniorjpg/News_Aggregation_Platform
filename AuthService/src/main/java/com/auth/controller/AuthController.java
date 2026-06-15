package com.auth.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.auth.model.Users;
import com.auth.service.UsersService;

@RestController
@RequestMapping("/authservice")
public class AuthController {

    @Autowired
    UsersService service;

    @GetMapping("/")
    public String test() {
        return "AuthService - Running on port 8001!";
    }

    // ── PUBLIC ────────────────────────────────────────────────────────────────

    @PostMapping("/signin")
    public Object signin(@RequestBody Map<String, String> u1) {
        return service.signinService(u1);
    }

    @PostMapping("/signup")
    public Object signup(@RequestBody Users u1) {
        return service.signupService(u1);
    }
    @PostMapping("/forgotpassword")
    public Object forgotPassword(
        @RequestBody Map<String,String> data
    ) {

        return service.forgotPassword(
            data.get("email")
        );
    }

    // ── USER + ADMIN ──────────────────────────────────────────────────────────

    @GetMapping("/uinfo")
    public Object uinfo(@RequestHeader("Token") String token) {
        return service.uinfo(token);
    }

    @GetMapping("/profile")
    public Object getProfile(@RequestHeader("Token") String token) {
        return service.getProfile(token);
    }

    // ── ADMIN ONLY ────────────────────────────────────────────────────────────

    @GetMapping("/getallusers/{page}/{limit}")
    public Object getAllUsers(@PathVariable("page") int page, @PathVariable("limit") int limit, @RequestHeader("Token") String token) {
        return service.getAllUsers(page, limit, token);
    }
    @PostMapping("/adduser")
    public Object addUser(
            @RequestBody Users u1,
            @RequestHeader("Token") String token) {
    	return service.signupService(u1);
    }

    @GetMapping("/getuser/{id}")
    public Object getUser(@PathVariable("id") int id, @RequestHeader("Token") String token) {
        return service.getUserById(id, token);
    }

    @PostMapping("/saveuser")
    public Object saveUser(@RequestBody Users u1, @RequestHeader("Token") String token) {
        return service.saveUser(u1, token);
    }

    @PutMapping("/updateuser/{id}")
    public Object updateUser(@PathVariable("id") int id, @RequestBody Users u1, @RequestHeader("Token") String token) {
        return service.updateUser(id, u1, token);
    }

    @DeleteMapping("/deleteuser/{id}")
    public Object deleteUser(@PathVariable("id") int id, @RequestHeader("Token") String token) {
        return service.deleteUser(id, token);
    }
}

