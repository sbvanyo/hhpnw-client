import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../utils/data/orderData';

const initialState = {
  name: '',
  open: true,
  phone: '',
  email: '',
  type: '',
};

// initialOrder & user are props passed in from orders/[id].js
const OrderForm = ({ initialOrder, user }) => {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(initialState);

  useEffect(() => {
    // console.warn(initialGame);
    // console.warn(currentGame);
    // TODO: Get the game types, then set the state
    // getGameTypes().then(setGameTypes);

    if (initialOrder) {
      const formattedOrder = {
        ...initialOrder,
        type: initialOrder.type,
      };
      setCurrentOrder(formattedOrder);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOrder]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      name: currentOrder.name,
      open: currentOrder.open,
      phone: currentOrder.phone,
      email: currentOrder.email,
      type: currentOrder.type,
      user: user.uid,
    };

    // Send POST request to your API
    if (initialOrder) {
      updateOrder(currentOrder.id, order).then(() => router.push(`/orders/${currentOrder.id}`));
    } else {
      createOrder(order).then(() => router.push('/orders/orders'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Order Name</Form.Label>
          <Form.Control
            name="name"
            required
            value={currentOrder.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Customer Phone</Form.Label>
          <Form.Control
            name="phone"
            required
            value={currentOrder.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            name="email"
            required
            value={currentOrder.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Control
            name="skillLevel"
            required
            value={Number(currentGame.skillLevel)}
            onChange={handleChange}
          />
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Order Type</Form.Label>
          <Form.Select
            name="type"
            value={currentOrder.type}
            required
            onChange={handleChange}
          >
            <option value="">Select Order Type</option>
            <option value="phone">phone</option>
            <option value="in-person">in-person</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

OrderForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  initialOrder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

// GameForm.defaultProps = {
//   initialGame: initialState,
// };

export default OrderForm;
