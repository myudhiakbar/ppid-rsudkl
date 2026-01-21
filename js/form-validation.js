/**
 * Form Validasi - Permohonan Informasi Publik
 * Validasi sederhana untuk setiap field form
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('.btn-simpan');
    
    if (!form || !submitBtn) return;

    // Setup event listeners untuk real-time validation
    setupFieldValidation();
    
    // Handle form submission
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitFormToAPI(form);
        }
    });
});

/**
 * Setup validasi real-time untuk setiap field
 */
function setupFieldValidation() {
    const fields = {
        fileKtp: document.querySelector('input[type="file"]'),
        status: document.querySelector('select[name="status"]'),
        nik: document.querySelector('input[name="nik"]'),
        namaLengkap: document.querySelector('input[name="namaLengkap"]'),
        email: document.querySelector('input[type="email"]'),
        whatsapp: document.querySelector('input[name="whatsapp"]'),
        alamat: document.querySelector('textarea[name="alamat"]'),
        pekerjaan: document.querySelector('input[name="pekerjaan"]'),
        rincianInformasi: document.querySelector('textarea[name="rincianInformasi"]'),
        tujuanPenggunaan: document.querySelector('textarea[name="tujuanPenggunaan"]')
    };

    // Validasi File KTP
    if (fields.fileKtp) {
        fields.fileKtp.addEventListener('change', function() {
            validateFileKtp(this);
        });
    }

    // Validasi Status (Select)
    if (fields.status) {
        fields.status.addEventListener('change', function() {
            validateSelect(this, 'Status');
        });
    }

    // Validasi NIK
    if (fields.nik) {
        fields.nik.addEventListener('blur', function() {
            validateNik(this);
        });
        fields.nik.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Validasi Nama Lengkap
    if (fields.namaLengkap) {
        fields.namaLengkap.addEventListener('blur', function() {
            validateRequired(this, 'Nama Lengkap');
        });
    }

    // Validasi Email
    if (fields.email) {
        fields.email.addEventListener('blur', function() {
            validateEmail(this);
        });
    }

    // Validasi WhatsApp
    if (fields.whatsapp) {
        fields.whatsapp.addEventListener('blur', function() {
            validateWhatsApp(this);
        });
        fields.whatsapp.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Validasi Alamat
    if (fields.alamat) {
        fields.alamat.addEventListener('blur', function() {
            validateRequired(this, 'Alamat');
        });
    }

    // Validasi Pekerjaan
    if (fields.pekerjaan) {
        fields.pekerjaan.addEventListener('blur', function() {
            validateRequired(this, 'Pekerjaan');
        });
    }

    // Validasi Rincian Informasi
    if (fields.rincianInformasi) {
        fields.rincianInformasi.addEventListener('blur', function() {
            validateRequired(this, 'Rincian Informasi');
        });
    }

    // Validasi Tujuan Penggunaan
    if (fields.tujuanPenggunaan) {
        fields.tujuanPenggunaan.addEventListener('blur', function() {
            validateRequired(this, 'Tujuan Penggunaan Informasi');
        });
    }
}

/**
 * Validasi file KTP
 */
function validateFileKtp(input) {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!input.files || input.files.length === 0) {
        showError(input, 'File KTP harus dipilih');
        return false;
    }

    const file = input.files[0];

    if (!allowedTypes.includes(file.type)) {
        showError(input, 'Format file harus JPG, PNG, atau PDF');
        return false;
    }

    if (file.size > maxSize) {
        showError(input, 'Ukuran file maksimal 5MB');
        return false;
    }

    showSuccess(input);
    return true;
}

/**
 * Validasi field select
 */
function validateSelect(select, fieldName) {
    if (select.value === '' || select.value === 'Pilih Status') {
        showError(select, `${fieldName} harus dipilih`);
        return false;
    }
    showSuccess(select);
    return true;
}

/**
 * Validasi NIK (16 digit)
 */
function validateNik(input) {
    const nik = input.value.trim();
    
    if (!nik) {
        showError(input, 'NIK harus diisi');
        return false;
    }

    if (!/^\d{16}$/.test(nik)) {
        showError(input, 'NIK harus terdiri dari 16 digit');
        return false;
    }

    showSuccess(input);
    return true;
}

/**
 * Validasi Email
 */
function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showError(input, 'Email harus diisi');
        return false;
    }

    if (!emailRegex.test(email)) {
        showError(input, 'Format email tidak valid');
        return false;
    }

    showSuccess(input);
    return true;
}

/**
 * Validasi WhatsApp
 */
function validateWhatsApp(input) {
    const phone = input.value.trim();

    if (!phone) {
        showError(input, 'Nomor WhatsApp harus diisi');
        return false;
    }

    if (!/^\d{9,13}$/.test(phone)) {
        showError(input, 'Nomor WhatsApp harus 9-13 digit (tanpa +62)');
        return false;
    }

    showSuccess(input);
    return true;
}

/**
 * Validasi field required
 */
function validateRequired(input, fieldName) {
    const value = input.value.trim();

    if (!value) {
        showError(input, `${fieldName} harus diisi`);
        return false;
    }

    if (input.tagName === 'TEXTAREA' && value.length < 5) {
        showError(input, `${fieldName} minimal 5 karakter`);
        return false;
    }

    showSuccess(input);
    return true;
}

/**
 * Validasi radio button
 */
function validateRadio(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if (!selected) {
        const radioGroup = document.querySelector(`input[name="${name}"]`).closest('.mb-3');
        showError(radioGroup, 'Pilihan harus dipilih');
        return false;
    }
    return true;
}

/**
 * Tampilkan error message
 */
function showError(element, message) {
    clearMessage(element);
    element.classList.add('is-invalid');
    element.classList.remove('is-valid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.textContent = message;
    element.parentNode.insertBefore(errorDiv, element.nextSibling);
}

/**
 * Tampilkan success message
 */
function showSuccess(element) {
    clearMessage(element);
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

/**
 * Hapus message feedback
 */
function clearMessage(element) {
    const feedback = element.parentNode.querySelector('.invalid-feedback, .valid-feedback');
    if (feedback) {
        feedback.remove();
    }
}

/**
 * Validasi seluruh form
 */
function validateForm() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="file"], textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.type === 'file') {
            if (!validateFileKtp(input)) isValid = false;
        } else if (input.tagName === 'SELECT') {
            if (!validateSelect(input, input.previousElementSibling.textContent)) isValid = false;
        } else if (input.name === 'nik') {
            if (!validateNik(input)) isValid = false;
        } else if (input.type === 'email') {
            if (!validateEmail(input)) isValid = false;
        } else if (input.classList.contains('form-control') && input.type === 'text') {
            // Cek berdasarkan placeholder atau nearby label
            const label = input.previousElementSibling?.textContent || 'Field';
            if (label.includes('Nama')) {
                if (!validateRequired(input, 'Nama Lengkap')) isValid = false;
            } else if (label.includes('Pekerjaan')) {
                if (!validateRequired(input, 'Pekerjaan')) isValid = false;
            }
        } else if (input.tagName === 'TEXTAREA') {
            const label = input.previousElementSibling?.textContent || 'Field';
            if (!validateRequired(input, label)) isValid = false;
        }

        // Validasi untuk WhatsApp (di dalam input-group)
        if (input.parentElement.classList.contains('input-group')) {
            if (!validateWhatsApp(input)) isValid = false;
        }
    });

    // Validasi radio buttons
    if (!validateRadio('akses')) isValid = false;
    if (!validateRadio('salinan')) isValid = false;
    if (!validateRadio('cara')) isValid = false;

    if (!isValid) {
        alert('Mohon perbaiki kesalahan pada form.');
    }

    return isValid;
}

/**
 * Kirim form ke API
 */
function submitFormToAPI(form) {
    const submitBtn = document.querySelector('.btn-simpan');
    const originalBtnText = submitBtn.textContent;
    
    // Disable button dan tampilkan loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';

    // Create FormData dari form
    const formData = new FormData(form);

    // Send to API
    fetch('api/save-permohonan.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Success
            showSuccessMessage(data.data);
            form.reset();
            clearAllMessages();
        } else {
            // Error dari API
            showErrorAlert(data.message, data.errors);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorAlert('Terjadi kesalahan jaringan. Silahkan coba lagi.', [error.message]);
    })
    .finally(() => {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    });
}

/**
 * Tampilkan pesan sukses
 */
function showSuccessMessage(data) {
    const successHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-start">
                <div>
                    <h5 class="alert-heading mb-2">✓ Permohonan Berhasil Diterima!</h5>
                    <p class="mb-2">
                        Terima kasih telah mengajukan permohonan informasi publik. 
                        Permohonan Anda telah berhasil disimpan dalam sistem.
                    </p>
                    <hr class="my-2">
                    <p class="mb-1"><strong>Nomor Permohonan:</strong> <code>${data.nomor_permohonan}</code></p>
                    <p class="mb-1"><strong>Tanggal Permohonan:</strong> ${new Date(data.tanggal_permohonan).toLocaleString('id-ID')}</p>
                    <p class="mb-0 text-muted">
                        Silahkan simpan nomor permohonan ini untuk tracking status permohonan Anda.
                    </p>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    `;

    // Insert before form
    const form = document.querySelector('form');
    const container = form.closest('.form-wrapper');
    container.insertAdjacentHTML('beforeend', successHTML);

    // Scroll to message
    document.querySelector('.alert-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Tampilkan error alert
 */
function showErrorAlert(message, errors = []) {
    let errorContent = `<strong>${message}</strong>`;
    
    if (Array.isArray(errors) && errors.length > 0) {
        errorContent += '<ul class="mb-0 mt-2">';
        errors.forEach(error => {
            errorContent += `<li>${error}</li>`;
        });
        errorContent += '</ul>';
    }

    const errorHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <div class="d-flex align-items-start">
                <div>
                    <h5 class="alert-heading mb-2">✗ Error Pengiriman</h5>
                    ${errorContent}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    `;

    // Insert before form
    const form = document.querySelector('form');
    const container = form.closest('.form-wrapper');
    container.insertAdjacentHTML('beforeend', errorHTML);

    // Scroll to message
    document.querySelector('.alert-danger').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Hapus semua messages dari form
 */
function clearAllMessages() {
    document.querySelectorAll('.invalid-feedback, .valid-feedback').forEach(el => {
        el.remove();
    });
    document.querySelectorAll('.form-control, .form-select').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });
}
