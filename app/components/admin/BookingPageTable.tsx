"use client";

import { BookingPageItem } from "@/types/dashboard";

type BookingPageTableProps = {
  data: BookingPageItem[];
};

export default function BookingPageTable({ data }: BookingPageTableProps) {
  return (
    <div className="table-wrapper">
      <table className="booking-page-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama Pelanggan</th>
            <th>Treatment</th>
            <th>Tanggal</th>
            <th>Jam</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.customerName}</td>
              <td>{item.treatment}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}