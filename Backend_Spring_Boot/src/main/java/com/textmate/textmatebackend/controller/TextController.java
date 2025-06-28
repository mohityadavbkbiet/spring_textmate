package com.textmate.textmatebackend.controller;

import com.textmate.textmatebackend.model.ApiResponse;
import com.textmate.textmatebackend.model.TextAnalysisResult;
import com.textmate.textmatebackend.model.TextRequest;
import com.textmate.textmatebackend.service.TextService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.function.BiFunction;
import java.util.function.Function;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TextController {

    private final TextService textService;

    public TextController(TextService textService) {
        this.textService = textService;
    }

    private ResponseEntity<ApiResponse> processTextRequest(
            TextRequest request,
            String sessionId, // Added sessionId
            BiFunction<String, String, String> operation, // Changed to BiFunction
            String successMessage
    ) {
        if (request.getText() == null || request.getText().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Please enter some text to perform operations."), HttpStatus.BAD_REQUEST);
        }
        String transformed = operation.apply(request.getText(), sessionId); // Pass sessionId
        return new ResponseEntity<>(new ApiResponse(true, successMessage, transformed), HttpStatus.OK);
    }

    @PostMapping("/uppercase")
    public ResponseEntity<ApiResponse> uppercaseText(@RequestBody TextRequest request, @RequestHeader(value="Session-Id", required = false) String sessionId) {
        return processTextRequest(request, sessionId, textService::toUpperCase, "Converted to uppercase.");
    }

    @PostMapping("/lowercase")
    public ResponseEntity<ApiResponse> lowercaseText(@RequestBody TextRequest request, @RequestHeader(value="Session-Id", required = false) String sessionId) {
        return processTextRequest(request, sessionId, textService::toLowerCase, "Converted to lowercase.");
    }

    @PostMapping("/titlecase")
    public ResponseEntity<ApiResponse> titlecaseText(@RequestBody TextRequest request, @RequestHeader(value="Session-Id", required = false) String sessionId) {
        return processTextRequest(request, sessionId, textService::toTitleCase, "Converted to title case.");
    }

    @PostMapping("/reverse")
    public ResponseEntity<ApiResponse> reverseText(@RequestBody TextRequest request, @RequestHeader(value="Session-Id", required = false) String sessionId) {
        return processTextRequest(request, sessionId, textService::reverseText, "Text reversed successfully.");
    }

    @PostMapping("/analyze")
    public ResponseEntity<ApiResponse> analyzeText(@RequestBody TextRequest request, @RequestHeader(value="Session-Id", required = false) String sessionId) {
        if (request.getText() == null || request.getText().trim().isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(false, "Please enter some text to analyze."), HttpStatus.BAD_REQUEST);
        }
        TextAnalysisResult result = textService.analyzeText(request.getText(), sessionId); // Pass sessionId
        return new ResponseEntity<>(new ApiResponse(true, "Text analyzed successfully.", result), HttpStatus.OK);
    }
}
