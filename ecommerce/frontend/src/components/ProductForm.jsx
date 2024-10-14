import React from "react";

const ProductForm = ({ formData, handleChange, handleSubmit, editing, resetForm }) => (
  <form onSubmit={handleSubmit} className="mb-4">
    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={formData.name}
      onChange={handleChange}
      required
      className="border p-2 rounded mr-2 w-96 mb-3"
    />
    <input
      type="number"
      name="price"
      placeholder="Price"
      value={formData.price}
      onChange={handleChange}
      required
      className="border p-2 rounded mr-2 w-96 mb-3"
    />
    <input
      type="text"
      name="imageUrl"
      placeholder="Image URL"
      value={formData.imageUrl}
      onChange={handleChange}
      required
      className="border p-2 rounded mr-2 w-96 mb-3"
    />
    <input
      type="number"
      name="quantity"
      placeholder="Quantity"
      value={formData.quantity}
      onChange={handleChange}
      required
      className="border p-2 rounded mr-2 w-96 mb-3"
    />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
      {editing ? "Save" : "Submit"}
    </button>
    {editing && (
      <button onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
        Cancel
      </button>
    )}
  </form>
);

export default ProductForm;
