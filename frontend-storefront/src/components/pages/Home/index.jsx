import axios from "../../../ultils/axios";
import ProductList from "components/common/ProductList";
import { API_PRODUCT } from "constants/api";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_PRODUCT}`).then((res) => {
      if (res.status == 200) {
        setProducts(res?.data?.data?.results);
      }
      console.log(res);
    });
  }, []);

  console.log(products);

  return (
    <div className="container mx-auto">
      <ProductList products={products} />
    </div>
  );
};

export default Home;
