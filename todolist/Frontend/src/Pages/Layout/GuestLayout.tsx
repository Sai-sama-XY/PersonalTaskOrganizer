
import { Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <main className='flex min-h-screen items-center justify-center overflow-auto'>
        <Outlet/>
    </main>
    
  )
}

export default GuestLayout