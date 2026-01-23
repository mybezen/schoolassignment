import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

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
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const handleCategoryFilter = (category: string | null) => {
        router.get('/gallery', category ? { category } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Gallery" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Gallery
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Explore our collection of photos and moments
                    </p>
                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        <Button
                            variant={!selectedCategory ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryFilter(null)}
                        >
                            All
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleCategoryFilter(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                )}

                {galleries.data.length === 0 ? (
                    <EmptyState
                        title="No Images Available"
                        message={selectedCategory 
                            ? `No images found in "${selectedCategory}" category`
                            : "We're building our gallery. Check back soon!"
                        }
                    />
                ) : (
                    <>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {galleries.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 cursor-pointer"
                                    onClick={() => setLightboxImage(`/storage/${item.image}`)}
                                >
                                    <img
                                        src={`/storage/${item.image}`}
                                        alt={item.title || 'Gallery image'}
                                        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                            {item.title && (
                                                <h3 className="font-semibold line-clamp-1">
                                                    {item.title}
                                                </h3>
                                            )}
                                            {item.caption && (
                                                <p className="text-sm text-gray-200 line-clamp-2">
                                                    {item.caption}
                                                </p>
                                            )}
                                            {item.category && (
                                                <Badge variant="secondary" className="mt-2">
                                                    {item.category}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {galleries.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {galleries.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        asChild={!!link.url}
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button
                        className="absolute right-4 top-4 text-white hover:text-gray-300"
                        onClick={() => setLightboxImage(null)}
                    >
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={lightboxImage}
                        alt="Gallery"
                        className="max-h-full max-w-full object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </PublicLayout>
    );
}