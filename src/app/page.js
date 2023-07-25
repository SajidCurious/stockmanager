"use client";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [productForm, setproductForm] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully
        console.log("Your Product has been added!");
      } else {
        // Handle error case
        console.error("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <section className="px-60">
        <div className="container bg-red-50 ">
          <h1 className="text-3xl font-bold mb-6">Search a Product</h1>
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="Enter a Product Name"
              className="flex-1 border border-gray-30"
            />
            <select className="border border-gray-300 px-4 py-2 rounded-r-md">
              <option value="">All</option>
              <option value="">Category 1</option>
              <option value="">Category 2</option>
            </select>
          </div>
        </div>

        {/* Display current Stock */}
        <div className="container bg-red-50 mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add a Product</h1>

          <form>
            <div className="mb-4">
              <label htmlFor="productName" className="block mb-2">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                name="slug"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>
            <button
              onClick={addProduct}
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
            >
              Add Product
            </button>
          </form>
        </div>
        <div className="container my-8 mx-auto bg-red-50">
          <h1 className="text-3xl font-semibold mb-6">Display Current Stock</h1>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr key={item.slug}>
                    <td className="border px-4 py-2">{item.slug}</td>
                    <td className="border px-4 py-2">{item.quantity}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
