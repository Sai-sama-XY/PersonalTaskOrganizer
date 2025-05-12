import { RouterProvider } from 'react-router-dom'
import Router from './Pages/Router'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
  <ThemeProvider>
    <RouterProvider router={Router}></RouterProvider>
  </ThemeProvider>
  )
}

export default App
