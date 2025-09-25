import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <Router>
    <>
    <header>
      <nav>
<Navbar />
</nav>
    </header>
    <main><AppRoutes /></main>
    <footer>
<p>Copyright &copy;2025</p>
    </footer>
      </>
      </Router>
  )
}

export default App
