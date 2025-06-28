package com.textmate.textmatebackend.util;

import com.textmate.textmatebackend.model.TextAnalysisResult;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class TextUtils {

    // Regex for splitting into sentences. This is a basic one and might need
    // to be more sophisticated for complex edge cases (e.g., abbreviations).
    private static final Pattern SENTENCE_SPLIT_PATTERN = Pattern.compile("[.!?]+\\s*|[\\r\\n]+");

    public static String toUpperCase(String text) {
        if (text == null) return null;
        return text.toUpperCase();
    }

    public static String toLowerCase(String text) {
        if (text == null) return null;
        return text.toLowerCase();
    }

    public static String toTitleCase(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }
        return Arrays.stream(text.split("\\s+"))
                .map(word -> {
                    if (word.isEmpty()) {
                        return "";
                    }
                    return Character.toTitleCase(word.charAt(0)) + word.substring(1).toLowerCase();
                })
                .collect(Collectors.joining(" "));
    }

    public static String reverseText(String text) {
        if (text == null) return null;
        return new StringBuilder(text).reverse().toString();
    }

    public static TextAnalysisResult analyzeText(String text) {
        if (text == null || text.trim().isEmpty()) {
            return new TextAnalysisResult(0, 0, 0, 0);
        }

        // Word Count
        String[] words = text.trim().split("\\s+");
        int wordCount = (words.length == 1 && words[0].isEmpty()) ? 0 : words.length;

        // Character Count (excluding spaces)
        int charCount = text.replace(" ", "").length();

        // Sentence Count
        int sentenceCount = 0;
        Matcher matcher = SENTENCE_SPLIT_PATTERN.matcher(text.trim());
        while (matcher.find()) {
            // Ensure the match is not just empty string or whitespace
            if (matcher.group().trim().length() > 0 || !matcher.hitEnd()) {
                sentenceCount++;
            }
        }

        // If no punctuation/newlines, and there's text, it's at least one sentence.
        if (sentenceCount == 0 && text.trim().length() > 0) {
            sentenceCount = 1;
        }

        // Estimated Read Time (assuming 200 words per minute)
        int readTime = (int) Math.ceil(wordCount / 200.0);
        if (readTime < 1 && wordCount > 0) { // Ensure minimum 1 min if there's text
            readTime = 1;
        }

        return new TextAnalysisResult(wordCount, charCount, sentenceCount, readTime);
    }
}
