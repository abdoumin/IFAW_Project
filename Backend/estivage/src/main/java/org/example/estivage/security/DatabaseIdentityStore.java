package org.example.estivage.security;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.security.enterprise.credential.UsernamePasswordCredential;
import jakarta.security.enterprise.identitystore.CredentialValidationResult;
import jakarta.security.enterprise.identitystore.IdentityStore;
import org.example.estivage.ejb.UserBean;
import org.example.estivage.entity.User;

import java.util.Set;

@ApplicationScoped
public class DatabaseIdentityStore implements IdentityStore {

    @Inject
    private UserBean userBean;

    public CredentialValidationResult validate(UsernamePasswordCredential credential) {
        User user = userBean.findByUsername(credential.getCaller());

        if (user != null && userBean.validatePassword(
                credential.getPasswordAsString(),
                user.getPassword())) {
            return new CredentialValidationResult(user.getUsername(), Set.of("USER"));
        }

        return CredentialValidationResult.INVALID_RESULT;
    }
}