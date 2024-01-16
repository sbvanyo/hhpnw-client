import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import OrderForm from '../../components/OrderForm';
// import OrderCard from '../../components/OrderCard';
import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { getSingleOrder, deleteOrder } from '../../utils/data/orderData';

const SingleOrderDetails = () => {
  const router = useRouter();
  // const { user } = useAuth();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    getSingleOrder(id).then(setOrderDetails);
  }, [id]);
  // console.warn(orderDetails);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const deleteThisOrder = () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id).then(() => router.push('/orders/orders'));
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
          {/* <div id="neighborhoodPlaygrounds">
            {neighborhoodPlaygrounds.map((playground) => (
              <PlaygroundCard key={playground.firebaseKey} playgroundObj={playground} onUpdate={getNeighborhoodPlaygrounds} />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SingleOrderDetails;
