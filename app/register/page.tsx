import RegisterCard from "../components/register/RegisterCard";

export default function RegisterPage() {
  return (
    <main
      className="
        min-h-screen flex items-center justify-center
        bg-cover bg-center
        px-4 py-8
      "
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
    >
      <RegisterCard />
    </main>
  );
}
