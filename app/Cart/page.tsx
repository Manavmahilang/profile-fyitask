import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartPage from './Cartcomponents/Cart'

const page = () => {
    return (
        <>
            <Navbar />
            <CartPage />
            <Footer />
        </>
    )
}

export default page