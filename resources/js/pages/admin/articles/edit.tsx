import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Article {
    id: number;
    title: string;
    excerpt: string | null;
    content: string;
    author: string | null;
    thumbnail: string | null;
    published_at: string | null;
    is_published: boolean;
}

interface ArticlesEditProps {
    article: Article;
}

export default function ArticlesEdit({ article }: ArticlesEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: article.title,
        excerpt: article.excerpt || '',
        content: article.content,
        author: article.author || '',
        thumbnail: null as File | null,
        published_at: article.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : '',
        is_published: article.is_published,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/articles/${article.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Article" />

            <div className="max-w-2xl space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Edit Article</h1>
                    <p className="text-muted-foreground">Update article information</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Article Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={2}
                                    placeholder="Short description of the article"
                                />
                                {errors.excerpt && (
                                    <p className="text-sm text-destructive">{errors.excerpt}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    rows={10}
                                    required
                                />
                                {errors.content && (
                                    <p className="text-sm text-destructive">{errors.content}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                />
                                {errors.author && (
                                    <p className="text-sm text-destructive">{errors.author}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                {article.thumbnail && (
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${article.thumbnail}`}
                                            alt={article.title}
                                            className="h-32 w-48 rounded object-cover"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="thumbnail"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData('thumbnail', e.target.files?.[0] || null)
                                    }
                                />
                                {errors.thumbnail && (
                                    <p className="text-sm text-destructive">{errors.thumbnail}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="published_at">Published Date</Label>
                                <Input
                                    id="published_at"
                                    type="datetime-local"
                                    value={data.published_at}
                                    onChange={(e) => setData('published_at', e.target.value)}
                                />
                                {errors.published_at && (
                                    <p className="text-sm text-destructive">{errors.published_at}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_published"
                                    checked={data.is_published}
                                    onCheckedChange={(checked) => setData('is_published', checked)}
                                />
                                <Label htmlFor="is_published">Published</Label>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Update Article
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}