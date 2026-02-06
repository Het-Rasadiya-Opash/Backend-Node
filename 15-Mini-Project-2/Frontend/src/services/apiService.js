import axios from "axios";

export const getAllProduct = async ({
  page = 1,
  limit = 15,
  search = "",
  company = "",
  featured = "",
  sort = "",
} = {}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (search) params.append("name", search);
  if (company) params.append("company", company);
  if (featured) params.append("featured", featured);
  if (sort) params.append("sort", sort);

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/products?${params.toString()}`,
  );
  return res.data;
};
