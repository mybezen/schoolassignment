import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowLeft, Tag, ShoppingCart } from 'lucide-react';
import { motion, Variants } from 'motion/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    content: string | null;
    image: string | null;
    price: string | null;
}

interface ProductShowProps {
    product: Product;
    relatedProducts: Product[];
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

export default function ProductShow({ product, relatedProducts }: ProductShowProps) {
    return (
        <PublicLayout>
            <Head title={product.name} />

            <div className="py-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Products
                    </Link>
                </motion.div>

                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden rounded-3xl border border-white/5"
                    >
                        {product.image ? (
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="w-full object-cover"
                            />
                        ) : (
                            <div className="aspect-square w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                        )}
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                            Product Details
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-6xl font-bold leading-[1.1] tracking-tight text-transparent">
                            {product.name}
                        </motion.h1>

                        {product.price && (
                            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-6 py-3 backdrop-blur-xl">
                                <Tag className="h-5 w-5 text-violet-400" />
                                <span className="text-2xl font-bold text-white">${product.price}</span>
                            </motion.div>
                        )}

                        {product.description && (
                            <motion.div variants={itemVariants} className="mb-8">
                                <h2 className="mb-3 text-xl font-semibold text-white">
                                    Description
                                </h2>
                                <p className="text-lg leading-relaxed text-zinc-400">
                                    {product.description}
                                </p>
                            </motion.div>
                        )}

                        {product.content && (
                            <motion.div variants={itemVariants} className="mb-8 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl">
                                <h2 className="mb-4 text-xl font-semibold text-white">
                                    Details
                                </h2>
                                <div className="prose prose-invert max-w-none">
                                    <p className="whitespace-pre-wrap text-zinc-400">{product.content}</p>
                                </div>
                            </motion.div>
                        )}

                        <motion.div variants={itemVariants}>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Contact Us for More Info
                                <ArrowLeft className="h-5 w-5 rotate-180 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-32">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={containerVariants}
                        >
                            <motion.h2 variants={itemVariants} className="mb-12 text-center text-4xl font-bold text-white">
                                Related Products
                            </motion.h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {relatedProducts.map((related) => (
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
                                                    alt={related.name}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-white/5 to-white/[0.02]" />
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-white">{related.name}</h3>
                                            {related.description && (
                                                <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
                                                    {related.description}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between">
                                                {related.price && (
                                                    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
                                                        <Tag className="h-3.5 w-3.5 text-violet-400" />
                                                        <span className="text-sm font-semibold text-white">${related.price}</span>
                                                    </div>
                                                )}
                                                <Link
                                                    href={`/products/${related.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-violet-400 transition-colors hover:text-violet-300"
                                                >
                                                    View Details
                                                    <ArrowLeft className="h-4 w-4 rotate-180" />
                                                </Link>
                                            </div>
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