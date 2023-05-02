import { Outlet } from 'react-router-dom'

// layout for common elements
export default function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
