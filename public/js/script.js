document.addEventListener('DOMContentLoaded', () => {

    /* ================= ELEMENT ================= */

    const modalTambah = document.getElementById('modal')
    const modalEdit = document.getElementById('modalEdit')
    const modalDelete = document.getElementById('modalDelete')

    const formTambah = document.getElementById('formTambah')
    const formEdit = document.getElementById('formEdit')

    const table = document.getElementById('productTable')
    const cards = document.getElementById('productCards')

    const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content')


    let deleteId = null

    /* ================= MODAL TAMBAH ================= */

    window.openModal = () => {
        modalTambah.classList.remove('hidden')
        modalTambah.classList.add('flex')
    }

    window.closeModal = () => {
        modalTambah.classList.add('hidden')
        modalTambah.classList.remove('flex')
        formTambah.reset()
        clearErrors()
    }

    /* ================= ERROR HANDLER ================= */

    function clearErrors() {
        document.querySelectorAll('[class^="error-"]').forEach(el => el.textContent = '')
    }

    function showErrors(errors, prefix = '') {
        Object.keys(errors).forEach(key => {
            const el = document.querySelector(`.error-${prefix}${key}`)
            if (el) el.textContent = errors[key][0]
        })
    }

    /* ================= TAMBAH BARANG ================= */

    formTambah?.addEventListener('submit', e => {
        e.preventDefault()
        clearErrors()

        fetch(formTambah.action, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: new FormData(formTambah)
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
            if (err.errors) showErrors(err.errors)
        })
    })

    /* ================= ADD ROW ================= */

    function addRow(product) {

    /* ================= TABLE (DESKTOP) ================= */
    if (table) {
        table.insertAdjacentHTML('afterbegin', `
            <tr class="border-t product-row" data-id="${product.id}">
                <td class="p-2 kode">${product.kode}</td>
                <td class="p-2 nama">${product.nama}</td>
                <td class="p-2 stok">${product.stok}</td>
                <td class="p-2 text-center text-sm">
                    <button onclick="openStockModal(${product.id}, 'in')" class="text-green-600">IN</button> |
                    <button onclick="openStockModal(${product.id}, 'out')" class="text-orange-600">OUT</button> |
                    <button onclick="openEditModal(${product.id})" class="text-blue-600">Edit</button> |
                    <button onclick="openDeleteModal(${product.id})" class="text-red-600">Hapus</button> |
                    <button onclick="openHistory(${product.id})" class="text-gray-600">History</button>
                </td>
            </tr>
        `)
    }

    /* ================= CARD (MOBILE) ================= */
    if (cards) {
        cards.insertAdjacentHTML('afterbegin', `
            <div class="bg-white rounded shadow p-4 product-card" data-id="${product.id}">
                <div class="text-xs text-gray-500 kode">${product.kode}</div>
                <div class="font-semibold nama">${product.nama}</div>
                <div class="text-sm stok mb-2">Stok: ${product.stok}</div>

                <div class="flex flex-wrap gap-2 text-sm">
                    <button onclick="openStockModal(${product.id}, 'in')" class="text-green-600">IN</button>
                    <button onclick="openStockModal(${product.id}, 'out')" class="text-orange-600">OUT</button>
                    <button onclick="openEditModal(${product.id})" class="text-blue-600">Edit</button>
                    <button onclick="openDeleteModal(${product.id})" class="text-red-600">Hapus</button>
                    <button onclick="openHistory(${product.id})" class="text-gray-600">History</button>
                </div>
            </div>
        `)
    }
}

    /* ================= EDIT ================= */

    window.openEditModal = id => {
        fetch(`/products/${id}/edit`, { headers: { Accept: 'application/json' } })
            .then(res => res.json())
            .then(data => {
                document.getElementById('edit_id').value = data.id
                document.getElementById('edit_nama').value = data.nama
                document.getElementById('edit_stok').value = data.stok

                modalEdit.classList.remove('hidden')
                modalEdit.classList.add('flex')
            })
    }

    window.closeEditModal = () => {
        modalEdit.classList.add('hidden')
        modalEdit.classList.remove('flex')
        clearErrors()
    }

    formEdit?.addEventListener('submit', e => {
        e.preventDefault()
        clearErrors()

        const id = document.getElementById('edit_id').value

        fetch(`/products/${id}`, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
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
            showToast('Barang diperbarui')
        })
        .catch(err => {
            if (err.errors) showErrors(err.errors, 'edit-')
        })
    })

    function updateRow(product) {
    const row = document.querySelector(`tr[data-id="${product.id}"]`)
    if (row) {
        row.querySelector('.nama').textContent = product.nama
        row.querySelector('.stok').textContent = product.stok
        highlight(row)
    }

    const card = document.querySelector(`.product-card[data-id="${product.id}"]`)
    if (card) {
        card.querySelector('.nama').textContent = product.nama
        card.querySelector('.stok').textContent = `Stok: ${product.stok}`
        highlight(card)
    }
}


    function highlight(el) {
        el.classList.add('bg-yellow-50')
        setTimeout(() => el.classList.remove('bg-yellow-50'), 800)
    }

    /* ================= DELETE ================= */

    window.openDeleteModal = id => {
        deleteId = id
        modalDelete.classList.remove('hidden')
        modalDelete.classList.add('flex')
    }

    window.closeDeleteModal = () => {
        deleteId = null
        modalDelete.classList.add('hidden')
        modalDelete.classList.remove('flex')
    }

    window.confirmDelete = () => {
        fetch(`/products/${deleteId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json'
            }
        })
        .then(() => {
            document.querySelector(`[data-id="${deleteId}"]`)?.remove()
            closeDeleteModal()
            showToast('Barang dihapus')
        })
    }

    /* ================= SEARCH ================= */

    function runSearch(keyword) {
        keyword = keyword.toLowerCase()
        document.querySelectorAll('.product-row, .product-card').forEach(el => {
            const text = el.textContent.toLowerCase()
            el.style.display = text.includes(keyword) ? '' : 'none'
        })
    }

    document.getElementById('searchInput')?.addEventListener('input', e => runSearch(e.target.value))
    document.getElementById('searchInputMobile')?.addEventListener('input', e => runSearch(e.target.value))

    /* ================= PAGINATION AJAX ================= */

    document.addEventListener('click', e => {
        const link = e.target.closest('#pagination a')
        if (!link) return

        e.preventDefault()

        fetch(link.href, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('productTable').innerHTML = data.rows
            document.getElementById('pagination').innerHTML = data.pagination
        window.scrollTo({ top: 0, behavior: 'smooth' })
        })
        .catch(err => console.error('Error fetching pagination:', err))
    })

    /* ================= TOAST ================= */

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast')
        const text = document.getElementById('toastMessage')
        if (!toast || !text) return

        if (window.toastTimeout) clearTimeout(window.toastTimeout)

        toast.classList.remove('bg-green-600', 'bg-red-600', 'bg-yellow-500')

        toast.classList.add(
            type === 'error' ? 'bg-red-600' :
            type === 'warning' ? 'bg-yellow-500' :
            'bg-green-600'
        )

        text.textContent = message
        toast.classList.remove('opacity-0', 'pointer-events-none')
        toast.classList.add('opacity-100')

        window.toastTimeout = setTimeout(() => {
            toast.classList.remove('opacity-100')
            toast.classList.add('opacity-0', 'pointer-events-none')
        }, 3000)
    }



    document.addEventListener('click', function (e) {
    const btn = e.target.closest('#loadMoreBtn')
    if (!btn) return

    const page = btn.dataset.nextPage

    btn.disabled = true
    btn.textContent = 'Loading...'

    fetch(`?page=${page}`, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(res => res.json())
    .then(data => {

        // Append CARD (mobile)
        const temp = document.createElement('div')
        temp.innerHTML = data.rows

        temp.querySelectorAll('tr').forEach(row => {
            const id = row.dataset.id
            const kode = row.querySelector('.kode').textContent
            const nama = row.querySelector('.nama').textContent
            const stok = row.querySelector('.stok').textContent

            document.getElementById('productCards').insertAdjacentHTML('beforeend', `
                <div class="bg-white rounded shadow p-4 product-card" data-id="${id}">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-xs text-gray-500 kode">${kode}</div>
                            <div class="font-semibold nama">${nama}</div>
                            <div class="text-sm text-gray-600 stok">Stok: ${stok}</div>
                        </div>
                        <div class="flex flex-col gap-1 text-sm">
                            <button onclick="openEditModal(${id})" class="text-blue-600">Edit</button>
                            <button onclick="openDeleteModal(${id})" class="text-red-600">Hapus</button>
                        </div>
                    </div>
                </div>
            `)
        })

        // Update next page
        if (data.hasMore) {
            btn.dataset.nextPage = parseInt(page) + 1
            btn.disabled = false
            btn.textContent = 'Load More'
        } else {
            btn.remove()
        }
    })
    .catch(err => {
        console.error(err)
        btn.textContent = 'Load More'
        btn.disabled = false
    })
    })

    let currentPage = 1
    let isLoading = false
    let hasMore = true

    const trigger = document.getElementById('infiniteScrollTrigger')
    const card = document.getElementById('productCards')

    if (trigger && card) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isLoading && hasMore) {
                loadNextPage()
            }
        }, {
            rootMargin: '100px'
        })

        observer.observe(trigger)
    }

    function loadNextPage() {
        isLoading = true
        currentPage++

        fetch(`?page=${currentPage}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(res => res.json())
        .then(data => {

            const temp = document.createElement('tbody')
            temp.innerHTML = data.rows

            temp.querySelectorAll('tr').forEach(row => {
                const id = row.dataset.id
                const kode = row.querySelector('.kode').textContent
                const nama = row.querySelector('.nama').textContent
                const stok = row.querySelector('.stok').textContent

                card.insertAdjacentHTML('beforeend', `
                    <div class="bg-white rounded shadow p-4 product-card" data-id="${id}">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-xs text-gray-500 kode">${kode}</div>
                                <div class="font-semibold nama">${nama}</div>
                                <div class="text-sm stok">Stok: ${stok}</div>
                                                    </div>
                        <div class="flex flex-col gap-1 text-sm">
                            <button onclick="openEditModal(${id})" class="text-blue-600">
                                Edit
                            </button>
                            <button onclick="openDeleteModal({{ $p->id }})" class="text-red-600">
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
                `)
            })

            hasMore = data.hasMore
            isLoading = false

            if (!hasMore) {
                trigger.remove()
            }
        })
        .catch(err => {
            console.error(err)
            isLoading = false
        })
    }


    //================= Olah Stock ================= //
    window.openStockModal = (id, type, kode, product) => {
        const form = document.getElementById('formStock')
        if (form) form.reset()

        document.getElementById('title_stock').textContent = kode + ' - ' + product
        document.getElementById('stock_product_id').value = id
        document.getElementById('stock_type').value = type

        document.getElementById('stockTitle').textContent =
            type === 'in' ? 'Stock Masuk' : 'Stock Keluar'

        document.getElementById('modalStock').classList.remove('hidden')
        document.getElementById('modalStock').classList.add('flex')
    }

    window.closeStockModal = () => {
        const modal = document.getElementById('modalStock')
        const form = document.getElementById('formStock')

        if (form) {
            form.reset()
        }

        document.querySelectorAll('.error-qty').forEach(el => el.textContent = '')

        modal.classList.add('hidden');
        modal.classList.remove('flex')

    }

    document.getElementById('formStock')?.addEventListener('submit', e => {
    e.preventDefault()

        const id = document.getElementById('stock_product_id').value
        const type = document.getElementById('stock_type').value

        const formData = new FormData(e.target)
        formData.append('type', type)

        fetch(`/products/${id}/stock`, {   // 🔥 PLURAL
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(async res => {
            const data = await res.json()
            if (!res.ok) throw data
            return data
        })
        .then(data => {
            updateRow(data.product)
            closeStockModal()
            showToast(`Stock ${type === 'in' ? 'Masuk' : 'Keluar'} berhasil`)
        })
        .catch(err => {
            console.error(err)
            showToast(err.message || 'Gagal update stok', 'error')
        })
    })

    window.openHistory = id => {
        window.location.href = `/products/${id}/history`
    }


})
