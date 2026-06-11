package com.news.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.news.model.News;
import com.news.repository.NewsRepository;

@Service
public class NewsApiService {

    @Autowired
    NewsRepository repo;

    String API_KEY = "c72db59e122f4c7f8da13d2bf60c7471";

    public void fetchAndSaveNews() {
    	String[] categories = {
    		    "sports",
    		    "technology",
    		    "business",
    		    "health",
    		    "science",
    		    "entertainment",
    		    "general"
    		};


        for (int i = 0; i < categories.length; i++) {

            String category = categories[i];

            String url =
            "https://newsapi.org/v2/top-headlines?country=us&category="
            + category
            + "&apiKey="
            + "c72db59e122f4c7f8da13d2bf60c7471";

            RestTemplate restTemplate = new RestTemplate();

            Map response =
                restTemplate.getForObject(url, Map.class);

            List<Map<String, Object>> articles =
                (List<Map<String, Object>>) response.get("articles");

            for (Map<String, Object> a : articles) {

                String title =
                    (String) a.get("title");

                // DUPLICATE CHECK
                if(title == null)
                    continue;

                News n = new News();

                n.setTitle(title);

                n.setSummary(
                    (String) a.get("description")
                );

                String content = (String) a.get("content");

                if(content != null && content.contains("[+")) {
                    content = content.substring(0, content.indexOf("[+"));
                }

                n.setContent(content);

                n.setUrl(
                    (String) a.get("url")
                );

                n.setImageUrl(
                    (String) a.get("urlToImage")
                );

                // DYNAMIC CATEGORY
                n.setCategoryId(i + 1);

                // SOURCE
                n.setSourceId(1);

                // DATE
                n.setPublishedat(
                    LocalDateTime.now()
                );

                // STATUS
                n.setStatus(1);

                repo.save(n);
            }
        }
    }
}