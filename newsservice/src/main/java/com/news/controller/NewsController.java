package com.news.controller;
import com.news.repository.CategoryRepository;
import com.news.repository.SourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.news.model.News;
import com.news.service.NewsApiService;
import com.news.service.NewsService;

@RestController
@RequestMapping("/newsservice")
@CrossOrigin("*")
public class NewsController {

    @Autowired
    NewsService service;
    @Autowired
    CategoryRepository crepo;

    @Autowired
    SourceRepository srepo;
    @Autowired
    NewsApiService apiService;

    @GetMapping("/fetchnews")
    public String fetchnews() {

        apiService.fetchAndSaveNews();

        return "News Saved";
    }
    @RestController
    public class TestController {

        @GetMapping("/")
        public String home() {
            return "News Service Running";
        }
    }
    @GetMapping("/getsources")
    public Object getsources() {

        return srepo.findAll();
    }
    
    @GetMapping("/getcategories")
    public Object getcategories() {

        return crepo.findAll();
    }

    // SAVE ARTICLE
    @PostMapping("/savearticle")
    public Object savearticle(@RequestBody News n1) {
        return service.savearticle(n1);
    }

    // GET ARTICLES
    @GetMapping("/getarticles/{page}/{limit}")
    public Object getarticles(
            @PathVariable("page") int page,
            @PathVariable("limit") int limit) {

        return service.getarticles(page, limit);
    }

    // GET ARTICLE BY ID
    @GetMapping("/getarticle/{id}")
    public Object getarticle(
            @PathVariable("id") int id) {

        return service.getarticle(id);
    }

    // GET ARTICLES BY CATEGORY
    @GetMapping("/getarticlesbycategory/{category}/{page}/{limit}")

    public Object getarticlesbycategory(

            @PathVariable("category") int category,

            @PathVariable("page") int page,

            @PathVariable("limit") int limit) {

        return service.getarticlesbycategory(
                category,
                page,
                limit
        );
    }

    // SEARCH NEWS
    @GetMapping("/search/{keyword}/{page}/{limit}")
    public Object search(
            @PathVariable("keyword") String keyword,
            @PathVariable("page") int page,
            @PathVariable("limit") int limit) {

        return service.search(keyword, page, limit);
    }
}