import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    author: string | null;
    published_at: string;
}

interface PaginatedArticles {
    data: Article[];
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface ArticlesIndexProps {
    articles: PaginatedArticles;
}

export default function ArticlesIndex({ articles }: ArticlesIndexProps) {
    console.log(articles);
    return (
        <PublicLayout>
            <Head title="Articles" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Articles
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Read our latest insights, news, and industry updates
                    </p>
                </div>

                {articles.data.length === 0 ? (
                    <EmptyState
                        title="No Articles Available Yet"
                        message="We're working on creating valuable content for you. Check back soon!"
                    />
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.data.map((article) => (
                                <Card key={article.id} className="flex flex-col overflow-hidden">
                                    <CardContent className="p-0">
                                        {article.thumbnail ? (
                                            <img
                                                src={`/storage/${article.thumbnail}`}
                                                alt={article.title}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                    </CardContent>
                                    <CardHeader className="flex-1">
                                        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>
                                                {format(new Date(article.published_at), 'MMMM dd, yyyy')}
                                            </span>
                                            {article.author && (
                                                <>
                                                    <span>•</span>
                                                    <span>{article.author}</span>
                                                </>
                                            )}
                                        </div>
                                        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                                        {article.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/articles/${article.slug}`}>
                                                Read More
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        {/* Pagination */}
                        {articles.links.length > 3 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {articles.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        disabled={!link.url}
                                        asChild={!!link.url}
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </PublicLayout>
    );
}