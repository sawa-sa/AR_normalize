// CSVファイルを読み込む関数
async function loadCSVData(url) {
  const response = await fetch(url);
  const text = await response.text();
  const rows = text.trim().split('\n').slice(1); // ヘッダー行を除去

  const data = [];
  rows.forEach(row => {
    const cols = row.split(',');
    if (cols.length >= 3) {
      data.push({
        x: parseFloat(cols[0]),
        y: parseFloat(cols[1]),
        z: parseFloat(cols[2])
      });
    }
  });
  return data;
}

// データを-1〜1の範囲に正規化し、中心を(0,0,0)に配置する関数（比率を保つ）
function normalizeData(data) {

  let max = 0; // 初期値として0を設定

  const centeredData = data.forEach(point => {
    const absX = Math.abs(point.x);
    const absY = Math.abs(point.y);
    const absZ = Math.abs(point.z);

    // 各軸の絶対値を比較し、一番大きいものをmaxに代入
    max = Math.max(max, absX, absY, absZ);
  });

  // 比率を保ったまま最大絶対値でスケーリング
  return data.map(point => ({
    x: point.x / max,
    y: point.y / max,
    z: point.z / max
  }));
}

export { loadCSVData, normalizeData };
