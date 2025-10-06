const moles = document.querySelectorAll('.mole'); // すべてのもぐら要素
const scoreDisplay = document.getElementById('score'); // スコア表示要素
const startButton = document.getElementById('start-button'); // スタートボタン
let score = 0;
let lastHoleIndex = -1; // 直前に出たもぐらの穴のインデックス
let timeUp = false; // ゲーム終了フラグ

// --- 1. ランダムな時間間隔を生成する関数 ---
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// --- 2. 次にもぐらが出る穴をランダムに選ぶ関数 ---
function randomHole(moles) {
    const idx = Math.floor(Math.random() * moles.length);
    const hole = moles[idx];
    
    // 直前の穴と同じ穴を選ばないようにする
    if (idx === lastHoleIndex) {
        return randomHole(moles); 
    }
    
    lastHoleIndex = idx;
    return hole;
}

// --- 3. もぐらを飛び出させる関数 ---
function peep() {
    const time = randomTime(500, 1500); // 0.5秒～1.5秒間隔で出現
    const mole = randomHole(moles);

    // もぐらを「up」クラスで表示
    mole.classList.add('up');
    
    // 指定した時間後に隠す
    setTimeout(() => {
        mole.classList.remove('up');
        // ゲームが終了していなければ、次のもぐらを出す
        if (!timeUp) {
            peep();
        }
    }, time);
}

// --- 4. もぐらを叩いたときの処理 ---
function whack(e) {
    // クリックされたのが、飛び出ている（upクラスがある）もぐらか確認
    if (!e.target.classList.contains('up')) return; 

    score++;
    scoreDisplay.textContent = score;
    
    // 叩かれたもぐらをすぐに隠す
    e.target.classList.remove('up');

    // 叩かれた時の画像に一時的に変える処理などをここに追加しても良い
}

// --- 5. ゲームを開始する関数 ---
function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    timeUp = false;
    startButton.disabled = true; // スタートボタンを無効化
    
    peep(); // もぐらの出現ループ開始

    // 20秒後にゲームを終了
    setTimeout(() => {
        timeUp = true;
        startButton.disabled = false; // スタートボタンを再度有効化
        alert(`ゲーム終了！あなたのスコアは ${score} 点です！`);
    }, 20000); // 20秒 = 20000ミリ秒
}


// --- 6. イベントリスナーの設定 ---
// スタートボタンがクリックされたらゲーム開始
startButton.addEventListener('click', startGame); 

// すべてのもぐらにクリックイベントを設定
moles.forEach(mole => mole.addEventListener('click', whack));
