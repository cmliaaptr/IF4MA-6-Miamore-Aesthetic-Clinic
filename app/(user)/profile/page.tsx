import ProfileHero from "../../components/profile/ProfileHero";
import ProfileContent from "../../components/profile/ProfileContent";

export default function ProfilePage() {
  return (
    <main className="w-full bg-white">
      <ProfileHero />
      <ProfileContent />
    </main>
  );
}