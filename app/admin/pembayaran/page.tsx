"use client";

import Modal from "@/app/components/admin/Modal";
import {
  CircleDollarSign,
  ClipboardList,
  QrCode,
  ReceiptText,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type PaymentStatus = "Lunas" | "Pending" | "Expired" | "Gagal";

type PaymentItem = {
  id: number;
  paymentId?: number | null;
  invoice: string;
  customerName: string;
  treatment: string;
  total: string;
  status: PaymentStatus;
  paidAt: string;
  doctor: string;
  bookingAt: string;
  paymentMethod: string;
  transactionId: string;
  transactionStatus: string;
  qrisUrl: string;
  createdAt: string;
  expiresAt: string;
};

type PaymentApiItem = {
  id_booking: number;
  id_pembayaran?: number | null;
  order_id?: string | null;
  nama_lengkap?: string | null;
  treatment?: string | null;
  dokter_terapis?: string | null;
  tanggal_booking?: string | null;
  waktu_booking?: string | null;
  total_pembayaran?: string | number | null;
  metode_pembayaran?: string | null;
  status_pembayaran?: string | null;
  midtrans_transaction_id?: string | null;
  midtrans_transaction_status?: string | null;
  qris_url?: string | null;
  payment_expires_at?: string | null;
  paid_at?: string | null;
  tanggal_bayar?: string | null;
  created_at?: string | null;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`payment-status ${status.toLowerCase()}`}>
      {status}
    </span>
  );
}

export default function PembayaranPage() {
  const [selected, setSelected] = useState<PaymentItem | null>(null);
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPayments = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/pembayaran`, {
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message || "Data pembayaran gagal dimuat.");
      }

      const data = Array.isArray(result?.data)
        ? (result.data as PaymentApiItem[])
        : [];

      setPayments(data.map(mapPaymentItem));
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Data pembayaran gagal dimuat."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(fetchPayments, 0);

    return () => window.clearTimeout(timer);
  }, [fetchPayments]);

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
            {isLoading && (
              <tr>
                <td colSpan={8}>Memuat data pembayaran...</td>
              </tr>
            )}

            {!isLoading && error && (
              <tr>
                <td colSpan={8}>{error}</td>
              </tr>
            )}

            {!isLoading && !error && payments.length === 0 && (
              <tr>
                <td colSpan={8}>Belum ada data pembayaran.</td>
              </tr>
            )}

            {!isLoading &&
              !error &&
              payments.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.invoice}</td>
                  <td>{item.customerName}</td>
                  <td>{item.treatment}</td>
                  <td>{item.total}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td>{item.paidAt}</td>
                  <td>
                    <button
                      type="button"
                      className="payment-detail-button"
                      onClick={() => setSelected(item)}
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
                <div className="payment-icon-soft">QR</div>
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
                <InfoRow label="Dokter" value={selected.doctor} />
                <InfoRow label="Tanggal Booking" value={selected.bookingAt} />
                <InfoRow label="Total Tagihan" value={selected.total} />
              </div>

              <div className="payment-section">
                <h3>
                  <ReceiptText size={30} />
                  Informasi Pembayaran
                </h3>

                <InfoRow label="Metode Pembayaran" value={selected.paymentMethod} />
                <InfoRow label="Status Pembayaran" value={selected.status} />
                <InfoRow label="Waktu Pembayaran" value={selected.paidAt} />
                <InfoRow label="ID Transaksi" value={selected.transactionId} />
                <InfoRow label="Status Midtrans" value={selected.transactionStatus} />
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
                      {selected.qrisUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={selected.qrisUrl}
                          alt={`QRIS ${selected.invoice}`}
                          width={120}
                          height={120}
                        />
                      ) : (
                        <QrCode size={92} />
                      )}
                    </div>

                    <div className="qris-note">
                      QRIS hanya digunakan 1 kali pembayaran
                    </div>
                  </div>

                  <div className="qris-detail">
                    <QrisRow label="Waktu Dibuat" value={selected.createdAt} />
                    <QrisRow label="Expired" value={selected.expiresAt} />
                    <QrisRow
                      label="Status QR"
                      value={
                        selected.status === "Lunas"
                          ? "Sudah Digunakan"
                          : "Belum Digunakan"
                      }
                      green={selected.status === "Lunas"}
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

                  <TimelineItem time={selected.createdAt} text="QRIS dibuat" />
                  <TimelineItem
                    time={selected.paidAt}
                    text="Pelanggan scan QRIS"
                    filled={selected.status === "Lunas"}
                  />
                  <TimelineItem
                    time={selected.paidAt}
                    text={
                      selected.status === "Lunas"
                        ? "Pembayaran berhasil"
                        : "Menunggu pembayaran"
                    }
                    active={selected.status === "Lunas"}
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

function mapPaymentItem(item: PaymentApiItem): PaymentItem {
  const status = mapPaymentStatus(
    item.status_pembayaran,
    item.midtrans_transaction_status
  );
  const paidAt = formatDateTime(item.paid_at || item.tanggal_bayar);

  return {
    id: item.id_booking,
    paymentId: item.id_pembayaran,
    invoice: item.order_id || `BOOKING-${item.id_booking}`,
    customerName: item.nama_lengkap || "-",
    treatment: item.treatment || "-",
    total: formatRupiah(item.total_pembayaran),
    status,
    paidAt: status === "Lunas" ? paidAt : "-",
    doctor: item.dokter_terapis || "-",
    bookingAt: formatBookingTime(item.tanggal_booking, item.waktu_booking),
    paymentMethod: item.metode_pembayaran || "QRIS",
    transactionId: item.midtrans_transaction_id || "-",
    transactionStatus: item.midtrans_transaction_status || "-",
    qrisUrl: item.qris_url || "",
    createdAt: formatDateTime(item.created_at),
    expiresAt: formatDateTime(item.payment_expires_at),
  };
}

function mapPaymentStatus(
  paymentStatus?: string | null,
  transactionStatus?: string | null
): PaymentStatus {
  const normalizedPayment = (paymentStatus || "").toLowerCase();
  const normalizedTransaction = (transactionStatus || "").toLowerCase();

  if (normalizedPayment === "lunas") return "Lunas";
  if (normalizedTransaction === "expire") return "Expired";
  if (["gagal", "cancel", "deny", "failure"].includes(normalizedPayment)) {
    return "Gagal";
  }
  if (["cancel", "deny", "failure"].includes(normalizedTransaction)) {
    return "Gagal";
  }

  return "Pending";
}

function formatRupiah(value?: string | number | null): string {
  const amount = Number(value || 0);

  if (!Number.isFinite(amount) || amount <= 0) {
    return "-";
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateTime(value?: string | null): string {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

function formatBookingTime(date?: string | null, time?: string | null): string {
  if (!date) return "-";

  const formattedDate = formatDateTime(`${date}T${time || "00:00:00"}`);

  return formattedDate === "-" ? date : formattedDate;
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
