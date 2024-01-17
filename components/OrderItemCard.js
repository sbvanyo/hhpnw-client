/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { deleteOrderItem } from '../utils/data/orderItemData';

// eslint-disable-next-line no-unused-vars
function OrderItemCard({ orderItemObj, onUpdate }) {
  const removeItem = () => {
    if (window.confirm(`Remove ${orderItemObj.item.name}?`)) {
      deleteOrderItem(orderItemObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center order-item-card" style={{ width: '25rem', margin: '15px', padding: '10px' }}>
      <Card.Header>
        <h1>{orderItemObj.item.name}</h1>
      </Card.Header>
      <Card.Body>
        <div style={{ padding: '15px' }}>
          <h3>Price: ${orderItemObj.item.price}</h3>
        </div>
      </Card.Body>
      <div>
        <Button type="button" className="m-2" variant="danger" onClick={removeItem}>Remove</Button>
      </div>
    </Card>
  );
}

OrderItemCard.propTypes = {
  orderItemObj: PropTypes.shape({
    id: PropTypes.number,
    item: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderItemCard;
