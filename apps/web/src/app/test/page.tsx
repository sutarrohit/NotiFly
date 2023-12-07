"use client";
import { useSelectedLayoutSegment } from "next/navigation";

const Page = () => {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex border">
      Test Route
      <p>Active segment: {segment}</p>
    </div>
  );
};

export default Page;
