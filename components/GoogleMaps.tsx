"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface PropTypes {
  endereco: string;
}

export default function GoogleMaps(props: PropTypes) {
  const mapRef = useRef<HTMLDivElement>(null);

  // const [setStreetState, streetState] = useState<string | null>(
  //   "Rua Tabapuã, 1056 - Itaim Bibi, São Paulo - SP, 04533-004"
  // );

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string,
        version: "quartely",
      });
      const { Map } = await loader.importLibrary("maps");

      const { Geocoder } = await loader.importLibrary("geocoding");

      const { Marker, Animation } = await loader.importLibrary("marker");

      const geolocation = new Geocoder();

      await geolocation.geocode(
        {
          address: props.endereco,
        },
        (results, status) => {
          if (status === "OK" && results) {
            const map = new Map(mapRef.current as HTMLDivElement, {
              zoom: 15,
              center: results[0].geometry.location,
            });

            let labelObject: google.maps.MarkerLabel = {
              text: "Seu imóvel é aqui",
              fontSize: "30px",
              color: "#242424",
            };

            let marker = new Marker({
              animation: Animation?.BOUNCE,
              icon: "/icons/Location.svg",
              map: map,
              // label: labelObject,
              position: results[0].geometry.location,
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        }
      );
    };

    initializeMap();
  }, []);

  return <div className="w-full h-[500px]" ref={mapRef}></div>;
}
