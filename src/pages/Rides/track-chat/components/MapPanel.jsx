import React, { useEffect, useRef } from "react";

const STATUS_CONFIG = {
  scheduled: { label: "Scheduled", dot: "#1a56db" },
  driver_on_way: { label: "Driver On The Way", dot: "#d97706" },
  arrived: { label: "Driver Arrived", dot: "#059669" },
  in_progress: { label: "In Progress", dot: "#7c3aed" },
  completed: { label: "Completed", dot: "#16a34a" },
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

  const status = STATUS_CONFIG[rideStatus] || STATUS_CONFIG.scheduled;

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

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

      const map = L.map(mapRef.current, { zoomControl: false }).setView(
        [(srcLat + dstLat) / 2, (srcLng + dstLng) / 2],
        13,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.control.zoom({ position: "topleft" }).addTo(map);

      const greenIcon = L.divIcon({
        className: "",
        html: `<div style="width:14px;height:14px;background:#16a34a;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const redIcon = L.divIcon({
        className: "",
        html: `<div style="width:16px;height:16px;background:#dc2626;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([srcLat, srcLng], { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<b>Pickup</b><br/>${ride.source_address}`)
        .openPopup();

      L.marker([dstLat, dstLng], { icon: redIcon })
        .addTo(map)
        .bindPopup(`<b>Drop</b><br/>${ride.destination_address}`);

      L.polyline(
        [
          [srcLat, srcLng],
          [dstLat, dstLng],
        ],
        { color: "#1a56db", weight: 4, opacity: 0.8, dashArray: "10,7" },
      ).addTo(map);

      map.fitBounds(
        [
          [srcLat, srcLng],
          [dstLat, dstLng],
        ],
        { padding: [60, 60] },
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

  useEffect(() => {
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 300);
  }, [mapFullscreen]);

  return (
    <div className="ms-container">
      {/* Status Badge */}
      <div className="ms-status-badge">
        <span className="ms-status-dot" style={{ background: status.dot }} />
        <span>{status.label}</span>
        <span className="ms-status-sep">·</span>
        <span className="ms-status-sub">
          Live tracking starts 30 min before departure
        </span>
      </div>

      {/* Fullscreen Toggle */}
      <button
        className="ms-expand-btn"
        onClick={() => setMapFullscreen((p) => !p)}
        title="Toggle fullscreen"
      >
        {mapFullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path
              d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
            <path
              d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Map */}
      <div ref={mapRef} className="ms-map" />

      {/* Tracking Disabled Overlay */}
      {!trackingEnabled && (
        <div className="ms-tracking-overlay">
          <div className="ms-tracking-msg">
            <div className="ms-tracking-icon">
              <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill="#dbeafe"
                  stroke="#1a56db"
                  strokeWidth="2"
                />
                <circle cx="12" cy="9" r="2.5" fill="#1a56db" />
              </svg>
            </div>
            <p className="ms-tracking-title">
              Ride Scheduled · {formatDate(ride.ride_date)}
            </p>
            <p className="ms-tracking-sub">
              Live tracking available 30 min before departure (
              {formatTime(ride.departure_time)})
            </p>
          </div>
        </div>
      )}

      {/* Floating Driver Card */}
      <div className="ms-driver-card">
        <img
          src={ride.driver_profile_picture}
          alt={ride.driver_name}
          className="ms-driver-avatar"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ride.driver_name)}&background=1a56db&color=fff`;
          }}
        />
        <div className="ms-driver-info">
          <p className="ms-driver-name">{ride.driver_name}</p>
          <p className="ms-driver-status">
            <span className="ms-online-dot" /> Online
          </p>
          <p className="ms-driver-vehicle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="12"
              height="12"
              style={{ marginRight: 4 }}
            >
              <path
                d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h13l4 4v4a2 2 0 01-2 2h-1"
                stroke="#64748b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="7.5"
                cy="17.5"
                r="2.5"
                stroke="#64748b"
                strokeWidth="2"
              />
              <circle
                cx="17.5"
                cy="17.5"
                r="2.5"
                stroke="#64748b"
                strokeWidth="2"
              />
            </svg>
            {ride.brand} {ride.model} · {ride.registration_number}
          </p>
        </div>
        <div className="ms-eta-block">
          <span className="ms-eta-label">ETA to pickup</span>
          <span className="ms-eta-value">10 min</span>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
