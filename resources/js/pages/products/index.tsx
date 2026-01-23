import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';

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

export default function ProductsIndex({ products }: ProductsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Products" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#35291B]">
                        Our Products
                    </h1>
                    <p className="mt-2 text-[#6F5B3A]">
                        Explore our comprehensive range of products and services
                    </p>
                </div>

                {products.data.length === 0 ? (
                    <EmptyState
                        title="No Products Available Yet"
                        message="We're working on adding products. Check back soon!"
                    />
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.data.map((product) => (
                                <div key={product.id} className="flex flex-col overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                                    <div className="p-0">
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-gradient-to-br from-[#FFF8ED] to-[#F5EFE6]" />
                                        )}
                                    </div>
                                    <div className="flex-1 p-6">
                                        <h3 className="text-xl font-semibold text-[#35291B]">{product.name}</h3>
                                        {product.description && (
                                            <p className="mt-2 text-sm text-[#6F5B3A] line-clamp-3">
                                                {product.description}
                                            </p>
                                        )}
                                        {product.price && (
                                            <p className="mt-2 inline-block rounded-full bg-[#FFF0DB] px-3 py-1 text-sm font-medium text-[#6F5B3A]">
                                                ${product.price}
                                            </p>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <Link 
                                            href={`/products/${product.slug}`}
                                            className="block w-full rounded-lg border border-[#E8DCC8] py-2 text-center text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {products.links.map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-[#A67C52] to-[#8B6F47] text-[#FFFBF5]'
                                                    : 'border border-[#E8DCC8] text-[#6F5B3A] hover:bg-[#FAF7F2]'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="rounded-lg border border-[#E8DCC8] px-4 py-2 text-sm font-medium text-[#D4C4A8]"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </PublicLayout>
    );
}