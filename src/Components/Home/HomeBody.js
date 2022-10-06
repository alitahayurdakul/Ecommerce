import React from 'react'
import ProductCard from './ProductCard/ProductCard';

function HomeBody(props) {

    return (
        <>
            <div className='homepage-body'>
                {
                    props.productList.map(product => (
                        <React.Fragment key={product.id}>
                            <ProductCard product={product} />
                        </React.Fragment>
                    ))
                }
            </div>
        </>
    )
}
export default HomeBody;