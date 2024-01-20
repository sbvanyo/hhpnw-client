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
      <Card.Text>Subtotal: ${revenueObj.subtotal}</Card.Text>
      <Card.Text>Tip: ${revenueObj.tip}</Card.Text>
      <Card.Text>TOTAL: ${revenueObj.total}</Card.Text>
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
  revenueObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    order: PropTypes.object.isRequired,
    date: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    subtotal: PropTypes.string.isRequired,
    tip: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
  }).isRequired,
};

export default RevenueNode;
