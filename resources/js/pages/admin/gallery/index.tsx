import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
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
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface Gallery {
    id: number;
    title: string | null;
    image: string;
    caption: string | null;
    category: string | null;
    order: number;
    created_at: string;
}

interface PaginatedGalleries {
    data: Gallery[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface GalleryIndexProps {
    galleries: PaginatedGalleries;
}

export default function GalleryIndex({ galleries }: GalleryIndexProps) {
    const handleDelete = (id: number) => {
        router.delete(`/admin/gallery/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Gallery" />
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Gallery</h1>
                            <p className="text-muted-foreground">Manage your gallery images</p>
                        </div>
                        <Button asChild>
                            <Link href="/admin/gallery/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Image
                            </Link>
                        </Button>
                    </div>

                    {galleries.data.length === 0 ? (
                        <div className="rounded-md border p-8 text-center">
                            <p className="text-muted-foreground">No images found</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {galleries.data.map((item) => (
                                <Card key={item.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title || 'Gallery image'}
                                            className="aspect-square w-full object-cover"
                                        />
                                    </CardContent>
                                    <CardFooter className="flex flex-col items-start gap-2 p-4">
                                        <div className="flex-1">
                                            {item.title && (
                                                <h3 className="font-medium">{item.title}</h3>
                                            )}
                                            {item.caption && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {item.caption}
                                                </p>
                                            )}
                                            {item.category && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {item.category}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex w-full gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                                asChild
                                            >
                                                <Link href={`/admin/gallery/${item.id}/edit`}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete Gallery Image
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this image?
                                                            This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}