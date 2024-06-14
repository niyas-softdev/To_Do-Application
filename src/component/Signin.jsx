import React, { useState, useEffect } from 'react';
import "./Signin.css";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase';

function Signin() {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        setRedirect(true);
      })
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          console.log("The popup was closed by the user before completing the sign-in.");
          alert("You closed the sign-in popup. Please try again and complete the sign-in process.");
        } else {
          console.error("An error occurred during sign-in:", error);
          alert("An error occurred during sign-in. Please try again later.");
        }
      });
  };

  useEffect(() => {
    if (redirect) {
      navigate("/home");
    }
  }, [redirect, navigate]);

  return (
    <div className='signcontent'>
      <div className='signdiv'>
        <h1>Sign-In</h1>
        <img src="/assests/taskimg.png" width='400px' alt="" />
        <button onClick={handleClick}>
          <img src="/assests/google.png" alt="" className='google' />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Signin;
