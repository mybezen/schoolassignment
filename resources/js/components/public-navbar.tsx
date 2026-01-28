import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Vission & Mission', href: '/vision-mission' },
        { name: 'Products', href: '/products' },
        { name: 'Articles', href: '/articles' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-black/60 backdrop-blur-2xl border-b border-white/5'
                    : 'bg-transparent'
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-lg bg-violet-500/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-110">
                                <Code2 className="h-5 w-5 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-white">
                                ByteCraft
                            </span>
                            <span className="text-[10px] font-medium text-zinc-400">
                                Software Development
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="group relative px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white hover:scale-105 active:scale-95"
                            >
                                {item.name}

                                {/* Underline grow from center */}
                                <span className="absolute left-1/2 bottom-1.5 h-[2px] w-0 bg-gradient-to-r from-violet-400 via-violet-500 to-purple-500 transition-all duration-400 ease-out group-hover:w-full group-hover:left-0 group-hover:right-0 rounded-full" />

                                {/* Subtle glow effect */}
                                <span className="absolute inset-0 rounded-lg bg-violet-500/0 group-hover:bg-violet-500/10 transition-all duration-300 blur-md opacity-0 group-hover:opacity-70" />
                            </Link>
                        ))}

                        {/* Login Button - dengan efek fancy */}
                        <Link
                            href="/login"
                            className="ml-4 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden rounded-lg p-2 text-zinc-400 hover:text-white transition-transform active:scale-90"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="space-y-1 px-6 py-4">
                            {navigation.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.06 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="group block rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:bg-white/5 hover:text-white hover:pl-6 active:scale-98"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="relative inline-block">
                                            {item.name}
                                            {/* Mobile underline */}
                                            <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full" />
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}

                            <Link
                                href="/login"
                                className="mt-4 block rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] active:scale-98"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}