import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';
import { deleteOrderItem, addOrderItem, getMenuItems } from '../../utils/data/orderItemData';

const SingleOrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const handleOpenModal = () => {
    getMenuItems().then(setMenuItems);
    setShowModal(true);
  };

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const deleteThisOrder = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id).then(() => router.push('/orders/orders'));
    }
  };

  const createOrderItem = (itemId) => {
    const defaultQuantity = 1;
    addOrderItem(orderDetails.id, itemId, defaultQuantity).then(() => window.confirm('Item sucessfully added to order')).then(() => {
      getSingleOrder(id).then(setOrderDetails);
    });
  };

  const removeItem = (orderItemId, itemName) => {
    if (window.confirm(`Remove ${itemName}?`)) {
      deleteOrderItem(orderDetails.id, orderItemId).then(() => {
        // Refresh the order details to reflect the deletion
        getSingleOrder(id).then(setOrderDetails);
      });
    }
  };

  return (
    <>
      <h1 className="detailsTitle" style={{ textAlign: 'center', fontSize: 70, color: 'black' }}>Order #{orderDetails.id} - {orderDetails.open ? 'OPEN' : 'CLOSED'} </h1>
      <div id="full-order">
        <div id="customer-details">
          <h2 className="order-item-name">Order Name: {orderDetails.name}</h2>
          <h3>Customer Phone: {orderDetails.phone}</h3>
          <h3>Customer Email: {orderDetails.email}</h3>
          <h3>Order Type: {orderDetails.type}</h3>
          <div className="btn-holder">
            {
              orderDetails.open
              && <Button onClick={() => router.push(`/orders/edit/${orderDetails.id}`)}>Edit Order</Button>
            }
            <Button onClick={deleteThisOrder}>Delete Order</Button>
          </div>
        </div>

        <hr />

        <div>
          <div id="order-items-container">
            <h3 style={{ padding: 20 }}>Items in this Order:</h3>
            {
              orderDetails.open
              && <Button onClick={handleOpenModal}>Add Item</Button>
            }
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Add an Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {menuItems.map((menuItem) => (
                  <section key={menuItem.id} className="menu-items">
                    <div className="order-item-name">{menuItem.name}</div>
                    <div>${menuItem.price}</div>
                    <Button onClick={() => createOrderItem(menuItem.id)}>Add Item</Button>
                  </section>
                ))}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div id="order-items-container">
            {orderDetails.items.map((orderItem) => (
              <section key={orderItem.order_item_id} className="order-items">
                <div className="order-item-name">{orderItem.name}</div>
                <div>${orderItem.price}</div>
                <div>Quantity: {orderItem.quantity}</div>
                {
                  orderDetails.open
                  && <Button onClick={() => removeItem(orderItem.order_item_id, orderItem.name)}>Remove Item</Button>
                }
              </section>
            ))}
          </div>
        </div>

      </div>
      <div className="btn-holder">
        {
          orderDetails.open
          && <Button onClick={() => router.push(`/orders/checkout?id=${orderDetails.id}`)}>Continue to Checkout</Button>
        }
      </div>
    </>
  );
};

export default SingleOrderDetails;
