import { TableContext } from "@/context/TableContext";
import { useContext } from "react";

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used in TableContext");
  }
  return context;
}
