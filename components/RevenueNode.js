import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const RevenueNode = ({ revenueObj }) => (
  <Card id="revenue-card">
    <Card.Header>Order #{revenueObj.order.id} - {revenueObj.order.type}</Card.Header>
    <Card.Body id="revenue-card-body">
      <Card.Title>{revenueObj.order.name}</Card.Title>
      <Card.Text>Date: {revenueObj.date}</Card.Text>
      <Card.Text>Payment Type: {revenueObj.payment}</Card.Text>
      <hr />
      <Card.Text>Subtotal: {revenueObj.subtotal}</Card.Text>
      <Card.Text>Tip: {revenueObj.tip}</Card.Text>
      <Card.Text>TOTAL: {revenueObj.total}</Card.Text>
      <Button
        id="btn-view-order"
        onClick={() => {
          Router.push(`/orders/${revenueObj.order.id}`);
        }}
      >
        View Order
      </Button>
    </Card.Body>
  </Card>
);

RevenueNode.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  revenueObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    subtotal: PropTypes.number.isRequired,
    tip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default RevenueNode;
