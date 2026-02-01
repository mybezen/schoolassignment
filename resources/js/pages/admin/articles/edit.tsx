import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // ← perbaiki import (bukan 'motion/react')
import { CheckCircle2, FileText, Image as ImageIcon, User, Calendar, X } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';

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
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        excerpt: string;
        content: string;
        author: string;
        thumbnail?: File | null;          // ← optional, tidak di-set null default
        published_at: string;
        is_published: boolean;
        _method: string;
    }>({
        title: article.title,
        excerpt: article.excerpt || '',
        content: article.content,
        author: article.author || '',
        // Thumbnail dibiarkan undefined agar tidak dikirim jika tidak berubah
        published_at: article.published_at
            ? new Date(article.published_at).toISOString().slice(0, 16)
            : '',
        is_published: article.is_published,
        _method: 'PUT',
    });

    const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const publishDate = data.published_at ? new Date(data.published_at) : undefined;

    const handlePublishDateChange = (date: Date | undefined) => {
        if (date) {
            const isoString = date.toISOString().slice(0, 16);
            setData('published_at', isoString);
        } else {
            setData('published_at', '');
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setPreviewThumbnail(URL.createObjectURL(file));
        }
    };

    const clearNewThumbnail = () => {
        setData('thumbnail', null);
        setPreviewThumbnail(null);
        const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/articles/${article.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setPreviewThumbnail(null); // reset preview setelah sukses
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Article" />

            <motion.div
                className="flex h-full flex-1 justify-center p-6 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Edit Article
                        </h1>
                        <p className="text-muted-foreground mt-1">Update article information</p>
                    </motion.div>

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3 shadow-lg shadow-primary/10"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </motion.div>
                                <p className="text-sm font-medium">Article updated successfully!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-primary" />
                                    Article Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Title */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                        <Label htmlFor="title" className="text-sm font-medium">
                                            Title <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            onFocus={() => setFocusedField('title')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className={`transition-all duration-200 ${focusedField === 'title' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />
                                        <AnimatePresence>
                                            {errors.title && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.title}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Excerpt */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            rows={2}
                                            placeholder="Short description of the article"
                                            className={`transition-all duration-200 ${focusedField === 'excerpt' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />
                                        <AnimatePresence>
                                            {errors.excerpt && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.excerpt}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Content */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                        <Label htmlFor="content">
                                            Content <span className="text-destructive">*</span>
                                        </Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            rows={10}
                                            required
                                            className={`transition-all duration-200 ${focusedField === 'content' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />
                                        <AnimatePresence>
                                            {errors.content && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.content}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Author */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                                        <Label htmlFor="author" className="flex items-center gap-2">
                                            <User className="h-4 w-4" /> Author
                                        </Label>
                                        <Input
                                            id="author"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            onFocus={() => setFocusedField('author')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 ${focusedField === 'author' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />
                                        <AnimatePresence>
                                            {errors.author && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.author}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Thumbnail - Bagian yang diperbaiki */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                                        <Label htmlFor="thumbnail" className="flex items-center gap-2">
                                            <ImageIcon className="h-4 w-4" /> Thumbnail
                                        </Label>

                                        {/* Preview: prioritas thumbnail baru, fallback ke lama */}
                                        {(previewThumbnail || article.thumbnail) && (
                                            <div className="relative inline-block rounded-lg overflow-hidden ring-1 ring-border/50 shadow-lg group">
                                                <img
                                                    src={previewThumbnail || `/storage/${article.thumbnail}`}
                                                    alt={article.title}
                                                    className="h-32 w-48 object-cover"
                                                />
                                                {previewThumbnail && (
                                                    <button
                                                        type="button"
                                                        onClick={clearNewThumbnail}
                                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleThumbnailChange}
                                            onFocus={() => setFocusedField('thumbnail')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 cursor-pointer ${focusedField === 'thumbnail' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />

                                        {previewThumbnail && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Thumbnail baru dipilih (gambar lama akan diganti saat disimpan)
                                            </p>
                                        )}

                                        <AnimatePresence>
                                            {errors.thumbnail && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.thumbnail}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Published Date */}
                                    <motion.div className="space-y-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                                        <Label htmlFor="published_at" className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" /> Published Date
                                        </Label>
                                        <DatePicker
                                            id="published_at"
                                            date={publishDate}
                                            setDate={handlePublishDateChange}
                                            onFocus={() => setFocusedField('published_at')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 ${focusedField === 'published_at' ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' : ''}`}
                                        />
                                        <AnimatePresence>
                                            {errors.published_at && (
                                                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-sm text-destructive">
                                                    {errors.published_at}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Published Switch */}
                                    <motion.div
                                        className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', checked)}
                                        />
                                        <Label htmlFor="is_published" className="cursor-pointer">
                                            Published
                                        </Label>
                                    </motion.div>

                                    {/* Buttons */}
                                    <motion.div
                                        className="flex gap-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.55 }}
                                    >
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                                        >
                                            {processing ? 'Processing...' : 'Update Article'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => window.history.back()}
                                        >
                                            Cancel
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}