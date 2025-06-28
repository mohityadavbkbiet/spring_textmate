package com.textmate.textmatebackend.model;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String password;
}
