import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
import { deleteOrderItem } from '../../utils/data/orderItemData';

const SingleOrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);
  console.warn(orderDetails);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const deleteThisOrder = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id).then(() => router.push('/orders/orders'));
    }
  };

  const removeItem = (orderItemId, itemName) => {
    if (window.confirm(`Remove ${itemName}?`)) {
      deleteOrderItem(orderDetails.id, orderItemId).then(() => {
        // Refresh the order details or update state to reflect the deletion
        getSingleOrder(id).then(setOrderDetails);
      });
    }
  };

  return (
    <>
      <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>Order #{orderDetails.id} - {orderDetails.open ? 'OPEN' : 'CLOSED'} </h1>
      <div id="full-order">
        <div id="customer-details">
          <h2>Order Name: {orderDetails.name}</h2>
          <h3>Customer Phone: {orderDetails.phone}</h3>
          <h3>Customer Email: {orderDetails.email}</h3>
          <Button onClick={() => router.push(`/orders/edit/${orderDetails.id}`)}>Edit Order</Button>
          <Button onClick={deleteThisOrder}>Delete Order</Button>
        </div>

        <hr />

        <div>
          <h3 style={{ padding: 20 }}>Items in this Order:</h3>
          <div id="order-items-container">
            {orderDetails.items.map((orderItem) => (
              <section key={orderItem.id} className="order-items">
                <div>Name: {orderItem.item.name}</div>
                <div>Price: ${orderItem.item.price}</div>
                <Button onClick={() => removeItem(orderItem.id, orderItem.item.name)}>Remove Item</Button>
              </section>
            ))}
          </div>
        </div>

      </div>
    </>
  );
};

export default SingleOrderDetails;
