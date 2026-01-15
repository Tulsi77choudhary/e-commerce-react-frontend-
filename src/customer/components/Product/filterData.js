
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'yello', label: 'Yello' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'S', label: 'S' },
      { value: 'M', label: 'M' },
      { value: 'L', label: 'L' },

    ],
  },


  {
    id: 'discount',
    name: 'Discount',
    options: [
      { value: '10', label: '10% or more', checked: false },
      { value: '20', label: '20% or more', checked: false },
      { value: '30', label: '30% or more', checked: false },
      { value: '50', label: '50% or more', checked: false },
    ],
  },
];

export const singleFilter = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-199", label: "Under ₹199" },
      { value: "200-399", label: "₹200 to ₹399" },
      { value: "400-599", label: "₹400 to ₹599" },
      { value: "600-799", label: "₹600 to ₹799" },
      { value: "800-999", label: "₹800 to ₹999" },
      { value: "1000-1499", label: "₹1000 to ₹1499" },
      { value: "1500-1999", label: "₹1500 to ₹1999" },
      { value: "2000+", label: "Above ₹2000" }
    ]
  },
  { 
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "0-10", label: "Up to 10% off" },
      { value: "11-20", label: "11% to 20% off" },
      { value: "21-30", label: "21% to 30% off" },
      { value: "31-40", label: "31% to 40% off" },
      { value: "41-50", label: "41% to 50% off" },
      { value: "51-60", label: "51% to 60% off" },
      { value: "61-70", label: "61% to 70% off" },
      { value: "71-100", label: "Above 70% off" }
    ]
  }
]

export default filters;