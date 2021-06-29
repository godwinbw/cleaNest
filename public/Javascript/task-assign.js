async function assignTaskHandler(event) {
    event.preventDefault();
  
    const user_id = document.getElementById("assign-task-select-user").value();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
  
    const response = await fetch("/api/task/${id}", {
        method: "put",
        body: JSON.stringify({
          user_id
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document
    .querySelector(".task-assign-form")
    .addEventListener("submit", assignTaskHandler);
  