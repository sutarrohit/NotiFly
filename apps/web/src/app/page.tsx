import { HeroSection, PriceDashboard } from "../components";
import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("AuthToken")?.value || "";
  return (
    <div className="min-h-screen relative">
      <div>
        {!token && <HeroSection />}
        {token && <PriceDashboard />}
      </div>
    </div>
  );
}
