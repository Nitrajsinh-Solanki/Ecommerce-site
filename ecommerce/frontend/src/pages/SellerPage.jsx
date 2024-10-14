import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import AddProductForm from '../components/AddProductForm';
import Navbar from '../components/Navbar'; 

const SellerPage = () => {
  const { user } = useSelector((state) => state.user); // Get the user data from Redux

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex justify-between items-center mt-3 px-4">
        <h1 className="text-3xl font-bold mb-6 mx-auto">Seller Dashboard</h1> {/* Centered title */}
        {user && user.role === 'Seller' && ( // Check if the user is a seller
          <h2 className="text-xl font-semibold bg-red-300 p-3 rounded-lg ">{user.name} page</h2> // Display the seller's name
        )}
      </div>
      <AddProductForm />
    </div>
  );
};

export default SellerPage;
