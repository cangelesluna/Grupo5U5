


import React, { useState } from 'react'


export default function PlanEditor({ plan, onSave, onCancel }) {
const [data, setData] = useState(plan)


const handle = key => e => setData({ ...data, [key]: e.target.value })


return (
<div className="fixed inset-0 bg-black/40 flex justify-center items-center">
<div className="bg-white p-6 rounded w-96">
<input className="border w-full p-2 mb-2" value={data.titulo} onChange={handle('titulo')} />
<input className="border w-full p-2 mb-2" value={data.tipo} onChange={handle('tipo')} />
<textarea className="border w-full p-2 mb-2" value={data.descripcion} onChange={handle('descripcion')} />
<div className="flex justify-end gap-2 mt-3">
<button onClick={onCancel} className="border px-3 py-1 rounded">Cancelar</button>
<button onClick={()=>onSave(data.id, data)} className="bg-pink-500 text-white px-3 py-1 rounded">Guardar</button>
</div>
</div>
</div>
)
}