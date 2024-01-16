import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { getOrders } from '../../utils/data/orderData';

function OrderHome() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data));
  }, []);

  return (
    <article className="orders">
      <h1>Orders</h1>
      {orders.map((order) => (
        <section key={`order--${order.id}`} className="order-container">
          <OrderCard key={order.id} orderObj={order} />
        </section>
      ))}
    </article>
  );
}

export default OrderHome;
