import AppLayout from "@/layouts/app-layout";
import { pictures } from "@/routes";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pictures',
        href: pictures().url,
    },
];

export default function Pictures() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pictures" />
        </AppLayout>
    )
}