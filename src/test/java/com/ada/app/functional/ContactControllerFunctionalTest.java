package com.ada.app.functional;
import com.ada.app.common.model.APIResponse;
import com.ada.app.common.model.PageResponse;
import com.ada.app.modules.contact.controller.AdminContactController;
import com.ada.app.modules.contact.controller.PublicContactController;
import com.ada.app.modules.contact.dto.ContactNoteRequest;
import com.ada.app.modules.contact.dto.ContactRespondAdminRequest;
import com.ada.app.modules.contact.dto.ContactResponse;
import com.ada.app.modules.contact.dto.PublicContactRequest;
import com.ada.app.modules.contact.enums.ContactStatus;
import com.ada.app.modules.contact.service.ContactService;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
public class ContactControllerFunctionalTest {
  private ContactService contactService;
  private AdminContactController adminContactController;
  private PublicContactController publicContactController;
  @BeforeEach
  public void setUp() {
    contactService = Mockito.mock(ContactService.class);
    adminContactController = new AdminContactController(contactService);
    publicContactController = new PublicContactController(contactService);
  }
  @Test
  public void testAdminContactEndpoints() {
    UUID contactId = UUID.randomUUID();
    ContactResponse contactData = new ContactResponse(contactId, "David Tran", "+84 901 234 567", "david.tran@ada.com.vn", "Inquiry Regarding Enterprise Solution", ContactStatus.pending, null, null, null, null, Instant.now(), Instant.now());
    PageResponse<ContactResponse> page = new PageResponse<>(List.of(contactData), new PageResponse.Pagination(1, 10, 1, 1, true, true));
    Mockito.when(contactService.getContacts(ArgumentMatchers.anyInt(), ArgumentMatchers.anyInt(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(page);
    ResponseEntity<APIResponse<PageResponse<ContactResponse>>> getPage = adminContactController.getContacts(1, 10, null, null, null, null);
    Assertions.assertEquals(200, getPage.getStatusCode().value());
    Assertions.assertEquals(1, getPage.getBody().data().items().size());
    Mockito.when(contactService.getContactById(contactId)).thenReturn(contactData);
    ResponseEntity<APIResponse<ContactResponse>> getDetail = adminContactController.getContactById(contactId);
    Assertions.assertEquals(200, getDetail.getStatusCode().value());
    ContactRespondAdminRequest respondReq = new ContactRespondAdminRequest("Thank You For Reaching Out! Our Team Will Contact You Shortly!", "https://ada.com/files/media/proposal.pdf");
    ContactResponse respondedContact = new ContactResponse(contactId, "David Tran", "+84 901 234 567", "david.tran@ada.com.vn", "Inquiry Regarding Enterprise Solution", ContactStatus.responded, "Thank You For Reaching Out! Our Team Will Contact You Shortly!", "https://ada.com/files/media/proposal.pdf", Instant.now(), null, Instant.now(), Instant.now());
    Mockito.when(contactService.respondContact(contactId, respondReq)).thenReturn(respondedContact);
    ResponseEntity<APIResponse<ContactResponse>> respondResp = adminContactController.respondContact(contactId, respondReq);
    Assertions.assertEquals(200, respondResp.getStatusCode().value());
    Assertions.assertEquals(ContactStatus.responded, respondResp.getBody().data().status());
    ContactNoteRequest noteReq = new ContactNoteRequest("Contacted Via Phone On Monday");
    Mockito.when(contactService.updateNote(contactId, noteReq)).thenReturn(contactData);
    ResponseEntity<APIResponse<ContactResponse>> noteResp = adminContactController.updateNote(contactId, noteReq);
    Assertions.assertEquals(200, noteResp.getStatusCode().value());
    Mockito.doNothing().when(contactService).deleteContact(contactId);
    ResponseEntity<APIResponse<Void>> deleteResp = adminContactController.deleteContact(contactId);
    Assertions.assertEquals(200, deleteResp.getStatusCode().value());
    byte[] excelBytes = new byte[]{0x50, 0x4B, 0x03, 0x04};
    Mockito.when(contactService.exportContactsExcel(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any())).thenReturn(excelBytes);
    ResponseEntity<byte[]> exportResp = adminContactController.exportContactsExcel(null, null, null, null);
    Assertions.assertEquals(200, exportResp.getStatusCode().value());
    Assertions.assertTrue(exportResp.getHeaders().getFirst(HttpHeaders.CONTENT_DISPOSITION).contains("contacts.xlsx"));
  }
  @Test
  public void testPublicContactEndpoints() {
    PublicContactRequest request = new PublicContactRequest("David Tran", "+84 901 234 567", "david.tran@ada.com.vn", "Inquiry Regarding Enterprise Solution");
    Mockito.doNothing().when(contactService).submitContact(request);
    ResponseEntity<APIResponse<Void>> response = publicContactController.submitContact(request);
    Assertions.assertEquals(201, response.getStatusCode().value());
    Assertions.assertTrue(response.getBody().success());
    Assertions.assertEquals("Contact Submitted Successfully", response.getBody().message());
  }
}