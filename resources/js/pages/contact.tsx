import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Mail, Phone, MapPin, CheckCircle, Clock, Send } from 'lucide-react';
import { FormEventHandler } from 'react';
import { motion, Variants } from 'motion/react';

interface ContactProps {
    flash?: {
        success?: string;
    };
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

export default function Contact({ flash }: ContactProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Contact
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Get in Touch
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        We'd love to hear from you. Let's discuss how we can help bring your vision to life.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid gap-8 lg:grid-cols-3"
                >
                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                            <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/10 blur-[128px]" />
                            
                            <div className="relative border-b border-white/5 bg-white/[0.02] px-8 py-6">
                                <h2 className="text-xl font-semibold text-white">Send us a message</h2>
                            </div>
                            
                            <div className="relative p-8">
                                {flash?.success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 backdrop-blur-xl"
                                    >
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-400" />
                                        <p className="text-sm text-emerald-300">
                                            {flash.success}
                                        </p>
                                    </motion.div>
                                )}

                                <form onSubmit={submit} className="space-y-6">
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
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="John Doe"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-xs text-red-400">{errors.name}</p>
                                            )}
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
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="john@example.com"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-400">{errors.email}</p>
                                            )}
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
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="+62 123 4567 890"
                                            />
                                            {errors.phone && (
                                                <p className="text-xs text-red-400">{errors.phone}</p>
                                            )}
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
                                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                                placeholder="How can we help?"
                                            />
                                            {errors.subject && (
                                                <p className="text-xs text-red-400">{errors.subject}</p>
                                            )}
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
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 backdrop-blur-xl transition-all focus:border-violet-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                                            placeholder="Tell us about your project..."
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-xs text-red-400">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50 sm:w-auto"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
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
                                        <p className="mb-1 text-xs font-medium text-zinc-400">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:info@company.com"
                                            className="text-sm text-white transition-colors hover:text-violet-400"
                                        >
                                            info@company.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <Phone className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-zinc-400">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+621234567890"
                                            className="text-sm text-white transition-colors hover:text-violet-400"
                                        >
                                            +62 123 4567 890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                        <MapPin className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-zinc-400">
                                            Address
                                        </p>
                                        <p className="text-sm text-white">
                                            Jakarta, Indonesia
                                        </p>
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
        </PublicLayout>
    );
}