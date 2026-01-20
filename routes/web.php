<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::get('create', function () {
        return Inertia::render('storages/create');
    })->name('create');
   
    Route::get('products', function () {
        return Inertia::render('products/product');
    })->name('products');

    Route::get('articles', function () {
        return Inertia::render('articles/article');
    })->name('articles');

    Route::get('events', function () {
        return Inertia::render('events/event');
    })->name('events');

    Route::get('pictures', function () {
        return Inertia::render('pictures/picture');
    })->name('pictures');
});

require __DIR__.'/settings.php';