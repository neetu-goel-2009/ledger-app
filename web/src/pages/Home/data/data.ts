function createData(
  contract: string,
  doctype: number | string,
  prodline: number | string,
  pricing: number | string,
  startdate: number | string,
  enddate: number | string,
  performance: number | string
) {
  return {
    contract,
    doctype,
    prodline,
    pricing,
    startdate,
    enddate,
    performance,
  };
}

const columns = [
  createData(
    "Contract",
    "Document Type",
    "Product Line",
    "Pricing Increase",
    "Start Date",
    "End Date",
    "Performance Type"
  ),
];
const rows = [
  createData(
    "Contract 1",
    "Pricing Letter",
    "Joint Reconstruction, Hips, Knees, Shoulders, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Access Contracts"
  ),
  createData(
    "Contract 2",
    "Product Agreement",
    "Joint Reconstruction, Hips, Knees",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Performance"
  ),
  createData(
    "Contract 3",
    "Pricing Letter",
    "Joint Reconstruction, Hips, Knees, Shoulders",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Access Contracts"
  ),
  createData(
    "Contract 4",
    "Consignment",
    "Joint Reconstruction, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Access Contracts"
  ),
  createData(
    "Contract 5",
    "Pricing Letter",
    "Joint Reconstruction, Hips, Knees, Shoulders, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Performance"
  ),
  createData(
    "Contract 6",
    "Pricing Letter",
    "Joint Reconstruction, Hips, Knees, Shoulders, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Access Contracts"
  ),
  createData(
    "Contract 7",
    "Product Agreement",
    "Joint Reconstruction, Hips, Knees, Shoulders, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Performance"
  ),
  createData(
    "Contract 8",
    "Pricing Letter",
    "Joint Reconstruction, Hips, Knees, Shoulders, Bone Cement",
    "No",
    "01/01/2023",
    "12/31/2024",
    "Access Contracts"
  ),
];

const data = {
  hometiles: [
    {
      name: "Gulab",
      rating: 0.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 1.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Punjabi Angithi Pitampura",
      rating: 2.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 3.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
    {
      name: "Gulab",
      rating: 4.3,
      duration: "30-35 min",
      title: "Flat 125",
      subTitle: "Flat 125",
      img: "./assets/images/food1.png",
    },
  ],
  whatsInMind: [
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
    { title: "Ice Cream", img: "./assets/images/food2.png" },
  ],
  restaurants: [
    {
      name: "Chinese & Grill's",
      cuisine: "INDIAN / CHINESE / MOGLAI / TANDOORI",
      rating: "4.3",
      duration: "60 Min",
      priceUnit: "400 for Two",
    },
    {
      name: "Chinese & Grill's",
      cuisine: "INDIAN / CHINESE / MOGLAI / TANDOORI",
      rating: "4.3",
      duration: "60 Min",
      priceUnit: "400 for Two",
    },
    {
      name: "Chinese & Grill's",
      cuisine: "INDIAN / CHINESE / MOGLAI / TANDOORI",
      rating: "4.3",
      duration: "60 Min",
      priceUnit: "400 for Two",
    },
  ],
  barchart: [
    { name: "Component", uv: 10 },
    { name: "Master Agreement", uv: 1 },
    { name: "Pricing Letter", uv: 23 },
    { name: "Product Agreement", uv: 15 },
  ],
  piechart: [
    {
      name: "Average Nonstandard Clauses",
      value: 23,
      color: "#000",
    },
    {
      name: "Average Standard Clauses",
      value: 26,
      color: "#EB1700",
    },
  ],
  tableData: { columns, rows },
  tilelarge: [
    {
      title: "Commonly Added Sections",
      tblHead: ["Section Title", "Frequency"],
      tblData: [
        ["Taxes", "90%"],
        ["Other Purchases", "90%"],
        ["Non-Exclusivity/No Minimum", "90%"],
        ["EDI Data", "90%"],
        ["Reporting", "90%"],
      ],
    },
    {
      title: "Commonly Modified Sections",
      tblHead: ["Section Title", "Frequency"],
      tblData: [
        ["Product Agreements", "90%"],
        ["Participant Eligibility", "90%"],
        ["Adding or Removing Participants", "90%"],
      ],
    },
    {
      title: "Commonly Removed Sections",
      tblHead: ["Section Title", "Frequency"],
      tblData: [
        ["Purchase Orders", "90%"],
        ["Location and Product Identification", "90%"],
      ],
    },
  ],
};

export default data;
