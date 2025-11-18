export default function ProductCard({ item }) {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg">{item.nombre}</h3>
      <p className="mt-1">{item.descripcion}</p>
      <p className="mt-2 font-bold">S/. {item.precio}</p>
    </div>
  );
}
