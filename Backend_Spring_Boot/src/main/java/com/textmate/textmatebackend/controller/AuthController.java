package com.textmate.textmatebackend.controller;

import com.textmate.textmatebackend.model.ApiResponse;
import com.textmate.textmatebackend.model.LoginRequest;
import com.textmate.textmatebackend.model.SignupRequest;
import com.textmate.textmatebackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest signupRequest) {
        if (signupRequest.getUsername() == null || signupRequest.getUsername().trim().isEmpty() ||
            signupRequest.getPassword() == null || signupRequest.getPassword().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Username and password are required."), HttpStatus.BAD_REQUEST);
        }

        var userOpt = authService.signupUser(signupRequest.getUsername(), signupRequest.getPassword());
        if (userOpt.isPresent()) {
            return new ResponseEntity<>(new ApiResponse(true, "Signed up successfully! Please log in."), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ApiResponse(false, "Username already taken."), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getUsername() == null || loginRequest.getUsername().trim().isEmpty() ||
            loginRequest.getPassword() == null || loginRequest.getPassword().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Username and password are required."), HttpStatus.BAD_REQUEST);
        }
        try {
            String jwt = authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
            return new ResponseEntity<>(new ApiResponse(true, "Logged in successfully!", jwt, true), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "Invalid username or password."), HttpStatus.UNAUTHORIZED);
        }
    }
}
