import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    thumbnail: string | null;
    author: string | null;
    published_at: string;
}

interface ArticleShowProps {
    article: Article;
    relatedArticles: Article[];
}

export default function ArticleShow({ article, relatedArticles }: ArticleShowProps) {
    return (
        <PublicLayout>
            <Head title={article.title} />

            <div>
                <Button variant="outline" size="sm" className="mb-6" asChild>
                    <Link href="/articles">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Articles
                    </Link>
                </Button>

                <article className="mx-auto max-w-4xl">
                    {/* Article Header */}
                    <header className="mb-8">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
                            {article.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(article.published_at), 'MMMM dd, yyyy')}</span>
                            </div>
                            {article.author && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{article.author}</span>
                                </div>
                            )}
                        </div>

                        {article.excerpt && (
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                {article.excerpt}
                            </p>
                        )}
                    </header>

                    {/* Featured Image */}
                    {article.thumbnail && (
                        <div className="mb-8">
                            <img
                                src={`/storage/${article.thumbnail}`}
                                alt={article.title}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="prose dark:prose-invert prose-lg max-w-none">
                        <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                            {article.content}
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                            Related Articles
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <Card key={related.id} className="overflow-hidden">
                                    <CardContent className="p-0">
                                        {related.thumbnail ? (
                                            <img
                                                src={`/storage/${related.thumbnail}`}
                                                alt={related.title}
                                                className="aspect-video w-full object-cover"
                                            />
                                        ) : (
                                            <div className="aspect-video w-full bg-muted" />
                                        )}
                                    </CardContent>
                                    <CardHeader>
                                        <p className="text-xs text-muted-foreground">
                                            {format(new Date(related.published_at), 'MMMM dd, yyyy')}
                                        </p>
                                        <CardTitle className="line-clamp-2">{related.title}</CardTitle>
                                        {related.excerpt && (
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {related.excerpt}
                                            </p>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/articles/${related.slug}`}>
                                                Read More
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