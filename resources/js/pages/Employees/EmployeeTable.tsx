import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types/page';

interface EmployeeTableProps {
    employees: Employee[];
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Employees</CardTitle>
                <CardDescription>A list of all the employees in your company.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Golongan</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.nama}</TableCell>
                                <TableCell>{employee.golongan?.nama?? 'N/A'}</TableCell>
                                <TableCell>{employee.departemen?.nama ?? 'N/A'}</TableCell>
                                <TableCell>{employee.jabatan?.nama ?? 'N/A'}</TableCell>
                                <TableCell>{employee.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}