import OrderForm from '../../components/OrderForm';
import { useAuth } from '../../utils/context/authContext';

const NewOrder = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Create New Order</h1>
      <OrderForm
        user={user}
      />
    </div>
  );
};

export default NewOrder;
