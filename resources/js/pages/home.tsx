import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Coffee } from 'lucide-react';
import { format } from 'date-fns';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    price: string | null;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    published_at: string;
}

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    start_date: string;
    location: string | null;
}

interface Client {
    id: number;
    name: string;
    logo: string;
}

interface HomeProps {
    featuredProducts: Product[];
    latestArticles: Article[];
    upcomingEvents: Event[];
    clients: Client[];
}

export default function Home({ featuredProducts, latestArticles, upcomingEvents, clients }: HomeProps) {
    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="mb-16 rounded-2xl bg-gradient-to-br from-[#BFA888] via-[#8B6F47] to-[#A67C52] px-8 py-20 text-[#FFFBF5] shadow-2xl">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-[#FFFBF5]/20 p-4 backdrop-blur-sm">
                            <Coffee className="h-12 w-12 text-[#FFFBF5]" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-5xl font-bold leading-tight">
                        Welcome to Our Company
                    </h1>
                    <p className="mb-8 text-xl text-[#FFF8ED]">
                        Building excellence through innovation and dedication
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/products"
                            className="inline-flex items-center rounded-lg bg-[#FFFBF5] px-6 py-3 text-base font-medium text-[#4A3926] shadow-lg transition-all hover:bg-[#FFF8ED] hover:shadow-xl"
                        >
                            Explore Products
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link 
                            href="/contact"
                            className="inline-flex items-center rounded-lg border-2 border-[#FFFBF5] bg-transparent px-6 py-3 text-base font-medium text-[#FFFBF5] transition-all hover:bg-[#FFFBF5]/10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="mb-16">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#35291B]">
                                Featured Products
                            </h2>
                            <p className="mt-2 text-[#6F5B3A]">
                                Discover our latest offerings
                            </p>
                        </div>
                        <Link 
                            href="/products"
                            className="rounded-lg border border-[#E8DCC8] px-4 py-2 text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
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
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[#35291B]">{product.name}</h3>
                                    {product.description && (
                                        <p className="mt-2 text-sm text-[#6F5B3A] line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    {product.price && (
                                        <p className="mt-2 inline-block rounded-full bg-[#FFF0DB] px-3 py-1 text-sm font-medium text-[#6F5B3A]">
                                            ${product.price}
                                        </p>
                                    )}
                                </div>
                                <div className="px-6 pb-6">
                                    <Link 
                                        href={`/products/${product.slug}`}
                                        className="block w-full rounded-lg border border-[#E8DCC8] py-2 text-center text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Latest Articles */}
            {latestArticles.length > 0 && (
                <section className="mb-16">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#35291B]">
                                Latest Articles
                            </h2>
                            <p className="mt-2 text-[#6F5B3A]">
                                Stay updated with our insights
                            </p>
                        </div>
                        <Link 
                            href="/articles"
                            className="rounded-lg border border-[#E8DCC8] px-4 py-2 text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {latestArticles.map((article) => (
                            <div key={article.id} className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                                <div className="p-0">
                                    {article.thumbnail ? (
                                        <img
                                            src={`/storage/${article.thumbnail}`}
                                            alt={article.title}
                                            className="aspect-video w-full object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-video w-full bg-gradient-to-br from-[#FFF8ED] to-[#F5EFE6]" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <p className="text-xs text-[#A67C52]">
                                        {format(new Date(article.published_at), 'MMMM dd, yyyy')}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-[#35291B] line-clamp-2">{article.title}</h3>
                                    {article.excerpt && (
                                        <p className="mt-2 text-sm text-[#6F5B3A] line-clamp-2">
                                            {article.excerpt}
                                        </p>
                                    )}
                                </div>
                                <div className="px-6 pb-6">
                                    <Link 
                                        href={`/articles/${article.slug}`}
                                        className="block w-full rounded-lg border border-[#E8DCC8] py-2 text-center text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="mb-16">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-[#35291B]">
                                Upcoming Events
                            </h2>
                            <p className="mt-2 text-[#6F5B3A]">
                                Join us at our upcoming events
                            </p>
                        </div>
                        <Link 
                            href="/events"
                            className="rounded-lg border border-[#E8DCC8] px-4 py-2 text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="overflow-hidden rounded-lg border border-[#E8DCC8] bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                                <div className="p-0">
                                    {event.image ? (
                                        <img
                                            src={`/storage/${event.image}`}
                                            alt={event.title}
                                            className="aspect-video w-full object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-video w-full bg-gradient-to-br from-[#FFF8ED] to-[#F5EFE6]" />
                                    )}
                                </div>
                                <div className="p-6">
                                    <p className="text-xs text-[#A67C52]">
                                        {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-[#35291B] line-clamp-2">{event.title}</h3>
                                    {event.location && (
                                        <p className="mt-2 text-sm text-[#6F5B3A]">
                                            📍 {event.location}
                                        </p>
                                    )}
                                </div>
                                <div className="px-6 pb-6">
                                    <Link 
                                        href={`/events/${event.slug}`}
                                        className="block w-full rounded-lg border border-[#E8DCC8] py-2 text-center text-sm font-medium text-[#6F5B3A] transition-colors hover:bg-[#FAF7F2]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Clients */}
            {clients.length > 0 && (
                <section className="mb-16">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-[#35291B]">
                            Our Clients
                        </h2>
                        <p className="mt-2 text-[#6F5B3A]">
                            Trusted by leading organizations
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="flex items-center justify-center rounded-lg border border-[#E8DCC8] bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <img
                                    src={`/storage/${client.logo}`}
                                    alt={client.name}
                                    className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}