package org.example.estivage.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.ws.rs.ext.ContextResolver;
import jakarta.ws.rs.ext.Provider;

@Provider
public class CustomObjectMapperProvider implements ContextResolver<ObjectMapper> {

    private final ObjectMapper objectMapper;

    public CustomObjectMapperProvider() {
        objectMapper = new ObjectMapper();
        // Register the module for Java 8 time support
        objectMapper.registerModule(new JavaTimeModule());
        // Optional: Disable timestamps as arrays; force IS0 8601
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    }

    @Override
    public ObjectMapper getContext(Class<?> type) {
        return objectMapper;
    }
}