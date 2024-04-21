import React from 'react'
import './App.scss'

import MainPage from './pages/MainPage'
import Navbar from './Components/molecules/Navbar'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <section className="page_view">
          <MainPage/>
        </section>
      </header>
    </div>
  )
}

export default App
