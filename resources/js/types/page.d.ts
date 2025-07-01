export interface Employee {
    nama: ReactNode;
    id: number;
    nama_lengkap: string;
    email: string;
    status: string;
    jenis_kelamin: string; // Tambahkan ini
    created_at: string;
    departemen: {
        nama: string;
        nama_departemen: string;
    };
    jabatan: {
        nama: string;
        nama_jabatan: string;
    };
    golongan: {
        nama: string;
    };
}

export interface PageProps {
    employees: Employee[];
    totalEmployee: number;
    [key: string]: any;
}
