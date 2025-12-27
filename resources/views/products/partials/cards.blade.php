<!-- MOBILE CARD VIEW -->
<input type="text" class="w-full border-b p-2 mb-2 md:hidden" id="searchInputMobile" placeholder="Cari barang..." />
<div class="space-y-3 md:hidden" id="productCards">
    @foreach ($products as $p)
        <div class="bg-white rounded shadow p-4 product-card" data-id="{{ $p->id }}">
            <div class="text-xs text-gray-500 kode">{{ $p->kode }}</div>
            <div class="font-semibold nama">{{ $p->nama }}</div>
            <div class="text-sm text-gray-600 stok">
                Stok: {{ $p->stok }}
            </div>
            <hr class="my-2">
            <div class="flex flex-wrap gap-2 text-sm">
                <button
                    onclick="openStockModal({{ $p->id }}, 'in', '{{ $p->kode }}', '{{ $p->nama }}')"
                    class="text-green-600 text-sm">In</button>
                <button
                    onclick="openStockModal({{ $p->id }}, 'out', '{{ $p->kode }}', '{{ $p->nama }}')"
                    class="text-orange-600 text-sm">Out</button>
                <button onclick="openEditModal({{ $p->id }})" class="text-blue-600">
                    Edit
                </button>
                <button onclick="openDeleteModal({{ $p->id }})" class="text-red-600">
                    Hapus
                </button>
                <button onclick="openHistory({{ $p->id }})" class="text-gray-600">
                    History
                </button>
            </div>

        </div>
    @endforeach
</div>


{{-- SENTINEL --}}
<div id="infiniteScrollTrigger" class="h-10 md:hidden"></div>
