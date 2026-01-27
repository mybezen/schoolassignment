import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'motion/react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
}

interface ContactsShowProps {
    message: ContactMessage;
}

export default function ContactsShow({ message }: ContactsShowProps) {
    return (
        <AppLayout>
            <Head title="View Message" />

            <motion.div 
                className="flex h-full flex-1 justify-center p-6 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                asChild
                                className="hover:bg-accent/50 transition-all duration-200"
                            >
                                <Link href="/admin/contacts">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                        </motion.div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Contact Message
                            </h1>
                            <p className="text-muted-foreground mt-1">Message details</p>
                        </div>
                        <Badge 
                            variant={message.is_read ? 'secondary' : 'default'}
                            className={message.is_read ? '' : 'shadow-sm shadow-primary/50'}
                        >
                            {message.is_read ? 'Read' : 'New'}
                        </Badge>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="text-xl font-medium">
                                    {message.subject || 'No Subject'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-4">
                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                From
                                            </p>
                                            <p className="font-medium">{message.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {message.email}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {message.phone && (
                                        <motion.div 
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.25 }}
                                        >
                                            <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                                <Phone className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    Phone
                                                </p>
                                                <p className="font-medium">{message.phone}</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Received
                                            </p>
                                            <p className="font-medium">
                                                {format(
                                                    new Date(message.created_at),
                                                    'MMMM dd, yyyy \'at\' h:mm a'
                                                )}
                                            </p>
                                            {message.read_at && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Read on{' '}
                                                    {format(
                                                        new Date(message.read_at),
                                                        'MMMM dd, yyyy \'at\' h:mm a'
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>

                                <Separator className="bg-border/50" />

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <p className="mb-3 text-sm font-medium text-muted-foreground">
                                        Message
                                    </p>
                                    <div className="rounded-lg bg-muted/30 border border-border/50 p-5">
                                        <p className="whitespace-pre-wrap leading-relaxed">{message.message}</p>
                                    </div>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="text-xl font-medium">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex flex-wrap gap-3">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button 
                                            variant="outline" 
                                            asChild
                                            className="hover:bg-accent/50 transition-all duration-200"
                                        >
                                            <a href={`mailto:${message.email}`}>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Reply via Email
                                            </a>
                                        </Button>
                                    </motion.div>
                                    {message.phone && (
                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                            <Button 
                                                variant="outline" 
                                                asChild
                                                className="hover:bg-accent/50 transition-all duration-200"
                                            >
                                                <a href={`tel:${message.phone}`}>
                                                    <Phone className="mr-2 h-4 w-4" />
                                                    Call
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}