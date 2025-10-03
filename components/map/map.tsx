"use client";

import { useRef } from "react";

import MapProvider from "@/lib/mapbox/provider";
import MapStyles from "@/components/map/map-styles";
import MapControls from "@/components/map/map-controls";
import MapSearch from "@/components/map/map-search";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} className="absolute inset-0 h-full w-full" />

      <MapProvider
        mapContainerRef={mapContainerRef}
        initialViewState={{
          longitude: -73.5616,
          latitude: 45.5,
          zoom: 10,
        }}>
        <MapSearch />
        <MapControls />
        <MapStyles />
      </MapProvider>
    </>
  );
}
