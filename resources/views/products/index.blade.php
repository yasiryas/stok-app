@extends('layouts.app')

@section('title', 'Daftar Barang')

@section('content')
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">Daftar Barang</h1>

        <a href="{{ route('products.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded">
            + Tambah
        </a>
    </div>

    <div class="bg-white rounded shadow overflow-x-auto">
        <table class="w-full text-sm">
            <thead class="bg-gray-200">
                <tr>
                    <th class="p-2 text-left">Kode</th>
                    <th class="p-2 text-left">Nama</th>
                    <th class="p-2 text-left">Stok</th>
                    <th class="p-2 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products as $p)
                    <tr class="border-t">
                        <td class="p-2">{{ $p->kode }}</td>
                        <td class="p-2">{{ $p->nama }}</td>
                        <td class="p-2">{{ $p->stok }}</td>
                        <td class="p-2 text-center space-x-2">
                            <a href="{{ route('products.edit', $p) }}" class="text-blue-600">Edit</a>

                            <form action="{{ route('products.destroy', $p) }}" method="POST" class="inline">
                                @csrf @method('DELETE')
                                <button class="text-red-600">
                                    Hapus
                                </button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
