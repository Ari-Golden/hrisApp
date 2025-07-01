import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

export function useTableWithFeatures<T>(data: T[], columns: ColumnDef<T>[]) {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<any[]>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
  }
}
