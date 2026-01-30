import { Head, Link, router } from '@inertiajs/react';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
    payment_method: string;
    status: 'pending' | 'confirmed' | 'declined';
    created_at: string;
}

interface PaginatedPayments {
    data: Payment[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface PaymentsIndexProps {
    payments: PaginatedPayments;
}

export default function PaymentsIndex({ payments }: PaymentsIndexProps) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'declined':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-yellow-500" />;
        }
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
                        Pending
                    </Badge>
                );
        }
    };

    const getPaymentMethodBadge = (method: string) => {
        const colors: Record<string, string> = {
            paypal: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            visa: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
            qris: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
        };

        return (
            <Badge variant="secondary" className={colors[method] || ''}>
                {method.toUpperCase()}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title="Payments" />

            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="space-y-6">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                                Payments
                            </h1>
                            <p className="text-muted-foreground mt-1">Review and manage payment submissions</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <AnimatePresence mode="wait">
                            {payments.data.length === 0 ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center justify-center py-16 px-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="rounded-full bg-primary/10 p-6 mb-4"
                                    >
                                        <Clock className="h-12 w-12 text-primary" />
                                    </motion.div>
                                    <h3 className="text-lg font-semibold mb-2">No payments yet</h3>
                                    <p className="text-muted-foreground text-center max-w-sm">
                                        Payment submissions will appear here
                                    </p>
                                </motion.div>
                            ) : (
                                <Table key="table">
                                    <TableHeader>
                                        <TableRow className="border-border/50 hover:bg-transparent">
                                            <TableHead className="w-12"></TableHead>
                                            <TableHead>Buyer</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Method</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <AnimatePresence>
                                            {payments.data.map((payment, index) => (
                                                <motion.tr
                                                    key={payment.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 20 }}
                                                    transition={{
                                                        duration: 0.3,
                                                        delay: index * 0.05,
                                                        ease: [0.16, 1, 0.3, 1]
                                                    }}
                                                    className={`border-border/50 group hover:bg-accent/30 transition-colors duration-200 ${payment.status === 'pending' ? 'bg-primary/5' : ''}`}
                                                >
                                                    <TableCell>
                                                        {getStatusIcon(payment.status)}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <span className="group-hover:text-primary transition-colors duration-200">
                                                            {payment.buyer_name}
                                                        </span>
                                                        <p className="text-xs text-muted-foreground mt-0.5">
                                                            {payment.buyer_email}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground">
                                                        {payment.product.name}
                                                        {payment.product.price && (
                                                            <p className="text-xs mt-0.5">${payment.product.price}</p>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div
                                                            initial={{ scale: 0.9, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 + 0.1 }}
                                                        >
                                                            {getPaymentMethodBadge(payment.payment_method)}
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-muted-foreground">
                                                        {format(new Date(payment.created_at), 'MMM dd, yyyy')}
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div
                                                            initial={{ scale: 0.9, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: index * 0.05 + 0.2 }}
                                                        >
                                                            {getStatusBadge(payment.status)}
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                                                            >
                                                                <Link href={`/admin/payments/${payment.id}`}>
                                                                    <Eye className="h-4 w-4" />
                                                                </Link>
                                                            </Button>
                                                        </motion.div>
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </TableBody>
                                </Table>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}