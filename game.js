// --- 1. 定数と変数の設定 -----------------------------------------------------

const BOARD_SIZE = 9; // 穴の総数 (3x3)
const GAME_DURATION = 30; // ゲーム時間 (秒)

let score = 0;
let timeRemaining = GAME_DURATION;
let gameInterval; // ゲームループ（モグラ出現）のID
let timerInterval; // タイマーのID
let isPlaying = false;

const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
let moles = []; // すべてのモグラ要素を保持する配列

// --- 2. 初期化処理 -----------------------------------------------------------

/**
 * ゲーム盤とモグラを初期生成する
 */
function initializeBoard() {
    board.innerHTML = ''; // 既存の要素をクリア
    moles = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        const hole = document.createElement('div');
        hole.className = 'hole';
        
        const mole = document.createElement('div');
        mole.className = 'mole';
        // クリックイベントを設定 (モグラが出ているときだけ反応するように)
        mole.addEventListener('click', whackMole);
        
        hole.appendChild(mole);
        board.appendChild(hole);
        moles.push(mole);
    }
}

/**
 * モグラが叩かれたときの処理
 */
function whackMole(event) {
    if (!isPlaying) return;

    const clickedMole = event.target;
    
    // 叩かれたモグラが「出現中」（upクラスを持っている）か確認
    if (clickedMole.classList.contains('up')) {
        score++; // スコア加算
        clickedMole.classList.remove('up'); // モグラを隠す
        
        // 叩いた時の演出 (例: 色を緑に変える)
        clickedMole.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            clickedMole.style.backgroundColor = '#ff5722'; // 元に戻す
        }, 100);
        
        updateStatus(); // ステータス表示を更新
    }
}

// --- 3. ゲームのメインロジック --------------------------------------------------

/**
 * ランダムなモグラを出現させる
 */
function popUpMole() {
    // 現在出現中のモグラを一旦隠す
    moles.forEach(mole => mole.classList.remove('up'));

    // ランダムな穴を選ぶ
    const randomIndex = Math.floor(Math.random() * BOARD_SIZE);
    
    // モグラを出現させる
    moles[randomIndex].classList.add('up');
}

/**
 * ステータス表示（スコアと時間）を更新する
 */
function updateStatus() {
    statusDisplay.textContent = `スコア: ${score} | 時間: ${timeRemaining}`;
}

/**
 * ゲームオーバー処理
 */
function gameOver() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    
    // 画面上のモグラを全て隠す
    moles.forEach(mole => mole.classList.remove('up'));

    alert(`ゲーム終了！あなたのスコアは ${score} 点です！`);
    document.querySelector('button').disabled = false; // スタートボタンを再度有効にする
}

// --- 4. ゲーム開始とタイマー処理 ----------------------------------------------

/**
 * ゲームを開始するメイン関数
 */
function startGame() {
    if (isPlaying) return;

    // 状態をリセット
    score = 0;
    timeRemaining = GAME_DURATION;
    isPlaying = true;
    document.querySelector('button').disabled = true; // スタートボタンを無効化
    
    initializeBoard(); // 盤面を作成
    updateStatus();
    
    // モグラ出現のループ（1秒〜1.5秒間隔でランダムに出現）
    gameInterval = setInterval(popUpMole, 
        Math.floor(Math.random() * 500) + 1000 // 1000ms〜1500ms
    );
    
    // タイマー処理 (1秒ごとに時間を減らす)
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateStatus();
        
        if (timeRemaining <= 0) {
            gameOver();
        }
    }, 1000);
}

// 最初の盤面だけ準備しておく
initializeBoard();
