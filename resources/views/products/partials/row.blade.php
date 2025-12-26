 @foreach ($products as $p)
     <tr class="border-t transition-colors duration-300 product-row" data-id="{{ $p->id }}">
         <td class="p-2 kode">{{ $p->kode }}</td>
         <td class="p-2 nama">{{ $p->nama }}</td>
         <td class="p-2 stok">{{ $p->stok }}</td>
         <td class="p-2 text-center text-gray-400 text-sm">
             <button onclick="openStockModal({{ $p->id }}, 'in', '{{ $p->kode }}', '{{ $p->nama }}')"
                 class="text-green-600">IN</button>
             |
             <button onclick="openStockModal({{ $p->id }}, 'out', '{{ $p->kode }}', '{{ $p->nama }}')"
                 class="text-orange-600">OUT</button>
             |
             <button onclick="openEditModal({{ $p->id }})" class="text-blue-600 text-sm">
                 Edit
             </button>
             |
             <button onclick="openDeleteModal({{ $p->id }})" class="text-red-600 text-sm">
                 Hapus
             </button>
             |
             <button onclick="openHistory({{ $p->id }})" class="text-gray-600 text-sm">
                 History
             </button>
         </td>
     </tr>
 @endforeach
