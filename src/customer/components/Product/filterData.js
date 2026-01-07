
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'yello', label: 'Yello', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },

  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'in-stock', label: 'In Stock', checked: true },
      { value: 'out-of-stock', label: 'Out of Stock', checked: false },
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

export default filters;