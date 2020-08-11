import { Button } from 'antd';
import * as FileSaver from 'file-saver';
import React from 'react';
import * as XLSX from 'xlsx';

export const ExportCSV: React.FC<{ csvData?: unknown[]; fileName: string }> = ({
  csvData,
  fileName,
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (fileName: string, csvData?: unknown[]) => {
    if (!csvData) {
      return;
    }
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(csvData);
    ws['!cols']?.push({ width: 20 });
    const wb: XLSX.WorkBook = {
      Sheets: { data: ws },
      SheetNames: ['data'],
      Workbook: {
        Views: [{ RTL: true }],
      },
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <Button
      disabled={!(csvData && csvData.length > 0)}
      type="dashed"
      onClick={() => exportToCSV(fileName, csvData)}
    >
      دریافت خروجی
    </Button>
  );
};
