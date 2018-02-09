import React from 'react';
import {IndexRoute, Route} from 'react-router';
import * as configs from '../../configs/containers-PaymentSettlement-route';

export default (store) => {
   const {App,PaymentSettlementGrid} = configs;
  return (
    <Route>
      <Route path="pay-operating-view/paymentsettlement" component={App}>
        <Route path="route" component={route} menuUrl='/pay-operating-view/paymentsettlement/grid'/>
      </Route>
    </Route>
  );
};
