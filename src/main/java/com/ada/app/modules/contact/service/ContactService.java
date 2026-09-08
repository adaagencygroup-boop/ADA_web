package com.ada.app.modules.contact.service;
import com.ada.app.common.exception.AppException;
import com.ada.app.common.model.PageResponse;
import com.ada.app.common.util.ExcelExportService;
import com.ada.app.modules.contact.dto.ContactNoteRequest;
import com.ada.app.modules.contact.dto.ContactRespondAdminRequest;
import com.ada.app.modules.contact.dto.ContactResponse;
import com.ada.app.modules.contact.dto.PublicContactRequest;
import com.ada.app.modules.contact.entity.Contact;
import com.ada.app.modules.contact.enums.ContactStatus;
import com.ada.app.modules.contact.repository.ContactRepository;
import com.ada.app.modules.contact.repository.ContactSpecs;
import com.ada.app.modules.notification.enums.NotificationType;
import com.ada.app.modules.notification.service.NotificationService;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {
  private final ContactRepository contactRepository;
  private final NotificationService notificationService;
  private final ExcelExportService excelExportService;
  private final JavaMailSender mailSender;
  @Transactional(readOnly = true)
  public PageResponse<ContactResponse> getContacts(int page, int size, ContactStatus status, String search, Instant fromDate, Instant toDate) {
    Pageable pageable = PageRequest.of(Math.max(0, page - 1), Math.max(1, size), Sort.by("createdAt").descending());
    Page<Contact> result = contactRepository.findAll(ContactSpecs.filter(status, search, fromDate, toDate), pageable);
    List<ContactResponse> items = result.getContent().stream().map(this::mapToListItemResponse).toList();
    return new PageResponse<>(items, PageResponse.Pagination.from(result));
  }
  @Transactional(readOnly = true)
  public ContactResponse getContactById(UUID id) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id)
      .orElseThrow(() -> AppException.notFound("Contact Not Found"));
    return mapToResponse(contact);
  }
  @Transactional
  public ContactResponse respondContact(UUID id, ContactRespondAdminRequest request) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Contact Not Found"));
    contact.setFeedbackContent(request.feedbackContent());
    contact.setFeedbackAttachmentURL(request.feedbackAttachmentURL());
    contact.setFeedbackSentAt(Instant.now());
    contact.setStatus(ContactStatus.responded);
    contact = contactRepository.save(contact);
    if (contact.getCustomerEmail() != null && !contact.getCustomerEmail().isBlank()) {
      try {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(contact.getCustomerEmail());
        message.setSubject("Phản Hồi Yêu Cầu Liên Hệ Từ ADA Group");
        message.setText("Kính Gửi " + contact.getCustomerFullname() + ",\n\n" + request.feedbackContent() + "\n\nTrân Trọng,\nĐội Ngũ ADA Group");
        mailSender.send(message);
      } catch (Exception e) {
        log.warn("Failed To Send Email Feedback To Customer {}: {}", contact.getCustomerEmail(), e.getMessage());
      }
    }
    notificationService.createAndBroadcast(
      "Phản Hồi Đã Được Gửi",
      "Bạn Đã Phản Hồi Liên Hệ Của " + contact.getCustomerFullname() + ".",
      NotificationType.contacts
    );
    return mapToResponse(contact);
  }
  @Transactional
  public ContactResponse updateNote(UUID id, ContactNoteRequest request) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Contact Not Found"));
    contact.setNote(request.note());
    contact = contactRepository.save(contact);
    return mapToResponse(contact);
  }
  @Transactional
  public void deleteContact(UUID id) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Contact Not Found"));
    contact.setDeletedAt(Instant.now());
    contactRepository.save(contact);
  }
  @Transactional(readOnly = true)
  public byte[] exportContactsExcel(ContactStatus status, String search, Instant fromDate, Instant toDate) {
    List<Contact> list = contactRepository.findAll(ContactSpecs.filter(status, search, fromDate, toDate), Sort.by("createdAt").descending());
    List<String> headers = List.of("ID", "Customer Name", "Phone", "Email", "Message", "Status", "Feedback", "Feedback Sent At", "Created At");
    List<List<Object>> rows = new ArrayList<>();
    for (Contact c : list) {
      rows.add(List.of(
        c.getId().toString(),
        c.getCustomerFullname(),
        c.getCustomerPhone() != null ? c.getCustomerPhone() : "",
        c.getCustomerEmail() != null ? c.getCustomerEmail() : "",
        c.getMessage(),
        c.getStatus().name(),
        c.getFeedbackContent() != null ? c.getFeedbackContent() : "",
        c.getFeedbackSentAt() != null ? c.getFeedbackSentAt().toString() : "",
        c.getCreatedAt().toString()
      ));
    }
    return excelExportService.exportToExcel("Contacts", headers, rows);
  }
  @Transactional
  public void submitContact(PublicContactRequest request) {
    Contact contact = Contact.builder()
      .customerFullname(request.customerFullname())
      .customerPhone(request.customerPhone())
      .customerEmail(request.customerEmail())
      .message(request.message())
      .status(ContactStatus.pending)
      .build();
    contact = contactRepository.save(contact);
    notificationService.createAndBroadcast(
      "Khách Hàng Gửi Yêu Cầu Liên Hệ Mới",
      request.customerFullname() + " Vừa Gửi Yêu Cầu Liên Hệ Qua Form Trên Web",
      NotificationType.contacts
    );
  }
  private ContactResponse mapToListItemResponse(Contact c) {
    return new ContactResponse(
      c.getId(),
      c.getCustomerFullname(),
      c.getCustomerPhone(),
      c.getCustomerEmail(),
      null,
      c.getStatus(),
      null,
      null,
      null,
      null,
      c.getCreatedAt(),
      c.getUpdatedAt()
    );
  }
  private ContactResponse mapToResponse(Contact c) {
    return new ContactResponse(
      c.getId(),
      c.getCustomerFullname(),
      c.getCustomerPhone(),
      c.getCustomerEmail(),
      c.getMessage(),
      c.getStatus(),
      c.getFeedbackContent(),
      c.getFeedbackAttachmentURL(),
      c.getFeedbackSentAt(),
      c.getNote(),
      c.getCreatedAt(),
      c.getUpdatedAt()
    );
  }
}