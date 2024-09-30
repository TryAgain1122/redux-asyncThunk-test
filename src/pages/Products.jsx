import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice'
import { addToCart } from '../redux/cartSlice';

const Products = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.product.products)
    const status = useSelector((state) => state.product.status)
    const error = useSelector((state) => state.product.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch])

    if (status === "loading") {
        return <div>...loading</div>
    }
    if (status === "failed") {
        return <div>Error: {error}</div>
    }

    return (
        <div className='max-w-screen-xl mx-auto px-4 py-8'>
            <h2 className='text-2xl font-bold text-center mb-6'></h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {items.map((product, index) => (
                    <div key={index} className='rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105'>
                        <img src={product.image} alt={product.title} className='w-full h-48 object-cover' />
                        <div className='p-4'>
                            <h3 className='text-lg font-semibold'>{product.title}</h3>
                            <p className='text-gray-600 mb-2'><strong>₱</strong>{" "}{product.price}</p>
                            <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors' onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products