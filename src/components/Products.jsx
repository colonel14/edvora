import { useRef, useState } from "react";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Card from "./Card";
const Products = ({ productTitle, products }) => {
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(true);
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 300;
    console.log(scrollRef.current.scrollLeft);
    console.log("left");
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 300;
    console.log(scrollRef.current.scrollLeft);

    console.log("right");
  };
  const checkScroll = () => {
    if (scrollRef.current.scrollLeft === 0) {
      setLeftArrow(false);
    } else {
      setLeftArrow(true);
    }

    if (scrollRef.current.scrollLeft === `-100%`) {
      setRightArrow(false);
    }
  };
  return (
    <div className="app__product">
      <h1 className="app__products-title">{productTitle}</h1>
      <div className="app__products-content">
        <div
          className="app__products-container"
          ref={scrollRef}
          onScroll={() => {
            checkScroll();
          }}
        >
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
        <div className="app__products-arrows">
          {leftArrow && (
            <BsChevronCompactLeft
              color="#fff"
              fontSize={40}
              onClick={() => scrollLeft()}
              className="product__arrow-icon"
            />
          )}
          {rightArrow && (
            <BsChevronCompactRight
              color="#fff"
              fontSize={40}
              onClick={() => scrollRight()}
              className="product__arrow-icon"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
