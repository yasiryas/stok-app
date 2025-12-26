<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate(
            [
                'qty' => 'required|integer|min:1',
                'type' => 'required|in:in,out',
                'note' => 'nullable|string',
            ],

            [
                'qty.required' => 'Jumlah stok wajib diisi.',
                'qty.integer' => 'Jumlah stok harus berupa angka.',
                'qty.min' => 'Jumlah stok minimal adalah 1.',
                'type.required' => 'Tipe stok wajib diisi.',
                'type.in' => 'Tipe stok tidak valid.',
            ]
        );

        return DB::transaction(function () use ($request, $product) {
            $stockBefore = $product->stok;
            $qty = $request->input('qty');
            $type = $request->input('type');

            if ($type === 'in') {
                $product->stok += $qty;
            } else {
                if ($product->stok < $qty) {
                    return response()->json(['message' => 'Stok tidak mencukupi.'], 400);
                }
                $product->stok -= $qty;
            }

            $product->save();

            $stockHistory = StockHistory::create([
                'product_id' => $product->id,
                'qty' => $qty,
                'type' => $type,
                'stock_before' => $stockBefore,
                'stock_after' => $product->stok,
                'note' => $request->input('note'),
            ]);

            return response()->json(['message' => 'Stock updated successfully!', 'product' => $product, 'stockHistory' => $stockHistory]);
        });
    }

    public function history(Product $product)
    {
        $histories = $product->stockHistories()->latest()->paginate(10);

        if (request()->ajax()) {
            return response()->json([
                'rows' => view('stock.partials.row', compact('histories'))->render(),
                'pagination' => $histories->links()->render(),
                'hasMore' => $histories->hasMorePages(),
            ]);
        }

        return view('stock.history', compact('product', 'histories'));
    }
}
