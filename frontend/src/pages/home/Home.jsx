
import React from "react";
import './Home.css'
import ProductsList from "../../components/product/ProductsList";
import ReviewsList from '../../components/reviews/WebReviewsList'
import { Link } from "react-router-dom";
import AddReview from '../../modals/Review/AddReviewOfWeb'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getRecentAddProducts } from "../../redux/apiCalls/ProductApiCall";
import { getAllReviewsOfWeb } from "../../redux/apiCalls/ReviewsOfWebApiCall";


const Home = () => {

  const dispatch = useDispatch()
  const { recentAdded } = useSelector(state => state.products)
  const [addReviewModal, setAddReviewModal] = useState(false);
  const { allReviews } = useSelector(state => state.reviewsOfWeb)

  useEffect(() => {
    dispatch(getRecentAddProducts())
    dispatch(getAllReviewsOfWeb())
    // eslint-disable-next-line
  }, [allReviews]);

  return (

    <section className="home">

      <div className="advertisement-Sale">
        <img className="advertisement-image" src="https://i.pinimg.com/originals/ec/5d/c2/ec5dc25ac9d7f51f1cca65c4c10d69ce.jpg" alt="" />
        <div className="advertisement-info">
          <h1 className="summer-sale">Summer Sale</h1>
          <h1 className="up-to">Up To</h1>
          <h1 className="number-sale">50% OFF</h1>
          <Link className="sale-shopNow-link">Shop now</Link>
        </div>
      </div>

      <div className="today-best-deals">
        <h1 className="best-deals-title">Recently added</h1>
        <ProductsList products={recentAdded} />
      </div>


      <div className="ecoActive">

        <div className="ecoActive-info">
          <div>
            <h1>EcoActive</h1>
            <p>For an active, earth-conscious lifestyle</p>
          </div>
          <Link className="shopNow-link">Shop now</Link>
        </div>

        <img className="ecoActive-image" src="https://cdn.shopify.com/s/files/1/0584/5047/7239/products/zsunglasses1_720x.jpg?v=1630527162" alt="" />

      </div>


      <div className="reviews">
        <h1 className="reviews-title">The reviews are in!</h1>
        <ReviewsList allReviews={allReviews} />
        <div className="add-review">
          <button onClick={() => { setAddReviewModal(true) }} className="add-review-btn">Click to add reviews</button>
        </div>
      </div>

      {addReviewModal ? <AddReview setAddReviewModal={setAddReviewModal} /> : null}

    </section>

  );
}

export default Home;