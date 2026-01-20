import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';

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

interface Client {
    id: number;
    name: string;
    logo: string;
    website: string | null;
    description: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
}

interface PaginatedClients {
    data: Client[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ClientsIndexProps {
    clients: PaginatedClients;
}

export default function ClientsIndex({ clients }: ClientsIndexProps) {
    const handleDelete = (id: number) => {
        router.delete(`/admin/clients/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Clients" />
            <div className='p-6'>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Clients</h1>
                            <p className="text-muted-foreground">Manage your clients</p>
                        </div>
                        <Button asChild>
                            <Link href="/admin/clients/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Client
                            </Link>
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clients.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No clients found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    clients.data.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell>
                                                <img
                                                    src={`/storage/${client.logo}`}
                                                    alt={client.name}
                                                    className="h-12 w-12 rounded object-contain"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {client.name}
                                            </TableCell>
                                            <TableCell>
                                                {client.website ? (
                                                    <a
                                                        href={client.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 text-blue-600 hover:underline"
                                                    >
                                                        Visit
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                ) : (
                                                    '-'
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        client.is_active ? 'default' : 'secondary'
                                                    }
                                                >
                                                    {client.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/clients/${client.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
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
                                                                    Delete Client
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this
                                                                    client? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(client.id)}
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