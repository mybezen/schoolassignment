import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { format, isPast } from 'date-fns';
import { motion, Variants } from 'motion/react';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    image: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
}

interface EventShowProps {
    event: Event;
    relatedEvents: Event[];
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

export default function EventShow({ event, relatedEvents }: EventShowProps) {
    const isEventPast = isPast(new Date(event.start_date));
    const formattedStartDate = format(new Date(event.start_date), 'MMMM dd, yyyy');

    return (
        <PublicLayout>
            <Head title={event.title} />

            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Events
                    </Link>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Event Details */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="lg:col-span-2"
                    >
                        {/* Featured Image */}
                        {event.image && (
                            <motion.div variants={itemVariants} className="relative mb-8 overflow-hidden rounded-3xl border border-white/5">
                                <img
                                    src={`/storage/${event.image}`}
                                    alt={event.title}
                                    className={`w-full object-cover ${isEventPast ? 'grayscale' : ''}`}
                                />
                                <div className={`absolute right-4 top-4 rounded-lg border px-4 py-2 text-sm font-medium backdrop-blur-xl ${isEventPast
                                        ? 'border-white/20 bg-white/10 text-zinc-300'
                                        : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                    }`}>
                                    {isEventPast ? 'Past Event' : 'Upcoming'}
                                </div>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                            Event Details
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-6xl font-bold leading-[1.1] tracking-tight text-transparent">
                            {event.title}
                        </motion.h1>

                        {event.description && (
                            <motion.p variants={itemVariants} className="mb-8 text-xl leading-relaxed text-zinc-300">
                                {event.description}
                            </motion.p>
                        )}

                        {event.content && (
                            <motion.div
                                variants={itemVariants}
                                className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-12 backdrop-blur-xl"
                            >
                                <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/5 blur-[128px]" />
                                <div className="prose prose-invert prose-lg relative max-w-none">
                                    <div className="whitespace-pre-wrap leading-relaxed text-zinc-300">
                                        {event.content}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Event Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="sticky top-24 space-y-6">
                            <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">
                                <div className="border-b border-white/5 bg-white/[0.02] px-6 py-4">
                                    <h2 className="text-lg font-semibold text-white">Event Information</h2>
                                </div>
                                <div className="space-y-6 p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                            <Calendar className="h-5 w-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-medium text-zinc-400">
                                                Start Date
                                            </p>
                                            <p className="text-sm font-medium text-white">
                                                {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {format(new Date(event.start_date), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>

                                    {event.end_date && (
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                                <Clock className="h-5 w-5 text-violet-400" />
                                            </div>
                                            <div>
                                                <p className="mb-1 text-xs font-medium text-zinc-400">
                                                    End Date
                                                </p>
                                                <p className="text-sm font-medium text-white">
                                                    {format(new Date(event.end_date), 'MMMM dd, yyyy')}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {format(new Date(event.end_date), 'h:mm a')}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {event.location && (
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                                                <MapPin className="h-5 w-5 text-violet-400" />
                                            </div>
                                            <div>
                                                <p className="mb-1 text-xs font-medium text-zinc-400">
                                                    Location
                                                </p>
                                                <p className="text-sm font-medium text-white">
                                                    {event.location}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {!isEventPast && (
                                <Link
                                    href={`/contact?subject=Interest in ${event.title}&message=I am interested in the event "${event.title}" scheduled for ${formattedStartDate}. Please provide more details.`}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                                >
                                    Register Interest
                                    <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Related Events */}
                {relatedEvents.length > 0 && (
                    <section className="mt-32">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={itemVariants} className="mb-12 text-center text-4xl font-bold text-white">
                                Other Upcoming Events
                            </motion.h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedEvents.map((related) => (
                                    <motion.div
                                        key={related.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -8 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                    >
                                        <div className="aspect-video overflow-hidden">
                                            {related.image ? (
                                                <img
                                                    src={`/storage/${related.image}`}
                                                    alt={related.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <p className="mb-2 text-xs font-medium text-violet-400">
                                                {format(new Date(related.start_date), 'MMMM dd, yyyy')}
                                            </p>
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{related.title}</h3>
                                            {related.location && (
                                                <p className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
                                                    <span className="text-violet-500">→</span>
                                                    {related.location}
                                                </p>
                                            )}
                                            <Link
                                                href={`/events/${related.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                            >
                                                View Details
                                                <ArrowLeft className="h-4 w-4 rotate-180" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </section>
                )}
            </div>
        </PublicLayout>
    );
}