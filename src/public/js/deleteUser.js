const form = document.getElementById('deleteUser');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    let response = await fetch("/api/users/delete-one", {
        method: 'delete',
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json"
        }
    });

    let result = await response.json();

    if(result.error) {
        alert(result.error);
    } else {
        window.location.reload();
    }
});