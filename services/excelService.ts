
import * as XLSX from 'https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js';
import { AttendanceRecord } from '../types';

export const excelService = {
  exportAttendance: (records: AttendanceRecord[], fileName: string = 'Gym_Attendance_Report.xlsx') => {
    // Format data for sheet
    const data = records.map(r => ({
      'Record ID': r.id,
      'Member ID': r.memberId,
      'Member Name': r.userName,
      'Date': r.date,
      'Check-in Time': r.checkInTime
    }));

    // Create a new workbook and worksheet
    const ws = (window as any).XLSX.utils.json_to_sheet(data);
    const wb = (window as any).XLSX.utils.book_new();
    (window as any).XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    // Save file
    (window as any).XLSX.writeFile(wb, fileName);
  }
};
