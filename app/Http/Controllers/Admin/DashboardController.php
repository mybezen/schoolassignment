<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Client;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;
class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'products' => Product::count(),
                'articles' => Article::count(),
                'events' => Event::count(),
                'galleries' => Gallery::count(),
                'clients' => Client::count(),
                'unread_messages' => ContactMessage::where('is_read', false)->count(),
            ],
        ]);
    }
}