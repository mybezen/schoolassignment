<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class PublicGalleryController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Gallery::query()->orderBy('order')->orderBy('created_at', 'desc');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        $galleries = $query->paginate(12);
        
        $categories = Gallery::select('category')
            ->distinct()
            ->whereNotNull('category')
            ->pluck('category');

        return Inertia::render('gallery/index', [
            'galleries' => $galleries,
            'categories' => $categories,
            'selectedCategory' => $request->category,
        ]);
    }
}
