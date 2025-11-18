


import React from 'react'
import Sidebar from './Sidebar'
import PlanList from './PlanList'
import { auth } from '../lib/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard({ user }) {
  const navigate = useNavigate()

  const logout = async () => {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN PANEL */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">👋 ¡Hola, Administradora!</h1>
            <p className="text-sm text-gray-600">
              Bienvenida al panel de control — puedes gestionar tus planes aquí.
            </p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition"
          >
            Cerrar sesión
          </button>
        </div>

        {/* CONTENT */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <PlanList />
        </div>
      </main>
    </div>
  )
}