import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';

export default function Gallery() {
    return (
        <PublicLayout>
            <Head title="Gallery" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Gallery
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Browse through our collection of images and moments
                    </p>
                </div>

                <EmptyState 
                    title="Gallery Coming Soon"
                    message="We're curating our image collection. Photos will be available soon!"
                />
            </div>
        </PublicLayout>
    );
}