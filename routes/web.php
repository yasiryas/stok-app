<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', [ProductController::class, 'index']);
Route::resource('products', ProductController::class);

Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
