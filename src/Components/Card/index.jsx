import React, { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useShopContext } from '../../Context';

const Card = ({ products }) => {
    const { setCount } = useShopContext()

    return (
        <div className='grid gap-4 grid-cols-2 lg:grid-cols-4 md:grid-cols-3 w-full max-w-screen-lg px-2'>
            {
                products.map(product => (
                    <div key={product.id} className='bg-white justify-self-center cursor-pointer w-56 h-72 rounded-lg flex flex-col'>
                        <figure className='relative mb-2 w-full h-2/3'>
                            <span className='p-1 z-10 text-black text-xs absolute bottom-0 bg-white/60 rounded-lg m-2'>
                                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </span>
                            <LazyLoadImage className='w-full h-48 object-contain rounded-lg' effect='blur' height={'100%'} width={'100%'} src={product.image} alt="headphones" />
                        </figure>
                        <p className='flex justify-between'>
                            <span className='text-sm font-light truncate w-1/2'>{product.title}</span>
                            <span className='text-lg font-bold'>${product.price}</span>
                        </p>
                        <div className='flex justify-center items-center h-full'>
                            <button
                                className='hover:bg-gray-500 bg-black text-white h-10 w-4/5 rounded-full flex  gap-2 justify-center items-center'
                                onClick={() => setCount(prevCount => prevCount + 1)}
                            >
                                Add to cart
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H4.37144C5.31982 3 6.13781 3.66607 6.32996 4.59479L8.67004 15.9052C8.86219 16.8339 9.68018 17.5 10.6286 17.5H17.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.82422 7H19.6743C20.3386 7 20.8183 7.6359 20.6358 8.27472L19.6217 11.8242C19.2537 13.1121 18.0765 14 16.7371 14H8.27734" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="16.5" cy="20.5" r="0.5" fill="#ffffff" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="0.5" cy="0.5" r="0.5" transform="matrix(1 0 0 -1 10 21)" fill="#ffffff" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                    </div>

                ))
            }
        </div>
    )
}

export default Card
