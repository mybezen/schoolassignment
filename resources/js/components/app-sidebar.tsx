import { Link, usePage } from '@inertiajs/react';
import { 
    BoxIcon, 
    Calendar1, 
    CreditCard, 
    ImageIcon, 
    LayoutGrid, 
    Mail, 
    Paperclip, 
    Users 
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { title: 'Products', href: '/admin/products', icon: BoxIcon },
    { title: 'Articles', href: '/admin/articles', icon: Paperclip },
    { title: 'Events', href: '/admin/events', icon: Calendar1 },
    { title: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { title: 'Clients', href: '/admin/clients', icon: Users },
    { title: 'Contact Messages', href: '/admin/contacts', icon: Mail },
    { title: 'Payments', href: '/admin/payments', icon: CreditCard },
];

export function AppSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';
    const sidebarRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const { url } = usePage();

    useEffect(() => {
        if (!sidebarRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sidebarRef.current,
                { x: -80, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.9, ease: 'power4.out' }
            );

            gsap.to(headerRef.current, {
                backgroundPosition: '200% 0%',
                duration: 7,
                repeat: -1,
                ease: 'linear',
            });
        });

        return () => ctx.revert();
    }, []);

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.06,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
            },
        }),
    };

    return (
        <Sidebar collapsible="icon" variant="inset" ref={sidebarRef} className="border-r border-white/5">
            <SidebarHeader 
                ref={headerRef}
                className="relative border-b border-white/5 bg-gradient-to-r from-indigo-950/40 via-slate-900/50 to-cyan-950/30 bg-[length:200%_100%]"
            >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group relative overflow-hidden">
                            <Link href="/admin/dashboard">
                                <div className="flex items-center gap-3">
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 8 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
                                        <img 
                                            src="/logo.svg" 
                                            alt="Logo" 
                                            className="h-9 w-9 relative z-10"
                                        />
                                    </motion.div>

                                    <AnimatePresence mode="wait">
                                        {!isCollapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -12 }}
                                                className="text-lg font-bold bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent"
                                            >
                                                Admin Panel
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.07 } },
                    }}
                >
                    {mainNavItems.map((item, index) => {
                        const isActive = typeof item.href === 'string' && url.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <motion.div key={item.title} custom={index} variants={itemVariants}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isActive}
                                    tooltip={isCollapsed ? item.title : undefined}
                                    className={`group relative my-1 rounded-xl transition-all duration-300 ${
                                        isActive 
                                            ? 'bg-gradient-to-r from-cyan-600/20 to-blue-700/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                                            : 'hover:bg-white/5 hover:shadow-sm'
                                    }`}
                                >
                                    <Link href={item.href}>
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: isActive ? 0 : [0, -6, 6, -6, 0] }}
                                                transition={{ duration: 0.4 }}
                                                className="relative"
                                            >
                                                {Icon && <Icon className={`h-5 w-5 ${isActive ? 'text-cyan-400' : 'text-zinc-400 group-hover:text-cyan-400'}`} />}
                                                {isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md"
                                                        animate={{ scale: [1, 1.35, 1] }}
                                                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                                                    />
                                                )}
                                            </motion.div>

                                            <AnimatePresence mode="wait">
                                                {!isCollapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -8 }}
                                                        className={`text-sm font-medium ${
                                                            isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                                                        }`}
                                                    >
                                                        {item.title}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {isActive && !isCollapsed && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-r-full"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </SidebarContent>

            <SidebarFooter className="border-t border-white/5 p-4">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}