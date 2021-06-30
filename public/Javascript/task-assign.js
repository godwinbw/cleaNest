async function assignTaskHandler(event) {
  event.preventDefault();

  const user_id = document.getElementById("assign-task-select-user").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const bodyJSON = JSON.stringify({
    user_id,
  });

  console.log("user id -> ", user_id);
  console.log("task id -> ", id);
  console.log("bodyJSON -> ", bodyJSON);

  const response = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    body: bodyJSON,
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".task-assign-form")
  .addEventListener("submit", assignTaskHandler);
