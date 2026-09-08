package com.ada.app.common.model;
import java.util.List;
import org.springframework.data.domain.Page;
public record PageResponse<T>(
  List<T> items,
  Pagination pagination
) {
  public record Pagination(
    int page,
    int size,
    long totalElements,
    int totalPages,
    boolean isFirst,
    boolean isLast
  ) {
    public static Pagination from(Page<?> page) {
      return new Pagination(
        page.getNumber() + 1,
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.isFirst(),
        page.isLast()
      );
    }
  }
  public static <T> PageResponse<T> from(Page<T> page) {
    return new PageResponse<>(
      page.getContent(),
      Pagination.from(page)
    );
  }
}