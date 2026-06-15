package com.bookmark.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bookmark.model.Bookmark;
import com.bookmark.service.BookmarkService;

@RestController
@RequestMapping("/bookmarkservice")
@CrossOrigin("*")
public class BookmarkController {

    @Autowired
    BookmarkService service;

    @GetMapping("/")
    public String test() {
        return "Bookmark Service Running";
    }

    @PostMapping("/addbookmark")
    public Object addbookmark(
            @RequestBody Bookmark bookmark,
            @RequestHeader("Token") String token) {

        return service.addbookmark(bookmark, token);
    }

    @GetMapping("/getbookmarks")
    public Object getbookmarks(
            @RequestHeader("Token") String token) {

        return service.getbookmarks(token);
    }

    @DeleteMapping("/deletebookmark/{id}")
    public Object deletebookmark(
            @PathVariable("id") int id) {

        return service.deletebookmark(id);
    }

    @GetMapping("/getrecommendations")
    public Object getrecommendations(
            @RequestHeader("Token") String token) {

        return service.getrecommendations(token);
    }
}