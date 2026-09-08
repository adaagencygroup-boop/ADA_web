package com.ada.app.common.util;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
@Service
public class ExcelExportService {
  public byte[] exportToExcel(String sheetName, List<String> headers, List<List<Object>> dataRows) {
    try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
      Sheet sheet = workbook.createSheet(sheetName);
      Font headerFont = workbook.createFont();
      headerFont.setBold(true);
      CellStyle headerCellStyle = workbook.createCellStyle();
      headerCellStyle.setFont(headerFont);
      Row headerRow = sheet.createRow(0);
      for (int i = 0; i < headers.size(); i++) {
        Cell cell = headerRow.createCell(i);
        cell.setCellValue(headers.get(i));
        cell.setCellStyle(headerCellStyle);
      }
      int rowIdx = 1;
      for (List<Object> rowData : dataRows) {
        Row row = sheet.createRow(rowIdx++);
        for (int colIdx = 0; colIdx < rowData.size(); colIdx++) {
          Object value = rowData.get(colIdx);
          Cell cell = row.createCell(colIdx);
          if (value != null) {
            cell.setCellValue(value.toString());
          } else {
            cell.setCellValue("");
          }
        }
      }
      for (int i = 0; i < headers.size(); i++) {
        sheet.autoSizeColumn(i);
      }
      workbook.write(out);
      return out.toByteArray();
    } catch (IOException e) {
      throw com.ada.app.common.exception.AppException.internal("Failed To Generate Excel Report: " + e.getMessage());
    }
  }
}