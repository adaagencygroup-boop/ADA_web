package com.ada.app.modules.user.repository;
import com.ada.app.modules.user.entity.LoginHistory;
import com.ada.app.modules.user.enums.LoginStatus;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface LoginHistoryRepository extends JpaRepository<LoginHistory, UUID>, JpaSpecificationExecutor<LoginHistory> {
  boolean existsByUserIdAndIPAddressAndStatus(UUID userId, String IPAddress, LoginStatus status);
}