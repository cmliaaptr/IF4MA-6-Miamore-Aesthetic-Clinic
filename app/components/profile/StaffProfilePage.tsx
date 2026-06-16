"use client";

import {
  Edit3,
  Mail,
  MapPin,
  Phone,
  Shield,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

type StaffProfilePageProps = {
  title: string;
  breadcrumbRoot: string;
  name: string;
  role: string;
  summary: string;
  initials: string;
  phone: string;
  email: string;
  address: string;
};

type EditableProfile = {
  name: string;
  summary: string;
  phone: string;
  email: string;
  address: string;
};

export default function StaffProfilePage({
  title,
  breadcrumbRoot,
  name,
  role,
  summary,
  initials,
  phone,
  email,
  address,
}: StaffProfilePageProps) {
  const [profile, setProfile] = useState<EditableProfile>({
    name,
    summary,
    phone,
    email,
    address,
  });
  const [draftProfile, setDraftProfile] = useState<EditableProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const displayInitials = getInitials(profile.name) || initials;
  const RoleIcon =
    role === "Dokter" ? Stethoscope : role === "Admin" ? Shield : UserRound;

  const info = [
    { icon: <UserRound size={20} />, label: "Nama", value: profile.name },
    { icon: <Phone size={20} />, label: "No. HP", value: profile.phone },
    { icon: <Mail size={20} />, label: "Email", value: profile.email },
    { icon: <MapPin size={20} />, label: "Alamat", value: profile.address },
  ];

  const openEditForm = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const handleDraftChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name: fieldName, value } = event.target;
    setDraftProfile((current) => ({ ...current, [fieldName]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfile(draftProfile);
    setIsEditing(false);
  };

  return (
    <>
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-950 md:text-4xl">
            {title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-neutral-500">
            <span>{breadcrumbRoot}</span>
            <span>/</span>
            <span className="text-neutral-700">Profile</span>
          </div>
        </div>

        <div className="rounded-lg border border-neutral-100 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] md:p-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
            <div className="relative shrink-0">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-[#f4f0e4] text-5xl font-bold text-[#b88a18] ring-8 ring-neutral-100 md:h-44 md:w-44">
                {displayInitials}
              </div>
              <button
                type="button"
                onClick={openEditForm}
                className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#101331] shadow-[0_8px_22px_rgba(15,23,42,0.16)] transition hover:bg-neutral-50"
                aria-label="Edit foto profil"
              >
                <Edit3 size={18} />
              </button>
            </div>

            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl font-bold text-neutral-950 md:text-4xl">
                {profile.name}
              </h2>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f6f1df] px-4 py-2 text-sm font-semibold text-[#9d7412]">
                <RoleIcon size={16} />
                {role}
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600 md:text-base">
                {profile.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-neutral-100 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)] md:p-10">
          <h3 className="text-xl font-bold text-neutral-950">Informasi Pribadi</h3>

          <div className="mt-7 divide-y divide-neutral-200">
            {info.map((item) => (
              <div
                key={item.label}
                className="grid gap-4 py-5 md:grid-cols-[56px_220px_1fr] md:items-center"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-[#21457d]">
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-neutral-600 md:text-base">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-neutral-950 md:text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-end">
          <button
            type="button"
            onClick={openEditForm}
            className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#111331] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:bg-[#1c1f45]"
          >
            <Edit3 size={18} />
            Edit Profil
          </button>
        </div>
      </section>

      {isEditing ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-neutral-950">
                  Edit Profil
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Perbarui informasi yang tampil di halaman profile.
                </p>
              </div>
              <button
                type="button"
                onClick={closeEditForm}
                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Tutup form edit profile"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
              <ProfileInput
                label="Nama"
                name="name"
                value={draftProfile.name}
                onChange={handleDraftChange}
              />
              <ProfileInput
                label="No. HP"
                name="phone"
                value={draftProfile.phone}
                onChange={handleDraftChange}
              />
              <ProfileInput
                label="Email"
                name="email"
                type="email"
                value={draftProfile.email}
                onChange={handleDraftChange}
              />
              <ProfileInput
                label="Alamat"
                name="address"
                value={draftProfile.address}
                onChange={handleDraftChange}
              />
              <div>
                <label
                  htmlFor="summary"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Deskripsi
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={draftProfile.summary}
                  onChange={handleDraftChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-[#b88a18] focus:ring-2 focus:ring-[#f6f1df]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#111331] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c1f45]"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ProfileInput({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: keyof EditableProfile;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-neutral-700"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-950 outline-none transition focus:border-[#b88a18] focus:ring-2 focus:ring-[#f6f1df]"
      />
    </div>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
