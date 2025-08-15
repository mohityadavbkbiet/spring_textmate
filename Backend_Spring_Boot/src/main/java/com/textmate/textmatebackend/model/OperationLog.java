package com.textmate.textmatebackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "operation_logs")
public class OperationLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Optional, for logged-in users

    private String sessionId; // New: Optional, for anonymous sessions

    private String operationType; // e.g., "uppercase", "lowercase", "reverse", "titlecase", "analyze"

    @Column(columnDefinition = "TEXT")
    private String originalText;

    @Column(columnDefinition = "TEXT")
    private String transformedText; // For transformations

    @Column(columnDefinition = "TEXT")
    private String analysisResultJson; // For analysis results, stored as JSON string

    private LocalDateTime timestamp;
}
