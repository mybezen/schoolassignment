import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { motion, Variants } from 'motion/react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    thumbnail: string | null;
    author: string | null;
    published_at: string;
}

interface ArticleShowProps {
    article: Article;
    relatedArticles: Article[];
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

export default function ArticleShow({ article, relatedArticles }: ArticleShowProps) {
    return (
        <PublicLayout>
            <Head title={article.title} />

            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/articles"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Articles
                    </Link>
                </motion.div>

                <article className="mx-auto max-w-4xl">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Article Header */}
                        <header className="mb-12">
                            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                                Article
                            </motion.div>
                            
                            <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-6xl font-bold leading-[1.1] tracking-tight text-transparent">
                                {article.title}
                            </motion.h1>

                            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-violet-400" />
                                    <span>{format(new Date(article.published_at), 'MMMM dd, yyyy')}</span>
                                </div>
                                {article.author && (
                                    <>
                                        <span className="text-white/20">•</span>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-violet-400" />
                                            <span>{article.author}</span>
                                        </div>
                                    </>
                                )}
                                <span className="text-white/20">•</span>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-violet-400" />
                                    <span>5 min read</span>
                                </div>
                            </motion.div>

                            {article.excerpt && (
                                <motion.p variants={itemVariants} className="mt-6 text-xl leading-relaxed text-zinc-300">
                                    {article.excerpt}
                                </motion.p>
                            )}
                        </header>

                        {/* Featured Image */}
                        {article.thumbnail && (
                            <motion.div variants={itemVariants} className="mb-12 overflow-hidden rounded-3xl border border-white/5">
                                <img
                                    src={`/storage/${article.thumbnail}`}
                                    alt={article.title}
                                    className="w-full object-cover"
                                />
                            </motion.div>
                        )}

                        {/* Article Content */}
                        <motion.div
                            variants={itemVariants}
                            className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-12 backdrop-blur-xl"
                        >
                            <div className="absolute right-0 top-0 h-96 w-96 bg-violet-600/5 blur-[128px]" />
                            <div className="prose prose-invert prose-lg relative max-w-none">
                                <div className="whitespace-pre-wrap leading-relaxed text-zinc-300">
                                    {article.content}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section className="mt-32">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={itemVariants} className="mb-12 text-center text-4xl font-bold text-white">
                                Related Articles
                            </motion.h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedArticles.map((related) => (
                                    <motion.div
                                        key={related.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -8 }}
                                        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
                                    >
                                        <div className="aspect-video overflow-hidden">
                                            {related.thumbnail ? (
                                                <img
                                                    src={`/storage/${related.thumbnail}`}
                                                    alt={related.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <p className="mb-2 text-xs font-medium text-violet-400">
                                                {format(new Date(related.published_at), 'MMMM dd, yyyy')}
                                            </p>
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{related.title}</h3>
                                            {related.excerpt && (
                                                <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                    {related.excerpt}
                                                </p>
                                            )}
                                            <Link
                                                href={`/articles/${related.slug}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                            >
                                                Read More
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