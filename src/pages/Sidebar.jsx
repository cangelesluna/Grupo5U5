


export default function Sidebar() {
return (
<aside className="col-span-3 bg-white p-6 shadow">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center">CR</div>
<div>
<div className="font-semibold">Bianca</div>
<div className="text-xs">Sistema Admin</div>
</div>
</div>


<nav className="space-y-2">
<div className="bg-pink-100 px-3 py-2 rounded">Planes de ejercicios y dietas</div>
<div className="hover:bg-gray-100 px-3 py-2 rounded">Equipo</div>
<div className="hover:bg-gray-100 px-3 py-2 rounded">Monitoreo</div>
<div className="hover:bg-gray-100 px-3 py-2 rounded">Ajustes</div>
 <div className="hover:bg-gray-100 px-3 py-2 rounded">Comunidad</div>

</nav>
</aside>
)
}