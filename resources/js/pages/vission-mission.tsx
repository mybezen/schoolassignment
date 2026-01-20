import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

export default function VisionMission() {
    return (
        <PublicLayout>
            <Head title="Vision & Mission" />

            <div className="mx-auto max-w-4xl">
                <h1 className="mb-12 text-center text-4xl font-bold text-gray-900 dark:text-white">
                    Our Vision & Mission
                </h1>

                <div className="space-y-8">
                    {/* Vision */}
                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
                        <div className="mb-4 flex items-center">
                            <svg className="mr-3 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <h2 className="text-3xl font-bold">Vision</h2>
                        </div>
                        <p className="text-lg leading-relaxed">
                            To be the leading innovator in our industry, recognized globally for 
                            our commitment to excellence, sustainability, and positive impact on 
                            society. We envision a future where our solutions empower businesses 
                            and individuals to achieve their full potential.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                        <div className="mb-4 flex items-center">
                            <svg className="mr-3 h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mission</h2>
                        </div>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p className="leading-relaxed">
                                Our mission is to deliver exceptional value to our customers through:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong>Innovation:</strong> Continuously developing cutting-edge 
                                        solutions that address real-world challenges
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong>Quality:</strong> Maintaining the highest standards in 
                                        all our products and services
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong>Customer Success:</strong> Building lasting relationships 
                                        by ensuring our clients achieve their goals
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong>Sustainability:</strong> Operating responsibly with respect 
                                        for the environment and future generations
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        <strong>Team Development:</strong> Investing in our people and 
                                        fostering a culture of growth and collaboration
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Core Principles */}
                    <div className="rounded-lg bg-gray-100 p-8 dark:bg-gray-800">
                        <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                            Our Core Principles
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Integrity</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    We conduct business with honesty and transparency in all our dealings.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Excellence</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    We strive for excellence and continuous improvement in everything we do.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Collaboration</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    We believe in the power of teamwork and partnerships to achieve great results.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Innovation</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    We embrace change and continuously seek innovative solutions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}