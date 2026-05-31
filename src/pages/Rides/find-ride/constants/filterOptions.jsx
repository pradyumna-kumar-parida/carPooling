// src/pages/Rides/find-ride/constants/filterOptions.js

export const SORT_OPTIONS = [
  { id: "earliest", label: "Earliest departure" },
  { id: "lowest",   label: "Lowest price"       },
  { id: "shortest", label: "Shortest ride"       },
];

export const DEPART_SLOTS = [
  { id: "before6", label: "Before 06:00"   },
  { id: "6to12",   label: "06:00 - 12:00"  },
  { id: "12to18",  label: "12:01 - 18:00"  },
  { id: "after18", label: "After 18:00"    },
];

export const AMENITIES = [
  { id: "max_two_in_back", label: "Max. 2 in the back" },
  { id: "instant_booking", label: "Instant Booking"    },
  { id: "smoking_allowed", label: "Smoking allowed"    },
  { id: "pet_allowed",     label: "Pets allowed"       },
];

export const SLOT_MAP = {
  before6: "Before 06:00",
  "6to12": "06:00 - 12:00",
  "12to18": "12:01 - 18:00",
  after18: "After 18:00",
};

export const DEFAULT_AMENITY_CHECKS = {
  max_two_in_back: false,
  instant_booking: false,
  smoking_allowed: false,
  pet_allowed:     false,
};