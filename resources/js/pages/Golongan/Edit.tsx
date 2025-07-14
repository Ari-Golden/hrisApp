import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';

interface Golongan {
    id: number;
    kode: string;
    nama: string;
    keterangan: string;
    gaji: number;
}

interface EditGolonganProps {
    golongan: Golongan;
}

export default function EditGolongan({ golongan }: EditGolonganProps) {
    const { data, setData, put, processing, errors } = useForm({
        kode: golongan.kode,
        nama: golongan.nama,
        gaji: golongan.gaji.toString(), // Convert number to string for input value
        keterangan: golongan.keterangan || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('golongan.update', golongan.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Golongan" />

            <h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Golongan</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Label htmlFor="kode">Kode</Label>
                                    <Input
                                        id="kode"
                                        type="text"
                                        name="kode"
                                        value={data.kode}
                                        className="mt-1 block w-full"
                                        autoComplete="kode"
                                        onChange={(e) => setData('kode', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.kode} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="nama">Nama Golongan</Label>
                                    <Input
                                        id="nama"
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        className="mt-1 block w-full"
                                        autoComplete="nama"
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nama} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="gaji">Gaji</Label>
                                    <Input
                                        id="gaji"
                                        type="number"
                                        name="gaji"
                                        value={data.gaji}
                                        className="mt-1 block w-full"
                                        autoComplete="gaji"
                                        onChange={(e) => setData('gaji', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.gaji} className="mt-2" />
                                </div>

                                <div>
                                    <Label htmlFor="keterangan">Keterangan</Label>
                                    <Textarea
                                        id="keterangan"
                                        name="keterangan"
                                        value={data.keterangan}
                                        className="mt-1 block w-full"
                                        autoComplete="keterangan"
                                        onChange={(e) => setData('keterangan', e.target.value)}
                                    />
                                    <InputError message={errors.keterangan} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button disabled={processing}>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}