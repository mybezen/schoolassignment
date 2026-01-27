import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2, Mail, MailOpen } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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

interface PaginatedMessages {
    data: ContactMessage[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ContactsIndexProps {
    messages: PaginatedMessages;
}

export default function ContactsIndex({ messages }: ContactsIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/contacts/${id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Messages" />

            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="space-y-6">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Contact Messages
                            </h1>
                            <p className="text-muted-foreground mt-1">View messages from your contact form</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <AnimatePresence mode="wait">
                            {messages.data.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center justify-center py-16 px-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="rounded-full bg-primary/10 p-6 mb-4"
                                    >
                                        <Mail className="h-12 w-12 text-primary" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                                    <p className="text-muted-foreground text-center max-w-sm">
                                        Messages from your contact form will appear here
                                    </p>
                                </motion.div>
                            ) : (
                                <Table key="table">
                                    <TableHeader>
                                        <TableRow className="border-border/50 hover:bg-transparent">
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
                                            {messages.data.map((message, index) => (
                                                <motion.tr
                                                    key={message.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: index * 0.05,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                    className={`border-border/50 group hover:bg-accent/30 transition-colors duration-200 ${!message.is_read ? 'bg-primary/5' : ''}`}
                                                >
                                                    <TableCell>
                                                        {message.is_read ? (
                                                            <MailOpen className="h-4 w-4 text-muted-foreground/40" />
                                                        ) : (
                                                            <Mail className="h-4 w-4 text-primary" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <span className="group-hover:text-primary transition-colors duration-200">
                                                            {message.name}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {message.email}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {message.subject || '—'}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">
                                                        {format(new Date(message.created_at), 'MMM dd, yyyy')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div
                                                            initial={{ scale: 0.9, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 + 0.2 }}
                                                        >
                                                            <Badge
                                                                variant={message.is_read ? 'secondary' : 'default'}
                                                                className={message.is_read ? '' : 'shadow-sm shadow-primary/50'}
                                                            >
                                                                {message.is_read ? 'Read' : 'New'}
                                                            </Badge>
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                    className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                                                >
                                                                    <Link href={`/admin/contacts/${message.id}`}>
                                                                        <Eye className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                            </motion.div>
                                                            <AlertDialog
                                                                open={deleteId === message.id}
                                                                onOpenChange={(open) => !open && setDeleteId(null)}
                                                            >
                                                                <AlertDialogTrigger asChild>
                                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="hover:bg-destructive/10 hover:text-destructive"
                                                                            onClick={() => setDeleteId(message.id)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </motion.div>
                                                                </AlertDialogTrigger>

                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Are you sure you want to delete this message? This action cannot be undone.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(message.id)}
                                                                            className="bg-destructive hover:bg-destructive/90"
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                        </div>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </TableBody>
                                </Table>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}