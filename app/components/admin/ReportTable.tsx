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
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.fullName}</td>
              <td>{item.treatment}</td>
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