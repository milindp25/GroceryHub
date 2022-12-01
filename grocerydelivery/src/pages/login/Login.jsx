import "./login.css";

import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/reduxUser";
import { useState } from "react";
import { publicRequest } from "../../ApiRequest";

const Login = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("login/checkUser", { userName : username, password });
      if(res.data.user_category != 'Delivery'){
        alert("You are not authorized to view this page");
        dispatch(loginFailure());
      }
      else
      dispatch(loginSuccess(res.data));
    } catch (err) {
      alert("Invalid Username/Password");
      dispatch(loginFailure());

    }
  };
  //const {currentUser, isFetching, error } = useSelector((state) => state.user);
  return (
    <MDBContainer className="p-3 my-5 h-custom" style={{marginTop:"200px !important"}}>
      <h3 style={{textAlign:"center",justifyContent:"center",fontWeight:"bold"}}>Delivery Partner Login</h3>
      <br />
      <br />
  <MDBRow>
  <MDBCol>
  <img src="data:image/jpeg;base64,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" 
  className="img-fluid" alt="Sample image" style={{width : "280px"}}/>
</MDBCol>
<MDBCol >

    {/* <div className="d-flex flex-row">

      <p className="lead fw-normal mb-0 me-3">Sign in with</p>

      <MDBBtn floating size='md' tag='a' className='me-2'>
        <MDBIcon fab icon='facebook-f' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='google' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='linkedin-in' />
      </MDBBtn>

    </div>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">Or</p>
    </div> */}

    <MDBInput wrapperClass='mb-4' label='User Name' id='formControlLg' type='text' size="lg" onChange={(e) => setUsername(e.target.value)}/>
    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)}/>

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <a href="!#">Forgot password?</a>
    </div>

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={handleClick}>Login</MDBBtn>
      <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
    </div>

  </MDBCol>
</MDBRow>

    </MDBContainer>
  )
} 

export default Login