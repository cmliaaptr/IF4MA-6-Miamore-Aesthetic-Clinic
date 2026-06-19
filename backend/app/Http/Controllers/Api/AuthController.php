<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {

            $request->validate([
                'email' => 'required|string|email|max:255|unique:users,email',
                'username' => 'required|string|max:50|unique:users,username',
                'password' => 'required|string|min:6',
                'role' => 'nullable|in:admin,pelanggan,dokter',
            ]);

            $user = User::create([
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'pelanggan',
                'email' => $request->email,
            ]);

            return response()->json([
                'message' => 'Register berhasil',
                'data' => $user
            ], 201);
        } catch (\Exception $e) {

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        // VALIDASI INPUT
        $request->validate([
            'username' => 'required',
            'password' => 'required',
            'role' => 'required|in:admin,pelanggan,dokter',
        ]);

        // CARI USER BERDASARKAN USERNAME
        $user = User::where(
            'username',
            $request->username
        )->first();

        // CEK USER & PASSWORD
        if (
            !$user ||
            !Hash::check(
                $request->password,
                $user->password
            )
        ) {

            return response()->json([
                'message' => 'Username atau password salah'
            ], 401);
        }

        // CEK ROLE
        if ($user->role !== $request->role) {

            return response()->json([
                'message' => 'Role tidak sesuai'
            ], 403);
        }

        // RESPONSE SUCCESS
        return response()->json([

            'message' => 'Login berhasil',

            'user' => [
                'id_user' => $user->id_user,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'id_user' => 'required|integer|exists:users,id_user',
            'role' => 'required|in:admin,pelanggan,dokter',
            'current_password' => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::where('id_user', $request->id_user)
            ->where('role', $request->role)
            ->first();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Password saat ini salah'
            ], 422);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password berhasil diubah'
        ]);
    }

    public function getDoctors()
    {
        $dokter = User::where('role', 'dokter')
            ->get();

        return response()->json([
            'data' => $dokter
        ]);
    }
}
