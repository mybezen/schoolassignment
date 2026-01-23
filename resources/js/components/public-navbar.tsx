// resources/js/components/public-navbar.tsx
import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, Coffee } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Products', href: '/products' },
        { name: 'Articles', href: '/articles' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-[#E8DCC8] bg-gradient-to-r from-[#FFFBF5] to-[#FFF8ED] shadow-sm backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="rounded-full bg-gradient-to-br from-[#BFA888] to-[#6F5B3A] p-2 shadow-md transition-shadow group-hover:shadow-lg">
                            <Coffee className="h-5 w-5 text-[#FFFBF5]" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-[#A67C52] to-[#5C4A30] bg-clip-text text-transparent">
                            Company
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-[#4A3926] transition-all hover:bg-[#F5EFE6] hover:text-[#6F5B3A]"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg p-2 text-[#5C4A30] hover:bg-[#F5EFE6] md:hidden"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-[#E8DCC8] bg-[#FFFBF5] md:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-lg px-4 py-2 text-base font-medium text-[#4A3926] hover:bg-[#F5EFE6] hover:text-[#6F5B3A]"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}