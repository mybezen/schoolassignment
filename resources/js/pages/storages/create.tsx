import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { products } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products().url,
    },
    {
        title: 'Create',
        href: '#',
    },
];

export default function Create() {
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Storage" />
          
        </AppLayout>
    );
}
