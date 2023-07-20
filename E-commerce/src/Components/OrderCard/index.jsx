const OrderCard = props => {
    const { id, title, imageUrl, price, handDelete} = props

  return (
    <div className="flex justify-between items-center mb-3">
        <div className="flex item-center gap-2">
            <figure className="w-20 h-20">
                <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
            </figure>
            <p className="text-sm font-light">{title}</p>
        </div>
        <div onClick={() =>handDelete(id)} className="flex item-center gap-2">
            <p className="text-lg font-medium">{price}</p>
            <button>X</button>
        </div>
    </div>
  )
}

export default OrderCard