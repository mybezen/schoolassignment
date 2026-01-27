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
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
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
                                className="relative px-3 py-2 text-sm font-medium text-zinc-400 transition hover:text-white"
                            >
                                {item.name}
                                <span className="absolute inset-x-0 -bottom-px h-px scale-x-0 bg-gradient-to-r from-violet-500 to-purple-500 transition-transform group-hover:scale-x-100" />
                            </Link>
                        ))}

                        {/* Login */}
                        <Link
                            href="/login"
                            className="ml-4 rounded-lg border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden rounded-lg p-2 text-zinc-400 hover:text-white"
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
                        className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-2xl"
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
                                        className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <Link
                                href="/login"
                                className="mt-2 block rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-white"
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
