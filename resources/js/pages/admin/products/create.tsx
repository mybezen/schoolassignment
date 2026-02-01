import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CheckCircle2, XCircle, Package, Image as ImageIcon, Loader2 } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Motion wrappers
const MotionInput = motion(Input);
const MotionTextarea = motion(Textarea);

const inputVariants: Variants = {
    initial: { scale: 1, boxShadow: '0 0 0 0 rgba(var(--primary), 0)' },
    focus: { scale: 1.015, boxShadow: '0 0 0 4px rgba(var(--primary), 0.12)' },
    error: { x: [0, -5, 5, -3, 3, 0], transition: { duration: 0.4 } },
};

const checkVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 280, damping: 22 } },
};

export default function ProductsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        content: '',
        price: '',
        image: null as File | null,
        is_active: true,
        order: 0,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/products', {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 4000);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout>
            <Head title="Create Product" />

            <motion.div
                className="flex min-h-screen flex-1 justify-center p-6 md:p-8 lg:p-10 bg-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="w-full max-w-4xl space-y-8">
                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
                        <p className="mt-2 text-muted-foreground">
                            Fill in the details to add a product to your catalog
                        </p>
                    </motion.div>

                    {/* Success */}
                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-4 flex items-center gap-3 shadow-sm"
                            >
                                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                <p className="font-medium text-emerald-800 dark:text-emerald-200">
                                    Product created successfully!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Card className="border-border/50 shadow-xl bg-card/90 backdrop-blur-sm overflow-hidden">
                        <CardHeader className="pb-6 border-b bg-muted/30">
                            <CardTitle className="flex items-center gap-2.5 text-xl">
                                <Package className="h-5 w-5 text-primary" />
                                Product Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-10 pb-12 px-6 md:px-8">
                            <form onSubmit={submit} className="space-y-8">
                                {(['name', 'description', 'content', 'price', 'order'] as const).map((field, i) => {
                                    const isFocused = focusedField === field;
                                    const hasError = !!errors[field];
                                    const value = data[field];
                                    const isFilled =
                                        typeof value === 'string'
                                            ? value.trim().length > 0
                                            : Number(value) !== 0;

                                    return (
                                        <motion.div
                                            key={field}
                                            className="space-y-2"
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                                        >
                                            <Label htmlFor={field} className="text-sm font-medium">
                                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                                {field === 'name' && <span className="text-destructive ml-1">*</span>}
                                            </Label>

                                            {field === 'description' || field === 'content' ? (
                                                <MotionTextarea
                                                    id={field}
                                                    value={(data[field] as string) || ''}
                                                    onChange={(e) => setData(field, e.target.value)}
                                                    onFocus={() => setFocusedField(field)}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder={`Enter ${field}...`}
                                                    rows={field === 'content' ? 7 : 4}
                                                    className="min-h-[120px] px-5 py-4 rounded-xl border border-input bg-background text-base resize-y focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-200"
                                                    variants={inputVariants}
                                                    animate={hasError ? 'error' : isFocused ? 'focus' : 'initial'}
                                                />
                                            ) : (
                                                <div className="relative">
                                                    <MotionInput
                                                        id={field}
                                                        type={field === 'price' || field === 'order' ? 'number' : 'text'}
                                                        step={field === 'price' ? '0.01' : undefined}
                                                        value={data[field] ?? (field === 'order' ? 0 : '')}
                                                        onChange={(e) =>
                                                            setData(
                                                                field,
                                                                field === 'order' ? parseInt(e.target.value) || 0 : e.target.value
                                                            )
                                                        }
                                                        onFocus={() => setFocusedField(field)}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder={`Enter ${field}...`}
                                                        className="h-14 px-5 rounded-xl border border-input bg-background text-base focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary transition-all duration-200"
                                                        variants={inputVariants}
                                                        animate={hasError ? 'error' : isFocused ? 'focus' : 'initial'}
                                                    />

                                                    <AnimatePresence>
                                                        {(isFilled || hasError) && (
                                                            <motion.div
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate="visible"
                                                                exit={{ scale: 0, opacity: 0 }}
                                                                variants={checkVariants}
                                                                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                                            >
                                                                {hasError ? (
                                                                    <XCircle className="h-5 w-5 text-destructive" />
                                                                ) : (
                                                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}

                                            <AnimatePresence>
                                                {hasError && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -8 }}
                                                        className="text-sm text-destructive mt-1.5 pl-1"
                                                    >
                                                        {errors[field]}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}

                                {/* Image */}
                                <motion.div
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Label htmlFor="image" className="text-sm font-medium flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4" />
                                        Product Image
                                    </Label>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="h-14 file:h-11 file:my-1 cursor-pointer file:mr-4 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                                        />
                                        {imagePreview && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="h-24 w-24 rounded-xl overflow-hidden border bg-muted shadow-sm"
                                            >
                                                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                            </motion.div>
                                        )}
                                    </div>
                                    {errors.image && (
                                        <p className="text-sm text-destructive mt-1.5">{errors.image}</p>
                                    )}
                                </motion.div>

                                {/* Switch */}
                                <motion.div
                                    className="flex items-center gap-4 rounded-xl border bg-muted/40 px-6 py-5"
                                    whileHover={{ scale: 1.005 }}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.58 }}
                                >
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer text-base font-medium">
                                        Active / Visible in Store
                                    </Label>
                                </motion.div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-10">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 h-12 font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Creating...
                                            </div>
                                        ) : (
                                            'Create Product'
                                        )}
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        className="h-12 px-10 text-base"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </AppLayout>
    );
}