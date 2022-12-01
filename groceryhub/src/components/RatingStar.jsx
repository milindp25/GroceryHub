import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';
  
export const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 40px;
`
export const Radio = styled.input`
   display: none;
`
export const Rating = styled.div`
   cursor: pointer;
`
const RatingStar = ({rating}) => {
  const [rate, setRate] = useState(rating);
  console.log("rating is "+ rate);
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "000"
                    : "rgb(192,192,192)"
                    
                }
                style={{height:"80px",width:"50px"}}
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
export default RatingStar;