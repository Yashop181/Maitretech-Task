import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Menu from "./Menu"
import Welcome from "./Welcome"
import Checkout from "./Checkout"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Welcome/>} />
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
