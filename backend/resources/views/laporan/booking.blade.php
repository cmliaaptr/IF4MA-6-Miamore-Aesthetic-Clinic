<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Laporan Booking</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #222;
            font-size: 12px;
        }

        h1 {
            margin: 0 0 6px;
            font-size: 22px;
        }

        .subtitle {
            margin: 0 0 18px;
            color: #666;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #d8d8d8;
            padding: 8px;
            text-align: left;
        }

        th {
            background: #f3f3f3;
        }
    </style>
</head>
<body>
    <h1>Laporan Booking</h1>
    <p class="subtitle">
        {{ $tanggal ? 'Tanggal: ' . \Illuminate\Support\Carbon::parse($tanggal)->format('d/m/Y') : 'Semua booking' }}
    </p>

    <table>
        <thead>
            <tr>
                <th>No.</th>
                <th>Nama Lengkap</th>
                <th>Treatment</th>
                <th>Tanggal</th>
                <th>Jam</th>
                <th>Status Booking</th>
                <th>Status Pembayaran</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($booking as $item)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $item->nama_lengkap }}</td>
                    <td>{{ $item->treatment }}</td>
                    <td>{{ $item->tanggal_booking ? \Illuminate\Support\Carbon::parse($item->tanggal_booking)->format('d/m/Y') : '-' }}</td>
                    <td>{{ substr((string) $item->waktu_booking, 0, 5) }}</td>
                    <td>{{ $item->status_booking }}</td>
                    <td>{{ $item->status_pembayaran }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7">Belum ada data booking.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
