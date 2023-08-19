const roleForm = document.getElementById('changeRole');

roleForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('roleUserId').value;

    let response = await fetch(`/api/users/premium/${userId}`,{
        method: 'post',
        headers: {
            "Content-type": "application/json"
        }
    });
    let result = await response.json();

    if(result.error) {
        alert(`Ocurrió un error al cambiar el rol. ${result.error}`);
    } else {
        window.location.reload();
    }
});