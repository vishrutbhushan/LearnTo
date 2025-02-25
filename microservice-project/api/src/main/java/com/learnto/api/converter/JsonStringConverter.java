package com.learnto.api.converter;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.learnto.api.ApiApplication;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Converter
public class JsonStringConverter implements AttributeConverter<JsonNode, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger logger = LoggerFactory.getLogger(ApiApplication.class);

    @Override
    public String convertToDatabaseColumn(JsonNode attribute) {
        try {
            String jsonString = objectMapper.writeValueAsString(attribute);
            logger.info("Converted JsonNode to String: {}", jsonString);
            return jsonString;
        } catch (IOException e) {
            logger.error("Error converting JSON to String", e);
            throw new IllegalArgumentException("Error converting JSON to String", e);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String dbData) {
        try {
            JsonNode jsonNode = objectMapper.readTree(dbData);
            logger.info("Converted String to JsonNode: {}", jsonNode);
            return jsonNode;
        } catch (IOException e) {
            logger.error("Error converting String to JSON", e);
            throw new IllegalArgumentException("Error converting String to JSON", e);
        }
    }
}