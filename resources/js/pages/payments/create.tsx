import { Head, Link, useForm, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowLeft, Tag, CreditCard, Upload, Package, DollarSign, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: string | null;
    image: string | null;
}

interface PaymentCreateProps {
    product: Product;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function PaymentCreate({ product }: PaymentCreateProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        buyer_name: '',
        buyer_email: '',
        buyer_phone: '',
        payment_method: 'paypal' as 'paypal' | 'visa' | 'qris',
        payment_proof: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('payment_proof', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/payments', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviewImage(null);
                setShowSuccess(true);
                // Optional: auto redirect setelah 4 detik kalau user ga klik tombol
                setTimeout(() => {
                    if (showSuccess) {
                        router.visit('/products', { preserveScroll: false });
                    }
                }, 4000);
            },
        });
    };

    const paymentDestinations = {
        paypal: 'amriikhda207@gmail.com',
        visa: '4532 1234 5678 9010',
        qris: '/kas.jpg',
    };

    return (
        <PublicLayout>
            <Head title={`Purchase ${product.name}`} />

            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href={`/products/${product.slug}`}
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Product
                    </Link>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Product Summary */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                            Order Summary
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="mb-8 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-5xl font-bold leading-[1.1] tracking-tight text-transparent">
                            Complete Your Purchase
                        </motion.h1>

                        <motion.div variants={itemVariants}>
                            <Card className="border-white/10 bg-white/[0.02] backdrop-blur-xl p-6">
                                <div className="flex gap-4">
                                    {product.image && (
                                        <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-2 mb-2">
                                            <Package className="h-5 w-5 text-violet-400 mt-0.5" />
                                            <div>
                                                <p className="text-sm text-zinc-400">Product</p>
                                                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                                            </div>
                                        </div>
                                        {product.price && (
                                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                                                <DollarSign className="h-5 w-5 text-violet-400" />
                                                <div>
                                                    <p className="text-sm text-zinc-400">Total Amount</p>
                                                    <p className="text-2xl font-bold text-white">${product.price}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-6">
                            <Card className="border-violet-500/30 bg-violet-500/5 backdrop-blur-xl p-6">
                                <h3 className="font-semibold text-white mb-3">📋 Instructions</h3>
                                <ol className="space-y-2 text-sm text-zinc-400">
                                    <li>1. Fill in your contact information</li>
                                    <li>2. Select your preferred payment method</li>
                                    <li>3. Complete the payment to the provided account</li>
                                    <li>4. Upload proof of payment</li>
                                    <li>5. Submit and wait for confirmation</li>
                                </ol>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Card className="border-white/10 bg-white/[0.02] backdrop-blur-xl p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Buyer Information */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>

                                    <div>
                                        <Label htmlFor="buyer_name" className="text-white">Full Name *</Label>
                                        <Input
                                            id="buyer_name"
                                            value={data.buyer_name}
                                            onChange={(e) => setData('buyer_name', e.target.value)}
                                            className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                                            placeholder="John Doe"
                                        />
                                        {errors.buyer_name && <p className="text-red-400 text-sm mt-1">{errors.buyer_name}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="buyer_email" className="text-white">Email Address *</Label>
                                        <Input
                                            id="buyer_email"
                                            type="email"
                                            value={data.buyer_email}
                                            onChange={(e) => setData('buyer_email', e.target.value)}
                                            className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                                            placeholder="john@example.com"
                                        />
                                        {errors.buyer_email && <p className="text-red-400 text-sm mt-1">{errors.buyer_email}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="buyer_phone" className="text-white">Phone Number (WhatsApp) *</Label>
                                        <Input
                                            id="buyer_phone"
                                            value={data.buyer_phone}
                                            onChange={(e) => setData('buyer_phone', e.target.value)}
                                            className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                                            placeholder="+1234567890"
                                        />
                                        <p className="text-xs text-zinc-500 mt-1">Include country code (e.g., +1 for US)</p>
                                        {errors.buyer_phone && <p className="text-red-400 text-sm mt-1">{errors.buyer_phone}</p>}
                                    </div>
                                </div>

                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">Payment Method</h3>

                                    <RadioGroup
                                        value={data.payment_method}
                                        onValueChange={(value) => setData('payment_method', value as any)}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <RadioGroupItem value="paypal" id="paypal" />
                                            <Label htmlFor="paypal" className="text-white flex-1 cursor-pointer">PayPal</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <RadioGroupItem value="visa" id="visa" />
                                            <Label htmlFor="visa" className="text-white flex-1 cursor-pointer">Visa/Mastercard</Label>
                                        </div>
                                        <div className="flex items-center space-x-3 p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                            <RadioGroupItem value="qris" id="qris" />
                                            <Label htmlFor="qris" className="text-white flex-1 cursor-pointer">QRIS</Label>
                                        </div>
                                    </RadioGroup>
                                    {errors.payment_method && <p className="text-red-400 text-sm mt-2">{errors.payment_method}</p>}
                                </div>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={data.payment_method}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 p-6 rounded-lg border border-violet-500/30 bg-violet-500/10"
                                    >
                                        <div className="flex items-start gap-3">
                                            <CreditCard className="h-5 w-5 text-violet-400 mt-0.5" />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white mb-2">
                                                    {data.payment_method === 'paypal' && 'Send payment to this PayPal account:'}
                                                    {data.payment_method === 'visa' && 'Send payment to this card number:'}
                                                    {data.payment_method === 'qris' && 'Scan this QR code to pay:'}
                                                </h4>
                                                {data.payment_method === 'qris' ? (
                                                    <div className="mt-3 p-4 bg-white rounded-lg inline-block">
                                                        <img
                                                            src={paymentDestinations.qris}
                                                            alt="QRIS Code"
                                                            className="w-48 h-48"
                                                        />
                                                    </div>
                                                ) : (
                                                    <p className="text-violet-200 font-mono text-lg mt-2 break-all">
                                                        {paymentDestinations[data.payment_method]}
                                                    </p>
                                                )}
                                                <div className="mt-3 p-3 bg-violet-500/10 rounded-lg">
                                                    <p className="text-sm text-violet-200">
                                                        Amount to transfer: <span className="font-bold">${product.price}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                <div className="border-t border-white/10 pt-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">Upload Payment Proof</h3>

                                    <div>
                                        <Label htmlFor="payment_proof" className="text-white">Payment Screenshot/Receipt *</Label>
                                        <div className="mt-2">
                                            <label
                                                htmlFor="payment_proof"
                                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                                            >
                                                {previewImage ? (
                                                    <div className="relative w-full h-full p-2">
                                                        <img src={previewImage} alt="Preview" className="w-full h-full object-contain rounded" />
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <Upload className="h-10 w-10 text-zinc-400 mb-3" />
                                                        <p className="text-sm font-medium text-white mb-1">Click to upload payment proof</p>
                                                        <p className="text-xs text-zinc-500">PNG, JPG, WEBP up to 2MB</p>
                                                    </div>
                                                )}
                                                <input
                                                    id="payment_proof"
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                        {errors.payment_proof && <p className="text-red-400 text-sm mt-2">{errors.payment_proof}</p>}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Payment'}
                                    </button>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="px-6 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors inline-flex items-center justify-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>

            {/* SUCCESS MODAL */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 18, stiffness: 280 }}
                            className="relative w-full max-w-lg rounded-2xl border border-violet-500/30 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-8 md:p-10 text-center shadow-2xl shadow-violet-900/40 overflow-hidden"
                        >
                            {/* Decorative gradient orb */}
                            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
                            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

                            <div className="relative">
                                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30">
                                    <CheckCircle2 className="h-12 w-12 text-white" strokeWidth={3} />
                                </div>

                                <h2 className="mb-4 text-3xl font-bold text-white">Payment Submitted Successfully!</h2>

                                <p className="mb-8 text-lg text-zinc-300">
                                    Terima kasih atas pembayarannya!<br />
                                    Kami akan segera memverifikasi bukti pembayaran Anda (biasanya 1–24 jam).
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <button
                                        onClick={() => router.visit('/products', { preserveScroll: false })}
                                        className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all"
                                    >
                                        Go to Products Now
                                    </button>

                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
                                    >
                                        Stay Here
                                    </button>
                                </div>

                                <p className="mt-6 text-sm text-zinc-500">
                                    Automatically redirecting in a few seconds...
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}