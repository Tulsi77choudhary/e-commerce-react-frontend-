import { 
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE
    
 } from "./Action";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};
export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case GET_ORDERS_SUCCESS:
            return { 
                error: null,
                loading: false, 
                orders: action.payload 
            };
        case GET_ORDERS_FAILURE:
            return { ...state, 
                loading: false, 
                orders: [], 
                error: action.payload 
            };
        case CONFIRMED_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case CONFIRMED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order   
                ),
            };
        case CONFIRMED_ORDER_FAILURE:
            return { 
                ...state,
                loading: false, 
                error: action.payload 
            };
        case DELIVERED_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
            };
        case DELIVERED_ORDER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case PLACED_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case PLACED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
            };  
        case PLACED_ORDER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };

        case CANCELLED_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };

        case CANCELLED_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,

                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
            };

        case CANCELLED_ORDER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case DELETE_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter(order => order._id !== action.payload._id),
            };
        case DELETE_ORDER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case SHIP_ORDER_REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: null 
            };
        case SHIP_ORDER_SUCCESS:    
            
            return {
                ...state,
                loading: false,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? action.payload : order
                ),
            };
        case SHIP_ORDER_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            }; 
        default:
            return state;
    }   
};