import { Deal } from "./deal";

const sampleDeals: Deal[] = [{
  id: 0,
  storeName: "Shake Shack",
  dealDescription: "test",
  image: "https://www.shakeshack.com.sg/wp-content/uploads/2020/09/burger.png",
  currentPrice: 10.00,
  originalPrice: 15.00,
}, {
  id: 1,
  storeName: "FairPrice",
  dealDescription: "test2",
  image: "https://unscrambled.sg/wp-content/uploads/2021/06/NTUC-FairPrice.jpg",
  currentPrice: 20.00,
  originalPrice: 40.00,
}, {
  id: 2,
  storeName: "Universal Studios Singapore",
  dealDescription: "test3",
  image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1534,h_1080,f_auto/activities/vdlx8icvd14wrnagddhl/UniversalStudiosSingaporeTickets-Klook.jpg",
  currentPrice: 80.00,
  originalPrice: 100.00,
}, {
  id: 3,
  storeName: "Sushiro",
  dealDescription: "test4",
  image: "https://www.akindo-sushiro.co.jp/en/img/top/store_ph01_02_sp.jpg",
  currentPrice: 20.00,
}];

export default sampleDeals;
