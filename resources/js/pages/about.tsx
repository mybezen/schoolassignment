import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About Us" />

            <div className="mx-auto max-w-4xl">
                <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">
                    About Us
                </h1>

                <div className="space-y-6 text-gray-700 dark:text-gray-300">
                    <p className="text-lg leading-relaxed">
                        Welcome to our company. We are dedicated to providing exceptional products 
                        and services that make a real difference in the lives of our customers. 
                        With years of experience in the industry, we have built a reputation for 
                        excellence, innovation, and reliability.
                    </p>

                    <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                            Our Story
                        </h2>
                        <p className="leading-relaxed">
                            Founded with a vision to transform the industry, our company has grown 
                            from a small startup to a leading provider of innovative solutions. 
                            Throughout our journey, we have remained committed to our core values 
                            of integrity, quality, and customer satisfaction.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                            What We Do
                        </h2>
                        <p className="leading-relaxed">
                            We specialize in delivering cutting-edge solutions that help businesses 
                            thrive in today's competitive landscape. Our team of experts works 
                            tirelessly to ensure that every project we undertake meets the highest 
                            standards of quality and exceeds our clients' expectations.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                            Our Values
                        </h2>
                        <ul className="list-inside list-disc space-y-2 leading-relaxed">
                            <li><strong>Excellence:</strong> We strive for excellence in everything we do</li>
                            <li><strong>Innovation:</strong> We embrace change and continuously seek new ways to improve</li>
                            <li><strong>Integrity:</strong> We conduct our business with honesty and transparency</li>
                            <li><strong>Collaboration:</strong> We work together to achieve common goals</li>
                            <li><strong>Customer Focus:</strong> We put our customers at the heart of everything we do</li>
                        </ul>
                    </div>

                    <div className="mt-8 rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
                            Join Our Journey
                        </h2>
                        <p className="leading-relaxed">
                            Whether you're looking for innovative solutions, career opportunities, 
                            or partnership possibilities, we'd love to hear from you. Together, 
                            we can achieve great things.
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}