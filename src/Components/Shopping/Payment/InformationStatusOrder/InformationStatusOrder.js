import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function InformationStatusOrder({message}) {
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
      navigate("/")
    },5000)
  },[navigate]);

  return (
        <div className='information-status-order'>
            {message}
        </div>
  )
}
export default InformationStatusOrder;