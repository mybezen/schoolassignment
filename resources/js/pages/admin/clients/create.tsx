import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        logo: null as File | null,
        website: '',
        description: '',
        order: 0,
        is_active: true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/clients');
    };

    return (
        <AppLayout>
            <Head title="Create Client" />

            <div className="flex h-full flex-1 justify-center p-6 overflow-x-auto">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Create Client</h1>
                        <p className="text-muted-foreground">Add a new client</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Client Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Logo *</Label>
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData('logo', e.target.files?.[0] || null)
                                        }
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Recommended: Square logo (PNG/SVG with transparent background)
                                    </p>
                                    {errors.logo && (
                                        <p className="text-sm text-destructive">{errors.logo}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="https://example.com"
                                    />
                                    {errors.website && (
                                        <p className="text-sm text-destructive">{errors.website}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                        placeholder="Brief description about the client"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
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

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={processing}>
                                        Create Client
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