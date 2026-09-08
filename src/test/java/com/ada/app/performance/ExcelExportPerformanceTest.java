package com.ada.app.performance;
import com.ada.app.common.util.ExcelExportService;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
public class ExcelExportPerformanceTest {
  @Test
  public void testLargeDatasetExcelExportThroughput() {
    ExcelExportService exportService = new ExcelExportService();
    List<String> headers = List.of("ID", "Username", "Email", "IP Address", "Status", "Timestamp");
    int rowCount = 2000;
    List<List<Object>> rows = new ArrayList<>(rowCount);
    for (int i = 0; i < rowCount; i++) {
      rows.add(List.of(
        UUID.randomUUID().toString(),
        i,
        i + "@ada.com",
        "192.168.1." + (i % 254),
        "success",
        Instant.now().toString()
      ));
    }
    long startTime = System.currentTimeMillis();
    byte[] excelBytes = exportService.exportToExcel("Performance Audit", headers, rows);
    long duration = System.currentTimeMillis() - startTime;
    Assertions.assertNotNull(excelBytes);
    Assertions.assertTrue(excelBytes.length > 0);
    Assertions.assertTrue(duration < 3000);
  }
}