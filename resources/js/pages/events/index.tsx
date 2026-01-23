import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
}

interface PaginatedEvents {
    data: Event[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface EventsIndexProps {
    upcomingEvents: PaginatedEvents;
    pastEvents: PaginatedEvents;
}

export default function EventsIndex({ upcomingEvents, pastEvents }: EventsIndexProps) {
    return (
        <PublicLayout>
            <Head title="Events" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Events
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Join us at our upcoming events and stay connected
                    </p>
                </div>

                {/* Upcoming Events */}
                <section className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                        Upcoming Events
                    </h2>
                    
                    {upcomingEvents.data.length === 0 ? (
                        <EmptyState
                            title="No Upcoming Events"
                            message="Stay tuned for our upcoming events and activities!"
                        />
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {upcomingEvents.data.map((event) => (
                                <Card key={event.id} className="flex flex-col overflow-hidden">
                                    <CardContent className="p-0">
                                        {event.image ? (
                                            <img
                                                src={`/storage/${event.image}`}
                                                alt={event.title}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                        <Badge className="absolute right-2 top-2">Upcoming</Badge>
                                    </CardContent>
                                    <CardHeader className="flex-1">
                                        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                                </span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                        {event.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {event.description}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/events/${event.slug}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>

                {/* Past Events */}
                {pastEvents.data.length > 0 && (
                    <section>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Past Events
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {pastEvents.data.map((event) => (
                                <Card key={event.id} className="flex flex-col overflow-hidden opacity-75">
                                    <CardContent className="p-0">
                                        {event.image ? (
                                            <img
                                                src={`/storage/${event.image}`}
                                                alt={event.title}
                                                className="aspect-video w-full object-cover grayscale"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                        <Badge variant="secondary" className="absolute right-2 top-2">
                                            Past
                                        </Badge>
                                    </CardContent>
                                    <CardHeader className="flex-1">
                                        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                                </span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardFooter>
                                        <Button variant="ghost" className="w-full" asChild>
                                            <Link href={`/events/${event.slug}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </PublicLayout>
    );
}