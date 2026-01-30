import { Head, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeft, User, Mail, Phone, CreditCard, Calendar, Package, DollarSign, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Product {
    id: number;
    name: string;
    price: string | null;
}

interface Payment {
    id: number;
    product: Product;
    buyer_name: string;
    buyer_email: string;
    buyer_phone: string;
    payment_method: string;
    payment_proof: string;
    status: 'pending' | 'confirmed' | 'declined';
    admin_reason: string | null;
    created_at: string;
}

interface PaymentShowProps {
    payment: Payment;
}

export default function PaymentShow({ payment }: PaymentShowProps) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        admin_reason: '',
    });

    const handleConfirm = () => {
        router.post(`/admin/payments/${payment.id}/confirm`, {}, {
            preserveScroll: true,
            onSuccess: () => setShowConfirmDialog(false),
        });
    };

    const handleDecline = () => {
        post(`/admin/payments/${payment.id}/decline`, {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeclineDialog(false);
                reset();
            },
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return (
                    <Badge variant="default" className="bg-green-500/10 text-green-500 border-green-500/20 shadow-sm shadow-green-500/50">
                        Confirmed
                    </Badge>
                );
            case 'declined':
                return (
                    <Badge variant="destructive" className="shadow-sm shadow-destructive/50">
                        Declined
                    </Badge>
                );
            default:
                return (
                    <Badge variant="default" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-sm shadow-yellow-500/50">
                        Pending Review
                    </Badge>
                );
        }
    };

    const getWhatsAppLink = () => {
        const message = payment.status === 'confirmed'
            ? `Hello ${payment.buyer_name}, your payment for ${payment.product.name} has been confirmed. Thank you!`
            : `Hello ${payment.buyer_name}, regarding your payment for ${payment.product.name}: ${payment.admin_reason || 'We need to discuss your payment.'}`;
        
        return `https://wa.me/${payment.buyer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    };

    return (
        <AppLayout>
            <Head title="Payment Details" />

            <motion.div 
                className="flex h-full flex-1 justify-center p-6 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mx-auto w-full max-w-5xl space-y-6">
                    <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                asChild
                                className="hover:bg-accent/50 transition-all duration-200"
                            >
                                <Link href="/admin/payments">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </Button>
                        </motion.div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Payment Details
                            </h1>
                            <p className="text-muted-foreground mt-1">Review payment submission</p>
                        </div>
                        {getStatusBadge(payment.status)}
                    </motion.div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Buyer Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50">
                                    <CardTitle className="text-xl font-medium">Buyer Information</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Name</p>
                                            <p className="font-medium">{payment.buyer_name}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                                            <p className="font-medium">{payment.buyer_email}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                            <p className="font-medium">{payment.buyer_phone}</p>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Product & Payment Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="border-b border-border/50">
                                    <CardTitle className="text-xl font-medium">Payment Information</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Package className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Product</p>
                                            <p className="font-medium">{payment.product.name}</p>
                                        </div>
                                    </motion.div>

                                    {payment.product.price && (
                                        <motion.div 
                                            className="flex items-start gap-3"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                                <DollarSign className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-muted-foreground">Price</p>
                                                <p className="font-medium">${payment.product.price}</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <CreditCard className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                                            <p className="font-medium uppercase">{payment.payment_method}</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-primary/20">
                                            <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground">Submitted</p>
                                            <p className="font-medium">
                                                {format(new Date(payment.created_at), 'MMMM dd, yyyy \'at\' h:mm a')}
                                            </p>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Payment Proof */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="text-xl font-medium">Payment Proof</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="rounded-lg border border-border/50 overflow-hidden bg-muted/30">
                                    <img 
                                        src={`/storage/${payment.payment_proof}`}
                                        alt="Payment Proof"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Admin Reason (if declined) */}
                    <AnimatePresence>
                        {payment.status === 'declined' && payment.admin_reason && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Card className="border-destructive/50 shadow-xl shadow-destructive/5 bg-destructive/5 backdrop-blur-sm">
                                    <CardHeader className="border-b border-destructive/50">
                                        <CardTitle className="text-xl font-medium flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5 text-destructive" />
                                            Decline Reason
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <p className="text-muted-foreground">{payment.admin_reason}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="text-xl font-medium">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex flex-wrap gap-3">
                                    {payment.status === 'pending' && (
                                        <>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button 
                                                    onClick={() => setShowConfirmDialog(true)}
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    <CheckCircle className="mr-2 h-4 w-4" />
                                                    Confirm Payment
                                                </Button>
                                            </motion.div>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                <Button 
                                                    variant="destructive"
                                                    onClick={() => setShowDeclineDialog(true)}
                                                >
                                                    <XCircle className="mr-2 h-4 w-4" />
                                                    Decline Payment
                                                </Button>
                                            </motion.div>
                                        </>
                                    )}
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button 
                                            variant="outline" 
                                            asChild
                                            className="hover:bg-accent/50 transition-all duration-200"
                                        >
                                            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                                                <Phone className="mr-2 h-4 w-4" />
                                                Contact via WhatsApp
                                            </a>
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button 
                                            variant="outline" 
                                            asChild
                                            className="hover:bg-accent/50 transition-all duration-200"
                                        >
                                            <a href={`mailto:${payment.buyer_email}`}>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Send Email
                                            </a>
                                        </Button>
                                    </motion.div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>

            {/* Confirm Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to confirm this payment? This action will mark the payment as confirmed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirm}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Decline Dialog */}
            <AlertDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Decline Payment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please provide a reason for declining this payment. This will be shared with the buyer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Textarea
                            placeholder="Enter reason for declining..."
                            value={data.admin_reason}
                            onChange={(e) => setData('admin_reason', e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => reset()}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDecline}
                            disabled={!data.admin_reason || processing}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {processing ? 'Declining...' : 'Decline'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}