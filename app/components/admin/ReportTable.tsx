"use client";

import { ReportItem } from "@/types/dashboard";

type ReportTableProps = {
  data: ReportItem[];
};

export default function ReportTable({ data }: ReportTableProps) {
  return (
    <div className="table-wrapper">
      <table className="report-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Lengkap</th>
            <th>Treatment</th>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6}>Belum ada data laporan booking.</td>
            </tr>
          ) : null}

          {data.map((item, index) => (
            <tr key={item.id ?? index}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.treatment}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>
                <span
                  className={`status-badge ${item.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
