import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../utils/data/orderData';
import { getMenuItems } from '../utils/data/orderItemData';

const initialState = {
  name: '',
  open: true,
  phone: '',
  email: '',
  type: '',
  id: null,
};

// initialOrder & user are props passed in from orders/[id].js
const OrderForm = ({ initialOrder, user }) => {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(initialState);
  const [menuItems, setMenuItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    getMenuItems().then(setMenuItems);

    if (initialOrder) {
      const formattedOrder = {
        ...initialOrder,
        type: initialOrder.type,
        id: initialOrder.id,
      };
      setCurrentOrder(formattedOrder);
    } else {
      setCurrentOrder(initialState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialOrder]);

  useEffect(() => {
    getMenuItems().then((items) => {
      setMenuItems(items);
      // Initialize item quantities from initialOrder
      const initialQuantities = items.reduce((acc, item) => {
        // eslint-disable-next-line react/prop-types
        const foundItem = initialOrder?.items?.find((orderItem) => orderItem.id === item.id);
        acc[item.id] = foundItem ? foundItem.quantity : 0;
        return acc;
      }, {});
      setItemQuantities(initialQuantities);
    });
  }, [initialOrder]);

  const handleQuantityChange = (itemId, quantity) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const handleChange = (e) => {
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

    // Convert item quantities to an array of items with their quantities
    const orderItems = Object.entries(itemQuantities).map(([itemId, quantity]) => ({
      itemId: parseInt(itemId, 10),
      quantity: parseInt(quantity, 10),
    })).filter((item) => item.quantity > 0);

    // Include orderItems in the order object
    const orderWithItems = {
      ...order,
      items: orderItems,
    };

    // Send POST request to your API
    if (currentOrder.id) {
      updateOrder(currentOrder.id, orderWithItems).then(() => router.push(`/orders/${currentOrder.id}`));
    } else {
      createOrder(orderWithItems).then(() => router.push('/orders/orders'));
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

        <Form.Check className="mb-3" id="form-menu" type="checkbox">
          {menuItems.map((menuItem) => (
            <section key={menuItem.id} className="menu-items">
              <div>Name: {menuItem.name}</div>
              <div>Price: ${menuItem.price}</div>
              <input
                type="number"
                min="0"
                value={itemQuantities[menuItem.id] || 0}
                onChange={(e) => handleQuantityChange(menuItem.id, e.target.value)}
              />
              {/* <Button onClick={() => createOrderItem(menuItem.id)}>Add Item</Button> */}
            </section>
          ))}
        </Form.Check>

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
  // eslint-disable-next-line react/require-default-props
  initialOrder: PropTypes.shape({
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number,
  }),
};

OrderForm.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  initialOrder: null,
};

export default OrderForm;
