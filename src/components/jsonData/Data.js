export const product2 = (type) => {
  switch (type) {
    case "Airtime":
      return [
        {
          firstProduct: "Airtel",
          airtimePrice: [
            { prices: "100 Naira" },
            { prices: "200 Naira" },
            { prices: "1000 Naira" },
          ],
        },
        {
          firstProduct: "Mtn",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Glo",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Etisalat",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
      ];
    case "Data":
      return [
        {
          firstProduct: "Airtel",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Mtn",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Glo",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Etisalat",
          airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
      ];
    case "Cable":
      return [
        {
          firstProduct: "Dstv",
          // airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Gotv",
          // airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
        {
          firstProduct: "Startimes",
          // airtimePrice: ["100 Naira", "200 Naira", "1000 Naira"],
        },
      ];
    case "Electric":
      return [
        {
          firstProduct: "Ikeja Electric",
        },
        {
          firstProduct: "Eko Electric",
        },
        {
          firstProduct: "Kaduna Electric",
        },
      ];
  }
};

export const product = (type) => {
  switch (type) {
    case "Airtel":
    case "Glo":
    case "Mtn":
    case "Etisalat":
      return [
        { price: "100 Naira" },
        { price: "200 Naira" },
        { price: "1000 Naira" },
      ];
  }
};
