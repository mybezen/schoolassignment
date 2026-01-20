import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';

export default function Products() {
    return (
        <PublicLayout>
            <Head title="Products / Services" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Products & Services
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Discover our range of innovative products and services
                    </p>
                </div>

                <EmptyState 
                    title="No Products Available Yet"
                    message="Our product catalog will be available soon. Stay tuned for updates!"
                />
            </div>
        </PublicLayout>
    );
}