import ProfileDropdown from "../global/ProfileDropdown";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="header-left" />

      <div className="header-right">
        <ProfileDropdown
          name="Admin"
          profileHref="/admin/profile"
          settingsHref="/admin/settings"
        />
      </div>
    </header>
  );
}
