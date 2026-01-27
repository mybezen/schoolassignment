import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import { motion, Variants } from 'motion/react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    author: string | null;
    published_at: string;
}

interface PaginatedArticles {
    data: Article[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ArticlesIndexProps {
    articles: PaginatedArticles;
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

export default function ArticlesIndex({ articles }: ArticlesIndexProps) {
    return (
        <PublicLayout>
            <Head title="Articles" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Insights
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Latest Articles
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        Read our latest insights, news, and industry updates
                    </motion.p>
                </motion.div>

                {articles.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-16 backdrop-blur-xl">
                            <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-6">
                                <svg className="h-12 w-12 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <h2 className="mb-3 text-2xl font-bold text-white">No Articles Available Yet</h2>
                            <p className="text-zinc-400">
                                We're working on creating valuable content for you. Check back soon!
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {articles.data.map((article, index) => (
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
                                        <div className="mb-3 flex items-center gap-3 text-xs text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 text-violet-400" />
                                                <span>{format(new Date(article.published_at), 'MMM dd, yyyy')}</span>
                                            </div>
                                            {article.author && (
                                                <>
                                                    <span className="text-white/20">•</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="h-3.5 w-3.5 text-violet-400" />
                                                        <span>{article.author}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{article.title}</h3>
                                        {article.excerpt && (
                                            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            className="group/link inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                        >
                                            Read Article
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {articles.links.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 flex justify-center gap-2"
                            >
                                {articles.links.map((link, index) => (
                                    <div key={index}>
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg border px-4 text-sm font-medium backdrop-blur-xl transition-all ${
                                                    link.active
                                                        ? 'border-violet-500/50 bg-violet-500/10 text-white'
                                                        : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                className="inline-flex h-10 min-w-[40px] items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] px-4 text-sm font-medium text-zinc-600 backdrop-blur-xl"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </PublicLayout>
    );
}