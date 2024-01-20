import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getSingleOrder, updateOrder } from '../utils/data/orderData';

const initialState = {
  payment: '',
  tip: 0,
  open: true,
};

const CloseOrderForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formInput, setFormInput] = useState(initialState);
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    if (id) {
      getSingleOrder(id).then(setOrderDetails).catch(console.error);
    }
  }, [id]);

  console.warn(orderDetails);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const floatTip = parseFloat(formInput.tip) || 0;

    const closedOrder = {
      ...orderDetails,
      open: false,
      payment: formInput.payment,
      tip: floatTip,
    };

    console.warn(closedOrder);

    updateOrder(orderDetails.id, closedOrder)
      .then(() => {
        window.confirm('Order Confirmed');
        router.push('/orders/orders');
      })
      .catch((error) => {
        console.error('Error updating order:', error);
      });
  };

  // Calculate subtotal
  const calcSubtotal = () => orderDetails.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Calculate grand total
  const calcGrandTotal = () => {
    const subtotal = calcSubtotal();
    const tip = parseFloat(formInput.tip) || 0; // Convert tip to number and handle NaN
    return subtotal + tip;
  };

  return (
    <>
      <h3>Order #{orderDetails.id} - {orderDetails.name}</h3>
      <hr />
      <div id="order-items-container">
        {orderDetails.items.map((orderItem) => (
          <section key={orderItem.order_item_id} className="order-items">
            <div className="order-item-name">{orderItem.name}</div>
            <div>${orderItem.price}</div>
            <div>Quantity: {orderItem.quantity}</div>
          </section>
        ))}
      </div>

      <hr />

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Payment Type</Form.Label>
          <Form.Select
            name="payment"
            value={formInput.payment}
            required
            onChange={handleChange}
          >
            <option value="">Select Payment Type</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
            <option value="mobile">Mobile</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tip Amount</Form.Label>
          <Form.Control
            name="tip"
            required
            value={formInput.tip}
            onChange={handleChange}
          />
        </Form.Group>

        <div>
          {/* toFixed() method formats numbers as currency with desired number of decimal places in the parentheses */}
          <h5>Subtotal: ${calcSubtotal().toFixed(2)}</h5>
          <h5>GRAND TOTAL: ${calcGrandTotal().toFixed(2)}</h5>
        </div>

        <Button variant="primary" type="submit">
          Close Order
        </Button>
      </Form>
    </>
  );
};

export default CloseOrderForm;
