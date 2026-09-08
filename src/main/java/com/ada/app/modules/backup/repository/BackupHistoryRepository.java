package com.ada.app.modules.backup.repository;
import com.ada.app.modules.backup.entity.BackupHistory;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface BackupHistoryRepository extends JpaRepository<BackupHistory, UUID>, JpaSpecificationExecutor<BackupHistory> {
}