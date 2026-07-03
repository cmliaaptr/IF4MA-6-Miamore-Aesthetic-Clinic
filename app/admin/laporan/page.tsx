"use client";

import {
  FileText,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import {
  useEffect,
  useCallback,
  useRef,
  useState,
} from "react";

import ReportTable from "../../components/admin/ReportTable";
import type { ReportItem } from "@/types/dashboard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export default function LaporanPage() {
  const [reports, setReports] =
    useState<ReportItem[]>([]);

  const [totalBooking, setTotalBooking] =
    useState(0);

  const [selectedDate, setSelectedDate] =
    useState("");
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const dateInputRef =
    useRef<HTMLInputElement>(null);

  // ==========================
  // GET LAPORAN
  // ==========================

  const fetchReports = useCallback(async (
    date?: string
  ) => {
    setIsLoading(true);
    setError("");

    try {
      let url =
        `${API_BASE_URL}/api/laporan`;

      if (date) {
        url += `?tanggal=${encodeURIComponent(
          date
        )}`;
      }

      const response =
        await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Gagal memuat laporan: ${response.status}`
        );
      }

      const text = await response.text();
      const result = text
        ? JSON.parse(
            text.replace(/^\/\//, "").trim()
          )
        : null;

      setReports(
        result?.data || []
      );
      setTotalBooking(
        result?.total_booking || 0
      );
    } catch (error) {
      setReports([]);
      setTotalBooking(0);
      setError(
        error instanceof Error
          ? error.message
          : "Gagal memuat laporan booking."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => fetchReports());
  }, [fetchReports]);

  // ==========================
  // BUKA KALENDER
  // ==========================

  const handleOpenCalendar = () => {
    const input =
      dateInputRef.current;

    if (!input) return;

    try {
      (
        input as HTMLInputElement & {
          showPicker?: () => void;
        }
      ).showPicker?.();
    } catch {
      input.focus();
    }
  };

  // ==========================
  // FILTER TANGGAL
  // ==========================

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date =
      e.target.value;

    setSelectedDate(date);

    fetchReports(date);
  };

  // ==========================
  // EXPORT PDF
  // ==========================

  const handleExportPdf = () => {
    const query = selectedDate
      ? `?tanggal=${encodeURIComponent(
          selectedDate
        )}`
      : "";

    window.open(
      `${API_BASE_URL}/api/laporan/pdf${query}`,
      "_blank"
    );
  };

  return (
    <section>
      <h1 className="page-title">
        Laporan
      </h1>

      {/* ACTION */}
      <div className="report-actions">
        <button
          type="button"
          className="export-pdf-button"
          onClick={
            handleExportPdf
          }
        >
          <FileText size={18} />
          <span>
            Export PDF
          </span>
        </button>

        <button
          type="button"
          className="filter-date-button"
          onClick={
            handleOpenCalendar
          }
        >
          <span>
            {selectedDate
              ? new Date(
                  selectedDate
                ).toLocaleDateString(
                  "id-ID"
                )
              : "Tanggal"}
          </span>

          <ChevronDown size={18} />
        </button>

        {/* Hidden Date Picker */}
        <input
          ref={dateInputRef}
          type="date"
          value={selectedDate}
          onChange={
            handleDateChange
          }
          style={{
            position: "absolute",
            opacity: 0,
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        />
      </div>

      {/* SUMMARY */}
      <div className="report-summary-card">
        <CalendarDays size={20} />

        <span>
          Total Booking :
          {" "}
          {totalBooking}
        </span>
      </div>

      {isLoading ? (
        <p className="admin-dashboard-message">
          Memuat laporan booking...
        </p>
      ) : null}

      {error ? (
        <p className="admin-dashboard-message error">
          {error}
        </p>
      ) : null}

      {/* TABLE */}
      <ReportTable
        data={reports}
      />
    </section>
  );
}
