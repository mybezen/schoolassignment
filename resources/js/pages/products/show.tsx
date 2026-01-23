import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

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

export default function ProductShow({ product, relatedProducts }: ProductShowProps) {
    return (
        <PublicLayout>
            <Head title={product.name} />

            <div>
                <Button variant="outline" size="sm" className="mb-6" asChild>
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Link>
                </Button>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Product Image */}
                    <div>
                        {product.image ? (
                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="w-full rounded-lg object-cover"
                            />
                        ) : (
                            <div className="aspect-square w-full rounded-lg bg-muted" />
                        )}
                    </div>

                    {/* Product Details */}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                        </h1>
                        
                        {product.price && (
                            <div className="mt-4">
                                <Badge variant="secondary" className="text-lg px-4 py-2">
                                    ${product.price}
                                </Badge>
                            </div>
                        )}

                        {product.description && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Description
                                </h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {product.content && (
                            <div className="mt-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Details
                                </h2>
                                <div className="prose dark:prose-invert mt-2 max-w-none text-gray-600 dark:text-gray-400">
                                    <p className="whitespace-pre-wrap">{product.content}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-8">
                            <Button size="lg" asChild>
                                <Link href="/contact">Contact Us for More Info</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Related Products
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedProducts.map((related) => (
                                <Card key={related.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        {related.image ? (
                                            <img
                                                src={`/storage/${related.image}`}
                                                alt={related.name}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                    </CardContent>
                                    <CardHeader>
                                        <CardTitle>{related.name}</CardTitle>
                                        {related.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {related.description}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/products/${related.slug}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}