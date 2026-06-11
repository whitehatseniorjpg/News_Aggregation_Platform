package com.news.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    // TITLE
    @Column(columnDefinition = "TEXT")
    String title;

    // SUMMARY
    @Column(columnDefinition = "TEXT")
    String summary;

    // CONTENT
    @Column(columnDefinition = "TEXT")
    String content;

    // URL
    @Column(length = 2000)
    String url;

    // IMAGE URL
    @Column(length = 3000)
    @JsonProperty("image_url")
    String imageUrl;

    // SOURCE ID
    @JsonProperty("source_id")
    int sourceId;

    // CATEGORY ID
    @JsonProperty("category_id")
    int categoryId;

    // PUBLISHED DATE
    LocalDateTime publishedat;

    // STATUS
    int status;

    // ID
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // TITLE
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // SUMMARY
    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    // CONTENT
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // URL
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    // IMAGE URL
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // SOURCE ID
    public int getSourceId() {
        return sourceId;
    }

    public void setSourceId(int sourceId) {
        this.sourceId = sourceId;
    }

    // CATEGORY ID
    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    // PUBLISHED AT
    public LocalDateTime getPublishedat() {
        return publishedat;
    }

    public void setPublishedat(LocalDateTime publishedat) {
        this.publishedat = publishedat;
    }

    // STATUS
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}