import React, { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import Select from 'react-select'
import { useSelector } from 'react-redux';
import { async } from "@firebase/util";
import { publicRequest } from '../redux/ApiRequest';
import { useLocation, useNavigate } from "react-router-dom";

const ReviewForm = () => {

    const {currentUser} = useSelector((state) => state.user);
    const id = useLocation().pathname.split("/reviews/")[1];
    const navigate = useNavigate();

    const options = [
        { value: '5', label: '5 Stars' },     
        { value: '4', label: '4 Star' },
        { value: '3', label: '3 Star' },
        { value: '2', label: '2 Star' },
        { value: '1', label: '1 Star' }
      ]
    const [rating,setRating] = useState();
    const [reviews, setReviews] = useState();

    const onRatingChange = (e) => {
        setRating(e.value);

      };

    const onSubmit = async(e) =>{
        try {
            let today = new Date()
            let date = parseInt(today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
            const review = {
                productId: id,
                firstName : currentUser.first_name,
                lastName : currentUser.last_name,
                userPic : currentUser.img_url,
                rating : rating,
                reviews : reviews,
                date : date
            }  
            console.log(review);  
            const response = await publicRequest.post('reviews/addReview',
            {
                review
              }
            );
            alert("Review added succesfully");
            //navigate("/");
            window.location.reload();
        } catch (err) {           
                console.log(err);
        }
    }
    return (
      <div className="form-container" style={{marginTop:"100px",marginBottom:"float"}}>
        <b>Enter your Ratings and Reviews here : <span className='tab' /></b>
        <br />
        <div style={{width: '300px'}}> 
         <Select options={options} styles={{width:"100px"}} 
            onChange={(e) => onRatingChange(e)} />
         </div>
        <br />
        <Form onSubmit={onSubmit}>
          <Input    
            className="reviews-form"
            type="text"
            placeholder="enter you reviews"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            style= {{width:"400px",height: "100px"}}
          />
        <br />
          <Button type="submit" style={{ background: "Green",alignContent:"center",justifyContent:"center",textAlign:"center",width :"20%",marginLeft:"75px"}}>
            Submit
          </Button>
        </Form>
      </div>
    );
}

export default ReviewForm