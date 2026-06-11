package com.news.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.news.model.News;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {

    List<News> findByCategoryId(int categoryId);

    List<News> findByTitleContainingIgnoreCase(String keyword);

}