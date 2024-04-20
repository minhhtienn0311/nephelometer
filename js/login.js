// tao du lieu nguoi dung
const user_list = [
  { username: "tienle", email: "tien@gmail.com", pass: "123" },
];

// add du lieu mau vao local storage
if (!JSON.parse(localStorage.getItem("user_list"))) {
  localStorage.setItem("user_list", JSON.stringify(user_list));
}

// kiem tra du lieu nguoi dung
function signup(e) {
  // chan luong mac dinh
  e.preventDefault();
  const email = document.getElementById("email_su").value;
  const pass = document.getElementById("pass_su").value;
  const username = document.getElementById("username_su").value;
  // validate
  if (!email || !pass || !username) {
    alert("Can dien du cac truong");
    return;
  } else {
    //them du lieu vao local storage
    const new_user_list = JSON.parse(localStorage.getItem("user_list"));
    new_user_list.push({ username: username, email: email, pass: pass });
    localStorage.setItem("user_list", JSON.stringify(new_user_list));
    // tao current user
    localStorage.setItem(
      "current_user",
      JSON.stringify({ username: username, email: email, pass: pass })
    );
    alert("Dang ky thanh cong");
    return;
  }
}
function login(e) {
  // chan luong mac dinh
  e.preventDefault();
  const email = document.getElementById("email_li").value;
  const pass = document.getElementById("pass_li").value;
  // validate
  if (!email || !pass) {
    alert("Can dien du cac truong");
    return;
  } else {
    // check du lieu
    const new_user_list = JSON.parse(localStorage.getItem("user_list"));
    for (let index = 0; index < new_user_list.length; index++) {
      if (email == new_user_list[index].email) {
        // truong hop sai mat khau
        if (pass != new_user_list[index].pass) {
          alert("Sai thong tin dang nhap");
          return;
        } else {
          // dang nhap dung
          localStorage.setItem(
            "current_user",
            JSON.stringify(new_user_list[index])
          );
          alert("Dang nhap thanh cong");

          return;
        }
      }
    }

    // truong hop chua sign up
    if (!JSON.parse(localStorage.getItem("current_user"))) {
      alert("Tai khoan chua co, ban can signup");
    }
  }
}

function logout() {
  // xoa du lieu current_user
  localStorage.removeItem("current_user");
}
// bat su kien cho nut login
document.getElementById("login_btn").addEventListener("click", (e) => {
  login(e);
});

// bat su kien cho nut signup
document.getElementById("signup_btn").addEventListener("click", (e) => {
  signup(e);
});

function set_text_for_nav(text) {
  username_nav.innerHTML = text;
}

if (!JSON.parse(localStorage.getItem("current_user"))) {
  set_text_for_nav("Login");
} else {
  const username = JSON.parse(localStorage.getItem("current_user"))
  set_text_for_nav(username);
}