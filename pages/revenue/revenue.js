import React, { useEffect, useState } from 'react';
import RevenueNode from '../../components/RevenueNode';
// eslint-disable-next-line import/no-unresolved
import RevenueTable from '../../components/revenueTable';
import { getRevenue } from '../../utils/data/revenueData';

function RevenueHome() {
  const [revenueNodes, setRevenueNodes] = useState([]);

  useEffect(() => {
    getRevenue()
      .then(setRevenueNodes)
      .catch(console.error);
  }, []);

  const aggregateData = revenueNodes.reduce(
    (acc, node) => {
      acc.subtotal += parseFloat(node.subtotal);
      acc.tip += parseFloat(node.tip);
      acc.total += parseFloat(node.total);
      return acc;
    },
    { subtotal: 0.0, tip: 0.0, total: 0.0 },
  );

  return (
    <>
      <h1>Revenue</h1>
      <RevenueTable revenueObj={aggregateData} /> {/* Master Revenue Table */}
      {revenueNodes.map((revenue) => (
        <section id="revenue-container" key={`revenue--${revenue.id}`}>
          <RevenueNode key={revenue.id} revenueObj={revenue} />
        </section>
      ))}
    </>
  );
}

export default RevenueHome;
