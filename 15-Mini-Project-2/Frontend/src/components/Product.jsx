import React from "react";

const Product = ({ products }) => {
  return (
    <div className="p-4">

      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
           

            <div className="mt-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {product.featured && (
                <span className="rounded-full bg-orange-500 px-2 py-1 text-xs text-white">
                  Featured
                </span>
              )}
            </div>

            <p className="mt-1 text-sm uppercase tracking-wide text-gray-500">
              {product.company}
            </p>

            {product.rating && (
              <div className="mt-2 text-sm text-yellow-500">
                {"★".repeat(product.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - product.rating)}
                </span>
              </div>
            )}

            <p className="mt-3 text-xl font-bold text-gray-900">
              ${product.price}
            </p>

            <button className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-white transition hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
