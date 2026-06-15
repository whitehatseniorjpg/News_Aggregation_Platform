package com.bookmark.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookmark.model.Bookmark;

public interface BookmarkRepository
        extends JpaRepository<Bookmark,Integer>{

    List<Bookmark> findByUserEmail(
            String userEmail);

    boolean existsByUserEmailAndArticleId(
            String userEmail,
            int articleId);
}