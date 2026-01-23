<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Client;
use App\Models\Event;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
     public function index(): Response
    {
        return Inertia::render('home', [
            'featuredProducts' => Product::where('is_active', true)
                ->orderBy('order')
                ->take(6)
                ->get(),
            'latestArticles' => Article::where('is_published', true)
                ->whereNotNull('published_at')
                ->where('published_at', '<=', now())
                ->orderBy('published_at', 'desc')
                ->take(3)
                ->get(),
            'upcomingEvents' => Event::where('is_active', true)
                ->where('start_date', '>=', now())
                ->orderBy('start_date')
                ->take(3)
                ->get(),
            'clients' => Client::where('is_active', true)
                ->orderBy('order')
                ->get(),
        ]);
    }
}
