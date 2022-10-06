import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLanguage, selectOrderList } from '../../../store/selectors';
import InformationStatusOrder from './InformationStatusOrder/InformationStatusOrder';
import Navbar from '../../Navbar/Navbar';
import OrderPrice from '../OrderPrice/OrderPrice';
import CardInformation from './CardInformation';
import UserInformation from './UserInformation';
import { Languages } from '../../../Languages/Languages';

class Payment extends Component {

    state = {
        "status": false,
        "orderList": [],
        "statusOrderComplete": false
    }

    componentDidMount = () => {
        this.setState({
            status: false,
            statusOrderComplete: false
        })
    };

    setStatus = (val) => {
        this.setState({
            status: val
        })
    };

    setStatusOrderComplete = (val) => {
        this.setState({
            statusOrderComplete: val
        })
    };



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
                <div className='payment'>
                    {
                        !this.state.status ?
                            <UserInformation setStatus={this.setStatus} language={language} />
                            :
                            !this.state.statusOrderComplete ?
                                <CardInformation setStatusOrderComplete={this.setStatusOrderComplete} language={language} />
                                :
                                <InformationStatusOrder message = {Languages[language].orderReceived} />
                    }

                    {
                        !this.state.statusOrderComplete &&
                        <OrderPrice subtotal={Math.abs(this.cartTotal() - Number.EPSILON)} cargoFee={this.cartTotal() - Number.EPSILON < 60 ? 25 : 0} status={true} language={language} />
                    }

                </div>
            </>
        )
    }
};

const mapStateToProps = () => createStructuredSelector({
    orderList: selectOrderList(),
    language: selectLanguage()
});

export default connect(mapStateToProps)(Payment);