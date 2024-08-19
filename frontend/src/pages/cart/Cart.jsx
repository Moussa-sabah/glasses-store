


import React, { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { addMoreOfProductToCart, deleteProductFromCart, getProductsOfCart, reduceProductFromCart, ToggleProductToCart } from '../../redux/apiCalls/ProductApiCall';

export default function Cart() {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.auth)
  const { userCart } = useSelector(state => state.auth)


  useEffect(() => {
    if (user) {
      dispatch(getProductsOfCart())
    }
    // eslint-disable-next-line
  }, [cart, userCart]);
  return (
    <div className='cart-page'>

      <div className='cart-page-all-components'>

        <h1 className='page-title'>
          My Cart
        </h1>

        {user ? <><div className='cart-titles'>
          <p>product</p>
          <p>title</p>
          <p>brand</p>
          <p>price</p>
          <p>count</p>
          <p>delete</p>
        </div>

          <div className='all-cart-products'>
            {cart?.map((product) => {
              return <div key={product._id} className='cart-product'>
                <img src={product?.image?.url} alt="" />
                <p>{product?.title}</p>
                <p>{product?.brand}</p>
                <p>${product?.newPrice}</p>
                <p className='cart-count'>
                  <i onClick={() => { dispatch(reduceProductFromCart(product?._id)) }} className="bi bi-dash-circle"></i>
                  {userCart?.filter(p => p?._id === product?._id).length}
                  <i onClick={() => { dispatch(addMoreOfProductToCart(product?._id)) }} className="bi bi-plus-circle"></i>
                </p>
                <p onClick={() => { dispatch(deleteProductFromCart(product?._id)) }}> <i className="bi bi-x delete-icon"></i></p>
              </div>

            })}  </div></> : <h3>please login first</h3>}


      </div>
    </div>
  )
}
