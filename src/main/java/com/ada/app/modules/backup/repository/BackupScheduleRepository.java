package com.ada.app.modules.backup.repository;
import com.ada.app.modules.backup.entity.BackupSchedule;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface BackupScheduleRepository extends JpaRepository<BackupSchedule, UUID> {
  Optional<BackupSchedule> findFirstByOrderByIdAsc();
}