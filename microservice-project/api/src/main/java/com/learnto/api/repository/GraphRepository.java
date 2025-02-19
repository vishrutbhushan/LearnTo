package com.learnto.api.repository;

import com.learnto.api.model.Graph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Date;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface GraphRepository extends JpaRepository<Graph, Long> {
    List<Graph> findByCreatedUser(String createdUser);

    List<Graph> findByName(String name);

    List<Graph> findByIsDeletedFalse();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO graph_visualizer.Graphs (name, description, created_user, update_time, is_deleted, adjacency_matrix, all_nodes) VALUES (:name, :description, :createdUser, :updateTime, :isDeleted, CAST(:adjacencyMatrix AS JSONB), CAST(:allNodes AS JSONB))", nativeQuery = true)
    void saveGraph(@Param("name") String name,
            @Param("description") String description,
            @Param("createdUser") String createdUser,
            @Param("updateTime") Date updateTime,
            @Param("isDeleted") boolean isDeleted,
            @Param("adjacencyMatrix") String adjacencyMatrix,
            @Param("allNodes") String allNodes);
}