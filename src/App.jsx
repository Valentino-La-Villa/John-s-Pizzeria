import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Products from './components/menu/Products'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import Branches from './components/branches/Branches'
import Home from './components/home/Home'
import Cart from './components/cart/Cart'

import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBranchesFromDatabase } from './redux/slices/branches'
import { getProductListFromDatabase } from './redux/slices/productHandlingSlice'

function App() {

  const dispatch = useDispatch()

  const productsFetchStatus = useSelector(state => state.productHandling.products.status)
  const branchesFetchStatus = useSelector(state => state.branches.branches.status)

  useEffect(()=>{
    if(branchesFetchStatus == 'idle') {
      dispatch(getBranchesFromDatabase())
    }
  }, [dispatch, branchesFetchStatus])

  useEffect(()=>{
    if (productsFetchStatus == 'idle') {
      dispatch(getProductListFromDatabase())
    }
  }, [dispatch, productsFetchStatus])

  const CartAccessValidation =({children})=>{ // This will only display the 'cart' page when there are items inside the shopping cart
    const cart = useSelector(state => state.productHandling.cart)

    if (cart.length == 0) {
      return <Navigate to='/products'/>
    }

    return children
  }

  return (
    <>
    <main className='main--control'>
      <Header />

      <Routes>
        <Route path='/'
          element={<>
          <Home />
          </> }>
        </Route>

        <Route path='/contact'
          element={
            <Contact />
          }>
        </Route>

        <Route path='/branches'
          element={
            <Branches />
          }>
        </Route>

        <Route path='/products'
          element={
            <Products />
          }>
        </Route>


        <Route path='/about'
          element={
            <About />
          }>
        </Route>

        <Route path='/cart'
          element={
          <CartAccessValidation>
              <Cart />
          </CartAccessValidation>}>
        </Route>

        <Route path='*' element={<>
        <h1 className='text-center m-5'>404: URL Not found</h1>
        </>}></Route>

      </Routes>
    </main>
      
      <Footer />
    </>
  )
}

export default App
