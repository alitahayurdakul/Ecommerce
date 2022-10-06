import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Navbar from '../Navbar/Navbar';
import { addOrderToList } from '../../store/actions';
import { Helmet } from 'react-helmet';

function ProductDetail(props) {
    const [productDetail, setProductDetail] = useState([]);
    const { productId } = useParams();
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            await axios.get(`https://fakestoreapi.com/products/${productId}`)
                .then(response => {
                    setProductDetail(response.data);
                    setStatus(true)
                })
                .catch(() => {
                    // something wrong...
                })
        }
        getProduct()
    }, [productId]);

    const onAddOrderToList = async () => {
        await props.addOrderToList(productDetail)
    }

    return (
        <>
            <Navbar />
            {
                status ?
                    <div className='product-detail'>
                        <Helmet >
                            <title>
                                {props.language === "en" ? "Product Detail | ECommerce" : "Ürün Detayı | ECommerce"}
                            </title>
                        </Helmet>

                        <div className='product-detail-img-part'>
                            <img src={productDetail.image} alt={productDetail.image} />
                        </div>
                        <div className='product-detail-information-part'>
                            <h3>
                                {productDetail.title}
                            </h3>
                            <p className='description-part'>
                                {productDetail.description}
                            </p>

                            <p className='product-detail-footer'>
                                <span>$ {productDetail.price}</span>
                                <i className="fas fa-shopping-bag" onClick={onAddOrderToList} />
                            </p>
                        </div>
                    </div> : <><Helmet >
                            <title>
                                {props.language === "en" ? "Product isn't Found | ECommerce" : "Ürün Bulunamadı | ECommerce"}
                            </title>
                        </Helmet></>
            }

        </>
    )
};

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({
            addOrderToList
        }, dispatch)
    )
);

export default connect(null, mapDispatchToProps)(ProductDetail);