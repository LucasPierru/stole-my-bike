import Map from "@/components/map/map";
import { getReports } from "@/mock/reports";

export default async function Home() {
  return (
    <div className="min-w-screen h-[calc(100vh-4rem)]">
      <Map />
    </div>
  );
}
