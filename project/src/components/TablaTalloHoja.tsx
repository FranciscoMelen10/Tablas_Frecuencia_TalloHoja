type DatosTalloHoja = {
    [key: string]: number[]; // Claves string y valores como arreglos de números
  };
  
  export default function TablaTalloHoja({ datos = {} }: { datos: DatosTalloHoja }) {
    return (
      <div className="grid grid-cols-3 gap-2 p-4 max-w-[500px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl">
        {Object.keys(datos).map((clave, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {clave} : {datos[clave].join(", ")}
          </div>
        ))}
      </div>
    );
  }
  