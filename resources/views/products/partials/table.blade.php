<div class="bg-white rounded shadow overflow-x-auto hidden md:block">
    <input type="text" class="w-full border-b p-2 mb-2" id="searchInput" placeholder="Cari barang..." />
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
            @foreach ($products as $p)
                <tr class="border-t transition-colors duration-300 product-row" data-id="{{ $p->id }}">
                    <td class="p-2 kode">{{ $p->kode }}</td>
                    <td class="p-2 nama">{{ $p->nama }}</td>
                    <td class="p-2 stok">{{ $p->stok }}</td>
                    <td class="p-2 text-center text-gray-400 text-sm">
                        <button onclick="openEditModal({{ $p->id }})" class="text-blue-600 text-sm">
                            Edit
                        </button>
                        |
                        <button onclick="openDeleteModal({{ $p->id }})" class="text-red-600 text-sm">
                            Hapus
                        </button>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>


