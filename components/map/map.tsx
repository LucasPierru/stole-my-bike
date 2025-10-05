"use client";

import { useRef } from "react";

import MapProvider from "@/lib/mapbox/provider";
import MapStyles from "@/components/map/map-styles";
import MapControls from "@/components/map/map-controls";
import MapSearch from "@/components/map/map-search";
import ReportsMarker from "../reports-marker";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative w-full h-full">
      <div id="map-container" ref={mapContainerRef} className="absolute h-full w-full" />

      <MapProvider
        mapContainerRef={mapContainerRef}
        initialViewState={{
          longitude: -73.5673,
          latitude: 45.5017,
          zoom: 14,
        }}>
        <MapSearch />
        <MapControls />
        <MapStyles />
        <ReportsMarker />
      </MapProvider>
    </div>
  );
}
