import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import TaxCalculation from './TaxCalculation';

// types/page.ts
export interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    employees: {
        id: number;
        nama: string;
        status_pernikahan: string;
        jumlah_tanggungan: number;
        golongan?: {
            gaji: string;
            amounts?: {
                jumlah: string;
                benefit: {
                    nama: string;
                };
            }[];
        };
    }[];
}

export default function Index() {
    const { taxResults } = usePage<PageProps>().props;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Tax</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Overview</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-2 py-2 md:gap-6 md:py-6">
                            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                                <div className="ml-4 flex flex-col gap-2">
                                    <h1 className="text-2xl font-bold">Tax Overview</h1>
                                    <p className="mt-2 text-gray-600">Manage and view tax-related information.</p>
                                </div>
                            </div>
                            <div className="mr-4 ml-4 flex flex-col gap-4">
                                <TaxCalculation
                                    data={taxResults}
                                    formatCurrency={(val) =>
                                        new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        }).format(val)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
