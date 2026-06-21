"use client";

import {
  Edit3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";

type StaffProfilePageProps = {
  userId: number;
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

type Props = {
  userId: number;
  title: string;
  breadcrumbRoot: string;
  name: string;
  role: string;
  initials: string;
  summary: string;
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

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type StoredUser = {
  id_user?: number;
  role?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const initialPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function StaffProfilePage({
  userId,
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
  useEffect(() => {
    const updateProfile = {
      name,
      summary,
      phone,
      email,
      address,
    };

    setProfile(updateProfile);
    setDraftProfile(updateProfile);
  }, [name, summary, phone, email, address]);

  const [profile, setProfile] = useState<EditableProfile>({
    name,
    summary,
    phone,
    email,
    address,
  });
  const [draftProfile, setDraftProfile] = useState<EditableProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(initialPasswordForm);
  const [passwordError, setPasswordError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

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

  const openPasswordForm = () => {
    setPasswordForm(initialPasswordForm);
    setPasswordError("");
    setPasswordMessage("");
    setIsChangingPassword(true);
  };

  const closePasswordForm = () => {
    setPasswordForm(initialPasswordForm);
    setPasswordError("");
    setPasswordMessage("");
    setIsChangingPassword(false);
    setShowPasswords({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });
  };

  const handleDraftChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = event.target;
    setDraftProfile((current) => ({ ...current, [fieldName]: value }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;
    setPasswordForm((current) => ({ ...current, [fieldName]: value }));
    setPasswordError("");
    setPasswordMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: draftProfile.name,
          email: draftProfile.email,
          phone: draftProfile.phone,
          address: draftProfile.address,
        }),
      });

      const text = await response.text();

      console.log("PROFILE RESPONSE:", text);

      const result = JSON.parse(text.replace(/^\/\//, "").trim());

      if (!response.ok) {
        throw new Error(result.message || "Gagal update profile");
      }

      setProfile(draftProfile);

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          username: draftProfile.name,
          email: draftProfile.email,
          phone: draftProfile.phone,
          address: draftProfile.address,
        }),
      );

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (!passwordForm.currentPassword) {
      setPasswordError("Password saat ini wajib diisi.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password baru minimal 6 karakter.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Konfirmasi password baru tidak sama.");
      return;
    }

    const storedUser = getStoredUser();

    if (!storedUser?.id_user) {
      setPasswordError("Data user tidak ditemukan. Silakan login ulang.");
      return;
    }

    setIsSubmittingPassword(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          id_user: storedUser.id_user,
          role: storedUser.role,
          current_password: passwordForm.currentPassword,
          password: passwordForm.newPassword,
          password_confirmation: passwordForm.confirmPassword,
        }),
      });

      const text = await response.text();
      const result = text ? parseApiText(text) : null;

      if (!response.ok) {
        const validationMessage = result?.errors
          ? Object.values(result.errors).flat().join(" ")
          : result?.message || result?.error;

        throw new Error(validationMessage || "Password gagal diubah.");
      }

      setPasswordForm(initialPasswordForm);
      setPasswordMessage(result?.message || "Password berhasil diubah.");
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Password gagal diubah. Silakan coba lagi.",
      );
    } finally {
      setIsSubmittingPassword(false);
    }
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
          <h3 className="text-xl font-bold text-neutral-950">
            Informasi Pribadi
          </h3>

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

            <div className="grid gap-4 py-5 md:grid-cols-[56px_220px_1fr_auto] md:items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-[#21457d]">
                <Lock size={20} />
              </div>
              <span className="text-sm font-semibold text-neutral-600 md:text-base">
                Password
              </span>
              <span className="text-sm font-medium tracking-[0.2em] text-neutral-950 md:text-base">
                ********
              </span>
              <button
                type="button"
                onClick={openPasswordForm}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#f6f1df] px-4 py-2 text-sm font-semibold text-[#9d7412] transition hover:bg-[#efe3bd]"
              >
                <Edit3 size={16} />
                Ubah Password
              </button>
            </div>
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

      {isChangingPassword ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(15,23,42,0.24)]">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-neutral-950">
                  Ubah Password
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Gunakan password baru yang kuat untuk menjaga keamanan akun.
                </p>
              </div>
              <button
                type="button"
                onClick={closePasswordForm}
                className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                aria-label="Tutup form ubah password"
              >
                <X size={22} />
              </button>
            </div>

            <form
              onSubmit={handleSubmitPassword}
              className="space-y-5 px-6 py-6"
            >
              <PasswordInput
                label="Password Saat Ini"
                name="currentPassword"
                value={passwordForm.currentPassword}
                isVisible={showPasswords.currentPassword}
                onChange={handlePasswordChange}
                onToggleVisibility={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    currentPassword: !current.currentPassword,
                  }))
                }
              />
              <PasswordInput
                label="Password Baru"
                name="newPassword"
                value={passwordForm.newPassword}
                isVisible={showPasswords.newPassword}
                onChange={handlePasswordChange}
                onToggleVisibility={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    newPassword: !current.newPassword,
                  }))
                }
              />
              <PasswordInput
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                isVisible={showPasswords.confirmPassword}
                onChange={handlePasswordChange}
                onToggleVisibility={() =>
                  setShowPasswords((current) => ({
                    ...current,
                    confirmPassword: !current.confirmPassword,
                  }))
                }
              />

              {passwordError ? (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {passwordError}
                </p>
              ) : null}

              {passwordMessage ? (
                <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  {passwordMessage}
                </p>
              ) : null}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closePasswordForm}
                  className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="rounded-lg bg-[#111331] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1c1f45] disabled:cursor-not-allowed disabled:bg-neutral-400"
                >
                  {isSubmittingPassword ? "Menyimpan..." : "Simpan Password"}
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

function PasswordInput({
  label,
  name,
  value,
  isVisible,
  onChange,
  onToggleVisibility,
}: {
  label: string;
  name: keyof PasswordForm;
  value: string;
  isVisible: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-neutral-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border border-neutral-300 px-4 py-3 pr-12 text-sm text-neutral-950 outline-none transition focus:border-[#b88a18] focus:ring-2 focus:ring-[#f6f1df]"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
          aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function getStoredUser(): StoredUser | null {
  try {
    const rawUser = localStorage.getItem("user");
    return rawUser ? (JSON.parse(rawUser) as StoredUser) : null;
  } catch {
    return null;
  }
}

function parseApiText(text: string) {
  return JSON.parse(text.replace(/^\/\//, "").trim());
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
