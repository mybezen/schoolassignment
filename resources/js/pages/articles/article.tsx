import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { articles } from "@/routes";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Articles',
        href: articles().url,
    },
];

export default function Articles() {
    return(
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Articles"/>
            
        </AppLayout>
    )
}