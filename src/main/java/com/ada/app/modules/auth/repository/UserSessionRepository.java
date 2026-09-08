package com.ada.app.modules.auth.repository;
import com.ada.app.modules.auth.entity.UserSession;
import com.ada.app.modules.auth.enums.SessionStatus;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, UUID> {
  Optional<UserSession> findByRefreshTokenHashAndStatus(String refreshTokenHash, SessionStatus status);
  Optional<UserSession> findByRefreshTokenHash(String refreshTokenHash);
  Optional<UserSession> findByAccessTokenJTI(String accessTokenJTI);
  List<UserSession> findByUserIdAndStatus(UUID userId, SessionStatus status);
  List<UserSession> findByUserIdAndStatusOrderByIssuedAtAsc(UUID userId, SessionStatus status);
  List<UserSession> findByUserIdAndStatusAndIdNot(UUID userId, SessionStatus status, UUID excludeSessionId);
  List<UserSession> findByTokenFamilyId(String tokenFamilyId);
  List<UserSession> findByTokenFamilyIdAndStatus(String tokenFamilyId, SessionStatus status);
}