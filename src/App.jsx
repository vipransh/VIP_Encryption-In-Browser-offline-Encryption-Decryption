

import './App.css'

import { Routes, Route } from "react-router";
import Home from './components/Home'
import Header from './components/Header'
import Encrypt from './components/Encrypt'
import Decrypt from './components/Decrypt'
import Footer from './components/Footer';



function App() {



  return (
      <>
          <Header/>
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/encrypt" element={<Encrypt/>} />
            <Route path="/decrypt" element={<Decrypt/>} />
          </Routes>
          <Footer/>
      </>
  )
}

export default App
