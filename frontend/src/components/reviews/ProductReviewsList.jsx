
import React from "react";
import ReviewItem from "./ProductReviewItem";
import './Reviews.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <i
      className={`bi bi-arrow-right-circle-fill next-icon`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <i
      className={`bi bi-arrow-left-circle-fill prev-icon`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const ReviewsList = ({ allReviews }) => {


  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (

    <div className="comments-list">

      {allReviews?.length > 0 ? allReviews?.length >= 4 ? allReviews && <Slider className="slider" {...settings}>
        {allReviews?.map((item) => {
          return <ReviewItem key={item?._id} review={item} reviewUser={item?.user} />
        })}
      </Slider> :
        <>
          {allReviews?.map((item) => {
            return <ReviewItem key={item?._id} review={item} reviewUser={item?.user} />
          })}
        </>
        : <h3>Not found reviews</h3>
      }


    </div>
  );
}

export default ReviewsList;