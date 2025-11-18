



import React, { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import seedPlans from '../lib/seedPlans'
import PlanEditor from './PlanEditor'

export default function PlanList() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    async function load() {
      const colRef = collection(db, 'plans')
      const snap = await getDocs(colRef)

      if (snap.empty) {
        await Promise.all(seedPlans.map(p => addDoc(colRef, p)))
        const seeded = await getDocs(colRef)
        setPlans(seeded.docs.map(d => ({ id: d.id, ...d.data() })))
      } else {
        setPlans(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      }

      setLoading(false)
    }
    load()
  }, [])

  const createPlan = async () => {
    const newPlan = {
      titulo: 'Nuevo plan',
      descripcion: 'Descripción pendiente',
      tipo: 'entrenamiento',
      nivel: 'Principiante',
      duracion: '10 min',
      color: 'bg-gray-100',
      imagen: 'https://farmazara.es/blog/wp-content/uploads/2023/05/pareja-joven-haciendo-flexiones-piso-mano-juntos.jpg '
    }

    const ref = await addDoc(collection(db, 'plans'), newPlan)
    setPlans([{ id: ref.id, ...newPlan }, ...plans])
  }

  const deletePlan = async id => {
    await deleteDoc(doc(db, 'plans', id))
    setPlans(plans.filter(p => p.id !== id))
  }

  const savePlan = async (id, data) => {
    await setDoc(doc(db, 'plans', id), data)
    setPlans(plans.map(p => (p.id === id ? { id, ...data } : p)))
    setEditing(null)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📌 Planes de entrenamiento y dieta</h2>

        <button
          onClick={createPlan}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          ➕ Nuevo plan
        </button>
      </div>

      {loading ? (
        <div className="text-center py-6">Cargando planes...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(p => (
            <div
              key={p.id}
              className={`rounded-xl shadow-sm p-4 border hover:shadow-md transition ${p.color}`}
            >
              {p.imagen && (
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}

              <h3 className="font-bold text-lg">{p.titulo}</h3>
              <p className="text-gray-600 text-sm">{p.descripcion}</p>

              <div className="mt-2 text-xs flex justify-between opacity-70">
                <span>{p.tipo}</span>
                <span>{p.nivel}</span>
                <span>{p.duracion}</span>
              </div>

              <div className="flex gap-2 mt-3 justify-between">
                <button
                  onClick={() => setEditing(p)}
                  className="border px-2 py-1 rounded text-sm hover:bg-gray-100"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => deletePlan(p.id)}
                  className="bg-red-100 text-red-600 px-2 py-1 text-sm rounded hover:bg-red-200"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <PlanEditor
          plan={editing}
          onSave={savePlan}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  )
}