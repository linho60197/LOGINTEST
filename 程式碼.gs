// 當試算表打開時，自動執行此功能，在上方選單加入一個「自訂功能」
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('🔐 系統選單')
      .addItem('開啟登入測試', 'showSidebar')
      .addToUi();
}

// 用來叫出右側邊欄 (Sidebar) 的功能
function showSidebar() {
  var html = HtmlService.createHtmlOutputFromFile('index')
      .setTitle('GitHub 練習 - 簡易登入系統')
      .setWidth(300);
  SpreadsheetApp.getUi().showSidebar(html);
}

// 🔐 預設的 3 組帳號密碼資料庫 (供 GAS 後端驗證測試)
function verifyLogin(username, password) {
  const userDatabase = [
    { username: "admin", password: "pwdAdmin888" },
    { username: "user01", password: "hello2026" },
    { username: "github_test", password: "gitPass123" }
  ];

  // 檢查輸入是否符合資料庫中的某一組
  const matchedUser = userDatabase.find(user => 
    user.username === username && user.password === password
  );

  if (matchedUser) {
    return { success: true, username: matchedUser.username };
  } else {
    return { success: false };
  }
}