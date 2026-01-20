import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/gallery/${gallery.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Gallery Image" />

            <div className="flex h-full flex-1 justify-center p-6 overflow-x-auto">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Gallery Image</h1>
                        <p className="text-muted-foreground">Update image information</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Image Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Optional image title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Image</Label>
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${gallery.image}`}
                                            alt={gallery.title || 'Gallery image'}
                                            className="h-48 w-auto rounded object-cover"
                                        />
                                    </div>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData('image', e.target.files?.[0] || null)
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to keep current image
                                    </p>
                                    {errors.image && (
                                        <p className="text-sm text-destructive">{errors.image}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="caption">Caption</Label>
                                    <Textarea
                                        id="caption"
                                        value={data.caption}
                                        onChange={(e) => setData('caption', e.target.value)}
                                        rows={3}
                                        placeholder="Image description or caption"
                                    />
                                    {errors.caption && (
                                        <p className="text-sm text-destructive">{errors.caption}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        placeholder="e.g., Events, Products, Office"
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-destructive">{errors.category}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order">Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                    />
                                    {errors.order && (
                                        <p className="text-sm text-destructive">{errors.order}</p>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        Update Image
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
            </div>
        </AppLayout>
    );
}