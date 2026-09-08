package com.ada.app.modules.contact.entity;
import com.ada.app.common.model.BaseEntity;
import com.ada.app.modules.contact.enums.ContactStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"contacts\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contact extends BaseEntity {
  @Column(name = "\"customerFullname\"", nullable = false, length = 150)
  private String customerFullname;
  @Column(name = "\"customerPhone\"", length = 20)
  private String customerPhone;
  @Column(name = "\"customerEmail\"", columnDefinition = "citext")
  private String customerEmail;
  @Column(name = "\"message\"", nullable = false, columnDefinition = "TEXT")
  private String message;
  @Column(name = "\"note\"", columnDefinition = "TEXT")
  private String note;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"contactStatus\"")
  @Builder.Default
  private ContactStatus status = ContactStatus.pending;
  @Column(name = "\"feedbackContent\"", columnDefinition = "TEXT")
  private String feedbackContent;
  @Column(name = "\"feedbackAttachmentURL\"")
  private String feedbackAttachmentURL;
  @Column(name = "\"feedbackSentAt\"")
  private Instant feedbackSentAt;
  @Column(name = "\"deletedAt\"")
  private Instant deletedAt;
}