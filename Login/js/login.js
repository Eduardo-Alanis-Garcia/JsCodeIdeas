const usuarios = {
    "U1": "P1",  
    "U2": "P2",
    "U3": "P3",
    "U4": "P4",
    "U5": "P5",
}

const $submit = document.getElementById('submit'),
        $username = document.getElementById('username'),
        $password = document.getElementById('password'),
        $visible = document.getElementById('visible');

document.addEventListener("change", (e) => {
    if (e.target === $visible) {
        if($visible.checked === false) $password.type = "password";
        else $password.type = "text";
        }
});

document.addEventListener("click", (e) => {
    if (e.target === $submit) {
        e.preventDefault();
        const user = $username.value.trim();
        const pass = $password.value;

        if (user !== "" && pass !== "") {
            if (usuarios[user] && usuarios[user] === pass) {
                window.location.href = "./home.html";
            } else {
                // Usuario o contraseña incorrectos
                alert("Usuario o contraseña incorrectos");
            }
        } else {
            alert("Por favor completa ambos campos.");
        }
    }
});