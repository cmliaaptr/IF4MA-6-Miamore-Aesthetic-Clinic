"use client";

import { useState } from "react";
import { paymentList } from "@/data/dashboard";
import Modal from "@/app/components/admin/Modal";
import {
  CircleDollarSign,
  QrCode,
  ReceiptText,
  ClipboardList,
} from "lucide-react";

type PaymentStatus = "Lunas" | "Pending" | "Expired" | "Gagal";

type PaymentItem = {
  id: number;
  invoice: string;
  customerName: string;
  treatment: string;
  total: string;
  status: PaymentStatus;
  paidAt: string;
};

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`payment-status ${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

export default function PembayaranPage() {
  const [selected, setSelected] = useState<PaymentItem | null>(null);

  return (
    <div className="payment-page">
      <h1 className="page-title">Pembayaran</h1>

      <div className="payment-table-wrapper">
        <table className="payment-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Invoice</th>
              <th>Nama</th>
              <th>Treatment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Waktu Bayar</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paymentList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.invoice}</td>
                <td>{item.customerName}</td>
                <td>{item.treatment}</td>
                <td>{item.total}</td>
                <td>
                  <StatusBadge status={item.status as PaymentStatus} />
                </td>
                <td>{item.paidAt}</td>
                <td>
                  <button
                    type="button"
                    className="payment-detail-button"
                    onClick={() => setSelected(item as PaymentItem)}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selected}
        title="Detail Pembayaran"
        onClose={() => setSelected(null)}
        width="880px"
      >
        {selected && (
          <div className="payment-popup">
            <div className="payment-popup-invoice">
              <div className="payment-popup-invoice-left">
                <div className="payment-icon-soft">⏳</div>
                <div>
                  <p>Invoice</p>
                  <h3>{selected.invoice}</h3>
                </div>
              </div>

              <div className="payment-popup-status">
                <span>Status</span>
                <StatusBadge status={selected.status} />
              </div>
            </div>

            <div className="payment-popup-top">
              <div className="payment-section payment-section-border">
                <h3>
                  <CircleDollarSign size={30} />
                  Informasi Transaksi
                </h3>

                <InfoRow label="Nama Pelanggan" value={selected.customerName} />
                <InfoRow label="Treatment" value={selected.treatment} />
                <InfoRow label="Dokter" value="dr. Aulia" />
                <InfoRow label="Tanggal Booking" value="18 Maret 2026 - 18:18" />
                <InfoRow label="Total Tagihan" value="Rp 200.000" />
              </div>

              <div className="payment-section">
                <h3>
                  <ReceiptText size={30} />
                  Informasi Pembayaran
                </h3>

                <InfoRow label="Metode Pembayaran" value="QRIS" />
                <InfoRow label="Status Pembayaran" value="Nama pelanggan" />
                <InfoRow
                  label="Waktu Pembayaran"
                  value="18 Maret 2026 - 18:18 WIB"
                />
                <InfoRow label="ID Transaksi" value="TRX-QRIS-101107102" />
              </div>
            </div>

            <div className="payment-popup-bottom">
              <div className="payment-card qris-card">
                <h3>
                  <QrCode size={30} />
                  Informasi Pembayaran
                </h3>

                <div className="qris-content">
                  <div className="qris-left">
                    <div className="qris-image">
                      <QrCode size={92} />
                    </div>

                    <div className="qris-note">
                      ⓘ QRIS hanya digunakan 1 kali pembayaran
                    </div>
                  </div>

                  <div className="qris-detail">
                    <QrisRow
                      label="Waktu Dibuat"
                      value="18 Maret 2026 - 18:18 WIB"
                    />
                    <QrisRow
                      label="Expired"
                      value="18 Maret 2026 - 19:19 WIB (1 jam)"
                    />
                    <QrisRow
                      label="Status QR"
                      value="Sudah Digunakan"
                      green
                    />
                  </div>
                </div>
              </div>

              <div className="payment-card history-card">
                <h3>
                  <ClipboardList size={30} />
                  Riwayat Status
                </h3>

                <div className="timeline-design">
                  <div className="timeline-line"></div>

                  <TimelineItem time="18 Maret 2026 - 18:10" text="QRIS dibuat" />
                  <TimelineItem
                    time="18 Maret 2026 - 18:13"
                    text="Pelanggan scan QRIS"
                    filled
                  />
                  <TimelineItem
                    time="18 Maret 2026 - 18:18"
                    text="Pembayaran berhasil"
                    active
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="payment-info-row">
      <span>{label}</span>
      <b>:</b>
      <strong>{value}</strong>
    </div>
  );
}

function QrisRow({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="qris-row">
      <span>{label}</span>
      <strong className={green ? "green-text" : ""}>{value}</strong>
    </div>
  );
}

function TimelineItem({
  time,
  text,
  active,
  filled,
}: {
  time: string;
  text: string;
  active?: boolean;
  filled?: boolean;
}) {
  return (
    <div className="timeline-design-item">
      <span className={`${active ? "active" : ""} ${filled ? "filled" : ""}`} />
      <div>
        <p>{time}</p>
        <strong>{text}</strong>
      </div>
    </div>
  );
}