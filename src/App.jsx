import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Map from './Map'
import Start from './Start'
import Dialog from './components/Dialog'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Start></Start>
        </>
    )
}

export default App



// AIzaSyB0VNVSNb9sE7NswkmCGMrPtUbAQoRhBCk google map api key