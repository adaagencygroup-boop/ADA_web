package com.ada.app.modules.news.entity;
import com.ada.app.common.model.BaseEntity;
import com.ada.app.modules.news.enums.NewsStatus;
import com.ada.app.modules.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
@Entity
@Table(name = "\"news\"")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class News extends BaseEntity {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"authorId\"")
  private User author;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "\"categoryId\"")
  private NewsCategory category;
  @Column(name = "\"title\"", nullable = false, length = 255)
  private String title;
  @Column(name = "\"slug\"", nullable = false, unique = true, length = 255)
  private String slug;
  @Column(name = "\"coverImageURL\"")
  private String coverImageURL;
  @Column(name = "\"content\"", nullable = false, columnDefinition = "TEXT")
  private String content;
  @Enumerated(EnumType.STRING)
  @JdbcTypeCode(SqlTypes.NAMED_ENUM)
  @Column(name = "\"status\"", nullable = false, columnDefinition = "\"newsStatus\"")
  @Builder.Default
  private NewsStatus status = NewsStatus.draft;
  @Column(name = "\"isFeatured\"", nullable = false)
  @Builder.Default
  private Boolean isFeatured = false;
  @Column(name = "\"viewCount\"", nullable = false)
  @Builder.Default
  private Integer viewCount = 0;
}