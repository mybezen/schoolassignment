import { PropsWithChildren } from 'react';
import Navbar from '@/components/public-navbar';
import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#FFFBF5]">
            <Navbar />
            
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            <footer className="mt-16 border-t border-[#E8DCC8] bg-gradient-to-b from-[#FFF8ED] to-[#FAF7F2]">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="text-lg font-semibold text-[#35291B]">Company</h3>
                            <p className="mt-4 text-sm text-[#5C4A30]">
                                Building excellence through innovation and dedication.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#35291B]">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <Link 
                                        href="/about" 
                                        className="text-sm text-[#5C4A30] transition-colors hover:text-[#A67C52]"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/products" 
                                        className="text-sm text-[#5C4A30] transition-colors hover:text-[#A67C52]"
                                    >
                                        Products
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/articles" 
                                        className="text-sm text-[#5C4A30] transition-colors hover:text-[#A67C52]"
                                    >
                                        Articles
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        href="/contact" 
                                        className="text-sm text-[#5C4A30] transition-colors hover:text-[#A67C52]"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#35291B]">Contact Info</h3>
                            <ul className="mt-4 space-y-2 text-sm text-[#5C4A30]">
                                <li>Email: info@company.com</li>
                                <li>Phone: +62 123 4567 890</li>
                                <li>Address: Jakarta, Indonesia</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-[#E8DCC8] pt-8">
                        <p className="text-center text-sm text-[#6F5B3A]">
                            &copy; {new Date().getFullYear()} Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}