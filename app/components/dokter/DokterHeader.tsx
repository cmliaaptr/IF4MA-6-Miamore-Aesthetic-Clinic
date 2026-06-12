import ProfileDropdown from "../global/ProfileDropdown";

export default function DokterHeader() {
  return (
    <header className="sticky top-0 z-[900] flex h-[70px] items-center justify-end border-b border-neutral-200 bg-white px-6">
      <ProfileDropdown
        name="Dokter"
        profileHref="/dokter/profile"
        settingsHref="/dokter/settings"
      />
    </header>
  );
}
