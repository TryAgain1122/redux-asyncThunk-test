import React from 'react'
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const numberOfProducts = useSelector(state => state.cart.totalQuantity)
    return (
        <div className='flex justify-between px-3 border-solid border-b-2 border-black py-2'>
            <Link to={"/"}><div className='text-bold text-2xl'>e-Shop</div></Link>
            <div>
                <div className='flex flex-row gap-2 items-center'>
                    <Link to={'/cart'}>
                        <MdOutlineShoppingCart size={35} className='cursor-pointer' />
                    </Link>

                    <div className='space-x-2'>
                        <span>{numberOfProducts}</span>
                        <span>Cart</span>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Navbar