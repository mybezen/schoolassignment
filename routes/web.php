<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Public Routes
Route::get('/', fn() => Inertia::render('home'))->name('home');
Route::get('/about', fn() => Inertia::render('about'))->name('about');
Route::get('/vision-mission', fn() => Inertia::render('vision-mission'))->name('vision-mission');
Route::get('/products', fn() => Inertia::render('products/index'))->name('products');
Route::get('/articles', fn() => Inertia::render('articles/index'))->name('articles');
Route::get('/events', fn() => Inertia::render('events/index'))->name('events');
Route::get('/gallery', fn() => Inertia::render('gallery/index'))->name('gallery');
Route::get('/clients', fn() => Inertia::render('clients/index'))->name('clients');
Route::get('/contact', fn() => Inertia::render('contact'))->name('contact');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

//     Route::get('create', function () {
//         return Inertia::render('storages/create');
//     })->name('create');

//     Route::get('products', function () {
//         return Inertia::render('products/product');
//     })->name('products');

//     Route::get('articles', function () {
//         return Inertia::render('articles/article');
//     })->name('articles');

//     Route::get('events', function () {
//         return Inertia::render('events/event');
//     })->name('events');

//     Route::get('pictures', function () {
//         return Inertia::render('pictures/picture');
//     })->name('pictures');
// });

require __DIR__ . '/settings.php';
