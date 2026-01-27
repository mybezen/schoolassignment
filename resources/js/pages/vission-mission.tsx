import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Eye, Target, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { motion, Variants } from 'motion/react';

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

export default function VisionMission() {
    const principles = [
        {
            icon: Shield,
            title: 'Integrity',
            description: 'We conduct business with honesty and transparency in all our dealings.',
        },
        {
            icon: Zap,
            title: 'Excellence',
            description: 'We strive for excellence and continuous improvement in everything we do.',
        },
        {
            icon: Users,
            title: 'Collaboration',
            description: 'We believe in the power of teamwork and partnerships to achieve great results.',
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'We embrace change and continuously seek innovative solutions.',
        },
    ];

    const missionPoints = [
        {
            title: 'Innovation',
            description: 'Continuously developing cutting-edge solutions that address real-world challenges',
        },
        {
            title: 'Quality',
            description: 'Maintaining the highest standards in all our products and services',
        },
        {
            title: 'Customer Success',
            description: 'Building lasting relationships by ensuring our clients achieve their goals',
        },
        {
            title: 'Sustainability',
            description: 'Operating responsibly with respect for the environment and future generations',
        },
        {
            title: 'Team Development',
            description: 'Investing in our people and fostering a culture of growth and collaboration',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Vision & Mission" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Our Purpose
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Vision & Mission
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        Guiding our journey towards excellence and innovation
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-12"
                >
                    {/* Vision */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-12 backdrop-blur-xl"
                    >
                        <div className="absolute left-0 top-0 h-96 w-96 bg-violet-600/20 blur-[128px]" />
                        <div className="relative">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <Eye className="h-8 w-8 text-violet-400" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-4xl font-bold text-white">Vision</h2>
                            </div>
                            <p className="text-lg leading-relaxed text-zinc-200">
                                To be the leading innovator in our industry, recognized globally for 
                                our commitment to excellence, sustainability, and positive impact on 
                                society. We envision a future where our solutions empower businesses 
                                and individuals to achieve their full potential.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-12 backdrop-blur-xl"
                    >
                        <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/10 blur-[128px]" />
                        <div className="relative">
                            <div className="mb-8 flex items-center gap-4">
                                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                    <Target className="h-8 w-8 text-violet-400" strokeWidth={1.5} />
                                </div>
                                <h2 className="text-4xl font-bold text-white">Mission</h2>
                            </div>
                            <p className="mb-8 text-lg leading-relaxed text-zinc-400">
                                Our mission is to deliver exceptional value to our customers through:
                            </p>
                            <div className="space-y-4">
                                {missionPoints.map((point, index) => (
                                    <motion.div
                                        key={point.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                                    >
                                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10">
                                            <svg className="h-4 w-4 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white">{point.title}:</span>{' '}
                                            <span className="text-zinc-400">{point.description}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Core Principles */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="text-center">
                            <h3 className="mb-4 text-4xl font-bold text-white">
                                Our Core Principles
                            </h3>
                            <p className="text-lg text-zinc-400">
                                The values that drive our actions every day
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {principles.map((principle, index) => {
                                const Icon = principle.icon;
                                return (
                                    <motion.div
                                        key={principle.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, duration: 0.6 }}
                                        whileHover={{ y: -4 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/10"
                                    >
                                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/0 via-violet-600/5 to-purple-600/0 opacity-0 transition-opacity group-hover:opacity-100" />
                                        <div className="mb-4 inline-flex rounded-xl border border-white/5 bg-white/5 p-3">
                                            <Icon className="h-6 w-6 text-violet-400" strokeWidth={1.5} />
                                        </div>
                                        <h4 className="mb-2 text-xl font-semibold text-white">{principle.title}</h4>
                                        <p className="text-sm leading-relaxed text-zinc-400">
                                            {principle.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </PublicLayout>
    );
}