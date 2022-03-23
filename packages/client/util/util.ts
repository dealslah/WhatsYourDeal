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
