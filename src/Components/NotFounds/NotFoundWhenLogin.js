import React, { useEffect } from 'react'

function NotFoundWhenLogin() {
    useEffect(()=>{
        setTimeout(()=>{
            window.location.replace("/")
        },1500)
    },[]);

  return (
    <p className='not-found'>
        NOT FOUND
    </p>
  )
};

export default NotFoundWhenLogin;