
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavorites, ToggleProductToFavorites } from "../../redux/apiCalls/ProductApiCall";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {

  const [toggle, setToggle] = useState(false)
  const { allFavorites } = useSelector(state => state.auth)
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const toggleFavorites = (id) => {
    if (user) {
      dispatch(ToggleProductToFavorites(id))
      if (toggle) {
        setToggle(false)
      }
      else {
        setToggle(true)
      }
    }
    else {
      toast.error('please login to add products to favorites')
    }
  }
  useEffect(() => {
    if (user) {
      dispatch(getAllFavorites())
    }
    // eslint-disable-next-line
  }, [toggle]);
  return (
    <Link to={`/product-details/${product._id}`} className="product-item">
      <div className="product-view">
        <img className="product-image" src={product.image.url} alt="" />
        <div className="brand-and-faverIcon">
          <p className="brand">{product?.brand}</p>
          <Link onClick={() => { toggleFavorites(product?._id) }} className={allFavorites?.find(f => f.id === product._id) ? "added" : "product-faverIcon"}><i className="bi bi-suit-heart-fill"></i></Link>
        </div>
      </div>
      <div className="product-name-and-price">
        <p className="product-name">{product.title}</p>
        <div className="product-prices">  
        {product?.oldPrice !==0 && <p className="product-price oldPrice">${product.oldPrice}</p>}
        <p className="product-price">${product.newPrice}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;