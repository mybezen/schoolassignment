import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Calendar, MapPin, Image as ImageIcon, Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Event {
    id: number;
    title: string;
    description: string | null;
    content: string | null;
    location: string | null;
    image: string | null;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

interface EventsEditProps {
    event: Event;
}

export default function EventsEdit({ event }: EventsEditProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: event.title,
        description: event.description || '',
        content: event.content || '',
        location: event.location || '',
        image: null as File | null,
        start_date: new Date(event.start_date).toISOString().slice(0, 16),
        end_date: event.end_date
            ? new Date(event.end_date).toISOString().slice(0, 16)
            : '',
        is_active: event.is_active,
        _method: 'PUT',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/events/${event.id}`, {
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Event" />

            <motion.div 
                className="flex h-full flex-1 justify-center p-6 overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="mx-auto w-full max-w-4xl space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Edit Event
                        </h1>
                        <p className="text-muted-foreground mt-1">Update event information</p>
                    </motion.div>

                    <AnimatePresence>
                        {showSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3 shadow-lg shadow-primary/10"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                >
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </motion.div>
                                <p className="text-sm font-medium">Event updated successfully!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Card className="border-border/50 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="border-b border-border/50">
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    Event Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={submit} className="space-y-6">
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Label htmlFor="title" className="text-sm font-medium">
                                            Title <span className="text-destructive">*</span>
                                        </Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            onFocus={() => setFocusedField('title')}
                                            onBlur={() => setFocusedField(null)}
                                            required
                                            className={`transition-all duration-200 ${
                                                focusedField === 'title' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.title && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.title}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 }}
                                    >
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            onFocus={() => setFocusedField('description')}
                                            onBlur={() => setFocusedField(null)}
                                            rows={2}
                                            placeholder="Brief event summary"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'description' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.description && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.description}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            onFocus={() => setFocusedField('content')}
                                            onBlur={() => setFocusedField(null)}
                                            rows={5}
                                            className={`transition-all duration-200 ${
                                                focusedField === 'content' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.content && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.content}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <Label htmlFor="location" className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Location
                                        </Label>
                                        <Input
                                            id="location"
                                            value={data.location}
                                            onChange={(e) => setData('location', e.target.value)}
                                            onFocus={() => setFocusedField('location')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Event venue"
                                            className={`transition-all duration-200 ${
                                                focusedField === 'location' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.location && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.location}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Label htmlFor="image" className="flex items-center gap-2">
                                            <ImageIcon className="h-4 w-4" />
                                            Image
                                        </Label>
                                        {event.image && (
                                            <motion.div 
                                                className="mb-3"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <div className="relative h-32 w-48 rounded-lg overflow-hidden ring-1 ring-border/50 shadow-lg">
                                                    <img
                                                        src={`/storage/${event.image}`}
                                                        alt={event.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setData('image', e.target.files?.[0] || null)
                                            }
                                            onFocus={() => setFocusedField('image')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`transition-all duration-200 cursor-pointer ${
                                                focusedField === 'image' 
                                                    ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                    : ''
                                            }`}
                                        />
                                        <AnimatePresence>
                                            {errors.image && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="text-sm text-destructive"
                                                >
                                                    {errors.image}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>

                                    <motion.div 
                                        className="grid gap-6 md:grid-cols-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        <div className="space-y-2">
                                            <Label htmlFor="start_date" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Start Date <span className="text-destructive">*</span>
                                            </Label>
                                            <Input
                                                id="start_date"
                                                type="datetime-local"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                onFocus={() => setFocusedField('start_date')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                className={`transition-all duration-200 ${
                                                    focusedField === 'start_date' 
                                                        ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                        : ''
                                                }`}
                                            />
                                            <AnimatePresence>
                                                {errors.start_date && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="text-sm text-destructive"
                                                    >
                                                        {errors.start_date}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="end_date" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                End Date
                                            </Label>
                                            <Input
                                                id="end_date"
                                                type="datetime-local"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                                onFocus={() => setFocusedField('end_date')}
                                                onBlur={() => setFocusedField(null)}
                                                className={`transition-all duration-200 ${
                                                    focusedField === 'end_date' 
                                                        ? 'ring-2 ring-primary/50 border-primary/50 shadow-lg shadow-primary/10' 
                                                        : ''
                                                }`}
                                            />
                                            <AnimatePresence>
                                                {errors.end_date && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="text-sm text-destructive"
                                                    >
                                                        {errors.end_date}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <Label htmlFor="is_active" className="cursor-pointer">
                                            Active Status
                                        </Label>
                                    </motion.div>

                                    <motion.div 
                                        className="flex gap-3 pt-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.55 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1"
                                        >
                                            <Button 
                                                type="submit" 
                                                disabled={processing}
                                                className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                {processing ? (
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    >
                                                        <Calendar className="h-4 w-4 mr-2" />
                                                    </motion.div>
                                                ) : (
                                                    'Update Event'
                                                )}
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => window.history.back()}
                                                className="hover:bg-accent/50 transition-all duration-200"
                                            >
                                                Cancel
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}