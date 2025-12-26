<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['kode', 'nama', 'stok'];

    public function stockHistories()
    {
        return $this->hasMany(StockHistory::class);
    }
}
