import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Tag } from 'lucide-react';
import { motion, Variants } from 'motion/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: string | null;
}

interface PaginatedProducts {
    data: Product[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ProductsIndexProps {
    products: PaginatedProducts;
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

export default function ProductsIndex({ products }: ProductsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Products" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Products
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Our Products
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        Explore our comprehensive range of products and services designed to elevate your experience
                    </motion.p>
                </motion.div>

                {products.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-16 backdrop-blur-xl">
                            <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-6">
                                <svg className="h-12 w-12 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">No Products Available Yet</h3>
                            <p className="text-zinc-400">
                                We're working on adding products. Check back soon!
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
                            {products.data.map((product) => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all hover:border-white/10"
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
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="mb-3 text-xl font-semibold text-white">{product.name}</h3>
                                        {product.description && (
                                            <p className="mb-4 line-clamp-3 flex-1 text-sm text-zinc-400">
                                                {product.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            {product.price && (
                                                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                                                    <Tag className="h-4 w-4 text-violet-400" />
                                                    <span className="text-sm font-semibold text-white">${product.price}</span>
                                                </div>
                                            )}
                                            <Link
                                                href={`/products/${product.slug}`}
                                                className="group/link inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                            >
                                                View Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 flex justify-center gap-2"
                            >
                                {products.links.map((link, index) => (
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