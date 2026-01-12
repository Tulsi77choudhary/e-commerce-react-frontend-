import { deleteProduct } from "./Action";
import {
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_FAILURE,
  FIND_PRODUCT_REQUEST,
  FIND_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  pageInfo: null,
  
};

const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCT_REQUEST:
      
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload.content,
        pageInfo: {
          totalPages: action.payload.totalPages,
          totalElements: action.payload.totalElements,
          currentPage: action.payload.number
        }
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload.content
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    case FIND_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FIND_PRODUCT_BY_ID_FAILURE:
     return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default customerProductReducer;
