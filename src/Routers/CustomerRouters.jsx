import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "../customer/components/Navigation/Navigation";
import Footer from "../customer/components/Footer/Footer";
import HomePage from "../customer/pages/HomePage/HomePage";
import { Cart } from "../customer/components/Cart/Cart";
import Product from '../customer/components/Product/Product'
import ProductDetails from '../customer/components/ProductDetails/ProductDetails'
import Chackout from '../customer/components/Chackout/CheckOut'
import OrderSummary from '../customer/components/Chackout/OrderSummary'
import OrderDetails from '../customer/components/Order/OrderDetails'
import PaymentSuccess from "../customer/components/Payment/PaymentSuccess";
export const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/login' element={<HomePage />}></Route>
                <Route path='/register' element={<HomePage />}></Route>

                <Route path='/' element={<HomePage />}></Route>
                <Route path='/cart' element={<Cart />}></Route>
                <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product/>}></Route>
                <Route path='/product/:productId' element={<ProductDetails/>}></Route>
                <Route path='/checkout' element={<Chackout/>}></Route>
                <Route path="/checkout/:orderId" element={<OrderSummary />}></Route>
                <Route path='/account/order' element={<OrderDetails/>}></Route>
                <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />

                {/* <Order/> */}
                {/* <OrderDetails/>*/}
            </Routes>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default CustomerRouters