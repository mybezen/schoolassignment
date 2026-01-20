import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Client {
    id: number;
    name: string;
    logo: string;
    website: string | null;
    description: string | null;
    order: number;
    is_active: boolean;
}

interface ClientsEditProps {
    client: Client;
}

export default function ClientsEdit({ client }: ClientsEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: client.name,
        logo: null as File | null,
        website: client.website || '',
        description: client.description || '',
        order: client.order,
        is_active: client.is_active,
        _method: 'PUT',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/clients/${client.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Client" />

            <div className="flex h-full flex-1 justify-center p-6 overflow-x-auto">
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Client</h1>
                        <p className="text-muted-foreground">Update client information</p>
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
                                    <Label htmlFor="logo">Logo</Label>
                                    <div className="mb-2">
                                        <img
                                            src={`/storage/${client.logo}`}
                                            alt={client.name}
                                            className="h-24 w-24 rounded object-contain bg-muted p-2"
                                        />
                                    </div>
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData('logo', e.target.files?.[0] || null)
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to keep current logo
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
                                        Update Client
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