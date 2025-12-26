<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->paginate(10);

        if (request()->ajax()) {
            return response()->json([
                'rows' => view('products.partials.row', compact('products'))->render(),
                'pagination' => $products->links()->render(),
                'hasMore' => $products->hasMorePages(),
            ]);
        }

        return view('products.index', compact('products'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'stok' => 'required|integer|min:0',
        ]);

        $lastProduct = Product::latest()->first();

        $nextNumber = $lastProduct ? ((int)substr($lastProduct->kode, 3)) + 1 : 1;
        $kode = 'PRD' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);

        $product = Product::create([
            'kode' => $kode,
            'nama' => $validated['nama'],
            'stok' => $validated['stok'],
        ]);

        return response()->json(['message' => 'Product added successfully!', 'product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'nama' => 'required',
            'stok' => 'required|integer|min:0',
        ]);

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully!', 'product' => $product]);
    }

    public function edit(Product $product)
    {
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully!']);
    }
}
