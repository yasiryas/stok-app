<!-- MODAL TAMBAH-->
<div id="modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded p-6 m-2">
        <h2 class="text-lg font-bold mb-4">Tambah Barang</h2>

        <form id="formTambah">
            @csrf


            <div class="mb-3">
                <label class="text-sm">Nama</label>
                <input type="text" name="nama" class="w-full border p-2 rounded">
                <small class="text-red-600 error-nama"></small>
            </div>

            <div class="mb-4">
                <label class="text-sm">Stok</label>
                <input type="number" name="stok" class="w-full border p-2 rounded">
                <small class="text-red-600 error-stok"></small>
            </div>

            <div class="flex justify-end gap-2">
                <button type="button" onclick="closeModal()" class="border px-4 py-2 rounded">
                    Batal
                </button>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>

<!-- MODAL EDIT -->
<div id="modalEdit" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
    <div class="bg-white w-full max-w-md rounded p-6 m-2">
        <h2 class="text-lg font-bold mb-4">Edit Barang</h2>

        <form id="formEdit">
            @csrf
            @method('PUT')

            <input type="hidden" id="edit_id">

            <div class="mb-3">
                <label class="text-sm">Nama</label>
                <input type="text" id="edit_nama" class="w-full border p-2 rounded">
                <small class="text-red-600 error-edit-nama"></small>
            </div>

            <div class="mb-4">
                <label class="text-sm">Stok</label>
                <input type="number" id="edit_stok" class="w-full border p-2 rounded">
                <small class="text-red-600 error-edit-stok"></small>
            </div>

            <div class="flex justify-end gap-2">
                <button type="button" onclick="closeEditModal()" class="border px-4 py-2 rounded">
                    Batal
                </button>
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
                    Update
                </button>
            </div>
        </form>
    </div>
</div>


<!-- MODAL DELETE -->
<div id="modalDelete" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
    <div class="bg-white w-full max-w-sm rounded p-6 m-2">
        <h2 class="text-lg font-bold mb-4 text-red-600">Hapus Barang</h2>

        <p class="mb-6 text-sm">
            Apakah kamu yakin ingin menghapus barang ini?
        </p>

        <div class="flex justify-end gap-2">
            <button onclick="closeDeleteModal()" class="border px-4 py-2 rounded">
                Batal
            </button>
            <button onclick="confirmDelete()" class="bg-red-600 text-white px-4 py-2 rounded">
                Ya, Hapus
            </button>
        </div>
    </div>
</div>

<div id="modalStock" class="fixed inset-0 hidden items-center justify-center bg-black/50 z-50">
    <div class="bg-white rounded p-6 w-full max-w-md m-2">
        <h2 id="stockTitle" class="font-bold mb-4"></h2>

        <form id="formStock">
            <input type="hidden" id="stock_product_id">
            <input type="hidden" id="stock_type">

            <div class="mb-3">
                <label>Qty</label>
                <input type="number" name="qty" class="w-full border p-2 rounded">
                <small class="text-red-600 error-qty"></small>
            </div>

            <div class="mb-4">
                <label>Catatan</label>
                <input type="text" name="note" class="w-full border p-2 rounded">
            </div>

            <div class="flex justify-end gap-2">
                <button type="button" onclick="closeStockModal()">Batal</button>
                <button class="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
            </div>
        </form>
    </div>
</div>
