import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useShopContext } from '../../Context'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    const {
        counter,
        scrolled,
        setShowCheckout,
        products,
        searchProductByCategory,
        setCategories
    } = useShopContext()
    const activeStyle = 'underline'
    const categories = [];

    const categoryAlreadyExists = (category) => {
        return categories.find(cat => cat == category);
    }

    let navItems = [
        // Left Navbar Items
        [
            {
                to: '/',
                text: 'BuyIt',
                className: 'font-semibold text-lg'
            },
            {
                to: '/',
                text: 'All',
            }

        ],

        // Right Navbar Items
        [
            {
                to: '/email',
                text: 'Penny@Teti.com',
                className: 'text-black/60'
            },
            {
                to: '/my-orders',
                text: 'My Orders',
            },
            {
                to: '/my-account',
                text: 'My Account',
            },
            {
                to: '/signin',
                text: 'Sign in',
            },
            {
                to: '/shopping-cart',
                text: counter,
                className: 'bg-black text-white text-md font-bold rounded p-2'
            }
        ]
    ]

    products.forEach((product) => {
        let category = product.category.split(' ')[0];
        if (!categoryAlreadyExists(category)) {
            categories.push(category);
            navItems[0].push({
                to: "/" + category,
                text: category.toUpperCase()[0] + category.slice(1)
            })
        }
    })

    useEffect(() => {
        setCategories([...categories]); // Ensure a new reference to the categories array
    }, [categories.length]); // Using categories.length as a less volatile dependency


    // Aplicar una clase CSS para el navbar cuando se desplace
    const navbarClass = `flex justify-between top-0 items-center fixed z-10 w-full py-5 px-8 text-sm font-light ${scrolled ? 'hidden' : 'show'}`;

    return (
        <>
            <nav className={navbarClass}>
                {
                    navItems.map((items, nav) => (
                        <ul className='flex items-center gap-3' key={nav}>
                            {
                                items.map((item, index) => (
                                    <li className={item.className} key={index}>
                                        {
                                            item.to == '/shopping-cart' || item.to == '/email'
                                                ? <div
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        if (!isNaN(item.text)) {
                                                            setShowCheckout(true);
                                                        }
                                                    }}
                                                >
                                                    {
                                                        !isNaN(item.text) ?
                                                            <div className='flex gap-2'>
                                                                <ShoppingBagIcon className='flex gap-3 h-5 w-5'
                                                                    onClick={() => setShowCheckout(true)}
                                                                />
                                                                {item.text}
                                                            </div>
                                                            : item.text
                                                    }
                                                </div>
                                                : <NavLink
                                                    to={item.to}
                                                    onClick={() => {
                                                        if (!isNaN(item.text)) {
                                                            setShowCheckout(true);
                                                        }
                                                    }}
                                                    className={({ isActive }) =>
                                                        isActive && item.text !== "BuyIt" && isNaN(item.text) && item.text !== 'Penny@Teti.com'
                                                            ? activeStyle
                                                            : undefined
                                                    }
                                                >
                                                    {item.text}
                                                </NavLink>
                                        }

                                    </li>
                                ))
                            }
                        </ul>
                    ))
                }
            </nav>
        </>
    );
}

export default Navbar
