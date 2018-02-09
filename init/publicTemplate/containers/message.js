import React, { Component } from 'react';
import { JcBreadCrumb } from 'jcloudecc/components';
import { PaymentSettlementGridWrap } from '../../configs/components-PaymentSettlement-PaymentSettlementGridWrap-PaymentSettlementGridWrap';

export default class PaymentSettlementGrid extends Component {
  constructor(props,context){
    super(props,context);
  }

  render() {
    const menus = [{
         url:"xxx",
         name:"商城管理"
    },{
         url:"",
         name:"支付结算方式设置"
    }];
    return (
      <div className="ui-container ui-platform">
        <div className="ui-breadcrumb">
          <JcBreadCrumb  menu={menus}  />
        </div>
        <div className="ui-ct">
          <div className="ui-hd">公司结算设置</div>
          <div className="ui-bd">
             <PaymentSettlementGridWrap />
          </div>
        </div>
      </div>
    );
  }
}
