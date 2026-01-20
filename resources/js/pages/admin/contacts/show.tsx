import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';

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

            <div className="flex h-full flex-1 justify-center p-6 overflow-x-auto">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/contacts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold">Contact Message</h1>
                            <p className="text-muted-foreground">Message details</p>
                        </div>
                        <Badge variant={message.is_read ? 'secondary' : 'default'}>
                            {message.is_read ? 'Read' : 'New'}
                        </Badge>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {message.subject || 'No Subject'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-muted p-2">
                                        <Mail className="h-4 w-4" />
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
                                </div>

                                {message.phone && (
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-full bg-muted p-2">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                Phone
                                            </p>
                                            <p className="font-medium">{message.phone}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-muted p-2">
                                        <Calendar className="h-4 w-4" />
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
                                            <p className="text-sm text-muted-foreground">
                                                Read on{' '}
                                                {format(
                                                    new Date(message.read_at),
                                                    'MMMM dd, yyyy \'at\' h:mm a'
                                                )}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <p className="mb-2 text-sm font-medium text-muted-foreground">
                                    Message
                                </p>
                                <div className="rounded-md bg-muted p-4">
                                    <p className="whitespace-pre-wrap">{message.message}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" asChild>
                                    <a href={`mailto:${message.email}`}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Reply via Email
                                    </a>
                                </Button>
                                {message.phone && (
                                    <Button variant="outline" asChild>
                                        <a href={`tel:${message.phone}`}>
                                            <Phone className="mr-2 h-4 w-4" />
                                            Call
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}