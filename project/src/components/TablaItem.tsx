import { TablaItemProps } from "@/types";

export default function TablaItem({
  datos = [],
  title,
  total,
}: TablaItemProps) {
  return (
    <div className="flex flex-col gap-2">
      <h5 className="text-center">{title}</h5>
      {datos.map((data, index) => {
        if (total > index) {
          return (
            <p
              key={index}
              className="bg-gray-700 rounded-xl p-2 text-center font-medium hover:bg-gray-600 transition-colors"
            >
              {data}
            </p>
          );
        }
      })}
    </div>
  );
}
