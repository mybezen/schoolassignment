<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('about', [
            'clients' => Client::where('is_active', true)
                ->orderBy('order')
                ->get(),
        ]);
    }
}
