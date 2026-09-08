package com.ada.app.modules.user.repository;
import com.ada.app.modules.user.entity.UserDevice;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserDeviceRepository extends JpaRepository<UserDevice, UUID> {
  Optional<UserDevice> findByUserIdAndDeviceFingerprint(UUID userId, String deviceFingerprint);
}