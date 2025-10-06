// ゲームの基本設定
const ROWS = 5;
const COLS = 5;
const COLORS = ['#ff6f61', '#ffc75f', '#845ec2', '#00c9a7']; // ツムの色リスト
const board = document.getElementById('game-board');
let grid = []; // 盤面の状態を保持する配列

// --- 1. 初期化処理 -----------------------------------------------------------

/**
 * 盤面をランダムな色で初期化する
 */
function initializeBoard() {
    for (let r = 0; r < ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < COLS; c++) {
            // ランダムに色を選択
            const randomColorIndex = Math.floor(Math.random() * COLORS.length);
            grid[r][c] = randomColorIndex; 
            
            // DOM要素（ツム）を作成
            const tsum = document.createElement('div');
            tsum.className = 'tsum';
            tsum.style.backgroundColor = COLORS[randomColorIndex];
            
            // 行と列のインデックスをカスタムデータ属性として保存
            tsum.dataset.row = r;
            tsum.dataset.col = c;
            
            // クリックイベントを設定
            tsum.addEventListener('click', handleTsumClick);
            
            board.appendChild(tsum);
        }
    }
}

// --- 2. クリック時の処理 -----------------------------------------------------

/**
 * 特定のツムとその隣接ツムの色を変える
 * @param {number} r - 行インデックス
 * @param {number} c - 列インデックス
 */
function toggleColor(r, c) {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) {
        return; // 盤面の外なら何もしない
    }

    // 現在の色インデックスを取得
    let currentColorIndex = grid[r][c];
    
    // 次の色インデックスを計算 (リストの最後に到達したら最初に戻る)
    let nextColorIndex = (currentColorIndex + 1) % COLORS.length;
    
    // 盤面データを更新
    grid[r][c] = nextColorIndex;
    
    // DOM要素の色を更新
    const tsumElement = board.querySelector(`[data-row="${r}"][data-col="${c}"]`);
    if (tsumElement) {
        tsumElement.style.backgroundColor = COLORS[nextColorIndex];
    }
}

/**
 * ツムがクリックされたときのイベントハンドラ
 * @param {Event} event - クリックイベント
 */
function handleTsumClick(event) {
    const clickedTsum = event.currentTarget;
    const r = parseInt(clickedTsum.dataset.row);
    const c = parseInt(clickedTsum.dataset.col);

    // クリックされたツムの色を変える
    toggleColor(r, c);
    
    // 上下左右のツムの色を変える
    toggleColor(r - 1, c); // 上
    toggleColor(r + 1, c); // 下
    toggleColor(r, c - 1); // 左
    toggleColor(r, c + 1); // 右
}

// --- 3. ゲーム開始 -----------------------------------------------------------
initializeBoard();
