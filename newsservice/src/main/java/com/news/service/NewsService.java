package com.news.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.news.model.News;
import com.news.repository.NewsRepository;

@Service
public class NewsService {

    @Autowired
    NewsRepository repo;

    // SAVE ARTICLE
    public Object savearticle(News n1) {

        Map<String, Object> response = new HashMap<>();

        try {

            n1.setPublishedat(LocalDateTime.now());
            n1.setStatus(1);

            repo.save(n1);

            response.put("code", 200);
            response.put("message", "Article Saved Successfully");

        } catch(Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    // GET ARTICLES
    public Object getarticles(int page, int limit) {

        Map<String, Object> response = new HashMap<>();

        try {

            Pageable pageable = PageRequest.of(page - 1, limit);

            Page<News> news = repo.findAll(pageable);

            response.put("code", 200);
            response.put("news", news.getContent());
            response.put("totalpages", news.getTotalPages());

        } catch(Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    // GET ARTICLE BY ID
    public Object getarticle(int id) {

        Map<String, Object> response = new HashMap<>();

        try {

            News news = repo.findById(id).get();

            response.put("code", 200);
            response.put("news", news);

        } catch(Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    public Object getarticlesbycategory(
            int category,
            int page,
            int limit) {

        Map<String, Object> response =
                new HashMap<>();

        try {

            response.put(
                    "news",
                    repo.findByCategoryId(category)
            );

            response.put("code", 200);

        } catch(Exception e) {

            response.put("code", 500);

            response.put(
                    "message",
                    e.getMessage()
            );
        }

        return response;
    }
    // SEARCH NEWS
    public Object search(String keyword,
                         int page,
                         int limit) {

        Map<String, Object> response = new HashMap<>();

        try {

            response.put("code", 200);

            response.put(
                    "news",
                    repo.findByTitleContainingIgnoreCase(keyword)
            );

        } catch(Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

}