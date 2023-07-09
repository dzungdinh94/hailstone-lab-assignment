import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import { SwapFeeManagement } from './modules/swapfee/swapfee-management';

const Routes = () => {
  return (
    <div className="view-routes">
      <Switch>
        <ErrorBoundaryRoute path="/" component={SwapFeeManagement} />
      </Switch>
    </div>
  );
};

export default Routes;
