<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class PublicArticleController extends Controller
{
    public function index(): Response
    {
        $articles = Article::where('is_published', true)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return Inertia::render('articles/index', [
            'articles' => $articles,
        ]);
    }

    public function show(Article $article): Response
    {
        if (!$article->is_published || !$article->published_at || $article->published_at > now()) {
            abort(404);
        }

        return Inertia::render('articles/show', [
            'article' => $article,
            'relatedArticles' => Article::where('is_published', true)
                ->where('id', '!=', $article->id)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->take(3)
                ->get(),
        ]);
    }
}
