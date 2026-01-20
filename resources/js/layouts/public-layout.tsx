import { PropsWithChildren } from 'react';
import Navbar from '@/components/public-navbar';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>

            <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company</h3>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Building excellence through innovation and dedication.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a href="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/products" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        Products
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Info</h3>
                            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li>Email: info@company.com</li>
                                <li>Phone: +62 123 4567 890</li>
                                <li>Address: Jakarta, Indonesia</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}