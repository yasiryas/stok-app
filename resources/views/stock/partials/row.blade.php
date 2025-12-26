@foreach ($histories as $history)
    <tr class="border-t">
        <td class="p-2">{{ $history->created_at->format('d-m-Y H:i') }}</td>
        <td class="p-2">
            <span class="px-2 py-1 rounded text-xs {{ $history->type === 'in' ? 'bg-green-500' : 'bg-orange-600' }}">
                {{ strtoupper($history->type) }}
            </span>
        </td>
        <td class="p-2">{{ $history->quantity }}</td>
        <td class="p-2">{{ $history->stock_before }}</td>
        <td class="p-2">{{ $history->stock_after }}</td>
        <td class="p-2">{{ $history->description }}</td>
    </tr>
@endforeach
