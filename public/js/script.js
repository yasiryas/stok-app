document.addEventListener('DOMContentLoaded', () => {
            // ====Tambah====
            const modal = document.getElementById('modal')
            const form = document.getElementById('formTambah')
            const table = document.getElementById('productTable')

            // ===== MODAL =====
            window.openModal = () => {
                modal.classList.remove('hidden')
                modal.classList.add('flex')
            }

            window.closeModal = () => {
                modal.classList.add('hidden')
                modal.classList.remove('flex')
                clearErrors()
                form.reset()
            }

            // ===== ERROR HANDLING =====
            function clearErrors() {
                document.querySelectorAll('[class^="error-"]').forEach(el => {
                    el.textContent = ''
                })
            }

            function showErrors(errors) {
                Object.keys(errors).forEach(key => {
                    const el = document.querySelector('.error-' + key)
                    if (el) el.textContent = errors[key][0]
                })
            }

            // ===== SUBMIT AJAX =====
            form.addEventListener('submit', e => {
                e.preventDefault()

                clearErrors()

                const formData = new FormData(form)

                fetch("{{ route('products.store') }}", {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: formData
                    })
                    .then(async res => {
                        const data = await res.json()
                        if (!res.ok) throw data
                        return data
                    })
                    .then(data => {
                        addRow(data.product)
                        closeModal()
                        showToast('Barang berhasil ditambahkan')
                    })
                    .catch(err => {
                        if (err.errors) {
                            showErrors(err.errors)
                        } else {
                            console.error(err)
                            showToast('Terjadi kesalahan. Silakan coba lagi.', 'error')
                        }
                    })
            })

            // ===== ADD ROW =====
            function addRow(product) {

                // === TABLE (DESKTOP) ===
                const tableRow = `
        <tr class="border-t" data-id="${product.id}">
            <td class="p-2">${product.kode}</td>
            <td class="p-2 nama">${product.nama}</td>
            <td class="p-2 stok">${product.stok}</td>
            <td class="p-2 text-center space-x-2">
                <button onclick="openEditModal(${product.id})" class="text-blue-600 text-sm">Edit</button>
                <button onclick="openDeleteModal(${product.id})" class="text-red-600 text-sm">Hapus</button>
            </td>
        </tr>
    `
                document.getElementById('productTable')
                    .insertAdjacentHTML('afterbegin', tableRow)

                // === CARD (MOBILE) ===
                const card = `
                <div class="bg-white rounded shadow p-4" data-id="${product.id}">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-xs text-gray-500">${product.kode}</div>
                            <div class="font-semibold nama">${product.nama}</div>
                            <div class="text-sm text-gray-600 stok">Stok: ${product.stok}</div>
                        </div>
                        <div class="flex flex-col gap-1 text-sm">
                            <button onclick="openEditModal(${product.id})" class="text-blue-600">Edit</button>
                            <button onclick="openDeleteModal(${product.id})" class="text-red-600">Hapus</button>
                        </div>
                    </div>
                </div>
            `
                document.getElementById('productCards')
                    .insertAdjacentHTML('afterbegin', card)

            }


            /* ================= EDIT MODAL ================= */

            const modalEdit = document.getElementById('modalEdit')
            const formEdit = document.getElementById('formEdit')

            window.openEditModal = function(id) {
                fetch(`/products/${id}/edit`, {
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById('edit_id').value = data.id
                        document.getElementById('edit_nama').value = data.nama
                        document.getElementById('edit_stok').value = data.stok

                        modalEdit.classList.remove('hidden')
                        modalEdit.classList.add('flex')
                    })
            }

            window.closeEditModal = function() {
                modalEdit.classList.add('hidden')
                modalEdit.classList.remove('flex')
                clearEditErrors()
            }

            /* ================= ERROR ================= */

            function clearEditErrors() {
                document.querySelectorAll('[class^="error-edit"]').forEach(el => {
                    el.textContent = ''
                })
            }

            /* ================= SUBMIT UPDATE ================= */

            formEdit.addEventListener('submit', function(e) {
                e.preventDefault()

                clearEditErrors()

                const id = document.getElementById('edit_id').value

                fetch(`/products/${id}`, {
                        method: 'PUT',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nama: document.getElementById('edit_nama').value,
                            stok: document.getElementById('edit_stok').value
                        })
                    })
                    .then(async res => {
                        const data = await res.json()
                        if (!res.ok) throw data
                        return data
                    })
                    .then(data => {
                        updateRow(data.product)
                        closeEditModal()
                        showToast('Barang berhasil diperbarui')
                    })
                    .catch(err => {
                        if (err.errors) {
                            if (err.errors.nama) {
                                document.querySelector('.error-edit-nama').textContent = err.errors
                                    .nama[0]
                            }
                            if (err.errors.stok) {
                                document.querySelector('.error-edit-stok').textContent = err.errors
                                    .stok[0]
                            }
                            showToast('Periksa kembali inputan Anda.', 'error')
                        }
                    })

            })

            /* ================= UPDATE TABLE ================= */

            function updateRow(product) {

                // TABLE
                const row = document.querySelector(
                    `#productTable tr[data-id="${product.id}"]`
                )
                if (row) {
                    row.querySelector('.nama').textContent = product.nama
                    row.querySelector('.stok').textContent = product.stok

                    row.classList.add('bg-yellow-50')
                    setTimeout(() => row.classList.remove('bg-yellow-50'), 800)
                }

                // CARD
                const card = document.querySelector(
                    `#productCards div[data-id="${product.id}"]`
                )
                if (card) {
                    card.querySelector('.nama').textContent = product.nama
                    card.querySelector('.stok').textContent = `Stok: ${product.stok}`

                    card.classList.add('bg-yellow-50')
                    setTimeout(() => card.classList.remove('bg-yellow-50'), 800)
                }
            }


            /* ================= DELETE ================= */

            const modalDelete = document.getElementById('modalDelete')
            let deleteId = null

            window.openDeleteModal = function(id) {
                deleteId = id
                modalDelete.classList.remove('hidden')
                modalDelete.classList.add('flex')
            }

            window.closeDeleteModal = function() {
                deleteId = null
                modalDelete.classList.add('hidden')
                modalDelete.classList.remove('flex')
            }

            window.confirmDelete = function() {
                if (!deleteId) return

                fetch(`/products/${deleteId}`, {
                        method: 'DELETE',
                        headers: {
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    })
                    .then(async res => {
                        const data = await res.json()
                        if (!res.ok) throw data
                        return data
                    })
                    .then(() => {
                        const row = document.querySelector(
                            `#productTable tr[data-id="${deleteId}"]`
                        )
                        if (row) row.remove()

                        const card = document.querySelector(
                            `#productCards div[data-id="${deleteId}"]`
                        )
                        if (card) card.remove()
                        showToast('Barang berhasil dihapus')
                        closeDeleteModal()
                    })
                    .catch(err => {
                        console.error(err)
                        showToast('Terjadi kesalahan. Silakan coba lagi.', 'error')
                    })

            }

            function showToast(message, type = 'success') {
                const toast = document.getElementById('toast')
                const text = document.getElementById('toastMessage')

                if (!toast || !text) return

                // Clear previous timeout
                if (window.toastTimeout) {
                    clearTimeout(window.toastTimeout)
                }

                // Set message
                text.textContent = message

                // Reset classes
                toast.classList.remove('bg-green-600', 'bg-red-600', 'bg-yellow-500')

                // Set color
                const colorClass = type === 'error' ? 'bg-red-600' :
                    type === 'warning' ? 'bg-yellow-500' :
                    'bg-green-600'
                toast.classList.add(colorClass)

                // Show toast
                toast.classList.remove('opacity-0', 'pointer-events-none')
                toast.classList.add('opacity-100')

                // Force reflow untuk memastikan transisi berjalan
                toast.offsetHeight

                // Hide after delay
                window.toastTimeout = setTimeout(() => {
                    toast.classList.remove('opacity-100')
                    toast.classList.add('opacity-0', 'pointer-events-none')
                }, 3000)
            }

            //Search product
            function runSearch(keyword) {
                keyword = keyword.toLowerCase()

                // TABLE
                document.querySelectorAll('.product-row').forEach(row => {
                    const kode = row.querySelector('.kode').textContent.toLowerCase()
                    const nama = row.querySelector('.nama').textContent.toLowerCase()

                    row.style.display =
                        kode.includes(keyword) || nama.includes(keyword) ?
                        '' :
                        'none'
                })

                // CARD
                document.querySelectorAll('.product-card').forEach(card => {
                    const kode = card.querySelector('.kode').textContent.toLowerCase()
                    const nama = card.querySelector('.nama').textContent.toLowerCase()

                    card.style.display =
                        kode.includes(keyword) || nama.includes(keyword) ?
                        '' :
                        'none'
                })
            }

            const searchInput = document.getElementById('searchInput')
            const searchInputMobile = document.getElementById('searchInputMobile')

            if (searchInput) {
                searchInput.addEventListener('input', e => {
                    runSearch(e.target.value)
                })
            }

            if (searchInputMobile) {
                searchInputMobile.addEventListener('input', e => {
                    runSearch(e.target.value)
                })
            }
        })
