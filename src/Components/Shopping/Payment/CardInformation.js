import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Languages } from '../../../Languages/Languages';
import { resetOrderList } from '../../../store/actions';

class CardInformation extends Component {

    state = {
        "cardOwner": "",
        "cardNo": "",
        "CVC": "",
        "lastMonth": "",
        "lastYear": ""
    }

    onChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    onCompleteOrder = e => {
        e.preventDefault();
        if (window.confirm(Languages[this.props.language].confirmMessage)) {
            this.props.resetOrderList([]);
            this.props.setStatusOrderComplete(true);
        } else {

        }
    };

    render() {

        const { cardOwner, cardNo, CVC, lastMonth, lastYear } = this.state;
        const { language } = this.props;

        return (
            <div className='card-information'>
                <Helmet >
                    <title>
                        {this.props.language === "en" ? "Card Information | ECommerce" : "Kart bilgisi | ECommerce"}
                    </title>
                </Helmet>
                <h2>{Languages[language].cardInformation}</h2>
                <form onSubmit={this.onCompleteOrder}>
                    <label htmlfor="cardOwner" >{Languages[language].cardName}</label>
                    <input type="text" name="cardOwner" value={cardOwner} onChange={this.onChangeInput} placeholder={Languages[language].cardNamePlaceholder} required />

                    <label htmlfor="cardNo" >{Languages[language].cardNumber}</label>
                    <input type="number" name="cardNo" value={cardNo} onChange={this.onChangeInput} placeholder={Languages[language].cardNumberPlaceholder} required />

                    <div className='duplicate-input'>
                        <div>
                            <label>{Languages[language].expireDate}</label>
                            <div className='card-date'>
                                <select name="lastMonth" value={lastMonth} onChange={this.onChangeInput} required>
                                    <option value="">{Languages[language].month}</option>
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select name="lastYear" value={lastYear} onChange={this.onChangeInput} required>
                                    <option value="">{Languages[language].year}</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="CVC">CVC*</label>
                            <input type="number" name="CVC" value={CVC} onChange={this.onChangeInput} placeholder='CVC' min="1" max="999" required />
                        </div>
                    </div>

                    <div className='form-button'>
                        <button>{Languages[language].completeOrder}</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    (
        bindActionCreators({
            resetOrderList
        }, dispatch)
    )
)
export default connect(null, mapDispatchToProps)(CardInformation);