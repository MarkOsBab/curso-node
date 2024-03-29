const form = document.getElementById("restorePasswordForm");
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById("new-password").value;

  const response = await fetch(`http://localhost:8080/api/restore/password?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });

  const result = await response.json();

  if (result.error) {
    alert(result.error);
  } else {
    alert("Contraseña restablecida con éxito. Ahora puede iniciar sesión con su nueva contraseña.");
  }
});
