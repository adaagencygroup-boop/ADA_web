package com.ada.app.modules.contact.controller;
import com.ada.app.common.model.APIResponse;
import com.ada.app.modules.contact.dto.PublicContactRequest;
import com.ada.app.modules.contact.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/v1/public/contacts")
@RequiredArgsConstructor
public class PublicContactController {
  private final ContactService contactService;
  @PostMapping
  public ResponseEntity<APIResponse<Void>> submitContact(@Valid @RequestBody PublicContactRequest request) {
    contactService.submitContact(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(APIResponse.created("Contact Submitted Successfully", null));
  }
}