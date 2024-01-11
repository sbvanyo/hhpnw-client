import { Button } from 'react-bootstrap';
import Router from 'next/router';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>HIP HOP, PIZZA, & WANGS</h1>
      <h4>Hi {user.fbUser.displayName}! </h4>
      <Button variant="primary" type="button" size="lg" className="copy-btn" onClick={() => Router.push('/orders/orders')}>
        View Orders
      </Button>
      <Button variant="success" type="button" size="lg" className="copy-btn" onClick={() => Router.push('/orders/new')}>
        Create Order
      </Button>
      <Button variant="warning" type="button" size="lg" className="copy-btn" onClick={() => Router.push('/revenue/revenue')}>
        View Revenue
      </Button>
    </div>
  );
}

export default Home;
