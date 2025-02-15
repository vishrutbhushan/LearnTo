package com.learnto.api.repository;

import com.learnto.api.model.Graph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GraphRepository extends JpaRepository<Graph, Long> {
    List<Graph> findByCreatedUser(String createdUser);
    List<Graph> findByName(String name);
    List<Graph> findByIsDeletedFalse();
}