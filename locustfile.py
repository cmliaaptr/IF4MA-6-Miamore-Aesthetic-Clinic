from locust import HttpUser, task, between
import os
import random
from datetime import date, timedelta
from uuid import uuid4


class WebsiteUser(HttpUser):
    """Locust user that exercises the API: login + basic read endpoints.

    Configure credentials via env vars: `TEST_USERNAME`, `TEST_PASSWORD`, `TEST_ROLE`.
    The Locust `--host` flag still applies for base URL.
    """

    wait_time = between(1, 3)

    def on_start(self):
        # Default credential set; add admin and dokter as requested
        self.credentials = [
            {"username": os.getenv("TEST_USERNAME", "carla"), "password": os.getenv("TEST_PASSWORD", "putri123"), "role": os.getenv("TEST_ROLE", "pelanggan")},
            {"username": os.getenv("ADMIN_USERNAME", "admin"), "password": os.getenv("ADMIN_PASSWORD", "admin123"), "role": "admin"},
            {"username": os.getenv("DOKTER_USERNAME", "Dr. Mirna"), "password": os.getenv("DOKTER_PASSWORD", "dokter123"), "role": "dokter"},
        ]
        self.customer_credentials = [
            {"username": os.getenv("TEST_USERNAME", "carla"), "password": os.getenv("TEST_PASSWORD", "putri123"), "role": "pelanggan"},
            *self.create_customer_credentials(),
        ]
        self.authenticated_user = None
        self.authenticated_credential = None
        self.doctors = None
        self.treatments = None
        self.booking_ids = []

    def create_customer_credentials(self):
        suffix = uuid4().hex[:8]
        password = "testpass123"
        customers = [
            {"username": f"putri_{suffix}", "email": f"putri_{suffix}@example.test", "password": password, "role": "pelanggan"},
            {"username": f"dea_{suffix}", "email": f"dea_{suffix}@example.test", "password": password, "role": "pelanggan"},
            {"username": f"ramadhani_{suffix}", "email": f"ramadhani_{suffix}@example.test", "password": password, "role": "pelanggan"},
        ]

        for customer in customers:
            with self.client.post("/api/register", json=customer, catch_response=True) as response:
                if response.status_code in (200, 201, 422):
                    response.success()
                else:
                    response.failure(f"Register pelanggan test gagal: {response.status_code} - {response.text}")

        return customers

    def remember_booking(self, payload):
        if not isinstance(payload, dict):
            return None

        booking = payload.get("data", payload)
        if not isinstance(booking, dict):
            return None

        booking_id = booking.get("id_booking") or booking.get("id")
        if booking_id and booking_id not in self.booking_ids:
            self.booking_ids.append(booking_id)

        return booking_id

    def first_booking_id(self):
        if self.booking_ids:
            return self.booking_ids[0]

        with self.client.get("/api/bookings", catch_response=True) as response:
            if response.status_code != 200:
                response.success()
                return None

            try:
                bookings = response.json().get("data", [])
            except Exception:
                response.failure("GET /api/bookings invalid JSON response")
                return None

            for booking in bookings:
                booking_id = self.remember_booking(booking)
                if booking_id:
                    return booking_id

        return None

    def first_paid_booking_id(self):
        with self.client.get("/api/bookings", catch_response=True) as response:
            if response.status_code != 200:
                response.success()
                return None

            try:
                bookings = response.json().get("data", [])
            except Exception:
                response.failure("GET /api/bookings invalid JSON response")
                return None

            for booking in bookings:
                if not isinstance(booking, dict):
                    continue

                if (
                    booking.get("status_pembayaran") == "Lunas"
                    and booking.get("status_booking") in ("Terkonfirmasi", "Selesai")
                ):
                    return self.remember_booking(booking)

        return None

    @task(3)
    def login(self):
        cred = random.choice([*self.customer_credentials, *self.credentials[1:]])
        payload = {
            "username": cred["username"],
            "password": cred["password"],
            "role": cred["role"],
        }

        with self.client.post("/api/login", json=payload, catch_response=True) as response:
            if response.status_code == 200:
                try:
                    body = response.json()
                    # store authenticated user info for later tasks
                    self.authenticated_user = body.get('user')
                    self.authenticated_credential = cred
                except Exception:
                    response.failure("Login: invalid JSON response")
            else:
                response.failure(f"Login failed ({cred['role']}:{cred['username']}): {response.status_code} - {response.text}")

    @task(1)
    def list_treatments(self):
        with self.client.get("/api/treatments", catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/treatments failed: {r.status_code}")
            else:
                try:
                    self.treatments = r.json().get('data') if isinstance(r.json(), dict) else None
                except Exception:
                    self.treatments = None

    @task(2)
    def get_doctors(self):
        with self.client.get('/api/dokter', catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/dokter failed: {r.status_code}")
            else:
                try:
                    self.doctors = r.json().get('data')
                except Exception:
                    self.doctors = None

    @task(2)
    def profile(self):
        if not self.authenticated_user:
            return
        uid = self.authenticated_user.get('id_user')
        with self.client.get(f"/api/profile/{uid}", catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/profile/{uid} failed: {r.status_code}")

    @task(3)
    def create_booking_if_pelanggan(self):
        # Only pelanggan can create bookings
        if not self.authenticated_user or self.authenticated_user.get('role') != 'pelanggan':
            self.login_as_random_customer()

        if not self.authenticated_user or self.authenticated_user.get('role') != 'pelanggan':
            return

        # ensure we have a doctor and a treatment
        if not self.doctors:
            # try fetching doctors synchronously
            res = self.client.get('/api/dokter')
            try:
                self.doctors = res.json().get('data')
            except Exception:
                self.doctors = None

        if not self.treatments:
            res = self.client.get('/api/treatments')
            try:
                self.treatments = res.json().get('data')
            except Exception:
                self.treatments = None

        if not self.doctors or not self.treatments:
            return

        dokter = self.doctors[0] if isinstance(self.doctors, list) and len(self.doctors) > 0 else None
        dokter_id = dokter.get('id_user') if isinstance(dokter, dict) else None
        treatment_name = None
        if isinstance(self.treatments, list) and len(self.treatments) > 0:
            treatment_name = self.treatments[0].get('nama_treatment') or self.treatments[0].get('name')
        else:
            treatment_name = self.treatments

        if not dokter_id or not treatment_name:
            return

        payload = {
            'id_user': self.authenticated_user.get('id_user'),
            'id_dokter': dokter_id,
            'nama_lengkap': self.authenticated_user.get('username'),
            'tanggal_lahir': '1990-01-01',
            'jenis_kelamin': 'Laki-laki',
            'no_telephone': '081234567890',
            'email': self.authenticated_user.get('email'),
            'alamat': 'Alamat Test',
            'tanggal_booking': (date.today() + timedelta(days=1)).isoformat(),
            'waktu_booking': '09:00',
            'treatment': treatment_name,
        }

        with self.client.post('/api/bookings', json=payload, catch_response=True) as r:
            if r.status_code not in (200, 201):
                r.failure(f"POST /api/bookings failed: {r.status_code} - {r.text}")
            else:
                try:
                    self.remember_booking(r.json())
                except Exception:
                    r.failure("POST /api/bookings invalid JSON response")

    def login_as_random_customer(self):
        cred = random.choice(self.customer_credentials)
        payload = {
            "username": cred["username"],
            "password": cred["password"],
            "role": "pelanggan",
        }

        with self.client.post("/api/login", json=payload, catch_response=True) as response:
            if response.status_code == 200:
                try:
                    body = response.json()
                    self.authenticated_user = body.get('user')
                    self.authenticated_credential = cred
                    response.success()
                except Exception:
                    response.failure("Login pelanggan test: invalid JSON response")
            else:
                response.failure(f"Login pelanggan test gagal: {response.status_code} - {response.text}")

    @task(1)
    def admin_dashboard_if_admin(self):
        if not self.authenticated_user or self.authenticated_user.get('role') != 'admin':
            return
        with self.client.get('/api/admin/dashboard', catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/admin/dashboard failed: {r.status_code}")

    @task(1)
    def doctor_bookings_if_dokter(self):
        if not self.authenticated_user or self.authenticated_user.get('role') != 'dokter':
            return
        name = self.authenticated_user.get('username')
        with self.client.get(f"/api/bookings/doctor?doctor_name={name}", catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/bookings/doctor failed: {r.status_code}")

    # --- Additional endpoints coverage ---
    @task(1)
    def register_user(self):
        # lightweight register test with random user
        username = f"testuser_{uuid4().hex[:6]}"
        payload = {
            'username': username,
            'email': f'{username}@example.test',
            'password': 'testpass123',
        }
        with self.client.post('/api/register', json=payload, catch_response=True) as r:
            # register may require role; accept 201 or 200 or validation 422
            if r.status_code not in (200, 201, 422):
                r.failure(f"POST /api/register unexpected: {r.status_code} - {r.text}")

    @task(1)
    def change_password_if_authenticated(self):
        if not self.authenticated_user or not self.authenticated_credential:
            return

        uid = self.authenticated_user.get('id_user')
        current_password = self.authenticated_credential.get('password')

        payload = {
            'id_user': uid,
            'role': self.authenticated_user.get('role'),
            'current_password': current_password,
            'password': current_password,
            'password_confirmation': current_password
        }

        with self.client.post('/api/change-password', json=payload, catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"POST /api/change-password failed: {r.status_code} - {r.text}")

    @task(1)
    def treatments_crud_read(self):
        # list
        with self.client.get('/api/treatments', catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/treatments failed: {r.status_code}")
            else:
                try:
                    data = r.json().get('data')
                except Exception:
                    data = None
        # read first id if exists
        if data and isinstance(data, list) and len(data) > 0:
            tid = data[0].get('id') or data[0].get('id_treatment') or data[0].get('id')
            if tid:
                self.client.get(f'/api/treatments/{tid}')

    @task(1)
    def treatment_assets_index(self):
        self.client.get('/api/treatment-assets')

    @task(1)
    def jadwal_index(self):
        self.client.get('/api/jadwal-dokter')

    @task(1)
    def bookings_index(self):
        self.client.get('/api/bookings')

    @task(1)
    def payment_and_report_reads(self):
        # pembayaran list
        self.client.get('/api/pembayaran')
        # laporan
        self.client.get('/api/laporan')
        # laporan pdf (may return file or 200)
        self.client.get('/api/laporan/pdf')

    @task(1)
    def booking_payment_statuses(self):
        booking_id = self.first_booking_id()
        if not booking_id:
            return

        with self.client.get(f'/api/bookings/{booking_id}/payment/status', catch_response=True) as r:
            if r.status_code not in (200, 502):
                r.failure(f"GET payment status failed: {r.status_code} - {r.text}")

        with self.client.post(f'/api/bookings/{booking_id}/payment/sandbox-success', catch_response=True) as r:
            if r.status_code not in (200, 403):
                r.failure(f"POST sandbox payment failed: {r.status_code} - {r.text}")
            else:
                try:
                    self.remember_booking(r.json())
                except Exception:
                    pass

    @task(1)
    def payment_notifications(self):
        # Simulate an invalid Midtrans notification. A 403 is the correct API response
        # because the payload intentionally has no signature.
        payload = {'order_id': 'BKG-FAKE', 'transaction_status': 'settlement', 'transaction_id': 'SANDBOX-FAKE'}
        with self.client.post('/api/payments/midtrans/notification', json=payload, catch_response=True) as r:
            if r.status_code not in (403, 404):
                r.failure(f"POST Midtrans notification unexpected: {r.status_code} - {r.text}")
            else:
                r.success()

    @task(1)
    def bookings_show_and_payment(self):
        booking_id = self.first_booking_id()
        if not booking_id:
            return

        with self.client.get(f'/api/bookings/{booking_id}', catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/bookings/{booking_id} failed: {r.status_code} - {r.text}")
            else:
                try:
                    self.remember_booking(r.json())
                except Exception:
                    r.failure("GET booking invalid JSON response")

    @task(1)
    def profile_update_if_auth(self):
        if not self.authenticated_user:
            return
        uid = self.authenticated_user.get('id_user')
        payload = {'username': self.authenticated_user.get('username'), 'email': self.authenticated_user.get('email')}
        self.client.put(f'/api/profile/{uid}', json=payload)

    @task(1)
    def treatment_results_and_history(self):
        # doctor results
        with self.client.get('/api/treatment-results/doctor', catch_response=True) as r:
            if r.status_code != 200:
                r.failure(f"GET /api/treatment-results/doctor failed: {r.status_code} - {r.text}")

        booking_id = self.first_paid_booking_id()
        if booking_id:
            payload = {
                'id_booking': booking_id,
                'submitted_by': self.authenticated_user.get('id_user') if self.authenticated_user else None,
                'skin_condition': 'Normal',
                'treatment_result': 'Hasil treatment baik',
                'recommendation': 'Gunakan sunscreen setiap pagi',
                'home_care': 'Cleanser dan moisturizer',
                'control_note': 'Kontrol ulang sesuai jadwal',
            }
            with self.client.post('/api/treatment-results', json=payload, catch_response=True) as r:
                if r.status_code not in (200, 201):
                    r.failure(f"POST /api/treatment-results failed: {r.status_code} - {r.text}")
                else:
                    r.success()

        # customer history
        if self.authenticated_user:
            with self.client.get(f"/api/riwayat/customer/{self.authenticated_user.get('id_user')}", catch_response=True) as r:
                if r.status_code != 200:
                    r.failure(f"GET customer history failed: {r.status_code} - {r.text}")
