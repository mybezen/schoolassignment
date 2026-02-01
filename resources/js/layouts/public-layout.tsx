import { PropsWithChildren, useEffect, useState } from 'react';
import Navbar from '@/components/public-navbar';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { router } from '@inertiajs/react';
import AiChatbot from '@/components/ai-chatbot';
import { MessageSquare, Package, Newspaper, Info, ArrowRight } from 'lucide-react';

export default function PublicLayout({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeStart = router.on('start', () => setLoading(true));
    const unsubscribeFinish = router.on('finish', () => setLoading(false));
    const unsubscribeError = router.on('error', () => setLoading(false));

    return () => {
      unsubscribeStart();
      unsubscribeFinish();
      unsubscribeError();
    };
  }, []);

  // Variants untuk section footer
  const footerSectionVariants : Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.4, 0, 0.2, 1] // Using cubic-bezier values
    }
  }
};

  // Variants untuk quick action cards (big buttons)
  const quickActionVariants : Variants = {
    rest: { 
      scale: 1, 
      y: 0,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05, 
      y: -8,
      boxShadow: "0 20px 40px -10px rgba(139, 92, 246, 0.4)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  // Variants untuk icon di quick action
  const iconVariants : Variants = {
    rest: { rotate: 0, scale: 1 },
    hover: { rotate: 12, scale: 1.15 }
  };

  // Variants khusus untuk Quick Links list item
  const quickLinkVariants : Variants = {
    rest: { x: 0 },
    hover: { x: 4 }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E4E4E7] relative">
      <Navbar />

      {/* Ambient background effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] left-[10%] h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[128px]" />
        <div className="absolute bottom-[10%] left-[40%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[128px]" />
      </div>

      <main className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        {children}
      </main>

      <footer className="relative mt-32 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
          <motion.div
            variants={footerSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-12 md:grid-cols-3"
          >
            <div>
              <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Company</h3>
              <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
              <p className="text-sm leading-relaxed text-zinc-400">
                Building excellence through innovation and dedication.
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Quick Links</h3>
              <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
              <ul className="space-y-3">
                {[
                  { href: '/about', label: 'About Us' },
                  { href: '/products', label: 'Products' },
                  { href: '/articles', label: 'Articles' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <motion.li
                    key={link.href}
                    initial="rest"
                    whileHover="hover"
                    variants={quickLinkVariants}
                  >
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-sm text-zinc-400 transition-colors hover:text-white"
                    >
                      <motion.span 
                        className="mr-2 h-px bg-violet-500 transition-all"
                        variants={quickLinkVariants}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium tracking-wide text-white">Contact Info</h3>
              <div className="mb-4 h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="text-violet-500">→</span>
                  <span>info@bytecraft.com</span>
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
            </div>
          </motion.div>

          {/* Quick Action Buttons dengan animasi hover */}
          <motion.div
            variants={footerSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 border-t border-white/5 pt-12"
          >
            <h3 className="mb-6 text-center text-xl font-semibold text-white">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { href: '/contact', label: 'Get in Touch', icon: MessageSquare, color: 'from-violet-600 to-purple-600' },
                { href: '/products', label: 'View Products', icon: Package, color: 'from-blue-600 to-cyan-600' },
                { href: '/articles', label: 'Read Articles', icon: Newspaper, color: 'from-purple-600 to-pink-600' },
                { href: '/about', label: 'About Us', icon: Info, color: 'from-amber-600 to-orange-600' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.href}
                    variants={quickActionVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      href={action.href}
                      className={`group flex flex-col items-center gap-3 rounded-xl bg-gradient-to-br ${action.color} p-6 text-white shadow-lg transition-all`}
                    >
                      <motion.div variants={iconVariants}>
                        <Icon className="h-8 w-8" strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-sm font-medium">{action.label}</span>
                      <ArrowRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 border-t border-white/5 pt-8"
          >
            <p className="text-center text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} ByteCraft. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      <AiChatbot />

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full shadow-2xl shadow-violet-500/30"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute mt-24 text-violet-300 text-sm font-medium tracking-wider"
            >
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}