import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { format, isPast } from 'date-fns';

interface Event {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    image: string | null;
    location: string | null;
    start_date: string;
    end_date: string | null;
}

interface EventShowProps {
    event: Event;
    relatedEvents: Event[];
}

export default function EventShow({ event, relatedEvents }: EventShowProps) {
    const isEventPast = isPast(new Date(event.start_date));

    return (
        <PublicLayout>
            <Head title={event.title} />

            <div>
                <Button variant="outline" size="sm" className="mb-6" asChild>
                    <Link href="/events">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </Link>
                </Button>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Event Details */}
                    <div className="lg:col-span-2">
                        {/* Featured Image */}
                        {event.image && (
                            <div className="relative mb-6">
                                <img
                                    src={`/storage/${event.image}`}
                                    alt={event.title}
                                    className="w-full rounded-lg object-cover"
                                />
                                <Badge 
                                    variant={isEventPast ? 'secondary' : 'default'}
                                    className="absolute right-4 top-4"
                                >
                                    {isEventPast ? 'Past Event' : 'Upcoming'}
                                </Badge>
                            </div>
                        )}

                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                            {event.title}
                        </h1>

                        {event.description && (
                            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                                {event.description}
                            </p>
                        )}

                        {event.content && (
                            <div className="prose dark:prose-invert max-w-none">
                                <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                    {event.content}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Info Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-6">
                            <CardHeader>
                                <CardTitle>Event Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                                    <div>
                                        <p className="font-medium text-sm text-muted-foreground">
                                            Start Date
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {format(new Date(event.start_date), 'MMMM dd, yyyy')}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {format(new Date(event.start_date), 'h:mm a')}
                                        </p>
                                    </div>
                                </div>

                                {event.end_date && (
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm text-muted-foreground">
                                                End Date
                                            </p>
                                            <p className="text-gray-900 dark:text-white">
                                                {format(new Date(event.end_date), 'MMMM dd, yyyy')}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {format(new Date(event.end_date), 'h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {event.location && (
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium text-sm text-muted-foreground">
                                                Location
                                            </p>
                                            <p className="text-gray-900 dark:text-white">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {!isEventPast && (
                                    <div className="pt-4">
                                        <Button className="w-full" size="lg" asChild>
                                            <Link href="/contact">Register Interest</Link>
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Related Events */}
                {relatedEvents.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Other Upcoming Events
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedEvents.map((related) => (
                                <Card key={related.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        {related.image ? (
                                            <img
                                                src={`/storage/${related.image}`}
                                                alt={related.title}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                    </CardContent>
                                    <CardHeader>
                                        <p className="text-xs text-muted-foreground">
                                            {format(new Date(related.start_date), 'MMMM dd, yyyy')}
                                        </p>
                                        <CardTitle className="line-clamp-2">{related.title}</CardTitle>
                                        {related.location && (
                                            <p className="text-sm text-muted-foreground">
                                                📍 {related.location}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/events/${related.slug}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}