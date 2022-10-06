import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguage, selectOrderList } from '../../store/selectors';
import Navbar from '../Navbar/Navbar';
import { removeOrderFromList, increaseOrderCount, decreaseOrderCount } from '../../store/actions';
import OrderPrice from './OrderPrice/OrderPrice';
import { Languages } from '../../Languages/Languages';
import { Helmet } from 'react-helmet';

class Shopping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderList: props.orderList,

        }
    }

    onDeleteOrder = async (productId) => {
        await this.props.removeOrderFromList(productId);

        this.setState({
            orderList: this.state.orderList.filter(item => item.order.id !== productId)
        });
    };

    onClickIncreaseCount = async (productId) => {
        await this.props.increaseOrderCount(productId)
    }

    onClickDecreaseCount = async (productId, productCount) => {
        if (productCount - 1 === 0) {
            this.props.removeOrderFromList(productId)
            this.setState({
                orderList: this.state.orderList.filter(item => item.order.id !== productId)
            });
        }

        if (productCount - 1 !== 0) {
            this.props.decreaseOrderCount(productId);
        }
    }

    cartTotal = () => {
        let total = 0;
        if (this.props.orderList.length === 0)
            return 0;

        this.props.orderList.forEach(item => {
            total += (item.count * +(item.order.price))
        });

        return total;
    }

    render() {
        const { language } = this.props;
        return (
            <>


                <Navbar />

                <div className='bag-part'>{
                    this.state.orderList.length !== 0 ? <>
                        <Helmet >
                            <title>
                                {language === "en" ? "Shopping Summary | ECommerce" : "Alışveriş Özeti | ECommerce"}
                            </title>
                        </Helmet>
                        <div className='order-list'>
                            <h2>{Languages[language].shoppingSummary}</h2>
                            {
                                this.state.orderList.map(product => {
                                    const { id, image, title, price } = product.order;
                                    return (
                                        <React.Fragment key={product.id}>
                                            <div className='order-list-card'>

                                                <div>
                                                    <img src={image} alt={title} title={title} />
                                                </div>

                                                <div className='order-list-card-middle'>
                                                    <p>{title}</p>
                                                    <p>${price}</p>
                                                </div>

                                                <div className='order-list-card-end'>
                                                    <div className='order-control'>
                                                        <button onClick={this.onClickDecreaseCount.bind(this, id, product.count)}>-</button>
                                                        <span> {product.count} </span>
                                                        <button onClick={this.onClickIncreaseCount.bind(this, id)}>+</button>
                                                    </div>

                                                    <div className='delete-item'>
                                                        <i className="fas fa-trash-alt" onClick={this.onDeleteOrder.bind(this, id)} />
                                                    </div>
                                                </div>

                                            </div>
                                        </React.Fragment>
                                    )
                                }
                                )
                            }
                        </div>

                        <OrderPrice subtotal={Math.abs(this.cartTotal() - Number.EPSILON)} cargoFee={this.cartTotal() - Number.EPSILON < 60 ? 25 : 0} language={language} />
                    </>
                        :
                        <h2>
                            <Helmet >
                                <title>
                                    {language === "en" ? "Product isn't Found | ECommerce" : "Ürün Bulunamadı | ECommerce"}
                                </title>
                            </Helmet>
                            {language === "en" ? "There are no products in your cart" : "Sepetinizde ürün bulunmamaktadır"}
                        </h2>
                }
                </div>
            </>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    orderList: selectOrderList(),
    language: selectLanguage()
});

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({
            removeOrderFromList, increaseOrderCount, decreaseOrderCount
        }, dispatch)
    )
)



export default connect(mapStateToProps, mapDispatchToProps)(Shopping);