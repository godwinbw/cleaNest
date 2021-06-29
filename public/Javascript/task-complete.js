async function completeTaskHandler(event) {
    event.preventDefault();
  
    const complete = document.getElementById("task-complete-checkbox").value();
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
  
    const response = await fetch("/api/task/${id}", {
        method: "put",
        body: JSON.stringify({
          complete
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
    .querySelector(".task-complete-form")
    .addEventListener("submit", completeTaskHandler);
  