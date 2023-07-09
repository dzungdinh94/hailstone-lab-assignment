import axios from 'axios';
import { ICrudGetAction } from 'react-jhipster';

import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
  FETCH_ROLES: 'swapfeeManagement/FETCH_ROLES',
  FETCH_SWAPFEES: 'swapfeeManagement/FETCH_SWAPFEES',
  FETCH_SWAPFEES_AS_ADMIN: 'swapfeeManagement/FETCH_SWAPFEES_AS_ADMIN',
  FETCH_SWAPFEE: 'swapfeeManagement/FETCH_SWAPFEE',
  CREATE_SWAPFEE: 'swapfeeManagement/CREATE_SWAPFEE',
  UPDATE_SWAPFEE: 'swapfeeManagement/UPDATE_SWAPFEE',
  DELETE_SWAPFEE: 'swapfeeManagement/DELETE_SWAPFEE',
  RESET: 'swapfeeManagement/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  swapfees: [] as ReadonlyArray<any>,
  authorities: [] as any[],
  swapfee: null,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

export type SwapFeeManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: SwapFeeManagementState = initialState, action): SwapFeeManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
      };
    case REQUEST(ACTION_TYPES.FETCH_SWAPFEES):
    case REQUEST(ACTION_TYPES.FETCH_SWAPFEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SWAPFEES):
    case FAILURE(ACTION_TYPES.FETCH_SWAPFEES_AS_ADMIN):
    case FAILURE(ACTION_TYPES.FETCH_SWAPFEE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SWAPFEES):
      return {
        ...state,
        loading: false,
        swapfees: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_SWAPFEE):
      return {
        ...state,
        loading: false,
        swapfee: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'http://localhost:8081/swap/fees';
// Actions
export const getSwapFees = (granularity, token) => {
  const requestUrl = `${apiUrl}/${granularity}?toToken=${token}`;
  return {
    type: ACTION_TYPES.FETCH_SWAPFEES,
    payload: axios.get<any>(requestUrl),
  };
};

export const getSwapFee: ICrudGetAction<any> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SWAPFEE,
    payload: axios.get<any>(requestUrl),
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
