import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserId, resetOrderList, setLanguage } from '../../store/actions';
import { createStructuredSelector } from 'reselect';
import { selectLanguage } from '../../store/selectors';
import { Languages } from '../../Languages/Languages';
import { Helmet } from 'react-helmet';

function Login(props) {
    let navigate = useNavigate();
    let userName = useRef();
    let password = useRef();
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(()=>{
        props.setUserId(null);
        props.resetOrderList([]);
    },[]);

    const onChangeLanguage = (language) => {
        props.setLanguage(language)
    }

    const onClickSignIn = async (e) => {
        e.preventDefault();
        await axios.get("https://fakestoreapi.com/users")
            .then((response) => {
                let existUser = response.data.filter(user => user.username === userName.current.value.trim() && user.password === password.current.value.trim());

                if(existUser.length !== 0) {
                    props.setUserId(existUser[0].id);
                    navigate("/");
                }
                setErrorMessage(true);
            })
            .catch(()=>{
                //...something
            });
    }

    return (
        <div className='login' >
            <Helmet>
                <title>
                    {props.language === "en" ? "LogIn | ECommerce":"Giriş | ECommerce"}
                </title>
            </Helmet>
            <form onSubmit={onClickSignIn} >
                <h1>{Languages[props.language].logIn}</h1>
                {
                    props.language === "en" ? <h3 onClick={() => onChangeLanguage("tr")}>TR</h3> :
                    <h3 onClick={() => onChangeLanguage("en")}>EN</h3>
                }

                

                <input type="text" ref={userName} name="firstname" placeholder={Languages[props.language].usernameInput} data-testid="username" required/>

                <input type="text" ref={password} name="lastname" placeholder={Languages[props.language].passwordInput} data-testid="password" required/>
                
                {
                    errorMessage ? <div className='errorMessage' data-testid = "errorMessage"> {Languages[props.language].logInErrorMessage}</div> : null
                }

                <button >{Languages[props.language].logIn}</button>

            </form>
        </div>
    )
};

const mapDispatchToProps = dispatch  => (
    (
        bindActionCreators({
            setUserId,resetOrderList, setLanguage
        },dispatch)
    )
);

const mapStateToProps = createStructuredSelector({
    language:selectLanguage()
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);