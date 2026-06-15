package com.bookmark.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookmark.model.Bookmark;
import com.bookmark.repository.BookmarkRepository;

@Service
public class BookmarkService {

    @Autowired
    BookmarkRepository repo;

    @Autowired
    JWTService jwtService;
    
    

    public Object addbookmark(
            Bookmark bookmark,
            String token) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            Map<String, String> parsedJWT =
                    jwtService.validateJWT(token);

            bookmark.setUserEmail(
                    parsedJWT.get("username"));

            bookmark.setCreatedAt(
                    LocalDateTime.now());

            repo.save(bookmark);

            response.put("code", 200);
            response.put(
                    "message",
                    "Bookmark Added Successfully");

            return response;

        } catch (Exception e) {

            response.put("code", 500);
            response.put(
                    "message",
                    e.getMessage());

            return response;
        }
    }

    public Object getbookmarks(
            String token) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            Map<String, String> parsedJWT =
                    jwtService.validateJWT(token);

            response.put("code", 200);

            response.put(
                    "bookmarks",
                    repo.findByUserEmail(
                            parsedJWT.get(
                                    "username")));

            return response;

        } catch (Exception e) {

            response.put("code", 500);
            response.put(
                    "message",
                    e.getMessage());

            return response;
        }
    }

    public Object deletebookmark(
            int id) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            repo.deleteById(id);

            response.put("code", 200);

            response.put(
                    "message",
                    "Bookmark Deleted Successfully");

            return response;

        } catch (Exception e) {

            response.put("code", 500);

            response.put(
                    "message",
                    e.getMessage());

            return response;
        }
    }

    public Object getrecommendations(
            String token) {

        Map<String, Object> response =
                new HashMap<>();

        response.put("code", 200);

        response.put(
                "message",
                "Recommendation Feature Coming Soon");

        return response;
    }
}