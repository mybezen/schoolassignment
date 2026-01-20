import { Head } from '@inertiajs/react';
import { BoxIcon, BookOpen, Calendar, ImageIcon, Users, Mail } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
            color: 'text-blue-600',
        },
        {
            title: 'Articles',
            value: stats.articles,
            icon: BookOpen,
            color: 'text-green-600',
        },
        {
            title: 'Events',
            value: stats.events,
            icon: Calendar,
            color: 'text-purple-600',
        },
        {
            title: 'Gallery',
            value: stats.galleries,
            icon: ImageIcon,
            color: 'text-orange-600',
        },
        {
            title: 'Clients',
            value: stats.clients,
            icon: Users,
            color: 'text-indigo-600',
        },
        {
            title: 'Unread Messages',
            value: stats.unread_messages,
            icon: Mail,
            color: 'text-red-600',
        },
    ];

    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome to your admin panel</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.title}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stat.title}
                                        </CardTitle>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}