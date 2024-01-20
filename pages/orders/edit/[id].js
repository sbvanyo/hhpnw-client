import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OrderForm from '../../../components/OrderForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleOrder } from '../../../utils/data/orderData';

const UpdateOrder = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const [updateOrder, setUpdateOrder] = useState();

  useEffect(() => {
    getSingleOrder(id).then(setUpdateOrder);
  }, [id]);

  return (
    <div>
      <h1>Update Order</h1>
      <OrderForm
        user={user}
        initialOrder={updateOrder}
      />
    </div>
  );
};

export default UpdateOrder;
