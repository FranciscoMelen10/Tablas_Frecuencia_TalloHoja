import React from "react";

const NumberTable = ({
  numbers,
  children,
}: {
  numbers: number[];
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-center">Datos procesados ordenados:</h1>
      <div className="flex flex-col max-w-[1000px] bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-xl gap-8">
        <div className="grid grid-cols-10 gap-2 ">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors "
            >
              {number}
            </div>
          ))}
        </div>
        <section className="flex flex-wrap gap-5">
          <h3>Total(n):{numbers.length}</h3>
          {children}
        </section>
      </div>
    </div>
  );
};

export default NumberTable;
