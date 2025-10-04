"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapContext } from "@/context/map-context";
import { LoaderCircleIcon } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapComponentProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  children?: React.ReactNode;
};

export default function MapProvider({ mapContainerRef, initialViewState, children }: MapComponentProps) {
  const map = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || map.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.current = new mapboxgl.Map({
            container: "map-container",
            style: "mapbox://styles/mapbox/standard",
            center: [
              position.coords.longitude || initialViewState.longitude,
              position.coords.latitude || initialViewState.latitude,
            ],
            zoom: initialViewState.zoom || 14,
            attributionControl: false,
            /* logoPosition: "bottom-right", */
          });

          const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true, // keep following as they move
            showUserHeading: true, // show direction the user is facing
            fitBoundsOptions: {
              maxZoom: 14,
              duration: 0, // 👈 disables the fly animation
            },
          });

          map.current.addControl(geolocate);

          map.current.on("load", () => {
            geolocate.trigger();
            setLoaded(true);
          });

          return () => {
            if (map.current) {
              map.current.remove();
              map.current = null;
            }
          };
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, [initialViewState, mapContainerRef]);

  return (
    <div className="z-[1000]">
      <MapContext.Provider value={{ map: map.current! }}>{children}</MapContext.Provider>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-[1000]">
          <div className="text-lg font-medium">
            <LoaderCircleIcon className="animate-spin w-16 h-16" />
          </div>
        </div>
      )}
    </div>
  );
}
