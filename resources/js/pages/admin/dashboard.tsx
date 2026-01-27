import { Head, Link } from '@inertiajs/react';
import { BoxIcon, BookOpen, Calendar, ImageIcon, Users, Mail, Plus, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'motion/react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DashboardStats {
    products: number;
    articles: number;
    events: number;
    galleries: number;
    clients: number;
    unread_messages: number;
}

interface DashboardProps {
    stats: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
    const statCards = [
        {
            title: 'Products',
            value: stats.products,
            icon: BoxIcon,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            link: '/admin/products',
        },
        {
            title: 'Articles',
            value: stats.articles,
            icon: BookOpen,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            link: '/admin/articles',
        },
        {
            title: 'Events',
            value: stats.events,
            icon: Calendar,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            link: '/admin/events',
        },
        {
            title: 'Gallery',
            value: stats.galleries,
            icon: ImageIcon,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
            link: '/admin/gallery',
        },
        {
            title: 'Clients',
            value: stats.clients,
            icon: Users,
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
            link: '/admin/clients',
        },
        {
            title: 'Unread Messages',
            value: stats.unread_messages,
            icon: Mail,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            link: '/admin/contacts',
        },
    ];

    const quickActions = [
        {
            title: 'New Product',
            description: 'Add a new product',
            icon: BoxIcon,
            link: '/admin/products/create',
            color: 'text-blue-500',
        },
        {
            title: 'New Article',
            description: 'Write a new article',
            icon: BookOpen,
            link: '/admin/articles/create',
            color: 'text-green-500',
        },
        {
            title: 'New Event',
            description: 'Create an event',
            icon: Calendar,
            link: '/admin/events/create',
            color: 'text-purple-500',
        },
        {
            title: 'Upload Image',
            description: 'Add to gallery',
            icon: ImageIcon,
            link: '/admin/gallery/create',
            color: 'text-orange-500',
        },
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />
            
            <motion.div 
                className="flex h-full flex-1 flex-col gap-6 p-6 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                            <p className="text-muted-foreground mt-1">Welcome back to your admin panel</p>
                        </div>
                        <motion.div 
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                            <Activity className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">System Active</span>
                        </motion.div>
                    </div>
                </motion.div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    {/* Left Side - Overview & Activity */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-semibold">Overview</h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {statCards.map((stat, index) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={stat.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                delay: 0.15 + index * 0.05,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            whileHover={{ y: -4 }}
                                        >
                                            <Link href={stat.link}>
                                                <Card className="border-border/50 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-black/10 hover:border-primary/20 transition-all duration-300 group cursor-pointer">
                                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                        <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                                                            {stat.title}
                                                        </CardTitle>
                                                        <motion.div 
                                                            className={`${stat.bgColor} p-2 rounded-lg ring-1 ring-border/50`}
                                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                        >
                                                            <Icon className={`h-4 w-4 ${stat.color}`} />
                                                        </motion.div>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <motion.div 
                                                            className="text-3xl font-bold"
                                                            initial={{ scale: 0.5, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: 0.2 + index * 0.05 }}
                                                        >
                                                            {stat.value}
                                                        </motion.div>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            Total {stat.title.toLowerCase()}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="grid gap-4 md:grid-cols-2"
                        >
                            <Card className="border-border/50 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-primary" />
                                        Recent Activity
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <p className="text-sm">System running smoothly</p>
                                        </motion.div>
                                        <motion.div 
                                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.75 }}
                                        >
                                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                                            <p className="text-sm">All services operational</p>
                                        </motion.div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 shadow-lg shadow-black/5 bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Mail className="h-5 w-5 text-primary" />
                                        Messages
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {stats.unread_messages > 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <Link href="/admin/contacts">
                                                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-colors cursor-pointer">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-primary">
                                                                {stats.unread_messages} unread message{stats.unread_messages !== 1 ? 's' : ''}
                                                            </span>
                                                            <Button size="sm" variant="ghost" className="h-8">
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ) : (
                                            <motion.div 
                                                className="p-4 rounded-lg bg-muted/30 border border-border/50 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                <p className="text-sm text-muted-foreground">No unread messages</p>
                                            </motion.div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Side - Quick Actions (Vertical) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Plus className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-semibold">Quick Actions</h2>
                        </div>
                        <div className="space-y-3">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <motion.div
                                        key={action.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            duration: 0.3, 
                                            delay: 0.45 + index * 0.05,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link href={action.link}>
                                            <Card className="border-border/50 shadow-md shadow-black/5 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <motion.div 
                                                            className="p-2.5 rounded-lg bg-primary/10 ring-1 ring-primary/20 group-hover:bg-primary/20 transition-colors duration-200"
                                                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                                            transition={{ duration: 0.5 }}
                                                        >
                                                            <Icon className={`h-4 w-4 ${action.color}`} />
                                                        </motion.div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors duration-200">
                                                                {action.title}
                                                            </h3>
                                                            <p className="text-xs text-muted-foreground">
                                                                {action.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}