package com.learnto.api.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.learnto.api.converter.JsonStringConverter;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Graphs", schema = "graph_visualizer")
public class Graph {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_user", nullable = false)
    private String createdUser;

    @Column(name = "update_time", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updateTime;

    @Column(name = "is_deleted", columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Convert(converter = JsonStringConverter.class)
    @Column(name = "adjacency_matrix", columnDefinition = "JSON", nullable = false)
    private JsonNode adjacencyMatrix;

    @Convert(converter = JsonStringConverter.class)
    @Column(name = "all_nodes", columnDefinition = "JSON", nullable = false)
    private JsonNode allNodes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    public JsonNode getAdjacencyMatrix() {
        return adjacencyMatrix;
    }

    public void setAdjacencyMatrix(JsonNode adjacencyMatrix) {
        this.adjacencyMatrix = adjacencyMatrix;
    }

    public JsonNode getAllNodes() {
        return allNodes;
    }

    public void setAllNodes(JsonNode allNodes) {
        this.allNodes = allNodes;
    }
}