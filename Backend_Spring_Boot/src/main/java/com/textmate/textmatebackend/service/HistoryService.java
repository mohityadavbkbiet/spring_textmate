package com.textmate.textmatebackend.service;

import com.textmate.textmatebackend.model.OperationLog;
import com.textmate.textmatebackend.repository.OperationLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    private final OperationLogRepository operationLogRepository;

    public HistoryService(OperationLogRepository operationLogRepository) {
        this.operationLogRepository = operationLogRepository;
    }

    /**
     * Retrieves the operation history for a specific user, ordered by timestamp in descending order.
     * @param userId The ID of the user whose history is to be retrieved.
     * @return A list of OperationLog objects representing the user's history.
     */
    public List<OperationLog> getHistoryForUser(Long userId) {
        return operationLogRepository.findByUserId(userId);
    }
}
