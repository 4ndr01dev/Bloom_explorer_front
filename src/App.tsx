import React from 'react'
import './App.scss'
import Navbar from './components/molecules/Navbar'
import MainPage from './pages/MainPage'
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
