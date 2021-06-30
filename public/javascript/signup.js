async function signupFormHandler(event) {
  event.preventDefault();

  const displayName = document
    .querySelector("#displayname-signup")
    .value.trim();
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password && displayName) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        displayName,
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
