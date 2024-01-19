import { clientCredentials } from '../client';

const getOrderItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrderItem = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderitems/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const addOrderItem = (orderId, itemId, quantity) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${orderId}/add_order_item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item: itemId, quantity }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderItem = (orderId, orderItemId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${orderId}/remove_order_item`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ order_item: orderItemId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Check if the response has content
      if (response.status !== 204) {
        return response.json();
      }
      return null; // If no content, return null
    })
    .then(resolve)
    .catch(reject);
});

const getMenuItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/items`, {})
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getOrderItems, getSingleOrderItem, addOrderItem, deleteOrderItem, getMenuItems,
};
