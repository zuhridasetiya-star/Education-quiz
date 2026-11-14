// =====================================
// EDUCATION QUIZ
// =====================================

// MENGATUR PERPINDAHAN HALAMAN

const pages = document.querySelectorAll(".page");

function showPage(pageId) {
    pages.forEach(page => page.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}

// TOMBOL NAVIGASI

document.getElementById("start-button").addEventListener("click", () => {
    showPage("name-page");
});

document.querySelectorAll(".home-button").forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

document.getElementById("menu-button").addEventListener("click", () => {
    showPage("home-page");
});

document.getElementById("back-home-button").addEventListener("click", () => {
    showPage("home-page");
});

document.getElementById("leaderboard-button").addEventListener("click", () => {
    showLeaderboard();
    showPage("leaderboard-page");
});


// =====================================
// 20 PERTANYAAN KUIS
// =====================================

const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Apa kepanjangan dari CPU?",
        options: [
            "Computer Personal Unit",
            "Central Processing Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: 1
    },
    {
        question: "Manakah bahasa pemrograman yang sering digunakan untuk membuat website?",
        options: ["Python", "HTML", "JavaScript", "Semua benar"],
        answer: 3
    },
    {
        question: "Apa fungsi utama RAM pada komputer?",
        options: [
            "Menyimpan data sementara",
            "Mencetak dokumen",
            "Menampilkan gambar",
            "Menghubungkan internet"
        ],
        answer: 0
    },
    {
        question: "Perangkat yang digunakan untuk mengetik adalah ...",
        options: ["Monitor", "Keyboard", "Speaker", "Printer"],
        answer: 1
    },
    {
        question: "Apa kepanjangan dari URL?",
        options: [
            "Uniform Resource Locator",
            "Universal Reading Link",
            "User Resource Location",
            "United Reference Link"
        ],
        answer: 0
    },
    {
        question: "Siapa yang dikenal sebagai pencipta World Wide Web?",
        options: [
            "Bill Gates",
            "Steve Jobs",
            "Tim Berners-Lee",
            "Mark Zuckerberg"
        ],
        answer: 2
    },
    {
        question: "Manakah yang termasuk sistem operasi komputer?",
        options: ["Google", "Windows", "Instagram", "YouTube"],
        answer: 1
    },
    {
        question: "Apa fungsi mouse pada komputer?",
        options: [
            "Mengolah suara",
            "Menggerakkan kursor",
            "Menyimpan file",
            "Mencetak gambar"
        ],
        answer: 1
    },
    {
        question: "Apa kepanjangan dari AI?",
        options: [
            "Automatic Internet",
            "Artificial Intelligence",
            "Advanced Information",
            "Application Interface"
        ],
        answer: 1
    },
    {
        question: "Apa ekstensi file Python?",
        options: [".html", ".css", ".py", ".js"],
        answer: 2
    },
    {
        question: "Apa fungsi utama browser?",
        options: [
            "Mengakses halaman web",
            "Mengedit video",
            "Mencetak dokumen",
            "Menghapus virus"
        ],
        answer: 0
    },
    {
        question: "Contoh perangkat keluaran komputer adalah ...",
        options: ["Keyboard", "Mouse", "Monitor", "Scanner"],
        answer: 2
    },
    {
        question: "Apa fungsi CSS dalam pembuatan website?",
        options: [
            "Mengatur tampilan website",
            "Menyimpan database",
            "Mengirim email",
            "Mengolah angka"
        ],
        answer: 0
    },
    {
        question: "Apa kepanjangan dari LAN?",
        options: [
            "Local Area Network",
            "Large Access Number",
            "Long Area Node",
            "Local Application Network"
        ],
        answer: 0
    },
    {
        question: "Manakah yang termasuk aplikasi pengolah kata?",
        options: [
            "Microsoft Word",
            "Google Chrome",
            "VLC Player",
            "Paint"
        ],
        answer: 0
    },
    {
        question: "Apa fungsi antivirus?",
        options: [
            "Mempercepat internet",
            "Melindungi komputer dari malware",
            "Membuat presentasi",
            "Mengedit foto"
        ],
        answer: 1
    },
    {
        question: "Apa kepanjangan dari USB?",
        options: [
            "Universal Serial Bus",
            "United System Board",
            "Universal System Browser",
            "User Storage Box"
        ],
        answer: 0
    },
    {
        question: "Manakah contoh layanan penyimpanan awan?",
        options: [
            "Google Drive",
            "Keyboard",
            "Monitor",
            "Processor"
        ],
        answer: 0
    },
    {
        question: "Apa fungsi utama database?",
        options: [
            "Menghias tampilan",
            "Menyimpan dan mengelola data",
            "Memutar musik",
            "Menghubungkan monitor"
        ],
        answer: 1
    }
];


// =====================================
// VARIABEL PERMAINAN
// =====================================

let playerName = "";
let currentQuestion = 0;
let score = 100;
let lives = 5;
let correctAnswers = 0;
let timeLeft = 25;
let timerInterval = null;
let answered = false;


// =====================================
// MEMULAI PERMAINAN
// =====================================

document.getElementById("continue-button").addEventListener("click", startGame);

document.getElementById("player-name").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        startGame();
    }
});

function startGame() {
    playerName = document.getElementById("player-name").value.trim();

    if (playerName === "") {
        alert("Silakan masukkan nama pemain terlebih dahulu!");
        return;
    }

    clearInterval(timerInterval);

    currentQuestion = 0;
    score = 100;
    lives = 5;
    correctAnswers = 0;

    showPage("quiz-page");
    loadQuestion();
}


// =====================================
// MENAMPILKAN PERTANYAAN
// =====================================

function loadQuestion() {
    clearInterval(timerInterval);

    if (currentQuestion >= questions.length || lives <= 0) {
        finishGame();
        return;
    }

    answered = false;
    timeLeft = 25;

    const question = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        currentQuestion + 1;

    document.getElementById("question-text").textContent =
        question.question;

    document.getElementById("timer").textContent = timeLeft;
    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;
    document.getElementById("feedback").textContent = "";

    const optionsContainer = document.getElementById("answer-options");

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => checkAnswer(index));

        optionsContainer.appendChild(button);
    });

    document.getElementById("next-button").hidden = true;

    startTimer();
}


// =====================================
// TIMER 25 DETIK
// =====================================

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 1000);
}


// =====================================
// MEMERIKSA JAWABAN
// =====================================

function checkAnswer(selectedAnswer) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll(".answer-button");
    const feedback = document.getElementById("feedback");

    buttons.forEach(button => button.disabled = true);

    if (selectedAnswer === question.answer) {
        score += 10;
        correctAnswers++;

        buttons[selectedAnswer].classList.add("correct");
        feedback.textContent = "🎉 Jawaban benar! Skor bertambah 10 poin.";
    } else {
        score -= 5;

        buttons[selectedAnswer].classList.add("wrong");
        buttons[question.answer].classList.add("correct");

        feedback.textContent = "❌ Jawaban salah! Skor berkurang 5 poin.";
    }

    document.getElementById("score").textContent = score;

    document.getElementById("next-button").hidden = false;
}


// =====================================
// WAKTU HABIS
// =====================================

function timeOut() {
    if (answered) return;

    answered = true;

    score -= 5;
    lives -= 1;

    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;

    document.getElementById("feedback").textContent =
        "⏰ Waktu habis! Skor berkurang 5 poin dan nyawa berkurang 1.";

    const buttons = document.querySelectorAll(".answer-button");

    buttons.forEach(button => button.disabled = true);

    buttons[questions[currentQuestion].answer].classList.add("correct");

    document.getElementById("next-button").hidden = false;
}


// =====================================
// SOAL BERIKUTNYA
// =====================================

document.getElementById("next-button").addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});


// =====================================
// MENYELESAIKAN PERMAINAN
// =====================================

function finishGame() {
    clearInterval(timerInterval);

    showPage("result-page");

    document.getElementById("final-score").textContent = score;

    if (score >= 250) {
        document.getElementById("result-title").textContent = "SELAMAT!";

        document.getElementById("result-message").textContent =
            "Hebat! Kamu berhasil mencapai nilai kelulusan.";
    } else {
        document.getElementById("result-title").textContent =
            "JANGAN PATAH SEMANGAT!";

        document.getElementById("result-message").textContent =
            "Tetap semangat belajar dan tingkatkan kemampuanmu!";
    }

    saveLeaderboard();
}


// =====================================
// MENYIMPAN PAPAN PERINGKAT
// =====================================

function saveLeaderboard() {
    let leaderboard = JSON.parse(
        localStorage.getItem("educationQuizLeaderboard") || "[]"
    );

    leaderboard.push({
        name: playerName,
        score: score,
        correct: correctAnswers
    });

    leaderboard.sort((a, b) =>
        b.score - a.score || b.correct - a.correct
    );

    localStorage.setItem(
        "educationQuizLeaderboard",
        JSON.stringify(leaderboard)
    );
}


// =====================================
// MENAMPILKAN PAPAN PERINGKAT
// =====================================

function showLeaderboard() {
    const leaderboard = JSON.parse(
        localStorage.getItem("educationQuizLeaderboard") || "[]"
    );

    const list = document.getElementById("leaderboard-list");

    list.innerHTML = "";

    if (leaderboard.length === 0) {
        list.innerHTML =
            '<p class="empty-board">Belum ada data pemain.</p>';
        return;
    }

    leaderboard.slice(0, 5).forEach((player, index) => {
        const row = document.createElement("div");

        row.className = "leaderboard-row";

        const rank = document.createElement("span");
        rank.textContent = ["🥇", "🥈", "🥉", "4", "5"][index];

        const name = document.createElement("span");
        name.textContent = player.name;

        const playerScore = document.createElement("span");
        playerScore.textContent = player.score;

        row.append(rank, name, playerScore);

        list.appendChild(row);
    });
}
