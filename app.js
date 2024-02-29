const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyARocfKw7F7k7G0k9TdOUYTUNGf4jL3zwE",
  authDomain: "auth-demo-e2e29.firebaseapp.com",
  databaseURL: "https://auth-demo-e2e29-default-rtdb.firebaseio.com",
  projectId: "auth-demo-e2e29",
  storageBucket: "auth-demo-e2e29.appspot.com",
  messagingSenderId: "490039478171",
  appId: "1:490039478171:web:0dc3c75c49229e4dc9433e"

});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

// Sign up function

// Sign up function
const signUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const fullName = document.getElementById("fullName").value; // Lấy giá trị họ tên từ trường nhập liệu
  const messageReg = document.getElementById("messageReg");

  if (password !== confirmPassword) {
    messageReg.textContent = "Mật khẩu và xác nhận mật khẩu không khớp nhau.";
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      // Gửi email xác minh
      result.user.sendEmailVerification()
        .then(() => {
          // Email xác minh đã được gửi
          alert('Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác minh tài khoản.');
          document.getElementById('loginForm').style.display = 'block';
          document.getElementById('registerForm').style.display = 'none';
          document.getElementById('welcomePage').style.display = 'none';
        })
        .catch((error) => {
          console.error("Error sending verification email: ", error);
          if (error.code === "auth/invalid-email" || error.code === "auth/user-not-found") {
            messageReg.textContent = "Email không hợp lệ hoặc không tồn tại.";
          } else {
            messageReg.textContent = error.message;
          }
        });
    })
    .catch((error) => {
      console.log(error.code);
      messageReg.textContent = error.message;
    });
}




// Sign In function

const signIn = () => {

  const email = document.getElementById("Inemail").value;

  const password = document.getElementById("Inpassword").value;

  const messageLog = document.getElementById("messageLog")

  // firebase code

  firebase.auth().signInWithEmailAndPassword(email, password)

      .then((result) => {

          // Signed in 

          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('registerForm').style.display = 'none';
          document.getElementById('welcomePage').style.display = 'block';

          console.log(result)

      })

      .catch((error) => {

          console.log(error.code)

          messageLog.textContent = error.message
      });

}

const forgotPassword = () => {
  const email = document.getElementById("forgotEmail").value;
  const messageForgot = document.getElementById("messageForgot");

  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent successfully
      messageForgot.textContent = "Một email đã được gửi đến địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến của bạn để đặt lại mật khẩu.";
    })
    .catch((error) => {
      // An error occurred
      console.error("Error sending password reset email: ", error);
      messageForgot.textContent = error.message;
    });
}


function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  }

  function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('welcomePage').style.display = 'none';
  }

  function showForgotPassForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';
  }
