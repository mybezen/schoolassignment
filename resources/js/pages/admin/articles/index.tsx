import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';
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

interface Article {
    id: number;
    title: string;
    excerpt: string | null;
    thumbnail: string | null;
    author: string | null;
    published_at: string | null;
    is_published: boolean;
    created_at: string;
}

interface PaginatedArticles {
    data: Article[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ArticlesIndexProps {
    articles: PaginatedArticles;
}

export default function ArticlesIndex({ articles }: ArticlesIndexProps) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/articles/${id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout>
            <Head title="Articles" />

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
                                Articles
                            </h1>
                            <p className="text-muted-foreground mt-1">Manage your articles and content</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                                <Link href="/admin/articles/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Article
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <AnimatePresence mode="wait">
                            {articles.data.length === 0 ? (
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
                                        <FileText className="h-12 w-12 text-primary" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">No articles yet</h3>
                                    <p className="text-muted-foreground text-center mb-6 max-w-sm">
                                        Get started by creating your first article
                                    </p>
                                    <Button asChild variant="outline">
                                        <Link href="/admin/articles/create">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Article
                                        </Link>
                                    </Button>
                                </motion.div>
                            ) : (
                                <Table key="table">
                                    <TableHeader>
                                        <TableRow className="border-border/50 hover:bg-transparent">
                                            <TableHead>Thumbnail</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Published</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
                                            {articles.data.map((article, index) => (
                                                <motion.tr
                                                    key={article.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: index * 0.05,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                    className="border-border/50 group hover:bg-accent/30 transition-colors duration-200"
                                                >
                                                    <TableCell>
                                                        <motion.div
                                                            whileHover={{ scale: 1.1 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            {article.thumbnail ? (
                                                                <div className="relative h-12 w-12 rounded-lg overflow-hidden ring-1 ring-border/50 shadow-lg">
                                                                    <img
                                                                        src={`/storage/${article.thumbnail}`}
                                                                        alt={article.title}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                            ) : (
                                                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ring-1 ring-border/50">
                                                                    <FileText className="h-5 w-5 text-muted-foreground/50" />
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <span className="group-hover:text-primary transition-colors duration-200">
                                                            {article.title}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {article.author || '—'}
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {article.published_at
                                                            ? format(
                                                                new Date(article.published_at),
                                                                'MMM dd, yyyy'
                                                            )
                                                            : '—'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div
                                                            initial={{ scale: 0.9, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 + 0.2 }}
                                                        >
                                                            <Badge
                                                                variant={
                                                                    article.is_published ? 'default' : 'secondary'
                                                                }
                                                                className={article.is_published ? 'shadow-sm shadow-primary/50' : ''}
                                                            >
                                                                {article.is_published ? 'Published' : 'Draft'}
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
                                                                    <Link href={`/admin/articles/${article.id}/edit`}>
                                                                        <Pencil className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                            </motion.div>
                                                            <AlertDialog
                                                                open={deleteId === article.id}
                                                                onOpenChange={(open) => !open && setDeleteId(null)}
                                                            >
                                                                <AlertDialogTrigger asChild>
                                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="hover:bg-destructive/10 hover:text-destructive"
                                                                            onClick={() => setDeleteId(article.id)}
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
                                                                            onClick={() => handleDelete(article.id)}
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