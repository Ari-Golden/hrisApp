import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Users, DollarSign, CalendarCheck, Briefcase } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang - HRIS Blackpink Edition" />

            <div className="min-h-screen bg-black text-white flex flex-col">
                {/* Header */}
                <header className="p-6 lg:px-8 py-4 flex justify-between items-center bg-pink-600/20 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-pink-400">HRIS Blackpink</div>
                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:bg-pink-600 transition-all duration-300"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-full border border-pink-500 px-6 py-2 text-sm font-semibold text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-full bg-pink-500 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:bg-pink-600 transition-all duration-300"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative flex-grow flex items-center justify-center text-center p-6 lg:p-12 bg-gradient-to-br from-black to-gray-900">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' , backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-pink-400 leading-tight mb-4 animate-fade-in-up">
                            Kelola Sumber Daya Manusia Anda dengan Gaya
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
                            Sistem Informasi Sumber Daya Manusia (HRIS) modern yang dirancang untuk efisiensi, akurasi, dan pengalaman pengguna yang luar biasa.
                        </p>
                        <div className="flex justify-center gap-4 animate-fade-in-up animation-delay-400">
                            <Link
                                href={route('login')}
                                className="inline-block rounded-full bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
                            >
                                Mulai Sekarang
                            </Link>
                            <a
                                href="#features"
                                className="inline-block rounded-full border border-pink-500 px-8 py-3 text-lg font-semibold text-pink-500 hover:bg-pink-500 hover:text-white shadow-xl transition-all duration-300 transform hover:scale-105"
                            >
                                Pelajari Lebih Lanjut
                            </a>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-16 lg:py-24 bg-gray-900 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl lg:text-5xl font-bold text-pink-400 mb-12">
                            Fitur Unggulan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-pink-500/30">
                                <Users size={48} className="text-pink-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Manajemen Karyawan</h3>
                                <p className="text-gray-400">Kelola data karyawan, informasi pribadi, dan riwayat pekerjaan dengan mudah.</p>
                            </div>
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-pink-500/30">
                                <DollarSign size={48} className="text-pink-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Penggajian Otomatis</h3>
                                <p className="text-gray-400">Proses penggajian yang akurat dan otomatis, termasuk perhitungan pajak dan tunjangan.</p>
                            </div>
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-pink-500/30">
                                <CalendarCheck size={48} className="text-pink-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Absensi & Cuti</h3>
                                <p className="text-gray-400">Pantau absensi karyawan, kelola permintaan cuti, dan jadwal kerja.</p>
                            </div>
                            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 border border-pink-500/30">
                                <Briefcase size={48} className="text-pink-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold mb-2">Rekrutmen & Onboarding</h3>
                                <p className="text-gray-400">Sederhanakan proses rekrutmen dari lamaran hingga onboarding karyawan baru.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-16 lg:py-24 bg-black text-white text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-pink-400 mb-6">
                            Siap Mengoptimalkan HR Anda?
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-300 mb-8">
                            Bergabunglah dengan ratusan perusahaan yang telah merasakan kemudahan HRIS Blackpink.
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-full bg-pink-500 px-10 py-4 text-xl font-semibold text-white shadow-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
                        >
                            Daftar Sekarang
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 bg-gray-900 text-gray-500 text-center text-sm">
                    <div className="container mx-auto px-6">
                        &copy; {new Date().getFullYear()} HRIS Blackpink. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}