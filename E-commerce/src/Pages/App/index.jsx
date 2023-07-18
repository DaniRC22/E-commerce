import {useRoutes,BrowserRouter} from 'react-router-dom'
import './App.css'
import Home from '../Home'
import MyAccount from '../MyAccount'
import { ShoppingCartProvider } from '../../Context'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'

const AppRoutes = () =>{
  let routes = useRoutes([
    {path:'/', element:<Home/>},
    {path:'/my-Account', element:<MyAccount/>},
    {path:'/my-Order', element:<MyOrder/>},
    {path:'/my-orders', element:<MyOrders/>},
    {path:'/sign-in', element:<SignIn/>},
    {path:'/*', element:<NotFound/>},
  ])

  return routes
}

const App = ()=> {
  
  return (
    <>
    <ShoppingCartProvider>
     <BrowserRouter>
     <AppRoutes/>
     <Navbar/>
     <CheckoutSideMenu/>
     </BrowserRouter>
    </ShoppingCartProvider>
    </>
  )
}

export default App
