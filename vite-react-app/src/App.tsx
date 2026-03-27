import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppBar from "./components/AppBar"
import Home from "./pages/Home"
import React, { Suspense } from "react"
// import Login from "./pages/Login"

const Login = React.lazy(() => import('./pages/Login'))

function App() {

  return (
    <Router>
      <div className="container">
        <h2>       React Vite 1 Application </h2>
        <AppBar />
        <main>
          <Suspense>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
