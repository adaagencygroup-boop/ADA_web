package com.ada.app.modules.contact.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.contact.dto.ContactNoteRequest;
import com.ada.app.modules.contact.dto.ContactRespondAdminRequest;
import com.ada.app.modules.contact.dto.ContactResponse;
import com.ada.app.modules.contact.enums.ContactStatus;
import com.ada.app.modules.contact.service.ContactService;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/admin/contacts")
@RequiredArgsConstructor
public class AdminContactController {
  private final ContactService contactService;
  @GetMapping
  public ResponseEntity<APIResponse<PageResponse<ContactResponse>>> getContacts(
    @RequestParam(defaultValue = "1") int page,
    @RequestParam(defaultValue = "10") int size,
    @RequestParam(required = false) ContactStatus status,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    return ResponseEntity.ok(APIResponse.ok("Contacts Retrieved Successfully", contactService.getContacts(page, size, status, search, fromDate, toDate)));
  }
  @GetMapping("/exportExcel")
  public ResponseEntity<byte[]> exportContactsExcel(
    @RequestParam(required = false) ContactStatus status,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) Instant fromDate,
    @RequestParam(required = false) Instant toDate
  ) {
    byte[] excelBytes = contactService.exportContactsExcel(status, search, fromDate, toDate);
    return ResponseEntity.ok()
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=contacts.xlsx")
      .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
      .body(excelBytes);
  }
  @GetMapping("/{id}")
  public ResponseEntity<APIResponse<ContactResponse>> getContactById(@PathVariable UUID id) {
    return ResponseEntity.ok(APIResponse.ok("Contact Retrieved Successfully", contactService.getContactById(id)));
  }
  @PostMapping("/{id}/respond")
  public ResponseEntity<APIResponse<ContactResponse>> respondContact(@PathVariable UUID id, @Valid @RequestBody ContactRespondAdminRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Feedback Sent Successfully", contactService.respondContact(id, request)));
  }
  @PatchMapping("/{id}/note")
  public ResponseEntity<APIResponse<ContactResponse>> updateNote(@PathVariable UUID id, @Valid @RequestBody ContactNoteRequest request) {
    return ResponseEntity.ok(APIResponse.ok("Note Updated Successfully", contactService.updateNote(id, request)));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<APIResponse<Void>> deleteContact(@PathVariable UUID id) {
    contactService.deleteContact(id);
    return ResponseEntity.ok(APIResponse.ok("Contact Deleted Successfully", null));
  }
}