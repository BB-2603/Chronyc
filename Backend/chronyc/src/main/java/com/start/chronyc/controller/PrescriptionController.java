package com.start.chronyc.controller;

import com.start.chronyc.service.InterpreterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/prescription")
@CrossOrigin(origins = "http://localhost:5173") // Allow access from your Vite development server
public class PrescriptionController {

    private final InterpreterService interpreterService;

    public PrescriptionController(InterpreterService interpreterService) {
        this.interpreterService = interpreterService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzePrescription(@RequestParam("file") MultipartFile file) {
        try {
            String jsonResult = interpreterService.processPrescription(file);
            return ResponseEntity.ok(jsonResult);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\": \"AI Processing Failure: " + e.getMessage() + "\"}");
        }
    }
}