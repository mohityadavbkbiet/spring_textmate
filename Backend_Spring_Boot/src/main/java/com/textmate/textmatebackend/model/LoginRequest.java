package com.textmate.textmatebackend.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
    private String sessionId; // New: To pass current session ID for merging
}
