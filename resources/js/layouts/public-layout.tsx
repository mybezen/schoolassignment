import { PropsWithChildren } from 'react';
import Navbar from '@/components/public-navbar';
import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';

export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E4E4E7]">
            <Navbar />
            
            {/* Ambient background effects */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[40%] left-[10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[128px]" />
                <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[128px]" />
                <div className="absolute bottom-[10%] left-[40%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[128px]" />
            </div>
            
            <main className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
                {children}
            </main>

            <footer className="relative mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Company</h3>
                            <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Building excellence through innovation and dedication.
                            </p>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Quick Links</h3>
                            <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                            <ul className="space-y-3">
                                {[
                                    { href: '/about', label: 'About Us' },
                                    { href: '/products', label: 'Products' },
                                    { href: '/articles', label: 'Articles' },
                                    { href: '/contact', label: 'Contact' },
                                ].map((link) => (
                                    <li key={link.href}>
                                        <Link 
                                            href={link.href} 
                                            className="group inline-flex items-center text-sm text-zinc-400 transition-colors hover:text-white"
                                        >
                                            <span className="mr-2 h-px w-0 bg-violet-500 transition-all group-hover:w-4" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Contact Info</h3>
                            <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                            <ul className="space-y-3 text-sm text-zinc-400">
                                <li className="flex items-center gap-2">
                                    <span className="text-violet-500">→</span>
                                    <span>info@company.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-violet-500">→</span>
                                    <span>+62 123 4567 890</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-violet-500">→</span>
                                    <span>Jakarta, Indonesia</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        className="mt-12 border-t border-white/5 pt-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="text-center text-xs text-zinc-500">
                            &copy; {new Date().getFullYear()} Company. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}