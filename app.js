// Coloque aqui o seu Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXX-XXXXXXXXXXXXXX",
  authDomain: "meu-site-fotos.firebaseapp.com",
  projectId: "meu-site-fotos",
  storageBucket: "meu-site-fotos.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// CADASTRO
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        auth.createUserWithEmailAndPassword(email, senha)
            .then(() => {
                alert('Cadastro realizado com sucesso!');
                window.location.href = 'login.html';
            })
            .catch((error) => alert(error.message));
    });
}

// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-login').value;
        const senha = document.getElementById('senha-login').value;
        auth.signInWithEmailAndPassword(email, senha)
            .then(() => {
                window.location.href = 'galeria.html';
            })
            .catch((error) => alert(error.message));
    });
}

// VERIFICA LOGIN
auth.onAuthStateChanged(user => {
    if (user && window.location.pathname.includes('galeria.html')) {
        document.getElementById('fotos').innerHTML = `
            <p>Bem-vindo, ${user.email}</p>
            <p>Aqui você pode colocar suas fotos!</p>
        `;
    } else if (!user && window.location.pathname.includes('galeria.html')) {
        window.location.href = 'login.html';
    }
});

// LOGOUT
const btnSair = document.getElementById('sair');
if (btnSair) {
    btnSair.addEventListener('click', () => {
        auth.signOut().then(() => window.location.href = 'login.html');
    });
}
