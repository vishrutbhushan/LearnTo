package com.learnto.api.controller;

import com.learnto.api.dto.GraphDTO;
import com.learnto.api.model.Graph;
import com.learnto.api.repository.GraphRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/graph")
@CrossOrigin(origins = "*")
public class GraphController {

    private final GraphRepository graphRepository;

    public GraphController(GraphRepository graphRepository) {
        this.graphRepository = graphRepository;
    }

    @GetMapping
    public List<GraphDTO> getAllGraphs() {
        List<Graph> graphs = graphRepository.findAll();
        return graphs.stream()
                .map(graph -> new GraphDTO(graph.getName(), graph.getDescription(), graph.getCreatedUser(), graph.getAdjacencyMatrix(), graph.getAllNodes()))
                .toList();
    }

    @GetMapping("/{name}")
    public ResponseEntity<GraphDTO> getGraphByName(@PathVariable("name") String name) {
        Graph graph = graphRepository.findByName(name).get(0);
        GraphDTO graphDTO = new GraphDTO(graph.getName(), graph.getDescription(), graph.getCreatedUser(),
                graph.getAdjacencyMatrix(), graph.getAllNodes());
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(graphDTO);
    }

    @PostMapping
    public ResponseEntity<Void> createGraph(@RequestBody GraphDTO graphDTO) {
        graphRepository.saveGraph(graphDTO.getName(), graphDTO.getDescription(), "admin", new Date(), false, graphDTO.getAdjacencyMatrix().toString(), graphDTO.getAllNodes().toString());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public Graph updateGraph(@PathVariable Long id, @RequestBody GraphDTO graphDetails) {
        Graph graph = graphRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Graph not found for this id :: " + id));
        graph.setName(graphDetails.getName());
        graph.setDescription(graphDetails.getDescription());
        graph.setCreatedUser("admin");
        graph.setAdjacencyMatrix(graphDetails.getAdjacencyMatrix());
        graph.setAllNodes(graphDetails.getAllNodes());
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