import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar';
import FilterPart from './FilterPart/FilterPart';
import HomeBody from './HomeBody';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguage } from '../../store/selectors';

function Home(props) {

    const [productList, setProductList] = useState([]);

    const setList = (pList) => {
        setProductList(pList)
    };

    return (
        <>
            <Helmet>
                <title>
                    {props.language === "en" ? "Homepage | ECommerce" : "Ana sayfa | ECommerce"}
                </title>
            </Helmet>
            <Navbar />
            <div className='homepage'>
                <FilterPart setProductList={setList} />
                <HomeBody productList={productList} />
            </div>
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    language: selectLanguage()
});

export default connect(mapStateToProps)(Home);