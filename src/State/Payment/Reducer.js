import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_REQUEST,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
} from './ActionType';

const initialState = {
  loading: false,
  payment: null,
  error: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {

    // CREATE PAYMENT
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        payment: null,
      };

    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
        error: null,
      };

    case CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        payment: null,
        error: action.payload,
      };

    // UPDATE PAYMENT
    case UPDATE_PAYMENT_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null,
        updateSuccess: false,
      };

    case UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: null,
      };

    case UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: action.payload,
      };

    default:
      return state;
  }
};
