import MonkeysForSalePage from '../MonkeysForSalePage'
import logo from './monkey-league-text.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MonkeysForSalePage />
      </header>
    </div>
  )
}

export default App
