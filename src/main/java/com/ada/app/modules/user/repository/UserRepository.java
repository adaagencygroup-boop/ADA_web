package com.ada.app.modules.user.repository;
import com.ada.app.modules.user.entity.User;
import com.ada.app.modules.user.enums.UserRole;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  List<User> findByRole(UserRole role);
  boolean existsByUsername(String username);
  boolean existsByEmail(String email);
  boolean existsByEmailAndIdNot(String email, UUID id);
  boolean existsByUsernameAndIdNot(String username, UUID id);
}