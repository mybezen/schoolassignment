import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Mail, Phone, MapPin, CheckCircle, Clock } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ContactProps {
    flash?: {
        success?: string;
    };
}

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

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#35291B]">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-[#6F5B3A]">
                        Get in touch with us. We'd love to hear from you!
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-lg">
                            <div className="bg-gradient-to-r from-[#FAF7F2] to-[#FFF8ED] px-6 py-4">
                                <h2 className="text-xl font-semibold text-[#35291B]">Send us a message</h2>
                            </div>
                            <div className="p-6">
                                {flash?.success && (
                                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-300 bg-green-50 p-4">
                                        <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                        <p className="text-sm text-green-800">
                                            {flash.success}
                                        </p>
                                    </div>
                                )}

                                <form onSubmit={submit} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-[#4A3926]">
                                                Name *
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full rounded-lg border border-[#D4C4A8] px-4 py-2 text-[#35291B] transition-colors focus:border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-[#4A3926]">
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full rounded-lg border border-[#D4C4A8] px-4 py-2 text-[#35291B] transition-colors focus:border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-[#4A3926]">
                                                Phone
                                            </label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                className="w-full rounded-lg border border-[#D4C4A8] px-4 py-2 text-[#35291B] transition-colors focus:border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="block text-sm font-medium text-[#4A3926]">
                                                Subject
                                            </label>
                                            <input
                                                id="subject"
                                                type="text"
                                                value={data.subject}
                                                onChange={(e) => setData('subject', e.target.value)}
                                                className="w-full rounded-lg border border-[#D4C4A8] px-4 py-2 text-[#35291B] transition-colors focus:border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
                                            />
                                            {errors.subject && (
                                                <p className="text-sm text-red-600">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-sm font-medium text-[#4A3926]">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={data.message}
                                            onChange={(e) => setData('message', e.target.value)}
                                            className="w-full rounded-lg border border-[#D4C4A8] px-4 py-2 text-[#35291B] transition-colors focus:border-[#A67C52] focus:outline-none focus:ring-2 focus:ring-[#A67C52]/20"
                                            required
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-gradient-to-r from-[#A67C52] to-[#8B6F47] px-6 py-3 text-base font-medium text-[#FFFBF5] transition-all hover:from-[#8B6F47] hover:to-[#6F5B3A] disabled:opacity-50"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <div className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-lg">
                            <div className="bg-gradient-to-r from-[#FAF7F2] to-[#FFF8ED] px-6 py-4">
                                <h2 className="text-xl font-semibold text-[#35291B]">Contact Information</h2>
                            </div>
                            <div className="space-y-4 p-6">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-[#F5EFE6] p-2">
                                        <Mail className="h-5 w-5 text-[#6F5B3A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#5C4A30]">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:info@company.com"
                                            className="text-[#35291B] transition-colors hover:text-[#A67C52]"
                                        >
                                            info@company.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-[#F5EFE6] p-2">
                                        <Phone className="h-5 w-5 text-[#6F5B3A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#5C4A30]">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+621234567890"
                                            className="text-[#35291B] transition-colors hover:text-[#A67C52]"
                                        >
                                            +62 123 4567 890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-[#F5EFE6] p-2">
                                        <MapPin className="h-5 w-5 text-[#6F5B3A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#5C4A30]">
                                            Address
                                        </p>
                                        <p className="text-[#35291B]">
                                            Jakarta, Indonesia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-lg">
                            <div className="bg-gradient-to-r from-[#FAF7F2] to-[#FFF8ED] px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-[#6F5B3A]" />
                                    <h2 className="text-xl font-semibold text-[#35291B]">Business Hours</h2>
                                </div>
                            </div>
                            <div className="space-y-2 p-6 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#6F5B3A]">Monday - Friday</span>
                                    <span className="font-medium text-[#35291B]">9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#6F5B3A]">Saturday</span>
                                    <span className="font-medium text-[#35291B]">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#6F5B3A]">Sunday</span>
                                    <span className="font-medium text-[#35291B]">Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}