package com.ada.app.modules.auth.repository;
import com.ada.app.modules.auth.entity.UserOTP;
import com.ada.app.modules.auth.enums.OTPPurpose;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserOTPRepository extends JpaRepository<UserOTP, UUID> {
  Optional<UserOTP> findTopByUserIdAndPurposeAndUsedAtIsNullOrderByCreatedAtDesc(UUID userId, OTPPurpose purpose);
}