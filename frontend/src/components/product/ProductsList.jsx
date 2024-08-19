

import React from "react";
import './Product.css'

import ProductItem from "./ProductItem";

const ProductsList = ({products}) => {
  return (
    <div className="products-list">
    
      {products?.map((item) => {
        return <ProductItem key={item?._id} product={item}/>
      })}

    </div>
  );
}

export default ProductsList;