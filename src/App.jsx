import './App.css'
import Content from './component/Content'
import Signin from './component/Signin'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Signin}> </Route>
      <Route path='/home' Component={Content}></Route>
      </Routes>
</BrowserRouter>
  )
}

export default App