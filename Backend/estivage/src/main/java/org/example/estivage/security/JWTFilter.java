package org.example.estivage.security;

import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import org.example.estivage.ejb.JwtUtil;

@Provider
public class JWTFilter implements ContainerRequestFilter {

    @Inject
    private JwtUtil jwtUtil;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String path = requestContext.getUriInfo().getPath();

        // Skip authentication for public endpoints
        if (isPublicEndpoint(path)) {
            return;
        }

        String token = extractToken(requestContext);

        if (token == null || !jwtUtil.validateToken(token)) {
            requestContext.abortWith(
                    Response.status(Response.Status.UNAUTHORIZED).build()
            );
        }
    }

    private boolean isPublicEndpoint(String path) {
        return path.equals("/") ||
                path.startsWith("/auth/authenticate") ||
                path.startsWith("/auth/register");
    }

    private String extractToken(ContainerRequestContext requestContext) {
        String authHeader = requestContext.getHeaderString("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}