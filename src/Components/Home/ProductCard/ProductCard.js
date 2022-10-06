import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addOrderToList } from '../../../store/actions';

function ProductCard(props) {

  const { id, image, title, price } = props.product;

  const onAddOrderToList = async() => {
    await props.addOrderToList(props.product)
  }

  return (
    <div className='product-card' data-testid="card">
      <div className='card-go-detail'>
        <Link to={"/product/detail/" + id} >
          <img src={image} alt={image} />
        </Link>
      </div>

      <div className='card-content' data-testid = "card-title">
        <Link to={"/product/detail/" + id} >
          {title}
        </Link>
      </div>

      <div className='card-footer'>
        <span>${price}</span>
        <i className="fas fa-shopping-bag" onClick={onAddOrderToList}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => (
  (
    bindActionCreators({
      addOrderToList
    }, dispatch)
  )
)
export default connect(null,mapDispatchToProps)(ProductCard);