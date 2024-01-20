import CloseOrderForm from '../../components/CloseOrderForm';
import { useAuth } from '../../utils/context/authContext';

const Checkout = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Checkout</h1>
      <CloseOrderForm
        user={user}
      />
    </div>
  );
};

export default Checkout;
