async function completeTaskHandler(event) {
  event.preventDefault();

  const complete = document.getElementById("task-complete-checkbox").checked;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const bodyJSON = JSON.stringify({ complete });

  console.log("complete ->", complete);
  console.log("task id -> ", id);
  console.log("bodyJSON -> ", bodyJSON);

  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    body: bodyJSON,
    headers: { "Content-Type": "application/json" },
  });

  console.log("response -> ", response);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".task-complete-form")
  .addEventListener("submit", completeTaskHandler);
