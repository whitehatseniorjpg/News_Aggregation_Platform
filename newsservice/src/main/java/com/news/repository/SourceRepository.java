package com.news.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.news.model.Source;

@Repository
public interface SourceRepository
extends JpaRepository<Source, Integer> {

}