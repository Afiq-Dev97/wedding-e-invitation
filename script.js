// Sangat penting: Memberitahu pelayar untuk tidak secara automatik
// mengingati dan memulihkan posisi scroll pada setiap muat semula halaman.
// Ini memastikan halaman sentiasa bermula dari atas secara konsisten.
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function() {
    // Sebagai langkah tambahan untuk memastikan halaman di atas pada DOMContentLoaded
    // (Walaupun 'history.scrollRestoration' dah banyak bantu)
    window.scrollTo(0, 0); 

    // Tetapkan tarikh perkahwinan anda di sini (Tahun, Bulan-1, Hari, Jam, Minit, Saat)
    // Ingat: Bulan bermula dari 0 (Januari = 0, Februari = 1, dst.)
    // Untuk 13 September 2025, 12:00 Tengahari:
    const weddingDate = new Date(2025, 8, 13, 12, 0, 0).getTime(); 

    const countdownElement = document.getElementById('countdown');

    // Pastikan countdownElement wujud sebelum cuba menggunakannya
    if (countdownElement) {
        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            // Kira masa untuk hari, jam, minit dan saat
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Paparkan hasilnya dalam elemen dengan id="countdown"
            if (distance > 0) { // Hanya update jika tarikh belum berlalu
                countdownElement.innerHTML = `
                    <div>${days}<span>Hari</span></div>
                    <div>${hours}<span>Jam</span></div>
                    <div>${minutes}<span>Minit</span></div>
                    <div>${seconds}<span>Saat</span></div>
                `;
            } else { // Jika kira detik tamat
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "<p>Majlis telah berlangsung!</p>";
                countdownElement.style.fontSize = "1.5em";
                countdownElement.style.color = "white";
                countdownElement.style.backgroundColor = "transparent";
                countdownElement.style.flexDirection = "column";
            }
        }, 1000);
    }


    // --- RSVP Form Display Logic ---
    const kehadiranSelect = document.getElementById('kehadiran');
    const bilanganOrangGroup = document.getElementById('bilanganOrangGroup');
    const bilanganOrangInput = document.getElementById('bilanganOrang');

    if (kehadiranSelect && bilanganOrangGroup && bilanganOrangInput) { // Pastikan elemen wujud
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

    // --- FADE OUT INTRO SECTION LOGIC ---
    const introPage = document.getElementById('introPage');
    const viewInvitationBtn = document.getElementById('viewInvitationBtn');
    const audioPlayer = document.querySelector('audio'); // Dapatkan elemen audio

    if (viewInvitationBtn && introPage) { // Pastikan elemen wujud
        viewInvitationBtn.addEventListener('click', function() {
            introPage.style.opacity = '0'; // Mula fade out

            // Cuba mainkan lagu apabila butang diklik
            // Ini membantu memintas sekatan autoplay pelayar pada sesetengah peranti/pelayar
            if (audioPlayer) {
                audioPlayer.play().catch(error => {
                    // Jika autoplay dicegah, boleh log error di sini
                    // console.log("Autoplay was prevented:", error);
                });
            }

            // Membenarkan scrolling semula pada body
            document.body.style.overflowY = 'auto'; 

            // Selepas animasi selesai (1.5 saat), buang intro page dari display
            setTimeout(function() {
                introPage.style.display = 'none';
            }, 1500); // Masa ini mesti sama atau lebih sedikit dari transition opacity di CSS
        });
    }
});