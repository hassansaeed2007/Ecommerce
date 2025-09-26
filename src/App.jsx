import React from 'react'
import Sircode from './Sircode'
import { Route, Routes } from 'react-router-dom'
import Ecommerce from './Pages/Ecommerce'
import Detail from './Pages/Detail'

const App = () => {
  return (
    <div>
      {/* <Sircode/> */}
      {/* <Mycode/> */}
      <Routes>
        <Route path='/' element={<Ecommerce/>} />
        <Route path='/:id' element={<Detail/>} />

      </Routes>
    </div>
  )
}

export default App
