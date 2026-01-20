import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2, Mail, MailOpen } from 'lucide-react';
import { format } from 'date-fns';

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
    const handleDelete = (id: number) => {
        router.delete(`/admin/contacts/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Contact Messages" />
            <div className='p-6'>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Contact Messages</h1>
                            <p className="text-muted-foreground">View messages from your contact form</p>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
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
                                {messages.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            No messages found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    messages.data.map((message) => (
                                        <TableRow
                                            key={message.id}
                                            className={!message.is_read ? 'bg-muted/50' : ''}
                                        >
                                            <TableCell>
                                                {message.is_read ? (
                                                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <Mail className="h-4 w-4 text-blue-600" />
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {message.name}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {message.email}
                                            </TableCell>
                                            <TableCell>
                                                {message.subject || '-'}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {format(new Date(message.created_at), 'MMM dd, yyyy')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        message.is_read ? 'secondary' : 'default'
                                                    }
                                                >
                                                    {message.is_read ? 'Read' : 'New'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/contacts/${message.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Delete Message
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this
                                                                    message? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(message.id)}
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}