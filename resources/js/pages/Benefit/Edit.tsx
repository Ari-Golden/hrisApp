import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Benefit {
    id: number;
    nama: string;
    deskripsi: string;
    jenis: 'tunjangan' | 'potongan';
}

interface EditBenefitProps {
    benefit: Benefit;
}

export default function EditBenefit({ benefit }: EditBenefitProps) {
    const { data, setData, put, errors } = useForm({
        nama: benefit.nama,
        deskripsi: benefit.deskripsi,
        jenis: benefit.jenis,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('benefit.update', benefit.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Benefit - ${benefit.nama}`} />

            <h2 className="font-semibold text-xl p-4 ml-8 text-gray-800 leading-tight">{`Edit Benefit - ${benefit.nama}`}</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="nama">Nama</Label>
                                    <Input
                                        id="nama"
                                        type="text"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                    />
                                    {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="deskripsi">Deskripsi</Label>
                                    <Textarea
                                        id="deskripsi"
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                    />
                                    {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="jenis">Jenis</Label>
                                    <Select onValueChange={(value) => setData('jenis', value)} defaultValue={data.jenis}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Jenis" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tunjangan">Tunjangan</SelectItem>
                                            <SelectItem value="potongan">Potongan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.jenis && <p className="text-red-500 text-xs mt-1">{errors.jenis}</p>}
                                </div>
                                <Button type="submit">Update</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}