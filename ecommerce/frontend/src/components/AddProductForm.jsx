import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Confetti from "react-confetti";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import ConfirmationDialog from "./ConfirmationDialog";

const AddProductForm = () => {
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    quantity: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/seller", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProductId
        ? `http://localhost:5000/api/products/${editingProductId}`
        : "http://localhost:5000/api/products/add";
      const method = editingProductId ? "put" : "post";

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!editingProductId) triggerConfetti(); 
      fetchProducts();
      resetForm(); 
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };
  

  const triggerConfetti = () => {
    setShowConfetti(true); 

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id); 
    setFormData({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: product.quantity,
    });
  };

  const handleDelete = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${deleteProductId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchProducts();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const resetForm = () => {
    setEditingProductId(null); 
    setFormData({ name: "", price: "", imageUrl: "", quantity: "" }); 
  };

  return (
    <div className="flex h-screen">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <div className="w-1/3 p-4">
        <ProductForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={!!editingProductId}
          resetForm={resetForm}
        />
      </div>
      <div className="w-2/3 p-4 overflow-y-auto">
        <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        message="Are you sure you want to delete this product?"
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AddProductForm;
