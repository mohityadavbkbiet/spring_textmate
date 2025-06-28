package com.textmate.textmatebackend.repository;

import com.textmate.textmatebackend.model.OperationLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OperationLogRepository extends MongoRepository<OperationLog, String> {
    List<OperationLog> findByUserId(String userId);
    List<OperationLog> findByUserIdOrderByTimestampDesc(String userId);
}
