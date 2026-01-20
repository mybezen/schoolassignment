import AppLayout from "@/layouts/app-layout";
import { events } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: events().url,
    },
];

export default function Events() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
        </AppLayout>
    )
}