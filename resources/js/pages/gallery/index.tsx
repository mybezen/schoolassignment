import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Gallery {
    id: number;
    title: string | null;
    image: string;
    caption: string | null;
    category: string | null;
}

interface PaginatedGalleries {
    data: Gallery[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface GalleryIndexProps {
    galleries: PaginatedGalleries;
    categories: string[];
    selectedCategory: string | null;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants     = {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    visible: {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export default function GalleryIndex({ galleries, categories, selectedCategory }: GalleryIndexProps) {
    const [lightboxImage, setLightboxImage] = useState<number | null>(null);

    const handleCategoryFilter = (category: string | null) => {
        router.get('/gallery', category ? { category } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openLightbox = (index: number) => {
        setLightboxImage(index);
    };

    const closeLightbox = () => {
        setLightboxImage(null);
    };

    const nextImage = () => {
        if (lightboxImage !== null && lightboxImage < galleries.data.length - 1) {
            setLightboxImage(lightboxImage + 1);
        }
    };

    const prevImage = () => {
        if (lightboxImage !== null && lightboxImage > 0) {
            setLightboxImage(lightboxImage - 1);
        }
    };

    return (
        <PublicLayout>
            <Head title="Gallery" />

            <div className="py-20">
                {/* Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-20 text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-xl">
                        Gallery
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-7xl font-bold leading-[1.1] tracking-tight text-transparent">
                        Our Gallery
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-xl text-zinc-400">
                        Explore our collection of photos and memorable moments
                    </motion.p>
                </motion.div>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mb-12 flex flex-wrap justify-center gap-3"
                    >
                        <button
                            onClick={() => handleCategoryFilter(null)}
                            className={`rounded-xl border px-6 py-2.5 text-sm font-medium backdrop-blur-xl transition-all ${
                                !selectedCategory
                                    ? 'border-violet-500/50 bg-violet-500/10 text-white'
                                    : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryFilter(category)}
                                className={`rounded-xl border px-6 py-2.5 text-sm font-medium backdrop-blur-xl transition-all ${
                                    selectedCategory === category
                                        ? 'border-violet-500/50 bg-violet-500/10 text-white'
                                        : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>
                )}

                {galleries.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-16 backdrop-blur-xl">
                            <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-white/5 p-6">
                                <svg className="h-12 w-12 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-white">
                                {selectedCategory ? `No Images in "${selectedCategory}"` : 'No Images Available'}
                            </h3>
                            <p className="text-zinc-400">
                                {selectedCategory
                                    ? 'Try selecting a different category'
                                    : "We're building our gallery. Check back soon!"}
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        >
                            {galleries.data.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title || 'Gallery image'}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            {item.title && (
                                                <h3 className="mb-1 line-clamp-1 font-semibold text-white">
                                                    {item.title}
                                                </h3>
                                            )}
                                            {item.caption && (
                                                <p className="mb-2 line-clamp-2 text-sm text-zinc-300">
                                                    {item.caption}
                                                </p>
                                            )}
                                            {item.category && (
                                                <div className="inline-flex rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-xl">
                                                    {item.category}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {galleries.links.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-16 flex justify-center gap-2"
                            >
                                {galleries.links.map((link, index) => (
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

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-2xl"
                        onClick={closeLightbox}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute right-6 top-6 rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                            onClick={closeLightbox}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        {/* Navigation Buttons */}
                        {lightboxImage > 0 && (
                            <button
                                className="absolute left-6 rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                        )}
                        {lightboxImage < galleries.data.length - 1 && (
                            <button
                                className="absolute right-6 rounded-xl border border-white/10 bg-white/5 p-3 text-white backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </button>
                        )}

                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-h-[90vh] max-w-[90vw]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={`/storage/${galleries.data[lightboxImage].image}`}
                                alt={galleries.data[lightboxImage].title || 'Gallery image'}
                                className="max-h-[90vh] max-w-full rounded-2xl object-contain"
                            />
                            
                            {/* Image Info */}
                            {(galleries.data[lightboxImage].title || galleries.data[lightboxImage].caption) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl"
                                >
                                    {galleries.data[lightboxImage].title && (
                                        <h3 className="mb-2 text-xl font-semibold text-white">
                                            {galleries.data[lightboxImage].title}
                                        </h3>
                                    )}
                                    {galleries.data[lightboxImage].caption && (
                                        <p className="text-sm text-zinc-400">
                                            {galleries.data[lightboxImage].caption}
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-2xl">
                            {lightboxImage + 1} / {galleries.data.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}