import { Deal } from "./deal";

const sampleDeals: Deal[] = [{
  id: "0",
  merchantOutlet: {
    id: "0",
    merchant: {
      name: "Shake Shack",
      category: ["test"],
    },
    address: "123 Test Drive",
    imageUrl: "https://www.shakeshack.com.sg/wp-content/uploads/2020/09/burger.png",
    location: {
      latitude: 1.3052980098208944,
      longitude: 103.8307333347115,
    }
  },
  originalPrice: 15.00,
  currentPrice: 10.00,
  dealDescription: "Shake Shack is an American fast casual restaurant chain based in New York City. It started out as a hot dog cart inside Madison Square Park in 2001, and its popularity steadily grew. In 2004, it moved to a stand within the park, expanding its menu from New York–style hotdogs to one with hamburgers, hotdogs, fries and its namesake milkshakes.\n" +
    "\n" +
    "Since its founding, it has been one of the fastest-growing food chains, eventually becoming a public company filing for an initial public offering of stock in late 2014. The offering priced on January 29, 2015; the initial price of its shares was at $21, immediately rising by 123% to $47 on their first day of trading.\n" +
    "\n" +
    "Shake Shack Inc. owns and operates over 250 locations globally.",
  promotionStartDate: 12345,
  promotionEndDate: 12345,
  createdAt: 12345,
  updatedAt: 12345,
}, {
  id: "1",
  merchantOutlet: {
    id: "1",
    merchant: {
      name: "FairPrice",
      category: ["test2"],
    },
    address: "234234 Test Drive",
    imageUrl: "https://unscrambled.sg/wp-content/uploads/2021/06/NTUC-FairPrice.jpg",
    location: {
      latitude: 1.3094857476463422,
      longitude: 103.79272060663412,
    }
  },
  originalPrice: 40.00,
  currentPrice: 20.00,
  dealDescription: "NTUC FairPrice was first established on 22 July 1973 as NTUC Welcome Supermarket in Toa Payoh, to solve the rising oil and daily prices then due to inflation. Then prime minister Lee Kuan Yew opened the first supermarket at Block 192, Toa Payoh Lorong 4, and it was the first of its kind. Around the same time, other unions such as the Singapore Industrial Labour Organisation and Pioneer Industries Employees Union also set up co-operatives to run supermarkets. The two organisations later merged in the early 1980s to form the Singapore Employees Co-operative (SEC).\n" +
    "\n" +
    "In May 1983, due to competition, NTUC Welcome and SEC merged to form a larger co-operative which was known as NTUC FairPrice Co-Operative Limited.\n" +
    "\n" +
    "The company started a central-distribution system to change the way goods were delivered to stores, to enhance efficiency. This was owned by another company, but in 1998, FairPrice took full ownership of the warehouse and distribution company. It was renamed Grocery Logistics of Singapore (GLS). On 21 January 2003, FairPrice opened a new 13,000-square-metre Fresh Food Distribution Centre. The refrigerated-distribution facility centralises the distributions of fresh and chilled products to all the outlets in the chain. It is the first supermarket retailer in Singapore to build, own and operate its own fresh-food distribution centre.\n" +
    "An Esso petrol station run by NTUC FairPrice. It is operated by the company with a FairPrice Xpress store, the station was the first to be converted to the new format.",
  promotionStartDate: 12345,
  promotionEndDate: 12345,
  createdAt: 12345,
  updatedAt: 12345,
}, {
  id: "2",
  merchantOutlet: {
    id: "2",
    merchant: {
      name: "Universal Studios Singapore",
      category: ["test3"],
    },
    address: "345634563456 Test Drive",
    imageUrl: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1534,h_1080,f_auto/activities/vdlx8icvd14wrnagddhl/UniversalStudiosSingaporeTickets-Klook.jpg",
    location: {
      latitude: 1.254061015214947,
      longitude: 103.8238040894322,
    }
  },
  originalPrice: 100.00,
  currentPrice: 80.00,
  dealDescription: "test3",
  promotionStartDate: 12345,
  promotionEndDate: 12345,
  createdAt: 12345,
  updatedAt: 12345,
}, {
  id: "3",
  merchantOutlet: {
    id: "3",
    merchant: {
      name: "Sushiro",
      category: ["test5"],
    },
    address: "sdfgsdfgsdfg Test Drive",
    imageUrl: "https://www.akindo-sushiro.co.jp/en/img/top/store_ph01_02_sp.jpg",
    location: {
      latitude: 1.2865249868798516,
      longitude: 103.82667735743114,
    }
  },
  originalPrice: 200.00,
  currentPrice: 20.00,
  dealDescription: "test4",
  promotionStartDate: 12345,
  promotionEndDate: 12345,
  createdAt: 12345,
  updatedAt: 12345,
}];

export default sampleDeals;
