import React from 'react'
import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'

const Card = (data) => {
  const context = useContext(ShoppingCartContext)

  const showProduct = (productDetail) => {
    context.openProductDetail()
    context.setProductToShow(productDetail)

  }
const addProductToCart = (event, productData) =>{
  event.stopPropagation()
  context.setCount(context.count + 1)
 context.setCartToProducts([...context.cartProducts, productData])
 context.openCheckoutSideMenu()
 context.closeProductDetail()

}

const renderIcon = (id) => {
  const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

  if (isInCart) {
    return (
      <button className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1 cursor-pointer">
          {/* check icon */}
          <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
        </button>
    )
  } else {
    return(
    <div className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1'
       onClick={(event) => addProductToCart(event, data.data)}>
     <button>
     +
    </button>
    </div>
    )
  }
}
  return (
    <div
     className='bg-white cursor-pointer w-56 h-60 rounded-lg'
     onClick={() => showProduct(data.data)}>
        <figure className='relative mb-2 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xm m-2 px-3 py-0.5'>{data.data.category}</span>
                <img className='w-full h-full object-cover rounded-lg' src={data.data.image} alt={data.data.tittle} />
              {renderIcon(data.data.id)}
        </figure>
        <p className='flex justify-between'>
            <span className='text-sm font-light'>{data.data.tittle}</span>
            <span className='text-lg font-medium'>${data.data.price}</span>
        </p>
    </div>
  )
}

export default Card