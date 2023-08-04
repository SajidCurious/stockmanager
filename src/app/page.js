"use client";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [productForm, setproductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);
  const [loadingaction, setLoadingaction] = useState(false);

  useEffect(() => {
    // Fetch products on load
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      console.log(rjson);
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const buttonAction = async (action, slug, initialQuantity) => {
    setLoadingaction(true);
    // console.log(action, slug);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let r = await response.json();
    console.log(r);
    setLoadingaction(false);
  };

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
        alert("Product added successfully");
        setproductForm({});
      } else {
        // Handle error case
        console.log("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setproductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);
    if (!loading) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      let rjson = await response.json();
      console.log(rjson);
      setDropdown(rjson.products);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="px-60">
        <div className="container bg-red-50 ">
          <h1 className="text-3xl font-bold mb-6">Search a Product</h1>
          <div className="flex mb-2">
            <input
              type="text"
              onChange={onDropdownEdit}
              // onBlur={() => {
              //   setDropdown([]);
              // }}
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
        {loading && (
          <div className="flex justify-center items-center">
            {" "}
            <img width={74} src="/loading.svg" alt="" />{" "}
          </div>
        )}
        <div className="bg-red-100 p-5 mb-10">
          {dropdown.map((item) => {
            return (
              <div key={item.slug} className="flex justify-around mb-10">
                <span className="slug">
                  {item.slug} ({item.quantity} available for {item.price})
                </span>
                <div className="space-x-8">
                  <button
                    onClick={() => {
                      buttonAction("minus", item.slug, item.quantity);
                    }}
                    disabled={loadingaction}
                    className="add text-white px-3 py-1 rounded-lg bg-blue-600 disabled:bg-blue-400 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="sub">{item.quantity}</span>
                  <button
                    onClick={() => {
                      buttonAction("plus", item.slug, item.quantity);
                    }}
                    disabled={loadingaction}
                    className="add text-white px-3 py-1 rounded-lg bg-blue-600 disabled:bg-blue-400 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
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
                value={productForm.slug || ""}
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
                value={productForm.quantity || ""}
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
                value={productForm.price || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2"
              />
            </div>
            <button
              onClick={addProduct}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
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
              {products?.map((product) => {
                {
                  console.log(product);
                }
                return (
                  <tr key={product.slug}>
                    <td className="border px-4 py-2">{product.slug}</td>
                    <td className="border px-4 py-2">{product.quantity}</td>
                    <td className="border px-4 py-2">₹{product.price}</td>
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
