"use client";

import { FileText, CalendarDays, ChevronDown } from "lucide-react";
import ReportTable from "../../components/admin/ReportTable";
import { reportList } from "@/data/dashboard";

export default function LaporanPage() {
  return (
    <section>
      <h1 className="page-title">Laporan</h1>

      {/* Action buttons */}
      <div className="report-actions">
        <button type="button" className="export-pdf-button">
          <FileText size={18} />
          <span>Export PDF</span>
        </button>

        <button type="button" className="filter-date-button">
          <span>Tanggal</span>
          <ChevronDown size={18} />
        </button>
      </div>

      {/* Summary card */}
      <div className="report-summary-card">
        <CalendarDays size={20} />
        <span>Booking Hari Ini : 30</span>
      </div>

      {/* Report table */}
      <ReportTable data={reportList} />
    </section>
  );
}