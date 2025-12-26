<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'index']);
Route::post('/products/{product}/stock', [StockController::class, 'store'])->name('products.stock');
Route::resource('products', ProductController::class)->except(['show']);

// Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
