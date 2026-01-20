import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';

export default function Events() {
    return (
        <PublicLayout>
            <Head title="Events" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Events
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Stay updated with our upcoming events and activities
                    </p>
                </div>

                <EmptyState 
                    title="No Events Scheduled"
                    message="We don't have any events scheduled at the moment. Please check back later for updates!"
                />
            </div>
        </PublicLayout>
    );
}