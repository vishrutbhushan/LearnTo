package com.learnto.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnto.api.dto.GraphDTO;
import com.learnto.api.model.Graph;
import com.learnto.api.repository.GraphRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.util.List;

@RestController
@RequestMapping("/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final GraphRepository graphRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public GraphController(GraphRepository graphRepository, ObjectMapper objectMapper) {
        this.graphRepository = graphRepository;
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public List<GraphDTO> getAllGraphs() {
        List<Graph> graphs = graphRepository.findAll();
        return graphs.stream()
                .map(graph -> new GraphDTO(graph.getName(), graph.getDescription(), graph.getCreatedUser(), null, null))
                .toList();
    }

    @GetMapping("/{name}")
    public ResponseEntity<GraphDTO> getGraphByName(@PathVariable("name") String name) throws JsonProcessingException {
        Graph graph = graphRepository.findByName(name).getFirst();
        GraphDTO graphDTO = new GraphDTO(graph.getName(), graph.getDescription(), graph.getCreatedUser(),
                objectMapper.readTree(graph.getAdjacencyMatrix()), objectMapper.readTree(graph.getAllNodes()));
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(graphDTO);
    }

    @PostMapping
    public Graph createGraph(@RequestBody GraphDTO graphDTO) {
        Graph graph = new Graph();
        graph.setName(graphDTO.getName());
        graph.setDescription(graphDTO.getDescription());
        graph.setCreatedUser("admin");
        graph.setAdjacencyMatrix(graphDTO.getAdjacencyMatrix().toString());
        graph.setAllNodes(graphDTO.getAllNodes().toString());
        graph.setIsDeleted(false);
        return graphRepository.save(graph);
    }

    @PutMapping("/{id}")
    public Graph updateGraph(@PathVariable Long id, @RequestBody GraphDTO graphDetails) {
        Graph graph = graphRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Graph not found for this id :: " + id));
        graph.setName(graphDetails.getName());
        graph.setDescription(graphDetails.getDescription());
        graph.setCreatedUser("admin");
        graph.setAdjacencyMatrix(graphDetails.getAdjacencyMatrix().toString());
        graph.setAllNodes(graphDetails.getAllNodes().toString());
        graph.setIsDeleted(false);
        return graphRepository.save(graph);
    }

    @DeleteMapping("/{id}")
    public void deleteGraph(@PathVariable Long id) {
        Graph graph = graphRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Graph not found for this id :: " + id));
        graphRepository.delete(graph);
    }
}