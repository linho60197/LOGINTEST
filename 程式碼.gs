// 當網頁發送 POST 請求過來時，GAS 會自動執行這個函式
function doPost(e) {
  try {
    // 1. 接收從 GitHub 網頁傳過來的帳號密碼資料
    var params = JSON.parse(e.postData.contents);
    var username = params.username;
    var password = params.password;

    // 🔐 預設的 3 組帳號密碼資料庫
    const userDatabase = [
      { username: "admin", password: "pwdAdmin888" },
      { username: "user01", password: "hello2026" },
      { username: "github_test", password: "gitPass123" }
    ];

    // 2. 檢查輸入是否符合資料庫中的某一組
    const matchedUser = userDatabase.find(user => 
      user.username === username && user.password === password
    );

    var result = {};
    if (matchedUser) {
      result = { success: true, username: matchedUser.username };
    } else {
      result = { success: false, message: "帳號或密碼錯誤" };
    }

    // 3. 關鍵：回傳 JSON 格式給 GitHub 前端，並允許跨網域連線 (CORS)
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // 如果程式出錯，回傳錯誤訊息
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 試算表選單保留，改為提示用途
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('🔐 系統選單')
      .addItem('查看網頁開啟說明', 'showInfo')
      .addToUi();
}
function showInfo() {
  SpreadsheetApp.getUi().alert('請直接使用 GitHub Pages 的網址開啟登入介面喔！');
}