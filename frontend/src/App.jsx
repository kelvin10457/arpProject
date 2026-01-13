//react-router-dom components
import { Routes,Route  } from 'react-router-dom'

//pages
import Home from './pages/home/home'
import Clasification from './pages/clasification/clasification'
import Lands from './pages/lands/lands'
import Sales from './pages/sales/sales'
import Harvest from './pages/harvest/harvest'

//own components
import NavBar from './components/navbar'
import Footer from './components/footer'

export default function App() {
  return (
    <>
    <NavBar/>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/clasification" element={<Clasification/>}/>
      <Route path="/lands" element={<Lands/>}/>
      <Route path="/sales" element={<Sales/>}/>
      <Route path="/harvest" element={<Harvest/>}/>
    </Routes>

    <Footer />
    </>
  )
}
