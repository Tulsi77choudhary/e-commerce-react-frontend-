import {
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE
} from "./ActionType";

import { api, API_BASE_URL } from "../../config/apiConfig";

export const findProducts = (reqData) => async (dispatch) => {
  const reqData = {
    category: "",
    color: [],
    size: [],
    minPrice: 0,
    maxPrice: 1000000,
    minDiscount: 0,
    stock: "all",
    sort: "price_low",
    pageNumber: 0,
    pageSize: 10
  };
  dispatch({ type: FIND_PRODUCT_REQUEST });
  try {
    const { data } = await api.get("/api/product/products", { params: reqData });

    dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const { productId } = reqData;

  try {
    const { data } = await api.get(`api/product/products/id/${productId}`);
    console.log("api---", data);

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });

  try {
    
    const { data } = await api.post(`${API_BASE_URL}/api/admin/products`, product);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}/delete`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
    console.log("delete products ", data);

  }
  catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};