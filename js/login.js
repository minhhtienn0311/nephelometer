// tao du lieu nguoi dung
const user_list = [
  { username: "tienle", email: "tien@gmail.com", pass: "123" },
];

// const wrapper = document.querySelector(".wrapper");
// hien thi ten nguoi dung hoac chu login khi chua dang nhap
const username_nav = document.querySelector("#username_nav");

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
    set_text_for_nav(username);
    wrapper.classList.remove("active-popup");
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
          const username = JSON.parse(
            localStorage.getItem("current_user")
          ).username;
          set_text_for_nav(username);
          wrapper.classList.remove("active-popup");
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

// bat su kien cho nut login
document.getElementById("login_btn").addEventListener("click", (e) => {
  login(e);
});

// bat su kien cho nut signup
document.getElementById("signup_btn").addEventListener("click", (e) => {
  signup(e);
});

// Chinh gia tri cua nut bam login tren nav
function set_text_for_nav(text) {
  username_nav.innerHTML = text;
}
// kiem tra da login chua (ngay khi mo web)
if (!JSON.parse(localStorage.getItem("current_user"))) {
  set_text_for_nav("Login");
} else {
  const username = JSON.parse(localStorage.getItem("current_user")).username;
  set_text_for_nav(username);
}
