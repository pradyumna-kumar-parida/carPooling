import React from 'react'
import Header from '../components/Nav'
import Footer from '../components/Footer'

const AppLayout = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default AppLayout