import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import Products from "./Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsName, setProductsName] = useState([]);
  let [groupedProducts, setGroupedProducts] = useState();
  const [filtered, setFiltered] = useState([]);

  // Get all Data at the first load
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const group = filtered.reduce((acc, product) => {
      (acc[product.product_name] = acc[product.product_name] || []).push(
        product
      );
      return acc;
    }, {});
    setGroupedProducts(group);
  }, [filtered]);

  // Fetch data Function
  const fetchProducts = async () => {
    try {
      const result = await axios.get(`https://assessment-edvora.herokuapp.com`);
      setProducts(result.data);
      setFiltered(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app__home">
      <Filter
        products={products}
        filtered={filtered}
        setFiltered={setFiltered}
      />

      <div className="app__home-main">
        <h1 className="app__home-main_title">Edvora</h1>
        <h3 className="app__home-main_subtitle">Products</h3>
        <div className="app__home-main_products">
          {groupedProducts &&
            Object.keys(groupedProducts).map((product) => (
              <Products
                key={product}
                productTitle={product}
                products={groupedProducts[product]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
