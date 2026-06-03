import React, { useEffect, useRef } from "react";
import { FaExpand, FaCompress, FaCar, FaMapMarkerAlt } from "react-icons/fa";

const STATUS_CONFIG = {
  upcoming: { label: "Ride Scheduled", color: "#1a56db", bg: "#eff6ff" },
  driver_on_way: {
    label: "Driver On The Way",
    color: "#d97706",
    bg: "#fffbeb",
  },
  arrived: { label: "Driver Arrived", color: "#059669", bg: "#ecfdf5" },
  in_progress: { label: "In Progress", color: "#7c3aed", bg: "#f5f3ff" },
  completed: { label: "Completed", color: "#16a34a", bg: "#f0fdf4" },
};

const MapPanel = ({
  ride,
  rideStatus,
  trackingEnabled,
  mapFullscreen,
  setMapFullscreen,
  formatDate,
  formatTime,
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const status = STATUS_CONFIG[rideStatus] || STATUS_CONFIG.upcoming;

  useEffect(() => {
    // Dynamically load leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Dynamically load leaflet JS
    const loadLeaflet = () => {
      if (window.L) {
        initMap();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initMap;
      document.body.appendChild(script);
    };

    const initMap = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (!mapRef.current) return;

      const L = window.L;
      const srcLat = parseFloat(ride.source_lat);
      const srcLng = parseFloat(ride.source_lng);
      const dstLat = parseFloat(ride.destination_lat);
      const dstLng = parseFloat(ride.destination_lng);

      const centerLat = (srcLat + dstLat) / 2;
      const centerLng = (srcLng + dstLng) / 2;

      const map = L.map(mapRef.current, { zoomControl: false }).setView(
        [centerLat, centerLng],
        14,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      // Source marker (green)
      const greenIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;background:#16a34a;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      // Destination marker (red)
      const redIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;background:#dc2626;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([srcLat, srcLng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup</b><br/>${ride.source_address}`)
        .openPopup();

      L.marker([dstLat, dstLng], { icon: redIcon })
        .addTo(map)
        .bindPopup(`<b>Drop</b><br/>${ride.destination_address}`);

      // Route line
      L.polyline(
        [
          [srcLat, srcLng],
          [dstLat, dstLng],
        ],
        { color: "#1a56db", weight: 4, opacity: 0.7, dashArray: "8,6" },
      ).addTo(map);

      // Fit bounds
      map.fitBounds(
        [
          [srcLat, srcLng],
          [dstLat, dstLng],
        ],
        { padding: [40, 40] },
      );

      mapInstanceRef.current = map;
    };

    loadLeaflet();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [ride, mapFullscreen]);

  // Invalidate map size on fullscreen toggle
  useEffect(() => {
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 300);
  }, [mapFullscreen]);

  return (
    <div className="mp-container">
      {/* Status Badge */}
      <div
        className="mp-status-badge"
        style={{ background: status.bg, color: status.color }}
      >
        <span className="mp-status-dot" style={{ background: status.color }} />
        {status.label}
      </div>

      {/* Expand/Collapse Button */}
      <button
        className="mp-fullscreen-btn"
        onClick={() => setMapFullscreen((p) => !p)}
        title={mapFullscreen ? "Collapse map" : "Expand map"}
      >
        {mapFullscreen ? <FaCompress /> : <FaExpand />}
      </button>

      {/* Map */}
      <div ref={mapRef} className="mp-map" />

      {/* Tracking disabled overlay */}
      {!trackingEnabled && (
        <div className="mp-tracking-overlay">
          <div className="mp-tracking-msg">
            <FaMapMarkerAlt className="mp-tracking-icon" />
            <p className="mp-tracking-title">
              Ride Scheduled · {formatDate(ride.ride_date)}
            </p>
            <p className="mp-tracking-sub">
              Live tracking available 30 min before departure (
              {formatTime(ride.departure_time)})
            </p>
          </div>
        </div>
      )}

      {/* Driver Info Card (floating bottom) */}
      <div className="mp-driver-card">
        <img
          src={ride.driver_profile_picture}
          alt={ride.driver_name}
          className="mp-driver-avatar"
          onError={(e) => {
            e.target.src =
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(ride.driver_name) +
              "&background=1a56db&color=fff";
          }}
        />
        <div className="mp-driver-info">
          <p className="mp-driver-name">{ride.driver_name}</p>
          <p className="mp-driver-vehicle">
            <FaCar style={{ marginRight: 4 }} />
            {ride.brand} {ride.model} · {ride.registration_number}
          </p>
        </div>
        <div className="mp-eta">
          <span className="mp-eta-label">ETA</span>
          <span className="mp-eta-value">
            {formatTime(ride.estimated_reach_time)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
