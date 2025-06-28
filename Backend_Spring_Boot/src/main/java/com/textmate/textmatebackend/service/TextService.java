package com.textmate.textmatebackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.textmate.textmatebackend.model.OperationLog;
import com.textmate.textmatebackend.model.TextAnalysisResult;
import com.textmate.textmatebackend.model.User; // New import
import com.textmate.textmatebackend.repository.OperationLogRepository;
import com.textmate.textmatebackend.util.TextUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TextService {

    private static final Logger logger = LoggerFactory.getLogger(TextService.class);
    private final OperationLogRepository operationLogRepository;

    // For converting TextAnalysisResult to JSON string for logging
    private final ObjectMapper objectMapper;

    public TextService(OperationLogRepository operationLogRepository, ObjectMapper objectMapper) {
        this.operationLogRepository = operationLogRepository;
        this.objectMapper = objectMapper;
    }

    public String toUpperCase(String text, String sessionId) { // Added sessionId parameter
        String transformedText = TextUtils.toUpperCase(text);
        logOperation("uppercase", text, transformedText, null, sessionId);
        return transformedText;
    }

    public String toLowerCase(String text, String sessionId) { // Added sessionId parameter
        String transformedText = TextUtils.toLowerCase(text);
        logOperation("lowercase", text, transformedText, null, sessionId);
        return transformedText;
    }

    public String toTitleCase(String text, String sessionId) { // Added sessionId parameter
        String transformedText = TextUtils.toTitleCase(text);
        logOperation("titlecase", text, transformedText, null, sessionId);
        return transformedText;
    }

    public String reverseText(String text, String sessionId) { // Added sessionId parameter
        String transformedText = TextUtils.reverseText(text);
        logOperation("reverse", text, transformedText, null, sessionId);
        return transformedText;
    }

    public TextAnalysisResult analyzeText(String text, String sessionId) { // Added sessionId parameter
        TextAnalysisResult result = TextUtils.analyzeText(text);
        try {
            // Convert analysis result to JSON string for storage
            String analysisJson = objectMapper.writeValueAsString(result);
            logOperation("analyze", text, null, analysisJson, sessionId);
        } catch (JsonProcessingException e) {
            logger.error("Error converting analysis result to JSON for logging: {}", e.getMessage());
        }
        return result;
    }

    /**
     * Logs an operation, associating it with a user ID if authenticated,
     * or with a session ID if anonymous.
     * @param operationType The type of operation (e.g., "uppercase", "analyze").
     * @param originalText The original text input.
     * @param transformedText The resulting text after transformation (null for analyze).
     * @param analysisResultJson The analysis result as a JSON string (null for transformations).
     * @param sessionId The session ID from the client, used for anonymous tracking.
     */
    private void logOperation(String operationType, String originalText, String transformedText, String analysisResultJson, String sessionId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = null;

        // Check if the user is authenticated and not an anonymous user (Spring Security's default anonymous principal)
        if (authentication != null && authentication.isAuthenticated() &&
            !(authentication.getPrincipal() instanceof String) && // Not "anonymousUser" string
            authentication.getPrincipal() instanceof User) { // Ensure it's our custom User object
            User user = (User) authentication.getPrincipal();
            userId = user.getId();
        }

        OperationLog log = new OperationLog();
        log.setOperationType(operationType);
        log.setOriginalText(originalText);
        log.setTransformedText(transformedText);
        log.setAnalysisResultJson(analysisResultJson);
        log.setTimestamp(LocalDateTime.now());

        // Assign userId if available, otherwise assign sessionId
        if (userId != null) {
            log.setUserId(userId);
            log.setSessionId(null); // Ensure session ID is null if user is logged in
        } else if (sessionId != null && !sessionId.trim().isEmpty()) {
            log.setSessionId(sessionId);
            log.setUserId(null); // Ensure user ID is null if anonymous
        } else {
            // Fallback for cases where neither userId nor sessionId is present (should ideally not happen with frontend logic)
            logger.warn("Operation logged without userId or sessionId. OperationType: {}", operationType);
        }
        operationLogRepository.save(log);
    }
}
