package com.textmate.textmatebackend.repository;

import com.textmate.textmatebackend.model.OperationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OperationLogRepository extends JpaRepository<OperationLog, Long> {
    List<OperationLog> findByUserId(Long userId);
    List<OperationLog> findByUserIdOrderByTimestampDesc(Long userId);
}
