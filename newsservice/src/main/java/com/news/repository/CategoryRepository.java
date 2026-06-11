package com.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.news.model.Category;

@Repository
public interface CategoryRepository
extends JpaRepository<Category, Integer> {

}