package com.textmate.textmatebackend.controller;

import com.textmate.textmatebackend.model.ApiResponse;
import com.textmate.textmatebackend.model.OperationLog;
import com.textmate.textmatebackend.repository.OperationLogRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryController {

    private final OperationLogRepository logRepo;

    public HistoryController(OperationLogRepository logRepo) {
        this.logRepo = logRepo;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getUserHistory(Authentication auth) {
        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof com.textmate.textmatebackend.model.User)) {
            return ResponseEntity.ok(new ApiResponse(true, "No history found.", java.util.Collections.emptyList()));
        }

        com.textmate.textmatebackend.model.User user = (com.textmate.textmatebackend.model.User) auth.getPrincipal();
        List<OperationLog> logs = logRepo.findByUserId(user.getId());

        if (logs.isEmpty()) {
            return ResponseEntity.ok(new ApiResponse(true, "No history found.", logs));
        } else {
            return ResponseEntity.ok(new ApiResponse(true, "History retrieved successfully.", logs));
        }
    }
}
