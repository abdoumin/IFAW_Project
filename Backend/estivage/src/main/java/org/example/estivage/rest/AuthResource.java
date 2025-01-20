package org.example.estivage.rest;


import jakarta.ejb.EJB;
import jakarta.inject.Inject;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.IdentityStoreHandler;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.example.estivage.ejb.JwtUtil;
import org.example.estivage.ejb.UserBean;
import org.example.estivage.entity.User;

import java.util.HashMap;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    private IdentityStoreHandler identityStoreHandler;

    @Inject
    private JwtUtil jwtUtil;

    @Inject
    private UserBean userBean;


    @POST
    @Path("/authenticate")
    public Response login(LoginRequest loginRequest) {
        CredentialValidationResult result = identityStoreHandler.validate(
                new UsernamePasswordCredential(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        if (result.getStatus() == CredentialValidationResult.Status.VALID) {
            String token = jwtUtil.generateToken(result.getCallerPrincipal().getName());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return Response.ok(response).build();
        }

        return Response.status(Response.Status.UNAUTHORIZED)
                .entity("Invalid credentials")
                .build();
    }

    @POST
    @Path("/register")
    public Response register(@Valid LoginRequest request) {
        if (userBean.findByUsername(request.getUsername()) != null) {
            return Response.status(Response.Status.CONFLICT)
                         .entity("Username already exists")
                         .build();
        }

        User user = userBean.createUser(request.getUsername(), request.getPassword());
        String token = jwtUtil.generateToken(user.getUsername());
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return Response.status(Response.Status.CREATED)
                      .entity(response)
                      .build();
    }
    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and Setters


        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}