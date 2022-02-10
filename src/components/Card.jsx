const Card = ({ product }) => {
  return (
    <div className="product__card">
      <div className="product__card-wrapper">
        <div className="product__card-wrapper_img">
          <img src={product.image} alt="product img" />
        </div>
        <div className="product__card-wrapper_info">
          <h1>{product.product_name}</h1>
          <p>{product.brand_name}</p>
          <span>${product.price}</span>
        </div>
      </div>
      <div className="product__card-address">
        <p>
          <span className="product__card-label">Location: </span>
          <span className="product__card-data">
            {product.address.state} / {product.address.city}
          </span>
        </p>
        <p>
          <span className="product__card-label">Date: </span>
          <span className="product__card-data">
            {new Date(product.date).toLocaleDateString()}
          </span>
        </p>
      </div>
      <p className="product__card-desc">{`${product.discription}`}</p>
    </div>
  );
};

export default Card;
