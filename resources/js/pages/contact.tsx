import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Mail, Phone, MapPin, CheckCircle, Clock, Send, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { usePage } from '@inertiajs/react';

interface ContactProps { }

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
};

const dialogVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, y: 40 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', damping: 20, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};

export default function Contact({ }: ContactProps) {
    const page = usePage();
    const url = page.url;
    const queryParams = new URLSearchParams(url.split('?')[1] || '');
    const initialSubject = queryParams.get('subject') || '';
    const initialMessage = queryParams.get('message') || '';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: initialSubject,
        message: initialMessage,
    });

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                reset();
                setShowSuccessDialog(true);
            },
            onError: () => {
                // optional: bisa tambah shake effect atau alert error jika mau
            },
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />

            <div className="py-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl"
                    >
                        Contact
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-6xl font-bold leading-tight tracking-tight text-transparent sm:text-7xl"
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
                        We'd love to hear from you. Let's discuss how we can help bring your vision to life.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid gap-8 lg:grid-cols-3"
                >
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                            <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/10 blur-[128px]" />

                            <div className="relative border-b border-white/5 bg-white/[0.02] px-8 py-6">
                                <h2 className="text-xl font-semibold text-white">Send us a message</h2>
                            </div>

                            <div className="relative p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                                                Name *
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="john@example.com"
                                                required
                                            />
                                            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                                                Phone
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="621234567890"
                                            />
                                            {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="block text-sm font-medium text-zinc-300">
                                                Subject
                                            </label>
                                            <input
                                                id="subject"
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="How can we help?"
                                            />
                                            {errors.subject && <p className="text-xs text-red-400">{errors.subject}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                            placeholder="Tell us about your project..."
                                            required
                                        />
                                        {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-60 sm:w-auto ${processing ? 'cursor-wait' : ''
                                            }`}
                                    >
                                        {processing ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4">
                                <h2 className="text-lg font-semibold text-white">Contact Information</h2>
                            </div>
                            <div className="space-y-6 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <Mail className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-zinc-400">Email</p>
                                        <a href="mailto:info@company.com" className="text-sm text-white hover:text-violet-400">
                                            info@company.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <Phone className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-zinc-400">Phone</p>
                                        <a href="tel:+621234567890" className="text-sm text-white hover:text-violet-400">
                                            +62 123 4567 890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <MapPin className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-zinc-400">Address</p>
                                        <p className="text-sm text-white">Jakarta, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-violet-400" />
                                    <h2 className="text-lg font-semibold text-white">Business Hours</h2>
                                </div>
                            </div>
                            <div className="space-y-3 p-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Monday - Friday</span>
                                    <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Saturday</span>
                                    <span className="font-medium text-white">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">Sunday</span>
                                    <span className="font-medium text-white">Closed</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Success Dialog */}
            <AnimatePresence>
                {showSuccessDialog && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowSuccessDialog(false)}
                        />

                        {/* Dialog */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                variants={dialogVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/90 p-8 backdrop-blur-xl shadow-2xl shadow-violet-900/20"
                            >
                                <button
                                    onClick={() => setShowSuccessDialog(false)}
                                    className="absolute right-5 top-5 text-zinc-400 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 rounded-full bg-emerald-500/15 p-4">
                                        <CheckCircle className="h-10 w-10 text-emerald-400" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-semibold text-white">
                                        Message Sent!
                                    </h3>
                                    <p className="mb-8 text-zinc-300">
                                        Thank you for reaching out. We will get back to you as soon as possible.
                                    </p>
                                    <button
                                        onClick={() => setShowSuccessDialog(false)}
                                        className="rounded-xl bg-violet-600 px-8 py-3 font-medium text-white transition hover:bg-violet-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}