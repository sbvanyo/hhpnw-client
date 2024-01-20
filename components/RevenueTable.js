// import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';

const RevenueTable = ({ revenueObj }) => (
  <Table className="table">
    <tbody>
      <tr>
        <th scope="row">Subtotal Revenue</th>
        <td>${revenueObj.subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <th scope="row">Tip Revenue</th>
        <td>${revenueObj.tip.toFixed(2)}</td>
      </tr>
      <tr>
        <th scope="row">Total Revenue</th>
        <td>${revenueObj.total.toFixed(2)}</td>
      </tr>
    </tbody>
  </Table>
);

RevenueTable.propTypes = {
  revenueObj: PropTypes.shape({
    subtotal: PropTypes.number.isRequired,
    tip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default RevenueTable;
