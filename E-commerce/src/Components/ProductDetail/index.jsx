import { useContext } from 'react'
import './style.css'
import { ShoppingCartContext } from '../../Context'
const ProductDetail = () => {
const context = useContext(ShoppingCartContext)

    return (
        <aside 
         className={`${context.isProductDetailOpen ? 'flex' :  'hidden'} product-detail flex-col fixed right-0 border border-black rounded-lg bg-white`}>
            <div className='flex justify-between items-center p-6'>
                <h2 className='font-medium text-xl'> Details</h2>
            <button
            onClick={context.closeProductDetail}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            <figure className='px-6'>
                <img className='w-80 h-80 rounded-lg'
                src={context.ProductToShow.image} alt={context.ProductToShow.tittle} />
            </figure>
            <p className='flex flex-col p-6'>
                <span className='font-medium text-2xl mb-2'>${context.ProductToShow.price}</span>
                <span className='font-medium text-md'>${context.ProductToShow.tittle}</span>
                <span className='font-lifht text-sm'>${context.ProductToShow.description}</span>
            </p>
        </aside>
    )
}
export default ProductDetail