package com.start.chronyc.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class InterpreterService {

    private final ChatClient chatClient;

    public InterpreterService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public String processPrescription(MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("The uploaded file cannot be empty.");
        }

        String contentType = file.getContentType();
        MediaType mediaType = contentType != null ? MediaType.parseMediaType(contentType) : MediaType.IMAGE_JPEG;
        Resource imageResource = file.getResource();

        // Expanded systemic schema to request confidence scores and detailed timing metadata
        String systemPrompt = """
            You are a precise medical transcription AI analyzing an uploaded image of a doctor's prescription.
            Carefully inspect the handwriting or printed text in the image.
            
            Return ONLY a valid minified JSON object containing a root array called "medications".
            Each item in the array must be an object containing exactly these keys:
            - "name": The string name of the medicine.
            - "dosage": The strength or volume (e.g., "500mg", "1 tablet").
            - "frequency": How often to take it (e.g., "Twice daily", "Once a day").
            - "instructions": Any standard notes written on the paper.
            - "confidenceScore": A string percentage (e.g., "95%") evaluating your confidence in transcribing the medicine name accurately based on handwriting legibility.
            - "timeOfDay": Specific time windows if indicated, otherwise infer a logical baseline (e.g., "Morning", "Night", "Morning and Night").
            - "relationToFood": Explicit or logical placement around meals (e.g., "Before Food", "After Food", "Empty Stomach", "With Food").
            
            Strict Enforcement: Do NOT wrap the output block in markdown code fencing (such as ```json). Output the raw JSON text string only.
            """;

        return this.chatClient.prompt()
                .user(userSpec -> userSpec
                        .text(systemPrompt)
                        .media(mediaType, imageResource))
                .call()
                .content();
    }
}