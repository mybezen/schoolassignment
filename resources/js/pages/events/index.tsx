import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { motion, Variants } from 'motion/react';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
}

interface PaginatedEvents {
    data: Event[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface EventsIndexProps {
    upcomingEvents: PaginatedEvents;
    pastEvents: PaginatedEvents;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
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

export default function EventsIndex({ upcomingEvents, pastEvents }: EventsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Events" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Events
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Upcoming Events
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        Join us at our upcoming events and stay connected with our community
                    </motion.p>
                </motion.div>

                {/* Upcoming Events */}
                <section className="mb-32">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h2 variants={itemVariants} className="mb-12 text-4xl font-bold text-white">
                            Upcoming
                        </motion.h2>

                        {upcomingEvents.data.length === 0 ? (
                            <motion.div
                                variants={itemVariants}
                                className="mx-auto max-w-2xl text-center"
                            >
                                <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-16 backdrop-blur-xl">
                                    <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-6">
                                        <Calendar className="h-12 w-12 text-zinc-500" />
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold text-white">No Upcoming Events</h3>
                                    <p className="text-zinc-400">
                                        Stay tuned for our upcoming events and activities!
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {upcomingEvents.data.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -8 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            {event.image ? (
                                                <img
                                                    src={`/storage/${event.image}`}
                                                    alt={event.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                            )}
                                            <div className="absolute right-3 top-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-xl">
                                                Upcoming
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{event.title}</h3>
                                            
                                            <div className="mb-4 space-y-2 text-sm text-zinc-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-violet-400" />
                                                    <span>{format(new Date(event.start_date), 'MMMM dd, yyyy')}</span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-violet-400" />
                                                        <span className="line-clamp-1">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {event.description && (
                                                <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                    {event.description}
                                                </p>
                                            )}

                                            <Link
                                                href={`/events/${event.slug}`}
                                                className="group/link inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </section>

                {/* Past Events */}
                {pastEvents.data.length > 0 && (
                    <section>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={itemVariants} className="mb-12 text-4xl font-bold text-white">
                                Past Events
                            </motion.h2>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {pastEvents.data.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -8 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] opacity-60 backdrop-blur-xl transition-all hover:border-white/10 hover:opacity-80"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            {event.image ? (
                                                <img
                                                    src={`/storage/${event.image}`}
                                                    alt={event.title}
                                                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02] grayscale" />
                                            )}
                                            <div className="absolute right-3 top-3 rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-xl">
                                                Past
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{event.title}</h3>
                                            
                                            <div className="mb-4 space-y-2 text-sm text-zinc-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-zinc-500" />
                                                    <span>{format(new Date(event.start_date), 'MMMM dd, yyyy')}</span>
                                                </div>
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-4 w-4 text-zinc-500" />
                                                        <span className="line-clamp-1">{event.location}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <Link
                                                href={`/events/${event.slug}`}
                                                className="group/link inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-400"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
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