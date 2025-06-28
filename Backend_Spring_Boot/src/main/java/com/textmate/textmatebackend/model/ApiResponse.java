package com.textmate.textmatebackend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private String transformedText;
    private TextAnalysisResult analysis; // Changed from Object to specific type
    private String token;    // For login/signup response
    private List<OperationLog> data; // For lists of data like history

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    // For transformed text operations (uppercase, lowercase, etc.)
    public ApiResponse(boolean success, String message, String transformedText) {
        this.success = success;
        this.message = message;
        this.transformedText = transformedText;
    }

    // For text analysis operation
    // This constructor ensures 'analysis' is set directly, and 'transformedText' is null.
    public ApiResponse(boolean success, String message, TextAnalysisResult analysisResult) {
        this.success = success;
        this.message = message;
        this.analysis = analysisResult;
        this.transformedText = null; // Explicitly set to null to avoid ambiguity if used for transformations
    }

    // For login response (explicitly token), distinguished by a dummy boolean
    public ApiResponse(boolean success, String message, String token, boolean isAuthResponse) {
        this.success = success;
        this.message = message;
        this.token = token;
        // isAuthResponse parameter is just a discriminator for Java's method overloading
    }

    // For history data (List<OperationLog>)
    // This constructor ensures 'data' is set, and 'transformedText'/'analysis' are null.
    public ApiResponse(boolean success, String message, List<OperationLog> data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.transformedText = null; // Explicitly set to null
        this.analysis = null; // Explicitly set to null
    }

    // Getter for token for JSON serialization
    public String getToken() {
        return token;
    }
}
