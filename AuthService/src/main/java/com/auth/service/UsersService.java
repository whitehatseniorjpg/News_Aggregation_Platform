package com.auth.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.auth.model.Menu;
import com.auth.model.Users;
import com.auth.repository.UserRepository;

@Service
public class UsersService {

    @Autowired
    UserRepository repo;

    @Autowired
    JWTService jwtService;

    // ── SIGNUP ────────────────────────────────────────────────────────────────
    public Object signupService(Users u1) {
        Map<String, Object> response = new HashMap<>();
        try {
            Object id = repo.checkEmail(u1.getEmail());
            if (id != null) {
                response.put("code", 501);
                response.put("message", "User already exists");
            } else {
                u1.setRole(2);      // 2 = USER role by default
                u1.setStatus(1);    // 1 = active
                repo.save(u1);
                response.put("code", 200);
                response.put("message", "User Registered Successfully");
            }
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── SIGNIN ────────────────────────────────────────────────────────────────
    public Object signinService(Map<String, String> u1) {
        Map<String, Object> response = new HashMap<>();
        try {
            // username here = email (sent from frontend)
            Object role = repo.checkCredentials(u1.get("username"), u1.get("password"));

            if (role == null) {
                response.put("code", 501);
                response.put("message", "Authentication Failed");
            } else {
                response.put("code", 200);
                response.put("jwt", jwtService.generateJWT(u1, role.toString()));
            }
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── UINFO ─────────────────────────────────────────────────────────────────
    public Object uinfo(String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Users u1 = repo.findByEmail(parsedJWT.get("username"));

            List<Menu> menulist = repo.getMenus(Integer.valueOf(parsedJWT.get("role")));

            response.put("code", 200);
            response.put("fullname", u1.getFullname());
            response.put("menulist", menulist);
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── PROFILE ───────────────────────────────────────────────────────────────
    public Object getProfile(String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Object user = repo.getProfile(parsedJWT.get("username"));

            response.put("code", 200);
            response.put("user", user);
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── GET ALL USERS (admin) ─────────────────────────────────────────────────
    public Object getAllUsers(int page, int limit, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Pageable pageable = PageRequest.of(page - 1, limit);
            Page<Users> users = repo.findAll(pageable);

            response.put("code", 200);
            response.put("page", page);
            response.put("size", limit);
            response.put("totalpages", users.getTotalPages());
            response.put("users", users.getContent());
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── GET USER BY ID (admin) ────────────────────────────────────────────────
    public Object getUserById(int id, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Users user = repo.findById(id).get();

            if (user == null) throw new Exception("User Not Found");

            response.put("code", 200);
            response.put("user", user);
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── SAVE USER (admin) ─────────────────────────────────────────────────────
    public Object saveUser(Users u1, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            u1.setStatus(1);
            repo.save(u1);

            response.put("code", 200);
            response.put("message", "User saved successfully");
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── UPDATE USER (admin) ───────────────────────────────────────────────────
    public Object updateUser(int id, Users u1, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Users existing = repo.findById(id).get();

            if (existing == null) throw new Exception("User not found");

            u1.setId(id);
            repo.save(u1);

            response.put("code", 200);
            response.put("message", "User updated successfully");
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }

    // ── DELETE USER (admin) ───────────────────────────────────────────────────
    public Object deleteUser(int id, String token) {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, String> parsedJWT = jwtService.validateJWT(token);
            Users user = repo.findById(id).get();

            if (user == null) throw new Exception("User not found");

            repo.deleteById(id);

            response.put("code", 200);
            response.put("message", "User deleted successfully");
            return response;
        } catch (Exception e) {
            response.put("code", 500);
            response.put("message", e.getMessage());
            return response;
        }
    }
    public Object forgotPassword(String email) {

        Map<String, Object> response =
            new HashMap<>();

        try {

            Users user =
                repo.findByEmail(email);

            if(user == null) {

                response.put("code", 404);
                response.put(
                    "message",
                    "Email not registered"
                );

                return response;
            }

            String tempPassword =
                "Temp" +
                System.currentTimeMillis()
                % 10000;

            user.setPassword(
                tempPassword
            );

            repo.save(user);

            response.put(
                "code",
                200
            );

            response.put(
                "message",
                "Temporary Password: "
                + tempPassword
            );

        } catch(Exception e) {

            response.put(
                "code",
                500
            );

            response.put(
                "message",
                e.getMessage()
            );
        }

        return response;
    }
}