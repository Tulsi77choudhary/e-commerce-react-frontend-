import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ProductReviewCard } from './ProductReviewCard';
import { Box } from '@mui/material';
import HomeSectionCard from '../HomeSectionCarousel/HomeSectionCard';
import { useState } from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { mens_kurta } from '../../../Data/mens_kurta';
import { createRoutesFromChildren, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import { addItemToCart } from '../../../State/Cart/Action';

const products = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { id: 'white', name: 'White', classes: 'bg-white checked:outline-gray-400' },
    { id: 'gray', name: 'Gray', classes: 'bg-gray-200 checked:outline-gray-400' },
    { id: 'black', name: 'Black', classes: 'bg-gray-900 checked:outline-gray-900' },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};


const reviews = { href: '#', average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.product);
  console.log("product= ", product);

  const [selectedSize, setSelectedSize] = useState();

  const handleAddToCart = () => {
    const userId = localStorage.getItem("userId");
    const data = { productId: params.productId, size: selectedSize.name }
    console.log("Add to cart data:", data);
    dispatch(addItemToCart(data, userId))
    navigate("/cart")
  }

  useEffect(() => {
    dispatch(findProductsById({ productId: Number(params.productId) }))
  }, [params.productId, dispatch])


  return (
    <div className="bg-white lg:px-20 px-4">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product?.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product?.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Main section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] mt-4">

              <img
                alt={product?.imageUrl || "Placeholder"}
                src={product?.imageUrl || "/placeholder.png"}
              />


            </div>
            <div className="flex flex-wrap justify-center space-x-5">
              {products?.images?.map((item) => (
                <div key={item.src}
                  className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg max-w-[5rem] max-h-[4rem] mt-4 cursor-pointer hover:opacity-80"
                >
                  <img

                    alt={item.alt}
                    src={item.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                {product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                {product?.title}
              </h1>
            </div>

            {/* Price */}
            <div className="mt-6 flex space-x-5 items-center text-lg lg:text-xl font-semibold text-gray-900">
              <p>{product?.discountedPrice}</p>
              <p className="text-gray-400 line-through">{product?.price}</p>
              <p className="text-green-600 text-sm lg:text-base">{product?.discountedPresent}</p>
            </div>

            {/* Reviews */}
            <div className="mt-6 flex items-center space-x-3">
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
              <p className="opacity-50 text-sm">9374 Ratings</p>
              <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                3747 Reviews
              </p>
            </div>

            {/* Sizes */}
            <form className="mt-10">
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {products?.sizes.map((size) => (
                      <label
                        key={size.name}
                        aria-label={size.name}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size.name}
                          disabled={!size.inStock}
                          onChange={() => setSelectedSize({ name: size.name })}
                          checked={selectedSize?.name === size.name} // controlled component
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />

                        <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="contained"
                sx={{ py: '0.5rem', bgcolor: '#9155fd', mt: '1rem' }}
              >
                ADD TO CART
              </Button>
            </form>

            {/* Description */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
                <ul
                  role="list"
                  className="list-disc space-y-2 pl-4 text-sm mt-4"
                >
                  {products?.highlights?.map((highlight) => (
                    <li key={highlight} className="text-gray-600">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{products?.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review & Rating */}
        <section className="px-4 pt-12 pb-20 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-gray-100 pb-6 mb-10">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Recent Reviews & Ratings</h1>
            <p className="text-indigo-600 font-bold text-sm cursor-pointer hover:underline">Rate this product</p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <Grid container spacing={10}>
              {/* Left Column: Individual Reviews */}
              <Grid item xs={12} md={7}>
                <div className="space-y-8 divide-y divide-gray-50">
                  {[1, 2, 3].map((idx) => (
                    <div key={idx} className={idx !== 1 ? "pt-8" : ""}>
                      <ProductReviewCard />
                    </div>
                  ))}
                </div>
              </Grid>

              {/* Right Column: Analytics & Summary */}
              <Grid item xs={12} md={5}>
                <div className="sticky top-24 bg-gray-50/50 p-8 rounded-2xl border border-gray-50">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Product Performance</h2>

                  {/* Overall Score */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-2xl font-black shadow-lg shadow-indigo-200">
                      4.5
                    </div>
                    <div>
                      <Rating value={4.5} precision={0.5} readOnly size="small" />
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">374,934 Verified Ratings</p>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    {[
                      { label: 'Excellent', value: 80, color: '#22c55e' },
                      { label: 'Good', value: 60, color: '#84cc16' },
                      { label: 'Average', value: 40, color: '#f59e0b' },
                      { label: 'Poor', value: 20, color: '#ef4444' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{item.label}</span>
                          <span className="text-xs font-mono font-bold text-gray-400">{item.value}%</span>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={item.value}
                          sx={{
                            bgcolor: "#ececec",
                            borderRadius: 5,
                            height: 6,
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: item.color,
                              borderRadius: 5
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-10 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300">
                    Write a Review
                  </button>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* similar products */}

        <section className='pt-10'>
          <h1 className='py-5 text-xl font-bold'>Similar Products</h1>

          <div className='flex flex-wrap space-y-5'>
            {mens_kurta.map((item) => (
              <HomeSectionCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

