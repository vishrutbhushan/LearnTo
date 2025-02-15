package com.learnto.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

public class GraphDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("createdUser")
    private String createdUser;

    @JsonProperty("adjacencyMatrix")
    private JsonNode adjacencyMatrix;

    @JsonProperty("allNodes")
    private JsonNode allNodes;

    public GraphDTO(String name, String description, String createdUser, JsonNode adjacencyMatrix, JsonNode allNodes) {
        this.name = name;
        this.description = description;
        this.createdUser = createdUser;
        this.adjacencyMatrix = adjacencyMatrix;
        this.allNodes = allNodes;
    }

    public GraphDTO() {
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