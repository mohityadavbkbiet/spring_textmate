package com.textmate.textmatebackend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "operationLogs")
public class OperationLog {
    @Id
    private String id;

    private String userId; // Optional, for logged-in users
    private String sessionId; // New: Optional, for anonymous sessions

    private String operationType; // e.g., "uppercase", "lowercase", "reverse", "titlecase", "analyze"

    private String originalText;

    private String transformedText; // For transformations

    private String analysisResultJson; // For analysis results, stored as JSON string

    private LocalDateTime timestamp;
}
