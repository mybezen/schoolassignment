import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Target, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { motion , Variants } from 'motion/react';

interface Client {
    id: number;
    name: string;
    logo: string;
}

interface AboutProps {
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
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function About({ clients }: AboutProps) {
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
        <PublicLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <section className="relative py-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mx-auto max-w-4xl text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        About Us
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Transforming Ideas Into Reality
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl leading-relaxed text-zinc-400">
                        Building excellence through innovation, dedication, and a commitment to our clients' success
                    </motion.p>
                </motion.div>
            </section>

            {/* Company Story */}
            <section className="py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-12 backdrop-blur-xl"
                >
                    <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/10 blur-[128px]" />
                    <div className="relative">
                        <motion.h2 variants={itemVariants} className="mb-8 text-4xl font-bold text-white">
                            Our Story
                        </motion.h2>
                        <motion.div variants={itemVariants} className="space-y-6 text-lg leading-relaxed text-zinc-400">
                            <p>
                                Founded with a vision to transform the industry, our company has grown from a small startup to a leading provider of innovative solutions. We believe in the power of technology and human creativity to solve complex challenges.
                            </p>
                            <p>
                                Over the years, we've built strong relationships with clients across various industries, helping them achieve their goals through our expertise, dedication, and innovative approach. Our team of professionals brings together diverse skills and experiences to deliver exceptional results.
                            </p>
                            <p>
                                Today, we continue to push boundaries, explore new possibilities, and create value for our clients. Our commitment to excellence remains unwavering as we look forward to the future.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Values */}
            <section className="py-32">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <div className="mb-16 text-center">
                        <motion.h2 variants={itemVariants} className="mb-4 text-5xl font-bold tracking-tight text-white">
                            Our Values
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-zinc-400">
                            The principles that guide everything we do
                        </motion.p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/10"
                                >
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
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-12 backdrop-blur-xl"
                >
                    <div className="absolute left-0 top-0 h-96 w-96 bg-violet-600/20 blur-[128px]" />
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
            </section>

            {/* Clients */}
            {clients.length > 0 && (
                <section className="py-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <div className="mb-16 text-center">
                            <motion.h2 variants={itemVariants} className="mb-4 text-5xl font-bold tracking-tight text-white">
                                Trusted By
                            </motion.h2>
                            <motion.p variants={itemVariants} className="text-lg text-zinc-400">
                                Building lasting partnerships with industry leaders
                            </motion.p>
                        </div>

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

            {/* CTA */}
            <section className="py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={itemVariants}
                    className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-16 text-center backdrop-blur-xl"
                >
                    <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/10 blur-[128px]" />
                    <div className="relative">
                        <h2 className="mb-4 text-4xl font-bold text-white">
                            Ready to Work With Us?
                        </h2>
                        <p className="mb-8 text-lg text-zinc-400">
                            Let's discuss how we can help you achieve your goals
                        </p>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                        >
                            Get in Touch
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </motion.div>
            </section>
        </PublicLayout>
    );
}