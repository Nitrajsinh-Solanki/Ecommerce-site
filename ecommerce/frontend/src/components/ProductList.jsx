import React from "react";

const ProductList = ({ products, handleEdit, handleDelete }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <div key={product._id} className="bg-gray-200 shadow-md rounded-lg p-4">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-contain mb-2" />
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-1">${product.price}</p>
        <p className="text-gray-600 mb-1">Quantity: {product.quantity}</p>
        <button
          onClick={() => handleEdit(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);

export default ProductList;
