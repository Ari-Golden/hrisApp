import * as React from "react";
import { z } from "zod";
import { DataTable as BaseDataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

export const schema = z.object({
    id: z.number(),
    header: z.string(),
    type: z.string(),
    status: z.string(),
    target: z.string(),
    limit: z.string(),
    reviewer: z.string(),
});

type DataTableProps = {
    data: z.infer<typeof schema>[];
};

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        accessorKey: "header",
        header: "Header",
    },
    {
        accessorKey: "type",
        header: "Section Type",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "target",
        header: "Target",
    },
    {
        accessorKey: "limit",
        header: "Limit",
    },
    {
        accessorKey: "reviewer",
        header: "Reviewer",
    },
];

export function DataTable({ data }: DataTableProps) {
    return <BaseDataTable columns={columns} data={data} exportFileName="advanced_data" />;
}
