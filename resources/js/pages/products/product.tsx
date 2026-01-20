import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { products } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product',
        href: products().url,
    },
];

export default function Products() {
    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
          
        </AppLayout>
    );
}
