import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Benefit {
    id: number;
    nama: string;
}

interface Golongan {
    id: number;
    nama: string;
}

interface CreateAmountProps {
    benefits: Benefit[];
    golongans: Golongan[];
}

export default function CreateAmount({ benefits, golongans }: CreateAmountProps) {
    const { data, setData, post, errors } = useForm({
        benefit_id: '',
        golongan_id: '',
        jumlah: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('amount.store'));
    };

    return (
        <AppLayout>
            <Head title="Create Amount" />

            <h2 className="font-semibold text-xl p-4 ml-8 text-gray-800 leading-tight">Create New Amount</h2>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Label htmlFor="benefit_id">Benefit</Label>
                                    <Select onValueChange={(value) => setData('benefit_id', value)} value={data.benefit_id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Benefit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {benefits.map((benefit) => (
                                                <SelectItem key={benefit.id} value={String(benefit.id)}>{benefit.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.benefit_id && <p className="text-red-500 text-xs mt-1">{errors.benefit_id}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="golongan_id">Golongan</Label>
                                    <Select onValueChange={(value) => setData('golongan_id', value)} value={data.golongan_id}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih Golongan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {golongans.map((golongan) => (
                                                <SelectItem key={golongan.id} value={String(golongan.id)}>{golongan.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.golongan_id && <p className="text-red-500 text-xs mt-1">{errors.golongan_id}</p>}
                                </div>
                                <div className="mb-4">
                                    <Label htmlFor="jumlah">Jumlah</Label>
                                    <Input
                                        id="jumlah"
                                        type="number"
                                        value={data.jumlah}
                                        onChange={(e) => setData('jumlah', e.target.value)}
                                    />
                                    {errors.jumlah && <p className="text-red-500 text-xs mt-1">{errors.jumlah}</p>}
                                </div>
                                <Button type="submit">Create</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}