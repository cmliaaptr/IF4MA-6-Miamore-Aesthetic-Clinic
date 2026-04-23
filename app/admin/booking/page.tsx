"use client";

import BookingPageTable from "../../components/admin/BookingPageTable";
import { bookingPageList } from "@/data/dashboard";

export default function BookingPage() {
  return (
    <section>
      <h1 className="page-title">Booking</h1>

      <BookingPageTable data={bookingPageList} />
    </section>
  );
}