import { useEffect, useState } from "react";

const Filter = ({ products, filtered, setFiltered }) => {
  const [productsName, setProductsName] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [productNameValue, setProductNameValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  useEffect(() => {
    // Get array of all Products name, Cities and States
    const productArr = [];
    const cityArr = [];
    const stateArr = [];
    products.map((product) => {
      productArr.push(product.product_name);
    });

    filtered.map((product) => {
      cityArr.push(product.address.city);
      stateArr.push(product.address.state);
    });
    // Get unique Producs name from productArr that include all Products from data
    const uniqueProducts = productArr.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    uniqueProducts.sort(); // Sort Products name
    setProductsName(uniqueProducts);

    // Get unique States from stateArr that include all States from data
    const uniqueState = stateArr.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    uniqueState.sort(); // Sort States
    setState(uniqueState);

    // Get unique Cities from cityArr that include all Cities from data
    const uniqueCity = cityArr.filter((item, index, self) => {
      return self.indexOf(item) === index;
    });
    uniqueCity.sort(); // Sort Cities
    setCity(uniqueCity);
  }, [products, filtered]);

  //Filter by Product name
  const handleSelectProductName = (e) => {
    setProductNameValue(e.target.value);
    filterProduct(e.target.value);
  };

  const handleSelectState = (e) => {
    setStateValue(e.target.value);
    filterState(e.target.value);
  };

  const handleSelectCity = (e) => {
    setCityValue(e.target.value);
    filterCity(e.target.value);
  };
  const filterProduct = (value) => {
    if (value === "All" || value === "") {
      setFiltered(products);
      return;
    }
    const filteredProduct = products.filter((item) => {
      return item.product_name.includes(value);
    });

    setFiltered(filteredProduct);
  };
  //Filter by State
  const filterState = (value) => {
    if (value === "All" || value === "") {
      setFiltered(
        products.filter((item) => {
          return item.product_name.includes(productNameValue);
        })
      );
      return;
    }
    const filteredProduct = filtered.filter((item) => {
      return item.address.state.includes(value);
    });

    console.log(filteredProduct);
    setFiltered(filteredProduct);
  };
  //Filter by City
  const filterCity = (value) => {
    if (value === "All" || value === "") {
      setFiltered(
        products.filter((item) => {
          return item.address.state.includes(stateValue);
        })
      );
      return;
    }
    const filteredProduct = filtered.filter((item) => {
      return item.address.city.includes(value);
    });

    console.log(filteredProduct);
    setFiltered(filteredProduct);
  };
  return (
    <div className="app__filter">
      <h1 className="app__filter-title">Filters</h1>
      <div className="app__filter-select">
        <input
          list="products"
          placeholder="Products"
          value={productNameValue}
          onChange={handleSelectProductName}
        />
        <datalist id="products">
          <option value="All">All</option>
          {productsName &&
            productsName.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
        </datalist>
      </div>
      <div className="app__filter-select">
        <input list="state" placeholder="State" onChange={handleSelectState} />
        <datalist id="state">
          <option value="All">All</option>
          {state &&
            state.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
        </datalist>
      </div>
      <div className="app__filter-select">
        <input
          list="city"
          placeholder="City"
          onChange={(e) => filterCity(e.target.value)}
        />
        <datalist id="city">
          <option>All</option>
          {city &&
            city.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </datalist>
      </div>
    </div>
  );
};

export default Filter;
