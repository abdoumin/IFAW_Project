package org.example.estivage.config;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {
    // No need to override getClasses()
    // It will automatically scan for @Path and @Provider annotations
}