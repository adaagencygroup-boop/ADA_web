package com.ada.app.modules.contact.repository;
import com.ada.app.modules.contact.entity.Contact;
import com.ada.app.modules.contact.enums.ContactStatus;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface ContactRepository extends JpaRepository<Contact, UUID>, JpaSpecificationExecutor<Contact> {
  Optional<Contact> findByIdAndDeletedAtIsNull(UUID id);
  long countByDeletedAtIsNull();
  long countByStatusAndDeletedAtIsNull(ContactStatus status);
  @Query(value = "SELECT to_char(\"createdAt\", 'YYYY-MM-DD') AS day, count(*) AS cnt FROM \"contacts\" WHERE \"deletedAt\" IS NULL AND \"createdAt\" >= :startDate GROUP BY day ORDER BY day ASC", nativeQuery = true)
  List<Object[]> countDailyContactsNative(@Param("startDate") Instant startDate);
}