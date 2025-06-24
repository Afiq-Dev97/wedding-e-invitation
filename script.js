document.addEventListener('DOMContentLoaded', function() {
    // Tetapkan tarikh perkahwinan anda di sini (Tahun, Bulan-1, Hari, Jam, Minit, Saat)
    // Ingat: Bulan bermula dari 0 (Januari = 0, Februari = 1, dst.)
    // Contoh untuk 22 Ogos 2025, 11:00 Pagi:
    const weddingDate = new Date(2025, 8, 13, 12, 0, 0).getTime(); // Current year is 2025

    const countdownElement = document.getElementById('countdown');

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Kira masa untuk hari, jam, minit dan saat
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Paparkan hasilnya dalam elemen dengan id="countdown"
        if (countdownElement) {
            countdownElement.innerHTML = `
                <div>${days}<span>Hari</span></div>
                <div>${hours}<span>Jam</span></div>
                <div>${minutes}<span>Minit</span></div>
                <div>${seconds}<span>Saat</span></div>
            `;
        }

        // Jika kira detik tamat
        if (distance < 0) {
            clearInterval(updateCountdown);
            if (countdownElement) {
                countdownElement.innerHTML = "<p>Majlis telah berlangsung!</p>";
                countdownElement.style.fontSize = "1.5em";
                countdownElement.style.color = "white";
                countdownElement.style.backgroundColor = "transparent";
                countdownElement.style.flexDirection = "column";
            }
        }
    }, 1000);

    // --- RSVP Form Display Logic ---
    const kehadiranSelect = document.getElementById('kehadiran');
    const bilanganOrangGroup = document.getElementById('bilanganOrangGroup');
    const bilanganOrangInput = document.getElementById('bilanganOrang');

    if (kehadiranSelect) {
        // Sembunyikan 'Bilangan Orang' secara lalai jika 'Tidak Hadir' dipilih atau tiada pilihan
        if (kehadiranSelect.value === 'Tidak Hadir' || kehadiranSelect.value === '') {
            bilanganOrangGroup.style.display = 'none';
            bilanganOrangInput.required = false; // Pastikan tidak required
        }

        kehadiranSelect.addEventListener('change', function() {
            if (this.value === 'Hadir') {
                bilanganOrangGroup.style.display = 'flex'; // Tunjukkan jika Hadir
                bilanganOrangInput.required = true; // Jadikan required
            } else {
                bilanganOrangGroup.style.display = 'none'; // Sembunyikan jika Tidak Hadir atau tiada pilihan
                bilanganOrangInput.required = false; // Tidak required
                bilanganOrangInput.value = '1'; // Reset nilai kepada 1
            }
        });
    }
});