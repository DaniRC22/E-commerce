import { Link } from "react-router-dom"
import Layout from "../../Components/Layout"
import { useContext, useRef, useState } from "react"
import { ShoppingCartContext } from "../../Context"

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState ('user-info')
  // const form = useRef(null)

  //Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  //Has an account

  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const renderLogin= () => {
    return (
        <div className="flex flex-col w-80">
          <p>
            <span className="font-light text-sm">Email: </span>
            <span>{parsedAccount?.email}</span>
          </p>
          <p>
            <span className="font-light text-sm">Password: </span>
            <span>{parsedAccount?.password}</span>
          </p>
        <Link
        to="/">
          <button
          className="bg-black disabled:bg-black/40 text-white w-80 rounded-lg py-3 mt-4 mb-2" disabled={!hasUserAnAccount}> Log in</button>
        </Link>
        <div className="text-center">
          <a className="font-light text-xs underline underline-offset-4" href="/">Forgot my password</a>
        </div>
        <button
        className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-5 py-3"
        onClick={()=> setView('create-user-info')}
        disabled={hasUserAnAccount}>Sign up</button>
      </div>
    )
  }

  const renderCreateUserInfo = ()=> {

  }
  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogin()
  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 2-80"> Welcome</h1>
      {renderView()}
    </Layout>
  )
}

  export default SignIn

  // const createAnAccount = () => {
  //   const formData = new FormData(form.current)
  //   const data = {
  //     name: formData.get('name'),
  //     email: formData.get('email'),
  //     password: formData.get('password')
  //   }

  //   console.log(data)
  // }

  //   return (
  //     <>
  //      <Layout>
  //       <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
        
  //      </Layout>
  //     </>
  //   )
  // }