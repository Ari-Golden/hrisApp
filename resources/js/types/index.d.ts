export interface Employee {
    foto_selfie: ReactNode;
    id_employee: ReactNode;
    id: number;
    nama: string;
    email: string;
    jabatan?: { nama_jabatan: string };
    departemen?: { nama_departemen: string };
    golongan?: { nama_golongan: string };
    // Add other employee properties as needed
}

export interface Attendance {
    id: number;
    employee_id: number;
    foto_selfie: string;
    time: string;
    date: string;
    location: string;
    status: 'in' | 'out' | 'present' | 'late' | 'absent' | 'leave' | 'sick';
    created_at: string;
    updated_at: string;
    employee: Employee;
}
