<?php

use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
| Public Routes
*/

Route::get('/register', fn () => abort(404));
Route::post('/register', fn () => abort(404));


Route::get('/', fn () => Inertia::render('home'))->name('home');
Route::get('/about', fn () => Inertia::render('about'))->name('about');
Route::get('/vision-mission', fn () => Inertia::render('vision-mission'))->name('vision-mission');
Route::get('/products', fn () => Inertia::render('products/index'))->name('products');
Route::get('/articles', fn () => Inertia::render('articles/index'))->name('articles');
Route::get('/events', fn () => Inertia::render('events/index'))->name('events');
Route::get('/gallery', fn () => Inertia::render('gallery/index'))->name('gallery');
Route::get('/clients', fn () => Inertia::render('clients/index'))->name('clients');
Route::get('/contact', fn () => Inertia::render('contact'))->name('contact');

/*
| Admin Routes
*/

  Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // // Products
    Route::resource('products', ProductController::class);
    // // Articles
    Route::resource('articles', ArticleController::class);
    // // Events
    Route::resource('events', EventController::class);
    // // Gallery
    Route::resource('gallery', GalleryController::class);
    // // Clients
    Route::resource('clients', ClientController::class);
    // // Contact Messages (Read Only)
    Route::get('contacts', [ContactMessageController::class, 'index'])->name('contacts.index');
    Route::get('contacts/{contactMessage}', [ContactMessageController::class, 'show'])->name('contacts.show');
    Route::delete('contacts/{contactMessage}', [ContactMessageController::class, 'destroy'])->name('contacts.destroy');
});

require __DIR__ . '/settings.php';
