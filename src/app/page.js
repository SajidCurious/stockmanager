import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container bg-red-50 mx-auto">
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
              className="w-full border border-gray-300 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md font-semibold"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
