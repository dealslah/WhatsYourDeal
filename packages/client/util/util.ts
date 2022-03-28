import sampleDeals from "../entities/sampleDeals";

export function getDealIds() {
  return sampleDeals.map(deal => ({
    params: deal,
  }));
}

export function getDealData(id: string) {
  return sampleDeals.filter(deal => deal.id === id);
}

export function isBlank(str: string) {
  return (!str || /^\s*$/.test(str));
}

// https://www.geeksforgeeks.org/program-distance-two-points-earth/
export function distance(lat1: number, lat2: number, lon1: number, lon2: number) {
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956 for miles
  const r = 6371;
  return c * r;
}

export function formatDistance(lat1: number, lat2: number, lon1: number, lon2: number) {
  const d = distance(lat1, lat2, lon1, lon2) * 1000;
  if (d >= 1000) {
    return (d / 1000).toFixed(2) + "km";
  } else {
    return d.toFixed(2) + "m";
  }
}

