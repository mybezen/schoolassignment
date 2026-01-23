<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class PublicProductController extends Controller
{
     public function index(): Response
    {
        $products = Product::where('is_active', true)
            ->orderBy('order')
            ->paginate(12);

        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        if (!$product->is_active) {
            abort(404);
        }

        return Inertia::render('products/show', [
            'product' => $product,
            'relatedProducts' => Product::where('is_active', true)
                ->where('id', '!=', $product->id)
                ->inRandomOrder()
                ->take(3)
                ->get(),
        ]);
    }   
}