import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const OrderCard = ({ orderObj }) => (
  <Card id="order-card">
    <Card.Header>Order #{orderObj.id} - {orderObj.open ? 'Open' : 'Closed'}</Card.Header>
    <Card.Body id="order-card-body">
      <Card.Title>{orderObj.name}</Card.Title>
      <Card.Text>Phone: {orderObj.phone}</Card.Text>
      <Card.Text>Email: {orderObj.email}</Card.Text>
      <Button
        id="btn-view-order"
        onClick={() => {
          Router.push(`/orders/${orderObj.id}`);
        }}
      >
        View Order
      </Button>
    </Card.Body>
    <Card.Footer className="text-muted">Order Type: {orderObj.type}</Card.Footer>
  </Card>
);

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
