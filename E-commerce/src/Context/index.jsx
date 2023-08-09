import { createContext, useState, useEffect } from "react"

export const ShoppingCartContext = createContext()

export const initializeLocalStorage = ()=> {
    const accountInLocalStorage = localStorage.getItem('account')
    const singOutInLocalStorage = localStorage.getItem('sign-out')
    let parsedAccount 
    let parsedSignOut

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}))
        parsedAccount ={}
    } else{
        parsedAccount = JSON.parse(accountInLocalStorage)
    }

    if (!singOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false))
        parsedSignOut = false
    } else {
        parsedSignOut = JSON(singOutInLocalStorage)
    }
}

export const ShoppingCartProvider = ({children}) => {
    const [count, setCount] = useState(0)

    //My account
    const [account, setAccount] = useState({})
    //My Sing out
    const [signOut, setSignOut] = useState(false)

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)   
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)
    

    const [ProductToShow,setProductToShow] = useState({})
    const [cartProducts,setCartToProducts] = useState([])
    
    //Order
    const [order,setOrder] = useState([])

    //get Products
    const [items, setItems] = useState(null)
    console.log('items' , items)
    //filtrado
    const [filteredItems, setFilteredItems] = useState(null)
    console.log('filteredItems', filteredItems)
    //get Products by tittle
    const [searchByTitle, setSearchByTitle] = useState(null)
    
    //Category
    const [searchByCategory, setSearchByCategory] = useState(null)
    console.log('searchCategory:', searchByCategory)
    
    useEffect(() => {
      fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setItems(data))
    },[])
    
    
    const filteredItemsByTitle = (items, searchByTitle) =>{     
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filteredItemsByCategory = (items, searchByCategory) =>{       
        return items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()))
    }

    const filterBy= (searchType, items, searchByTitle, searchByCategory ) => {
        if (searchType === 'BY_TITLE'){
            return filteredItemsByTitle(items, searchByTitle)
        }
        if (searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        }
        if (!searchType ){
            return items
        }
    }

    useEffect(() => {
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByTitle, searchByCategory))
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByTitle, searchByCategory))
        if(!searchByTitle && searchByCategory ) setFilteredItems(filterBy('BY_CATEGORY',items,searchByTitle, searchByCategory))
        if(!searchByCategory && !searchByTitle) setFilteredItems(filterBy(null,items,searchByTitle, searchByCategory))
    },[items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            ProductToShow,
            setProductToShow,
            cartProducts,
            setCartToProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle, 
            setSearchByTitle,
            filteredItems,
            searchByCategory, 
            setSearchByCategory,
            account, 
            setAccount,
            signOut, 
            setSignOut
        }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}