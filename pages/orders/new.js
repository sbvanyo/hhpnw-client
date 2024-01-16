import OrderForm from '../../components/OrderForm';
import { useAuth } from '../../utils/context/authContext';

const NewGame = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create New Order</h2>
      <OrderForm
        user={user}
      />
    </div>
  );
};

export default NewGame;
