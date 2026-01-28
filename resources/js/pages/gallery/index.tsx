import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ImageIcon, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export default function GalleryIndex({ galleries, categories, selectedCategory }: GalleryIndexProps) {
    const [lightboxImage, setLightboxImage] = useState<number | null>(null);

    const handleCategoryFilter = (category: string | null) => {
        router.get('/gallery', category ? { category } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const openLightbox = (index: number) => setLightboxImage(index);
    const closeLightbox = () => setLightboxImage(null);

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

            <div className="relative min-h-screen py-24 px-6">
                {/* Subtle overlay glow */}
                <div className="absolute inset-0 bg-gradient-radial from-violet-600/8 via-transparent to-transparent pointer-events-none" />

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20 text-center relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
                        className="mb-8 inline-flex items-center gap-3 rounded-full border border-violet-500/30 bg-violet-950/40 px-8 py-3 text-base font-semibold text-violet-200 backdrop-blur-2xl shadow-lg shadow-violet-950/20"
                    >
                        Gallery
                    </motion.div>
                    <h1 className="mb-8 bg-gradient-to-br from-white via-violet-200 to-violet-400 bg-clip-text text-6xl font-black tracking-tighter text-transparent sm:text-7xl lg:text-8xl">
                        Moments in Frame
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl leading-relaxed text-zinc-300">
                        A curated visual journey capturing emotion, light, and timeless stories.
                    </p>
                </motion.div>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.9 }}
                        className="mb-16 flex justify-center overflow-x-auto pb-6 scrollbar-hide"
                    >
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.08, y: -4 }}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => handleCategoryFilter(null)}
                                className={`flex-shrink-0 rounded-full border px-8 py-3 text-base font-medium backdrop-blur-2xl transition-all duration-400 shadow-lg ${
                                    !selectedCategory
                                        ? 'border-violet-400 bg-violet-500/20 text-violet-100 shadow-violet-500/30'
                                        : 'border-white/15 bg-white/5 text-zinc-300 hover:border-violet-500/40 hover:bg-violet-950/40 hover:text-violet-100'
                                }`}
                            >
                                All Works
                            </motion.button>
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat}
                                    whileHover={{ scale: 1.08, y: -4 }}
                                    whileTap={{ scale: 0.94 }}
                                    onClick={() => handleCategoryFilter(cat)}
                                    className={`flex-shrink-0 rounded-full border px-8 py-3 text-base font-medium backdrop-blur-2xl transition-all duration-400 shadow-lg ${
                                        selectedCategory === cat
                                            ? 'border-violet-400 bg-violet-500/20 text-violet-100 shadow-violet-500/30'
                                            : 'border-white/15 bg-white/5 text-zinc-300 hover:border-violet-500/40 hover:bg-violet-950/40 hover:text-violet-100'
                                    }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Masonry Grid */}
                {galleries.data.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mx-auto max-w-lg rounded-3xl border border-violet-500/20 bg-black/50 p-16 text-center backdrop-blur-2xl shadow-2xl shadow-violet-950/30"
                    >
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-violet-500/10"
                        >
                            <ImageIcon className="h-12 w-12 text-violet-400" />
                        </motion.div>
                        <h3 className="mb-4 text-3xl font-bold text-white">
                            {selectedCategory ? `No images in "${selectedCategory}"` : 'Gallery is empty'}
                        </h3>
                        <p className="mb-8 text-lg text-zinc-300">
                            Our collection is growing. Check back soon!
                        </p>
                        <Button asChild variant="outline" className="border-violet-500/40 hover:bg-violet-950/40 hover:text-violet-200">
                            <Link href="/gallery">Refresh</Link>
                        </Button>
                    </motion.div>
                ) : (
                    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4 space-y-6">
                        {galleries.data.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 80 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 1,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                whileHover={{ y: -16, transition: { duration: 0.4 } }}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => openLightbox(index)}
                            >
                                <div className="relative overflow-hidden rounded-3xl border border-violet-500/15 bg-black/50 backdrop-blur-xl shadow-xl shadow-black/30 group-hover:shadow-violet-900/40 transition-all duration-600">
                                    <motion.div
                                        className="relative aspect-[4/5] overflow-hidden"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title || 'Gallery image'}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        whileHover={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute bottom-0 left-0 right-0 p-8"
                                    >
                                        {item.title && (
                                            <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-2xl">
                                                {item.title}
                                            </h3>
                                        )}
                                        {item.caption && (
                                            <p className="text-base text-zinc-200 line-clamp-3 drop-shadow-xl">
                                                {item.caption}
                                            </p>
                                        )}
                                        {item.category && (
                                            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/60 px-4 py-1.5 text-sm font-medium text-violet-200 backdrop-blur-md shadow-md">
                                                <Tag className="h-4 w-4" />
                                                {item.category}
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {galleries.links.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-24 flex justify-center gap-4 flex-wrap"
                    >
                        {galleries.links.map((link, i) => (
                            <motion.div key={i} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        className={`inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border px-6 text-base font-semibold backdrop-blur-xl transition-all duration-400 shadow-md ${
                                            link.active
                                                ? 'border-violet-400 bg-violet-500/20 text-violet-100 shadow-violet-500/30'
                                                : 'border-white/15 bg-white/5 text-zinc-200 hover:border-violet-500/40 hover:bg-violet-950/40 hover:text-violet-100 hover:shadow-violet-500/20'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-6 text-base font-semibold text-zinc-600 backdrop-blur-xl"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-3xl p-6"
                        onClick={closeLightbox}
                    >
                        <button
                            className="absolute right-10 top-10 z-20 rounded-full bg-black/50 p-5 text-white/90 backdrop-blur-2xl transition hover:bg-black/70 hover:text-white"
                            onClick={closeLightbox}
                        >
                            <X className="h-8 w-8" />
                        </button>

                        {lightboxImage > 0 && (
                            <button
                                className="absolute left-10 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-6 text-white/90 backdrop-blur-2xl transition hover:bg-black/70 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                            >
                                <ChevronLeft className="h-9 w-9" />
                            </button>
                        )}

                        {lightboxImage < galleries.data.length - 1 && (
                            <button
                                className="absolute right-10 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-6 text-white/90 backdrop-blur-2xl transition hover:bg-black/70 hover:text-white"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                            >
                                <ChevronRight className="h-9 w-9" />
                            </button>
                        )}

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="relative max-h-[92vh] max-w-[96vw] overflow-hidden rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.9)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={`/storage/${galleries.data[lightboxImage].image}`}
                                alt={galleries.data[lightboxImage].title || 'Gallery image'}
                                className="max-h-[92vh] max-w-full object-contain rounded-3xl"
                            />

                            {(galleries.data[lightboxImage].title || galleries.data[lightboxImage].caption) && (
                                <motion.div
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.7 }}
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-10"
                                >
                                    {galleries.data[lightboxImage].title && (
                                        <h2 className="mb-4 text-4xl font-black text-white drop-shadow-2xl">
                                            {galleries.data[lightboxImage].title}
                                        </h2>
                                    )}
                                    {galleries.data[lightboxImage].caption && (
                                        <p className="text-xl text-zinc-100 drop-shadow-xl max-w-3xl">
                                            {galleries.data[lightboxImage].caption}
                                        </p>
                                    )}
                                </motion.div>
                            )}

                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-8 py-3 text-base font-bold text-violet-200 backdrop-blur-2xl shadow-lg">
                                {lightboxImage + 1} / {galleries.data.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PublicLayout>
    );
}