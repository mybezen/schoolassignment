import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // ← perbaiki import motion/react → framer-motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { url: currentUrl } = usePage(); // rename biar jelas

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
      transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-violet-500/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-600/40 transition-transform group-hover:scale-110">
                <Code2 className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white tracking-tight">ByteCraft</span>
              <span className="text-[10px] font-medium text-zinc-400">Software Development</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navigation.map((item) => {
              // Pakai exact match atau startsWith tergantung kebutuhan
              // Exact cocok untuk halaman tanpa sub-page
              // const isActive = currentUrl === item.href;

              // Alternatif: jika ada sub-page (misal /articles/1), pakai startsWith
              const isActive = currentUrl === item.href || currentUrl.startsWith(item.href + '/');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-zinc-300 hover:text-white'
                  } hover:scale-105 active:scale-95`}
                >
                  {item.name}

                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 right-0 bottom-1.5 h-[3px] bg-gradient-to-r from-violet-400 via-violet-500 to-purple-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                    />
                  )}

                  {!isActive && (
                    <span className="absolute left-1/2 bottom-1.5 h-[2px] w-0 bg-gradient-to-r from-violet-400 via-violet-500 to-purple-500 transition-all duration-400 ease-out group-hover:w-full group-hover:left-0 rounded-full" />
                  )}

                  <span className="absolute inset-0 rounded-lg bg-violet-500/0 group-hover:bg-violet-500/10 transition-all duration-300 blur-md opacity-0 group-hover:opacity-70 pointer-events-none" />
                </Link>
              );
            })}

            <Link
              href="/login"
              className="ml-6 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-500/50 hover:bg-violet-500/15 hover:shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:scale-105 active:scale-95"
            >
              Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-zinc-300 hover:text-white transition-transform active:scale-90"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden border-t border-white/5 bg-black/85 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-5 py-6 space-y-2">
              {navigation.map((item, i) => {
                const isActive = currentUrl === item.href;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex items-center rounded-lg px-5 py-3.5 text-base font-medium transition-all ${
                        isActive
                          ? 'bg-violet-500/15 text-white border-l-4 border-violet-500'
                          : 'text-zinc-300 hover:bg-white/5 hover:text-white hover:pl-6'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/login"
                  className="mt-5 block rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3.5 text-center text-base font-medium text-white shadow-lg shadow-violet-700/30 transition-all hover:scale-[1.03] hover:shadow-violet-700/50 active:scale-98"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Masuk
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}