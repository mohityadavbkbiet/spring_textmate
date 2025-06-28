package com.textmate.textmatebackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TextAnalysisResult {
    private int wordCount;
    private int charCount;
    private int sentenceCount;
    private int readTime; // in minutes
}
