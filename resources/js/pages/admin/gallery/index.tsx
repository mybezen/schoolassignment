import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, ImageIcon, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

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
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/gallery/${id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout>
            <Head title="Gallery" />
            
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
                                Gallery
                            </h1>
                            <p className="text-muted-foreground mt-1">Manage your image collection</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                                <Link href="/admin/gallery/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Image
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {galleries.data.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5"
                            >
                                <div className="flex flex-col items-center justify-center py-16 px-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="rounded-full bg-primary/10 p-6 mb-4"
                                    >
                                        <ImageIcon className="h-12 w-12 text-primary" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">No images yet</h3>
                                    <p className="text-muted-foreground text-center mb-6 max-w-sm">
                                        Start building your gallery by uploading your first image
                                    </p>
                                    <Button asChild variant="outline">
                                        <Link href="/admin/gallery/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Upload Image
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="grid"
                                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {galleries.data.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ 
                                            duration: 0.4, 
                                            delay: index * 0.05,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        whileHover={{ y: -4 }}
                                    >
                                        <Card className="overflow-hidden border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 group">
                                            <CardContent className="p-0 relative">
                                                <motion.div 
                                                    className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <img
                                                        src={`/storage/${item.image}`}
                                                        alt={item.title || 'Gallery image'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                </motion.div>
                                            </CardContent>
                                            <CardFooter className="flex flex-col items-start gap-3 p-4 border-t border-border/50">
                                                <div className="flex-1 w-full space-y-2">
                                                    {item.title && (
                                                        <h3 className="font-medium leading-tight group-hover:text-primary transition-colors duration-200">
                                                            {item.title}
                                                        </h3>
                                                    )}
                                                    {item.caption && (
                                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                                            {item.caption}
                                                        </p>
                                                    )}
                                                    {item.category && (
                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                            <Tag className="h-3 w-3" />
                                                            <span>{item.category}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex w-full gap-2">
                                                    <motion.div 
                                                        whileHover={{ scale: 1.05 }} 
                                                        whileTap={{ scale: 0.95 }}
                                                        className="flex-1"
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="w-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
                                                            asChild
                                                        >
                                                            <Link href={`/admin/gallery/${item.id}/edit`}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                    </motion.div>
                                                    <AlertDialog open={deleteId === item.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                                                        <AlertDialogTrigger asChild>
                                                            <motion.div 
                                                                whileHover={{ scale: 1.05 }} 
                                                                whileTap={{ scale: 0.95 }}
                                                                className="flex-1"
                                                            >
                                                                <Button 
                                                                    variant="outline" 
                                                                    size="sm" 
                                                                    className="w-full hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50 transition-all duration-200"
                                                                    onClick={() => setDeleteId(item.id)}
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Delete
                                                                </Button>
                                                            </motion.div>
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
                                                                <AlertDialogCancel onClick={() => setDeleteId(null)}>
                                                                    Cancel
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="bg-destructive hover:bg-destructive/90"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AppLayout>
    );
}