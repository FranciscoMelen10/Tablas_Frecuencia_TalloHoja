type TablaItemProps = {
  datos: (string | number)[];
  title: string;
};

export default function TablaItem({ datos = [], title }: TablaItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-center">{title}</h5>
      {datos.map((data, index) => (
        <div
          key={index}
          className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
        >
          {data}
        </div>
      ))}
    </div>
  );
}
