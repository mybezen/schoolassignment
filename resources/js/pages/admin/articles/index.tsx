import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
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
    const handleDelete = (id: number) => {
        router.delete(`/admin/articles/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Articles" />

            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Articles</h1>
                            <p className="text-muted-foreground">Manage your articles</p>
                        </div>
                        <Button asChild>
                            <Link href="/admin/articles/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Article
                            </Link>
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Thumbnail</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Published</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            No articles found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    articles.data.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                {article.thumbnail ? (
                                                    <img
                                                        src={`/storage/${article.thumbnail}`}
                                                        alt={article.title}
                                                        className="h-12 w-12 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded bg-muted" />
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {article.title}
                                            </TableCell>
                                            <TableCell>{article.author || '-'}</TableCell>
                                            <TableCell>
                                                {article.published_at
                                                    ? format(
                                                        new Date(article.published_at),
                                                        'MMM dd, yyyy'
                                                    )
                                                    : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        article.is_published ? 'default' : 'secondary'
                                                    }
                                                >
                                                    {article.is_published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/articles/${article.id}/edit`}>
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
                                                                    Delete Article
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this
                                                                    article? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(article.id)}
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