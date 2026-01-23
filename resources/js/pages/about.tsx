import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

interface Client {
    id: number;
    name: string;
    logo: string;
}

interface AboutProps {
    clients: Client[];
}

export default function About({ clients }: AboutProps) {
    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To deliver innovative solutions that drive business growth and create lasting value for our clients.',
        },
        {
            icon: Users,
            title: 'Our Team',
            description: 'A diverse group of talented professionals dedicated to excellence and customer satisfaction.',
        },
        {
            icon: Award,
            title: 'Quality First',
            description: 'We maintain the highest standards in everything we do, ensuring exceptional results every time.',
        },
        {
            icon: TrendingUp,
            title: 'Growth Focus',
            description: 'Committed to continuous improvement and innovation to stay ahead in the industry.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="About Us" />

            <div>
                {/* Hero Section */}
                <section className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
                        About Our Company
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                        Building excellence through innovation, dedication, and a commitment to our clients' success
                    </p>
                </section>

                {/* Company Story */}
                <section className="mb-16">
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-400">
                                <p>
                                    Founded with a vision to transform the industry, our company has grown from a small startup to a leading provider of innovative solutions. We believe in the power of technology and human creativity to solve complex challenges.
                                </p>
                                <p>
                                    Over the years, we've built strong relationships with clients across various industries, helping them achieve their goals through our expertise, dedication, and innovative approach. Our team of professionals brings together diverse skills and experiences to deliver exceptional results.
                                </p>
                                <p>
                                    Today, we continue to push boundaries, explore new possibilities, and create value for our clients. Our commitment to excellence remains unwavering as we look forward to the future.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Values */}
                <section className="mb-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Our Values
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <Card key={value.title}>
                                    <CardContent className="p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </section>

                {/* Stats */}
                <section className="mb-16">
                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
                        <div className="grid gap-8 text-center sm:grid-cols-4">
                            <div>
                                <p className="text-4xl font-bold">10+</p>
                                <p className="mt-2 text-blue-100">Years Experience</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">500+</p>
                                <p className="mt-2 text-blue-100">Projects Completed</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">200+</p>
                                <p className="mt-2 text-blue-100">Happy Clients</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold">50+</p>
                                <p className="mt-2 text-blue-100">Team Members</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clients */}
                {clients.length > 0 && (
                    <section className="mb-16">
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                            Trusted By
                        </h2>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                            {clients.map((client) => (
                                <div
                                    key={client.id}
                                    className="flex items-center justify-center rounded-lg bg-white p-4 dark:bg-gray-800"
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

                {/* CTA */}
                <section className="text-center">
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                Ready to Work With Us?
                            </h2>
                            <p className="mb-6 text-gray-600 dark:text-gray-400">
                                Let's discuss how we can help you achieve your goals
                            </p>
                            <Button size="lg" asChild>
                                <Link href="/contact">Get in Touch</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </PublicLayout>
    );
}