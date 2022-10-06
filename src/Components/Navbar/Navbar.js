import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguage, selectOrderList, selectTheme } from '../../store/selectors';
import { setLanguage, setTheme } from '../../store/actions';
import { Languages } from '../../Languages/Languages';

function Navbar(props) {

    const[theme, setTheme] = useState(props.theme);

    const onChangeLanguage = (language) => {
        props.setLanguage(language)
    }

    const onChangeTheme = async () => {
       await props.setTheme(!theme)
       setTheme(!theme)
    }

    return (
        <div className='navbar'>

            <h1 data-testid = "navbar-brand">
                <Link to="/" >
                    ECommerce
                </Link>
            </h1>
            
            <div className='right-part'>

                <div className='toggle'>
                    <input type="checkbox" id="switch" onChange={onChangeTheme} checked={props.theme} />
                    <label htmlFor="switch">Toggle</label>
                </div>

                <div>
                    <Link to="/shopping-summary" className="my-basket" >
                        <i className='fas fa-shopping-cart' />
                        <div className='my-basket-product-count'>{props.orderList.length}</div>
                    </Link>
                </div>

                <div data-testid = "language">
                    {
                        props.language === "en" ? <p onClick={() => onChangeLanguage("tr")} data-testid="language-tr">
                            TR
                        </p>
                            :
                            <p onClick={() => onChangeLanguage("en")} data-testid="language-en">
                                EN
                            </p>
                    }
                </div>
                <div data-testid = "logout">
                    <Link to={"/login"} >
                        {Languages[props.language].logOut}
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({
            setLanguage,
            setTheme
        }, dispatch)
    )
);

const mapStateToProps = createStructuredSelector({
    orderList: selectOrderList(),
    language: selectLanguage(),
    theme: selectTheme()
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);