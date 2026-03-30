import {
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
} from './ActionType';
import { api } from '../../config/apiConfig';


export const createPayment = (orderId) => async (dispatch) => {
  dispatch({ type: CREATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.post(`/api/payments/payment/${orderId}`, {});


    if (data.payment_link_url) {
      window.location.href = data.payment_link_url;
    }

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
  }
};


// State/Payment/Action.js
export const updatePayment = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    // Dhyaan dein: backend ke @RequestParam names 'payment_id' aur 'order_id' hain
    const { data } = await api.get(
      `/api/payments/redirect?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`
    );

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
    console.log("Order Placed Success:", data);
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.message,
    });
  }
};