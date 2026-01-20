import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Home" />

            {/* Hero Section */}
            <div className="mb-16 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-20 text-center text-white">
                <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
                    Welcome to Our Company
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
                    Building excellence through innovation and dedication. We deliver outstanding 
                    products and services that exceed expectations.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/products"
                        className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-gray-100"
                    >
                        Explore Products
                    </Link>
                    <Link
                        href="/contact"
                        className="rounded-md border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-blue-600"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="mb-16">
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                    Why Choose Us
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Quality First</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            We prioritize quality in everything we do, ensuring excellence in every product and service.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <svg className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Innovation</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Constantly evolving and innovating to meet the changing needs of our clients.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-800">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Customer Focus</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Your success is our success. We work closely with clients to achieve their goals.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-lg bg-gray-100 px-8 py-12 text-center dark:bg-gray-800">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                    Ready to Get Started?
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Contact us today to learn more about how we can help your business grow.
                </p>
                <Link
                    href="/contact"
                    className="inline-block rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                    Get In Touch
                </Link>
            </div>
        </PublicLayout>
    );
}