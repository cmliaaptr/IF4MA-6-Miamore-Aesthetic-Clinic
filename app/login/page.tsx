import LoginCard from "../components/login/LoginCard";

export default function LoginPage() {
  return (
    <main
      className="
        min-h-screen
        flex items-center justify-center
        bg-cover bg-center
        px-4 py-8
      "
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      <LoginCard />
    </main>
  );
}