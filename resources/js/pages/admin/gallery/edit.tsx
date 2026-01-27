import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ImageIcon, Tag, Hash } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Gallery {
    id: number;
    title: string | null;
    image: string;
    caption: string | null;
    category: string | null;
    order: number;
}

interface GalleryEditProps {
    gallery: Gallery;
}

export default function GalleryEdit({ gallery }: GalleryEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: gallery.title || '',
        image: null as File | null,
        caption: gallery.caption || '',
        category: gallery.category || '',
        order: gallery.order,
        _method: 'PUT',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/gallery/${gallery.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Gallery Image" />

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
                            Edit Gallery Image
                        </h1>
                        <p className="text-muted-foreground mt-1">Update image information</p>
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
                                <p className="text-sm font-medium">Image updated successfully!</p>
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
                                    <ImageIcon className="h-5 w-5 text-primary" />
                                    Image Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={submit} className="space-y-6">
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            onFocus={() => setFocusedField('title')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Optional image title"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'title' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.title && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.title}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <Label htmlFor="image" className="flex items-center gap-2 text-sm font-medium">
                                            <ImageIcon className="h-4 w-4" />
                                            Image
                                        </Label>
                                        <motion.div 
                                            className="mb-3"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className="relative h-48 w-auto max-w-md rounded-lg overflow-hidden ring-1 ring-border/50 shadow-lg">
                                                <img
                                                    src={`/storage/${gallery.image}`}
                                                    alt={gallery.title || 'Gallery image'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </motion.div>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData('image', e.target.files?.[0] || null)
                                            }
                                            onFocus={() => setFocusedField('image')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 cursor-pointer ${
                                                focusedField === 'image' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Leave empty to keep current image
                                        </p>
                                        <AnimatePresence>
                                            {errors.image && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.image}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <Label htmlFor="caption" className="text-sm font-medium">Caption</Label>
                                        <Textarea
                                            id="caption"
                                            value={data.caption}
                                            onChange={(e) => setData('caption', e.target.value)}
                                            onFocus={() => setFocusedField('caption')}
                                            onBlur={() => setFocusedField(null)}
                                            rows={3}
                                            placeholder="Image description or caption"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'caption' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.caption && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.caption}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Label htmlFor="category" className="flex items-center gap-2 text-sm font-medium">
                                            <Tag className="h-4 w-4" />
                                            Category
                                        </Label>
                                        <Input
                                            id="category"
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            onFocus={() => setFocusedField('category')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="e.g., Events, Products, Office"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'category' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.category && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.category}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        <Label htmlFor="order" className="flex items-center gap-2 text-sm font-medium">
                                            <Hash className="h-4 w-4" />
                                            Display Order
                                        </Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value))}
                                            onFocus={() => setFocusedField('order')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 ${
                                                focusedField === 'order' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.order && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.order}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="flex gap-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1"
                                        >
                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                {processing ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <ImageIcon className="h-4 w-4 mr-2" />
                                                    </motion.div>
                                                ) : (
                                                    'Update Image'
                                                )}
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="hover:bg-accent/50 transition-all duration-200"
                                            >
                                                Cancel
                                            </Button>
                                        </motion.div>
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