// src/pages/Rides/find-ride/components/MobileFilterDrawer.jsx

import FilterPanel from "./FilterPanel";

export default function MobileFilterDrawer({
  open,
  setOpen,
  clearAll,
  ...filterProps
}) {
  if (!open) return null;

  return (
    <>
      <div
        className="ridetail-overlay"
        style={{ zIndex: 100 }}
        onClick={() => setOpen(false)}
      />
      <div className="ridetail-mobile-sidebar">
        <div className="ridetail-mobile-sidebar-head">
          <span className="ridetail-sidebar-title">Filters &amp; Sort</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button
              className="ridetail-clear-btn"
              onClick={() => { clearAll(); setOpen(false); }}
            >
              Clear all
            </button>
            <button
              className="ridetail-mobile-close"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>

        <FilterPanel mobile {...filterProps} />
      </div>
    </>
  );
}