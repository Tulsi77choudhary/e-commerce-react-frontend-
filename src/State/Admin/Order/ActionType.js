import { api } from "../../../config/apiConfig";
 
export const getOrders = (reqData) => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
    try {
        const { data } = await api.get("/api/admin/orders", { params: reqData });
        dispatch({ type: GET_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }   
};


export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/confirm/${orderId}`);
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
    }
};

export const deliverOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELIVERED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/deliver/${orderId}`);
        dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
};

export const placeOrder = (orderId) => async (dispatch) => {
    dispatch({ type: PLACED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/place/${orderId}`);
        dispatch({ type: PLACED_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PLACED_ORDER_FAILURE, payload: error.message });
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELLED_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/cancel/${orderId}`);
        dispatch({ type: CANCELLED_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: CANCELLED_ORDER_FAILURE, payload: error.message });
    }   
};
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        const { data } = await api.delete(`/api/admin/orders/${orderId}`);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
};
export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/api/admin/orders/ship/${orderId}`);
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
    }
};
