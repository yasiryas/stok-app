@extends('layouts.app')

@section('title', 'Daftar Barang')

@section('content')
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">Daftar Barang</h1>
        <button onclick="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah
        </button>
    </div>

    @include('products.partials.table')
    @include('products.partials.cards')
    @include('products.partials.modal')
    @include('products.partials.toast')

@endsection
@push('scripts')
    <script src="{{ asset('js/script.js') }}"></script>
@endpush
