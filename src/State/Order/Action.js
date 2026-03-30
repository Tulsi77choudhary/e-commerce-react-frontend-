import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const { data } = await api.post(
            `/api/orders/order`,
            reqData.address,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // FIX: Navigate using Query Params so OrderSummary can read it
        if (data?.id && reqData.navigate) {
            reqData.navigate({ search: `?step=3&order_id=${data.id}` });
        }

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.response?.data || error.message });
    }
};


export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const token = localStorage.getItem('token');
        const { data } = await api.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }
};