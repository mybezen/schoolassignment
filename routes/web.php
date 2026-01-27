<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicArticleController;
use App\Http\Controllers\PublicEventController;
use App\Http\Controllers\PublicGalleryController;
use App\Http\Controllers\PublicProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
| Public Routes
*/

Route::get('/register', fn () => abort(404));
Route::post('/register', fn () => abort(404));


// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/vision-mission', fn () => Inertia::render('vission-mission'))->name('vision-mission');

// Products
Route::get('/products', [PublicProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [PublicProductController::class, 'show'])->name('products.show');

// Articles
Route::get('/articles', [PublicArticleController::class, 'index'])->name('articles.index');
Route::get('/articles/{article:slug}', [PublicArticleController::class, 'show'])->name('articles.show');

// Events
Route::get('/events', [PublicEventController::class, 'index'])->name('events.index');
Route::get('/events/{event:slug}', [PublicEventController::class, 'show'])->name('events.show');

// Gallery
Route::get('/gallery', [PublicGalleryController::class, 'index'])->name('gallery.index');

// Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

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
