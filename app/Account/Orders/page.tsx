import React from 'react'
import Order from '../components/order'
import Details from '../components/Details'
import Navbar from '@/app/components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <Details />
            <Order />
        </>
    )
}

export default page