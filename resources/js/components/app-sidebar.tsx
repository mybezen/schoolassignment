import { Link } from '@inertiajs/react';
import { 
    BookOpen, 
    BoxIcon, 
    Calendar1, 
    ImageIcon, 
    LayoutGrid, 
    Mail, 
    Users 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
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
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: BoxIcon,
    },
    {
        title: 'Articles',
        href: '/admin/articles',
        icon: BookOpen,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: Calendar1,
    },
    {
        title: 'Gallery',
        href: '/admin/gallery',
        icon: ImageIcon,
    },
    {
        title: 'Clients',
        href: '/admin/clients',
        icon: Users,
    },
    {
        title: 'Contact Messages',
        href: '/admin/contacts',
        icon: Mail,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { state, open } = useSidebar();
    const isCollapsed = state === 'collapsed';
    const sidebarRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    // GSAP entrance animation on mount
    useEffect(() => {
        if (!sidebarRef.current) return;

        const ctx = gsap.context(() => {
            // Sidebar entrance
            gsap.fromTo(
                sidebarRef.current,
                { 
                    x: -100, 
                    opacity: 0,
                },
                { 
                    x: 0, 
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                }
            );

            // Header glow pulse
            gsap.to(headerRef.current, {
                boxShadow: '0 0 20px rgba(var(--primary), 0.3)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }, sidebarRef);

        return () => ctx.revert();
    }, []);

    // GSAP animation for expand/collapse with elastic effect
    useEffect(() => {
        if (!contentRef.current) return;

        const ctx = gsap.context(() => {
            if (isCollapsed) {
                gsap.to(contentRef.current, {
                    scale: 0.95,
                    opacity: 0.7,
                    duration: 0.4,
                    ease: 'back.in(2)',
                });
            } else {
                gsap.to(contentRef.current, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.6)',
                });
            }
        }, sidebarRef);

        return () => ctx.revert();
    }, [isCollapsed]);

    return (
        <Sidebar collapsible="icon" variant="inset" ref={sidebarRef}>
            <SidebarHeader 
                ref={headerRef}
                className="border-b border-sidebar-border/50 relative overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5"
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="group relative z-10">
                            <Link href={'/admin/dashboard'} prefetch>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2"
                                >
                                    <motion.img 
                                        src="/logo.svg" 
                                        alt="Logo" 
                                        className="h-8 w-8"
                                        whileHover={{ 
                                            rotate: [0, -10, 10, -10, 0],
                                            transition: { duration: 0.5 }
                                        }}
                                    />
                                    <AnimatePresence mode="wait">
                                        {!isCollapsed && (
                                            <motion.h1
                                                key="title"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                                            >
                                                Admin Panel
                                            </motion.h1>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent ref={contentRef} className="py-2 relative">
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(var(--primary), 0.05), transparent 70%)',
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                />
                <AnimatePresence mode="wait">
                    {!isCollapsed ? (
                        <motion.div
                            key="expanded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.16, 1, 0.3, 1],
                                staggerChildren: 0.05,
                            }}
                        >
                            <NavMain items={mainNavItems} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <NavMain items={mainNavItems} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </SidebarContent>

            <SidebarFooter 
                ref={footerRef}
                className="border-t border-sidebar-border/50 relative overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                />
                <AnimatePresence mode="wait">
                    {!isCollapsed ? (
                        <motion.div
                            key="footer-expanded"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ 
                                duration: 0.4, 
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.1,
                            }}
                            className="relative z-10"
                        >
                            <NavUser />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="footer-collapsed"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10"
                        >
                            <NavUser />
                        </motion.div>
                    )}
                </AnimatePresence>
            </SidebarFooter>
        </Sidebar>
    );
}