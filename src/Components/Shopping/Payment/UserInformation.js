import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserId } from '../../../store/selectors';
import { Languages } from '../../../Languages/Languages';
import { Helmet } from 'react-helmet';

class UserInformation extends Component {

  state = {
    "name": "",
    "surname": "",
    "email": "",
    "phone": "",
    "address": "",
    "city": "",
    "street": "",
    "number": "",
    "zipcode": ""
  }

  componentDidMount = async () => {
    await axios.get(`https://fakestoreapi.com/users/${this.props.userId}`)
      .then(response => this.setState({
        name: response.data.name.firstname,
        surname: response.data.name.lastname,
        email: response.data.email,
        phone: response.data.phone,
        street: response.data.address.street,
        city: response.data.address.city,
        number: response.data.address.number,
        zipcode: response.data.address.zipcode
      })
      )
      .catch(() => {
        //something wrong
      });
  };

  onChangeInput = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });

  };

  onClickContinue = async (e) => {
    e.preventDefault();
    this.props.setStatus(true);
  }

  render() {
    const { name, surname, email, phone, address, city, street, number, zipcode } = this.state;
    const { language } = this.props;

    return (
      <div className='user-information'>

        <Helmet >
          <title>
            {this.props.language === "en" ? "User Information | ECommerce" : "Kullanıcı bilgisi | ECommerce"}
          </title>
        </Helmet>

        <h2>{Languages[language].userInformation}</h2>
        <form onSubmit={this.onClickContinue}>
          <label htmlFor="name" >{Languages[language].name}*</label>
          <input type="text" name="name" value={name} onChange={this.onChangeInput} placeholder={Languages[language].namePlaceholder} required />

          <label htmlFor="surname" >{Languages[language].surname}*</label>
          <input type="text" name="surname" value={surname} onChange={this.onChangeInput} placeholder={Languages[language].surnamePlaceholder} required />

          <label htmlFor="email" >{Languages[language].email}*</label>
          <input type="email" name="email" value={email} onChange={this.onChangeInput} placeholder={Languages[language].emailPlaceholder} required />

          <label htmlFor="phone" >{Languages[language].phoneNumber}*</label>
          <input type="text" name="phone" value={phone} onChange={this.onChangeInput} placeholder={Languages[language].phoneNumberPlaceholder} required />

          <div className='duplicate-input'>
            <div>
              <label htmlFor="city">{Languages[language].city}*</label>
              <input type="text" name="city" value={city} onChange={this.onChangeInput} placeholder={Languages[language].cityPlaceholder} required />
            </div>
            <div>
              <label htmlFor="street">{Languages[language].street}*</label>
              <input type="text" name="street" value={street} onChange={this.onChangeInput} placeholder={Languages[language].streetPlaceholder} required />
            </div>
          </div>

          <div className='duplicate-input'>
            <div>
              <label htmlFor="number">{Languages[language].no}:*</label>
              <input type="number" name="number" value={number} onChange={this.onChangeInput} placeholder={Languages[language].noPlaceholder} required />
            </div>
            <div>
              <label htmlFor="zipcode">{Languages[language].zipCode}*</label>
              <input type="text" name="zipcode" value={zipcode} onChange={this.onChangeInput} placeholder={Languages[language].zipcodePlaceholder} required />
            </div>
          </div>

          <label htmlFor="address">{Languages[language].fullAddress}*</label>
          <textarea rows="5" name="address" value={address} onChange={this.onChangeInput} placeholder={Languages[language].fullAddressPlaceholder} required />

          <div className='form-button'>
            <button>{Languages[language].saveAndContinue}</button>
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userId: selectUserId()
})

export default connect(mapStateToProps)(UserInformation);