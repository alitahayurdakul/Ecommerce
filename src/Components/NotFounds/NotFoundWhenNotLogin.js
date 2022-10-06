import React, { useEffect } from 'react'

function NotFoundWhenNotLogin() {
    useEffect(()=>{
        setTimeout(()=>{
            window.location.replace("/login")
        },1500)
    },[]);

  return (
    <p className='not-found'>
        NOT FOUND
    </p>
  )
}
export default NotFoundWhenNotLogin;