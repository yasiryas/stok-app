@extends('layouts.app')
@section('title', 'History Stock')
@section('content')
    <div class="mb-4">
        <a href="{{ url()->previous() }}" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
            ← Kembali
        </a>
        <h1 class="text-xl font-bold">History Stock untuk {{ $product->nama }}</h1>
    </div>
    @include('stock.partials.table')
    @include('stock.partials.card')
    <div class="mt-4">
        {{ $histories->links() }}
    </div>
@endsection
