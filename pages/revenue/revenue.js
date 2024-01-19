import React, { useEffect, useState } from 'react';
import RevenueNode from '../../components/RevenueNode';
// import { getOrders } from '../../utils/data/orderData';
import { getRevenue } from '../../utils/data/revenueData';
import { Table } from 'react-bootstrap';

function RevenueHome() {
  const [revenueNodes, setRevenueNodes] = useState([]);

  useEffect(() => {
    getRevenue()
      .then(setRevenueNodes)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Revenue</h1>
      {revenueNodes.map((revenue) => (
        <section key={`revenue--${revenue.id}`} className="revenue-container">
          <RevenueNode key={revenue.id} revenueObj={revenue} orderObj={revenue.order} />
        </section>
      ))}
    </div>
  );
}

export default RevenueHome;
