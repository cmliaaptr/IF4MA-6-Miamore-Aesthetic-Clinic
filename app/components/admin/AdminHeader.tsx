// components/admin/AdminHeader.tsx

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="header-left">
        {/* Nanti bisa ditambah search bar */}
      </div>

      <div className="header-right">
        <button className="notification-button">🔔</button>

        <div className="admin-profile">
          <div className="admin-avatar">👤</div>
          <span>Admin</span>
          <span>▼</span>
        </div>
      </div>
    </header>
  );
}