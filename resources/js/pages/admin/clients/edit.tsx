import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // perbaiki import
import { CheckCircle2, Users, Globe, Image as ImageIcon, X } from 'lucide-react';

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
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        logo?: File | null;           // optional, tidak di-set null default
        website: string;
        description: string;
        order: number;
        is_active: boolean;
        _method: string;
    }>({
        name: client.name,
        website: client.website || '',
        description: client.description || '',
        order: client.order,
        is_active: client.is_active,
        // logo dibiarkan undefined agar tidak dikirim jika tidak berubah
        _method: 'PUT',
    });

    const [previewLogo, setPreviewLogo] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            setPreviewLogo(URL.createObjectURL(file));
        }
    };

    const clearNewLogo = () => {
        setData('logo', null);
        setPreviewLogo(null);
        const fileInput = document.getElementById('logo') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/clients/${client.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                setPreviewLogo(null); // reset preview setelah sukses
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Client" />

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
                            Edit Client
                        </h1>
                        <p className="text-muted-foreground mt-1">Update client information</p>
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
                                <p className="text-sm font-medium">Client updated successfully!</p>
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
                                    <Users className="h-5 w-5 text-primary" />
                                    Client Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={submit} className="space-y-6">
                                    {/* Name */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="name" className="text-sm font-medium">
                                            Name <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className={`transition-all duration-200 ${
                                                focusedField === 'name' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Logo - Bagian yang diperbaiki */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <Label htmlFor="logo" className="flex items-center gap-2 text-sm font-medium">
                                            <ImageIcon className="h-4 w-4" />
                                            Logo
                                        </Label>

                                        {/* Preview: prioritas logo baru, fallback ke lama */}
                                        {(previewLogo || client.logo) && (
                                            <div className="relative inline-block h-24 w-24 rounded-lg overflow-hidden ring-1 ring-border/50 shadow-lg bg-background/80 p-2 group">
                                                <img
                                                    src={previewLogo || `/storage/${client.logo}`}
                                                    alt={client.name}
                                                    className="h-full w-full object-contain"
                                                />
                                                {previewLogo && (
                                                    <button
                                                        type="button"
                                                        onClick={clearNewLogo}
                                                        className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                                    >
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoChange}
                                            onFocus={() => setFocusedField('logo')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 cursor-pointer ${
                                                focusedField === 'logo' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />

                                        {previewLogo && (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Logo baru dipilih (logo lama akan diganti saat disimpan)
                                            </p>
                                        )}

                                        <AnimatePresence>
                                            {errors.logo && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.logo}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Website */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <Label htmlFor="website" className="flex items-center gap-2 text-sm font-medium">
                                            <Globe className="h-4 w-4" />
                                            Website
                                        </Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            value={data.website}
                                            onChange={(e) => setData('website', e.target.value)}
                                            onFocus={() => setFocusedField('website')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="https://example.com"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'website' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.website && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.website}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Label htmlFor="description" className="text-sm font-medium">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            onFocus={() => setFocusedField('description')}
                                            onBlur={() => setFocusedField(null)}
                                            rows={3}
                                            placeholder="Brief description about the client"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'description' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.description && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    {/* Order */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        <Label htmlFor="order" className="text-sm font-medium">
                                            Display Order
                                        </Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
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

                                    {/* Active Switch */}
                                    <motion.div 
                                        className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <Label htmlFor="is_active" className="cursor-pointer">
                                            Active Status
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
                                            {processing ? 'Processing...' : 'Update Client'}
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