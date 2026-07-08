from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Konfigurasi Chrome
options = Options()
driver = webdriver.Chrome(options=options)

# Membuka website
driver.get("http://localhost:3000/login")
driver.maximize_window()

wait = WebDriverWait(driver, 10)

try:
    # Input Email
    email = wait.until(
        EC.presence_of_element_located((By.NAME, "email"))
    )
    email.send_keys("admin@gmail.com")

    # Input Password
    password = driver.find_element(By.NAME, "password")
    password.send_keys("admin123")

    # Klik tombol Login
    login_button = driver.find_element(By.TAG_NAME, "button")
    login_button.click()

    time.sleep(3)

    print("URL Saat Ini :", driver.current_url)

    if "admin" in driver.current_url:
        print("✅ Login Berhasil")
    else:
        print("❌ Login Gagal")

except Exception as e:
    print("Terjadi Error :", e)

finally:
    time.sleep(2)
    driver.quit()