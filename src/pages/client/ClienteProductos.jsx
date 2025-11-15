import { useEffect, useState } from "react";
import { getProducts } from "../services/products"; // te lo da tu compañera
import ProductCard from "../../components/ProductCard";

export default function ClienteProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      // SOLO productos visibles para clientes
      const privados = data.filter((p) => p.visibleFor.includes("client"));
      setProductos(privados);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Productos Exclusivos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {productos.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </div>
  );
}
