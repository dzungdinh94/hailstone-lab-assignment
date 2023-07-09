import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Collapse, Table } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import GranularitySelect from './granularity-select';
import SwapEvent from './swap-event';
import { getSwapFees } from './swapfee-management.reducer';

export interface ISwapFeeManagementProps extends StateProps, DispatchProps, RouteComponentProps<any> {}

export const SwapFeeManagement = (props: ISwapFeeManagementProps) => {
  const { swapfees, loading } = useSelector((state: any) => state.swapfeeManagement);
  const [token, setToken] = useState('0x55d398326f99059fF775485246999027B3197955');
  const [granularity, setGranularity] = useState('last_15_minutes');
  const [selectedRow, setSelectedRow] = useState(null);

  const handleGranularityChange = newGranularity => {
    setGranularity(newGranularity);
  };

  const dispatch = useDispatch();

  const getSwapFeesFromProps = () => {
    dispatch(getSwapFees(granularity, token));
  };

  useEffect(() => {
    getSwapFeesFromProps();
  }, [token, granularity]);

  const handleSyncList = () => {
    getSwapFeesFromProps();
  };

  const handleRowClick = index => {
    if (index === selectedRow) {
      setSelectedRow(null);
      return;
    }
    setSelectedRow(index);
  };

  return (
    <div>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        SwapFees
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
        </div>
      </h2>
      <GranularitySelect onGranularityChange={handleGranularityChange} />

      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand">
              Number
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand">
              Fee
              <FontAwesomeIcon icon="sort" />
            </th>
          </tr>
        </thead>
        <tbody>
          {swapfees.map((item, i) => (
            <React.Fragment key={`fee-${i}`}>
              <tr id={i} onClick={() => handleRowClick(i)}>
                <td>{i + 1}</td>
                <td>{item.fees}</td>
              </tr>
              <Collapse isOpen={selectedRow === i}>
                <SwapEvent interval={item} />
              </Collapse>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  loading: storeState.swapfeeManagement.loading,
  swapfees: storeState.swapfeeManagement.swapfees,
});

const mapDispatchToProps = { getSwapFees };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SwapFeeManagement);
