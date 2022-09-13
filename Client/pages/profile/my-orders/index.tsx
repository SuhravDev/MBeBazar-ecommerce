/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import withAuth from '../../../components/Common/PrivateRoute/WithAuth';
import Layout from '../../../components/Layout/Layout';
import MyOrders from '../../../components/Profile/MyOrders/MyOrders';
import ProfileLayout from '../../../components/Profile/ProfileLayout';

function index() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await fetch(`${process.env.BASE_URL}/users/orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        setOrders(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getOrderData();
  }, []);
  return (
    <Layout>
      <ProfileLayout>
        <MyOrders orders={orders} />
      </ProfileLayout>
    </Layout>
  );
}

export default withAuth(index);
