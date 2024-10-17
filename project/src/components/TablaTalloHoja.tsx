type DatosTalloHoja = {
    [key: string]: number[]; // Claves string y valores como arreglos de números
  };
  
  export default function TablaTalloHoja({ datos }: { datos: DatosTalloHoja }) {
    return (
      <div className="grid grid-cols-5 gap-2 p-4 max-w-[1200px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl select-none">
        {Object.keys(datos).map((clave, index) => (
          <div
            key={index}
            className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
          >
            {`${clave}0`} : {datos[clave].join(", ")}
          </div>
        ))}
      </div>
    );
  }
  