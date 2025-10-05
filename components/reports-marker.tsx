import { MapPin } from "lucide-react";
import MapMarker from "./map/map-marker";
import { useMap } from "@/context/map-context";
import { useEffect, useState } from "react";
import { getReports, type Report } from "@/mock/reports";

const ReportsMarker = () => {
  const { map } = useMap();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    if (!map) return;

    const fetchReports = async () => {
      const bounds = map.getBounds();
      if (!bounds) return;

      const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()];

      setReports(await getReports(bbox));
    };

    map.on("moveend", fetchReports);
    map.on("zoomend", fetchReports);

    fetchReports();

    return () => {
      map.off("moveend", fetchReports);
      map.off("zoomend", fetchReports);
    };
  }, [map]);

  return (
    map &&
    reports &&
    reports.map((report) => (
      <MapMarker
        key={report.id}
        latitude={report.location.latitude}
        longitude={report.location.longitude}
        data={report}>
        <div className="rounded-full flex items-center justify-center transform transition-all duration-200 bg-rose-500 text-white shadow-lg size-8 cursor-pointer hover:scale-110">
          <MapPin className="stroke-[2.5px] size-4.5" />
        </div>
      </MapMarker>
    ))
  );
};

export default ReportsMarker;
