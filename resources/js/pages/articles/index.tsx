import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';

export default function Articles() {
    return (
        <PublicLayout>
            <Head title="Articles" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Articles
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Read our latest insights, news, and industry updates
                    </p>
                </div>

                <EmptyState 
                    title="No Articles Available Yet"
                    message="We're working on creating valuable content for you. Check back soon!"
                />
            </div>
        </PublicLayout>
    );
}