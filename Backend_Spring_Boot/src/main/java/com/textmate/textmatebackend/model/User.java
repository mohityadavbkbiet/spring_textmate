package com.textmate.textmatebackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data
@Document(collection = "users")
public class User implements UserDetails {
    @Id
    private String id;
    private String username;
    private String password; // Storing hashed password

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For simplicity, we are not using roles/authorities in this app.
        return Collections.emptyList();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
