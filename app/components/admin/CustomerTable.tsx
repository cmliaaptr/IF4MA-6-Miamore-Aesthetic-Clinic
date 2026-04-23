"use client";

import { CustomerItem } from "@/types/dashboard";

type CustomerTableProps = {
  data: CustomerItem[];
  onEdit: (item: CustomerItem) => void;
  onDelete: (item: CustomerItem) => void;
};

export default function CustomerTable({
  data,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <div className="table-wrapper">
      <table className="customer-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No. HP</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}