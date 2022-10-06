import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Languages } from '../../../Languages/Languages';

function OrderPrice(props) {

    const navigate = useNavigate();
    const onConfirmShopping = () => {
        navigate("/payment")
    }


    return (
        <div className='payment-summary'>
            <h2>{Languages[props.language].paymentSummary}</h2>
            <div className='payment-body'>
                <div className='payment-flex'>
                    <span>{Languages[props.language].subTotal}</span>
                    <span>${props.subtotal.toFixed(2)}</span>
                </div>

                <div className='payment-flex'>
                    <span>{Languages[props.language].cargoFee}</span>
                    <span>${props.cargoFee}</span>
                </div>

                <div className='payment-flex'>
                    <span>{Languages[props.language].total}</span>
                    <span>${(props.subtotal + props.cargoFee).toFixed(2)}</span>
                </div>

                {
                    props.status ? null : <div className='shopping-confirm'>
                        <button className='shopping-confirm-button' onClick={onConfirmShopping}>{Languages[props.language].confirmCart}</button>
                    </div>
                }
            </div>
        </div>
    )
}
export default OrderPrice;