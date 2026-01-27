import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Target, Users, Award, TrendingUp, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { motion, Variants } from 'motion/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: string | null;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    published_at: string;
}

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    start_date: string;
    location: string | null;
}

interface Client {
    id: number;
    name: string;
    logo: string;
}

interface HomeProps {
    featuredProducts: Product[];
    latestArticles: Article[];
    upcomingEvents: Event[];
    clients: Client[];
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
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

// About Section Component
function AboutSection() {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To deliver innovative solutions that drive business growth and create lasting value for our clients.',
        },
        {
            icon: Users,
            title: 'Our Team',
            description: 'A diverse group of talented professionals dedicated to excellence and customer satisfaction.',
        },
        {
            icon: Award,
            title: 'Quality First',
            description: 'We maintain the highest standards in everything we do, ensuring exceptional results every time.',
        },
        {
            icon: TrendingUp,
            title: 'Growth Focus',
            description: 'Committed to continuous improvement and innovation to stay ahead in the industry.',
        },
    ];

    return (
        <section className="relative py-32">
            {/* Section background effect */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[1px] w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className="space-y-24"
            >
                {/* About Header */}
                <div className="mx-auto max-w-3xl text-center">
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                        About Us
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        Building the Future
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-lg leading-relaxed text-zinc-400">
                        Founded with a vision to transform the industry, we've grown from a small startup to a leading provider of innovative solutions. We believe in the power of technology and human creativity to solve complex challenges.
                    </motion.p>
                </div>

                {/* Values Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={value.title}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/10 hover:bg-white/[0.04]"
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/0 via-violet-600/5 to-purple-600/0 opacity-0 transition-opacity group-hover:opacity-100" />
                                
                                <div className="mb-4 inline-flex rounded-xl border border-white/5 bg-white/5 p-3">
                                    <Icon className="h-6 w-6 text-violet-400" strokeWidth={1.5} />
                                </div>
                                <h3 className="mb-3 text-lg font-semibold text-white">
                                    {value.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-12 backdrop-blur-xl"
                >
                    <div className="absolute right-0 top-0 h-64 w-64 bg-violet-600/10 blur-[128px]" />
                    <div className="relative grid gap-12 text-center sm:grid-cols-4">
                        {[
                            { value: '10+', label: 'Years Experience' },
                            { value: '500+', label: 'Projects Completed' },
                            { value: '200+', label: 'Happy Clients' },
                            { value: '50+', label: 'Team Members' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <p className="mb-2 bg-gradient-to-br from-white to-white/60 bg-clip-text text-5xl font-bold text-transparent">
                                    {stat.value}
                                </p>
                                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default function Home({ featuredProducts, latestArticles, upcomingEvents, clients }: HomeProps) {
    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
                {/* Decorative elements */}
                <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 blur-[128px]" />
                
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative mx-auto max-w-5xl text-center"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
                        </span>
                        Welcome to ByteCraft
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent sm:text-8xl"
                    >
                        Building Excellence
                        <br />
                        Through Innovation
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-zinc-400"
                    >
                        We create innovative solutions that empower businesses to achieve their full potential through cutting-edge technology and exceptional design.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                        >
                            Explore Products
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                        >
                            Contact Us
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-zinc-500">Scroll to explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="h-12 w-6 rounded-full border border-white/10 p-1"
                        >
                            <div className="h-2 w-full rounded-full bg-gradient-to-b from-violet-500 to-transparent" />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* About Section - Integrated */}
            <AboutSection />

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <div className="mb-16 flex items-end justify-between">
                            <div>
                                <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                                    Products
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-5xl font-bold tracking-tight text-white">
                                    Featured Solutions
                                </motion.h2>
                                <motion.p variants={itemVariants} className="mt-4 text-lg text-zinc-400">
                                    Discover our latest offerings
                                </motion.p>
                            </div>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="/products"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    View All
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {featuredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="mb-2 text-xl font-semibold text-white">{product.name}</h3>
                                        {product.description && (
                                            <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                {product.description}
                                            </p>
                                        )}
                                        {product.price && (
                                            <p className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-white">
                                                ${product.price}
                                            </p>
                                        )}
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                        >
                                            Learn More
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            )}

            {/* Latest Articles */}
            {latestArticles.length > 0 && (
                <section className="py-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <div className="mb-16 flex items-end justify-between">
                            <div>
                                <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                                    Insights
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-5xl font-bold tracking-tight text-white">
                                    Latest Articles
                                </motion.h2>
                                <motion.p variants={itemVariants} className="mt-4 text-lg text-zinc-400">
                                    Stay updated with our insights
                                </motion.p>
                            </div>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="/articles"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    View All
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {latestArticles.map((article) => (
                                <motion.div
                                    key={article.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        {article.thumbnail ? (
                                            <img
                                                src={`/storage/${article.thumbnail}`}
                                                alt={article.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <p className="mb-2 text-xs font-medium text-violet-400">
                                            {format(new Date(article.published_at), 'MMMM dd, yyyy')}
                                        </p>
                                        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{article.title}</h3>
                                        {article.excerpt && (
                                            <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                        >
                                            Read More
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="py-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <div className="mb-16 flex items-end justify-between">
                            <div>
                                <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                                    Events
                                </motion.div>
                                <motion.h2 variants={itemVariants} className="text-5xl font-bold tracking-tight text-white">
                                    Upcoming Events
                                </motion.h2>
                                <motion.p variants={itemVariants} className="mt-4 text-lg text-zinc-400">
                                    Join us at our upcoming events
                                </motion.p>
                            </div>
                            <motion.div variants={itemVariants}>
                                <Link
                                    href="/events"
                                    className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                                >
                                    View All
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {upcomingEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                >
                                    <div className="aspect-video overflow-hidden">
                                        {event.image ? (
                                            <img
                                                src={`/storage/${event.image}`}
                                                alt={event.title}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <p className="mb-2 text-xs font-medium text-violet-400">
                                            {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                        </p>
                                        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{event.title}</h3>
                                        {event.location && (
                                            <p className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
                                                <span className="text-violet-500">→</span>
                                                {event.location}
                                            </p>
                                        )}
                                        <Link
                                            href={`/events/${event.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                        >
                                            View Details
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            )}

            {/* Clients */}
            {clients.length > 0 && (
                <section className="py-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="text-center"
                    >
                        <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                            Our Clients
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="mb-4 text-5xl font-bold tracking-tight text-white">
                            Trusted By Leading Organizations
                        </motion.h2>
                        <motion.p variants={itemVariants} className="mb-16 text-lg text-zinc-400">
                            Building lasting partnerships with industry leaders
                        </motion.p>

                        <motion.div
                            variants={containerVariants}
                            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
                        >
                            {clients.map((client) => (
                                <motion.div
                                    key={client.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-white/10"
                                >
                                    <img
                                        src={`/storage/${client.logo}`}
                                        alt={client.name}
                                        className="h-12 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            )}
        </PublicLayout>
    );
}