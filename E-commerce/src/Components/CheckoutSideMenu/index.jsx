import { useContext } from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'

const CheckoutSideMenu = () => {
const context = useContext(ShoppingCartContext)
   
const handDelete = (id) =>{
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartToProducts(filteredProducts)
}   

const handleCheckout = ()=>{
    const orderToAdd={
        date:'01.02.03',
        products:context.cartProducts,
        totalProducts: context.cartProducts.length,
        totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartToProducts([])
}


return (
        <aside 
         className={`${context.isCheckoutSideMenuOpen ? 'flex' :  'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'> My Order</h2>
            <button
            onClick={()=> context.closeCheckoutSideMenu()}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            <div className='px-6 overflow-y-scroll flex-1'>

            {
                context.cartProducts.map((product)=> (
                    <OrderCard 
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    imageUrl={product.image}
                    price={product.price}
                    handDelete={handDelete}
                    />
                ))
            }
            </div>
            <div className='px-6 mb-6'>
                <p className='mb-2 flex justify-between items-center'>
                    <span className='font-light'>Total:</span>
                    <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to= '/my-orders/last'>
                <button className='bg-black py-3 text-white w-full rounded-lg' onClick={() => handleCheckout()}>Checkout</button>
                </Link>
            </div>
        </aside>
    )
}
export default CheckoutSideMenu