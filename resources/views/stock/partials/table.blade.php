<div class="bg-white shadow-md rounded-lg overflow-hidden hidden md:block">
    <table class="min-w-full table-auto">
        <thead class="bg-gray-200">
            <tr>
                <th class="px-4 py-2 text-left">Tanggal</th>
                <th class="px-4 py-2 text-left">Tipe</th>
                <th class="px-4 py-2 text-left">Jumlah</th>
                <th class="px-4 py-2 text-left">Sebelum</th>
                <th class="px-4 py-2 text-left">Sesudah</th>
                <th class="px-4 py-2 text-left">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @include('stock.partials.row')
        </tbody>
    </table>
</div>
