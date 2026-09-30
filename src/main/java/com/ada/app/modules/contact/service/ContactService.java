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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Slf4j
@Service
@RequiredArgsConstructor
public class ContactService {
  @Value("${app.storage.path}")
  private String storagePath;
  private final ContactRepository contactRepository;
  private final NotificationService notificationService;
  private final ExcelExportService excelExportService;
  private final JavaMailSender mailSender;

  @Value("${spring.mail.username}")
  private String senderEmail;
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
      .orElseThrow(() -> AppException.notFound("Không tìm thấy thông tin liên hệ"));
    return mapToResponse(contact);
  }
  @Transactional
  public ContactResponse respondContact(UUID id, ContactRespondAdminRequest request) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Không tìm thấy thông tin liên hệ"));
    contact.setFeedbackContent(request.feedbackContent());
    contact.setFeedbackAttachmentURL(request.feedbackAttachmentURL());
    contact.setFeedbackSentAt(Instant.now());
    contact.setStatus(ContactStatus.responded);
    contact = contactRepository.save(contact);
    if (contact.getCustomerEmail() != null && !contact.getCustomerEmail().isBlank()) {
      try {
        String subject = "Phản Hồi Yêu Cầu Liên Hệ Từ ADA Group";
        String content = "Kính Gửi " + contact.getCustomerFullname() + ",\n\n" + request.feedbackContent() + "\n\nTrân Trọng,\nĐội Ngũ ADA Group";
        String attachmentUrl = request.feedbackAttachmentURL();
        File attachmentFile = resolveAttachmentFile(attachmentUrl);

        if (attachmentFile != null && attachmentFile.exists()) {
          MimeMessage mimeMessage = mailSender.createMimeMessage();
          MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
          helper.setFrom(senderEmail);
          helper.setTo(contact.getCustomerEmail());
          helper.setSubject(subject);
          helper.setText(content);
          String ext = "";
          if (attachmentFile.getName().contains(".")) {
            ext = attachmentFile.getName().substring(attachmentFile.getName().lastIndexOf('.'));
          }
          helper.addAttachment("Dinh_Kem_Lien_He_ADA" + ext, attachmentFile);
          mailSender.send(mimeMessage);
        } else {
          SimpleMailMessage message = new SimpleMailMessage();
          message.setFrom(senderEmail);
          message.setTo(contact.getCustomerEmail());
          message.setSubject(subject);
          message.setText(content);
          mailSender.send(message);
        }
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
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Không tìm thấy thông tin liên hệ"));
    contact.setNote(request.note());
    contact = contactRepository.save(contact);
    return mapToResponse(contact);
  }
  @Transactional
  public void deleteContact(UUID id) {
    Contact contact = contactRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(() -> AppException.notFound("Không tìm thấy thông tin liên hệ"));
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

  private File resolveAttachmentFile(String url) {
    if (url == null || url.isBlank()) {
      return null;
    }
    String cleanUrl = url.trim();
    if (cleanUrl.contains("?")) {
      cleanUrl = cleanUrl.substring(0, cleanUrl.indexOf('?'));
    }
    if (cleanUrl.contains("/files/")) {
      String pathAfterFiles = cleanUrl.substring(cleanUrl.indexOf("/files/") + "/files/".length());
      Path resolvedPath = Paths.get(storagePath, pathAfterFiles.replace('/', File.separatorChar));
      if (Files.exists(resolvedPath)) {
        return resolvedPath.toFile();
      }
    }
    String rawFilename = cleanUrl.substring(cleanUrl.lastIndexOf('/') + 1);
    Path mediaPath = Paths.get(storagePath, "media", rawFilename);
    if (Files.exists(mediaPath)) {
      return mediaPath.toFile();
    }
    Path resumePath = Paths.get(storagePath, "resumes", rawFilename);
    if (Files.exists(resumePath)) {
      return resumePath.toFile();
    }
    Path rootPath = Paths.get(storagePath, rawFilename);
    if (Files.exists(rootPath)) {
      return rootPath.toFile();
    }
    return null;
  }
}