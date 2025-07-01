import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee } from '@/types/page';
import {
    ColumnDef,
} from "@tanstack/react-table"
import { Button } from '@/components/ui/button';
import React from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';

interface EmployeeTableProps {
    employees?: Employee[];
}

export function EmployeeTable({ employees = [] }: EmployeeTableProps) {

    const columns: ColumnDef<Employee>[] = [
        {
            accessorKey: "nama",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-start text-left"
                >
                    Name
                    {{
                        asc: <ArrowUp className="ml-2 h-4 w-4" />,
                        desc: <ArrowDown className="ml-2 h-4 w-4" />,
                    }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
            ),
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("nama")}</div>
            ),
        },
        {
            id: "golongan",
            accessorFn: row => row.golongan?.nama ?? 'N/A',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-start text-left"
                >
                    Golongan
                    {{
                        asc: <ArrowUp className="ml-2 h-4 w-4" />,
                        desc: <ArrowDown className="ml-2 h-4 w-4" />,
                    }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
            ),
            cell: ({ row }) => <div className="pl-4">{row.getValue("golongan")}</div>,
        },
        {
            id: "departemen",
            accessorFn: row => row.departemen?.nama ?? 'N/A',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-start text-left"
                >
                    Department
                    {{
                        asc: <ArrowUp className="ml-2 h-4 w-4" />,
                        desc: <ArrowDown className="ml-2 h-4 w-4" />,
                    }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
            ),
            cell: ({ row }) => <div className="pl-4">{row.getValue("departemen")}</div>,
        },
        {
            id: "jabatan",
            accessorFn: row => row.jabatan?.nama ?? 'N/A',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-start text-left"
                >
                    Position
                    {{
                        asc: <ArrowUp className="ml-2 h-4 w-4" />,
                        desc: <ArrowDown className="ml-2 h-4 w-4" />,
                    }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue("jabatan")}</div>,
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="w-full justify-start text-left"
                >
                    Status
                    {{
                        asc: <ArrowUp className="ml-2 h-4 w-4" />,
                        desc: <ArrowDown className="ml-2 h-4 w-4" />,
                    }[column.getIsSorted() as string] ?? <ArrowUpDown className="ml-2 h-4 w-4" />}
                </Button>
            ),
            cell: ({ row }) => (
                <div className="capitalize pl-4">{row.getValue("status")}</div>
            ),
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Employees</CardTitle>
                <CardDescription>A list of all the employees in your company.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={employees} exportFileName="employees" />
            </CardContent>
        </Card>
    );
}