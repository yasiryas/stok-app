<input type="text" class="w-full border-b-2 p-2 mb-2 border-gray-300" id="searchInput" placeholder="Cari barang..." />
<div class="bg-white rounded shadow overflow-x-auto hidden md:block">
    <table class="w-full text-sm">
        <thead class="bg-gray-200">
            <tr>
                <th class="p-2 text-left">Kode</th>
                <th class="p-2 text-left">Nama</th>
                <th class="p-2 text-left">Stok</th>
                <th class="p-2 text-center">Aksi</th>
            </tr>
        </thead>

        <tbody id="productTable">
            @include('products.partials.row', ['products' => $products])
        </tbody>
    </table>
</div>

<div id="pagination" class="mt-4 hidden md:block">
    {{ $products->links() }}
</div>
