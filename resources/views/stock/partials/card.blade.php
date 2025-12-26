<div class="md:hidden space-y-2">
    @foreach ($histories as $h)
        <div class="bg-white rounded shadow p-3">
            <div class="flex justify-between">
                <span class="text-sm">{{ $h->created_at->format('d/m H:i') }}</span>
                <span class="text-xs font-bold
            {{ $h->type === 'in' ? 'text-green-600' : 'text-red-600' }}">
                    {{ strtoupper($h->type) }}
                </span>
            </div>

            <div class="text-sm mt-1">
                Qty: {{ $h->qty }} <br>
                {{ $h->stock_before }} → {{ $h->stock_after }}
            </div>

            <div class="text-xs text-gray-500 mt-1">
                {{ $h->note ?? '-' }}
            </div>
        </div>
    @endforeach
</div>
