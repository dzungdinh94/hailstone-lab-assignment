import { combineReducers } from 'redux';

import swapfeeManagement, { SwapFeeManagementState } from '../../modules/swapfee/swapfee-management.reducer';

export interface IRootState {
  readonly swapfeeManagement: SwapFeeManagementState;
}

const rootReducer = combineReducers<IRootState>({
  swapfeeManagement,
});

export default rootReducer;
