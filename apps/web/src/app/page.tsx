import Image from "next/image";
import { Header } from "../components";
import Head from "next/head";
import { HeroSection } from "../components";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div>
        <HeroSection />
      </div>
    </div>
  );
}
