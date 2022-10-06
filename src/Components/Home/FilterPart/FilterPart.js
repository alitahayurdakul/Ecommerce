import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Languages } from '../../../Languages/Languages';
import { selectLanguage } from '../../../store/selectors';

class FilterPart extends Component {

    state = {
        "categories": [],
        "category": "",
        "sorting": "",
        "limit": ""
    };

    componentDidMount = async () => {

        await axios.get("https://fakestoreapi.com/products")
            .then(response => {
                this.props.setProductList(response.data);
            })
            .catch(() => {
                //something wrong...
            });

        await axios.get("https://fakestoreapi.com/products/categories")
            .then(response => this.setState({
                categories: response.data
            })
            )
            .catch(() => {
                //something wrong
            });

    };

    onChangeFilter = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onClickFilter = async () => {
        const { category, sorting, limit } = this.state;
        if (category) {
            await axios.get(`https://fakestoreapi.com/products/category/${category}?sort=${sorting}&limit=${limit}`)
                .then(response => this.props.setProductList(response.data))
                .catch(() => {
                    //something wrong...
                })
        }
        else {
            await axios.get(`https://fakestoreapi.com/products?sort=${sorting}&limit=${limit}`)
                .then(response => this.props.setProductList(response.data))
                .catch(() => {
                    //something wrong...
                })
        }
    }

    render() {
        const { categories, category, sorting, limit } = this.state;
        const { language } = this.props;
        return (
            <div className='product-filter'>
                <select value={category} name="category" onChange={this.onChangeFilter} >
                    <option value="">{Languages[language].chooseCategory}</option>
                    {
                        categories.map(categ => (
                            <option value={categ}>
                                {categ}
                            </option>
                        ))
                    }
                </select>

                <select value={sorting} name="sorting" onChange={this.onChangeFilter} >
                    <option value="">{Languages[language].sort}</option>
                    <option value="asc">Baştan</option>
                    <option value="desc">Sondan</option>
                </select>

                <input type="number" value={limit} name="limit" onChange={this.onChangeFilter} placeholder="Limit" />

                <button onClick={this.onClickFilter}>{Languages[language].filter}</button>

            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    language: selectLanguage()
});
export default connect(mapStateToProps)(FilterPart);