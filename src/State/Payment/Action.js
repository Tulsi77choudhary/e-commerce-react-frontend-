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


export const updatePayment = (paymentId, paymentStatus) => async (dispatch) => {
  dispatch({ type: UPDATE_PAYMENT_REQUEST });
  try {
    const { data } = await api.put(`/api/payments/update/${paymentId}`, {
      status: paymentStatus,
    });

    dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PAYMENT_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};
