import React, { useEffect, useState } from "react";
import Product from "./components/Product";
import { getAllProduct } from "./services/apiService";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [featured, setFeatured] = useState("");
  const [sort, setSort] = useState("");
  const [totalFetchProducts, setTotalFetchProducts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProduct({
        page,
        limit,
        search,
        company,
        featured,
        sort,
      });
      setProducts(res.products);
      setTotalFetchProducts(res.numOfProducts);
    };
    fetchData();
  }, [page, limit, search, company, featured, sort]);

  const handleReset = () => {
    setSearch("");
    setCompany("");
    setFeatured("");
    setSort("");
    setPage(1);
  };

  const totalPages = Math.ceil(totalFetchProducts / limit);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Search & Filter</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="block text-sm font-medium">Search Product</label>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name..."
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Company</label>
            <select
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                setPage(1);
              }}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">All Companies</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="dell">Dell</option>
              <option value="mi">Mi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Featured</label>
            <select
              value={featured}
              onChange={(e) => {
                setFeatured(e.target.value);
                setPage(1);
              }}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">All Products</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Sort By</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="">Default</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A-Z</option>
              <option value="-name">Name: Z-A</option>
              <option value="rating">Rating: Low to High</option>
              <option value="-rating">Rating: High to Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Per Page</label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value={5}>5 items</option>
              <option value={10}>10 items</option>
              <option value={15}>15 items</option>
              <option value={20}>20 items</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      <Product products={products} />

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:bg-gray-400 hover:bg-blue-700"
          >
            ← Previous
          </button>

          <span className="text-lg font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded bg-blue-600 px-6 py-2 text-white disabled:bg-gray-400 hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-600">
        Showing {(page - 1) * limit + 1} to{" "}
        {Math.min(page * limit, totalFetchProducts)} of {totalFetchProducts}{" "}
        products
      </div>
    </div>
  );
};

export default App;
