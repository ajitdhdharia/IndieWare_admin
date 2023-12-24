import React, { useState } from "react";

import "../../../styles/addProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState();
  // const [image, setImage] = useState();

  const CATEGORIES = [
    "Tops",
    "Bottoms",
    "Outerwear",
    "Sleepwear",
    "Activewear",
    "Dresses",
    "Suits",
  ];

  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };

  const handleFileSubmit = async (e) => {
    console.log("Clicked");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          category,
          price,
        }),
      });
      if (response.ok) {
        console.log("Product successfully sent to the backend");
      } else {
        console.log("Error in sending product to the backend");
      }
    } catch (error) {
      console.error("There was an error sending the product data:", error);
    }
  };

  return (
    <>
      <div id="add-product">
        <div className="container">
          <form onSubmit={handleFileSubmit}>
            <div className="row">
              <div className="col">
                <h3 className="title">Add Product</h3>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="product-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="product-description" className="form-label">
                  Product Description
                </label>
                <textarea
                  className="form-control"
                  id="product-description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="product-category" className="form-label">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                  id="product-category"
                >
                  <option defaultValue="Category">Category</option>
                  {CATEGORIES.map((item, index) => (
                    <option key={index} value={item.trim().toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col mb-3">
                <label htmlFor="product-price" className="form-label">
                  Enter Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="product-image" className="form-label">
                  Upload Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  // onChange={handleImageChange}
                />
              </div>
            </div>
            <div className="submit-btn text-center">
              <button className="btn btn-outline-primary" type="submit">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
