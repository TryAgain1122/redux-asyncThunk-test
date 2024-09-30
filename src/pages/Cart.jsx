import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleQuantityChange = (id, quantity) => {
        dispatch(updateQuantity({ id, quantity}))
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    if (cartItems.length === 0) {
        return <div className='text-center text-lg mt-3'>Your Cart is empty</div>
    }
    return (
        <div className='max-w-screen-xl mx-auto px-4 py-8'>
            <h2 className='text-2xl font-bold text-center mb-6'>Shopping Cart</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th>Products</th>
                            <th>Prices</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className='border-b'>
                                <td className='p-4 flex items-center'>
                                    <img src={item.image} alt={item.title} className='w-16 h-16 object-cover mr-4' />
                                    {item.title}
                                </td>
                                <td className='p-4'><strong>₱</strong> {item.price.toFixed(2)}</td>
                                <td className='p-4'>
                                    <input
                                        type="number"
                                        min={1}
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className='w-16 border border-gray-300 rounded text-center'
                                    />
                                </td>
                                <td className='p-4'>{(item.price * item.quantity).toFixed(2)}</td>
                                <td className='p-4'>
                                    <button 
                                    onClick={() => handleRemove(item.id)}
                                    className='bg-red-500 text-white py-1 px-3 rounded hover:bg-600 transition-colors'>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3 className='text-3xl font-semibold'>
                    Total: ₱ {totalPrice}
                </h3>
            </div>
        </div>
    )
}

export default Cart