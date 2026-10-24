const button = document.querySelector("#health-check");
const status = document.querySelector("#status");

button.addEventListener("click", async () => {
  button.disabled = true;
  status.textContent = "Checking API status…";

  try {
    const response = await fetch("/api/health");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    status.textContent = `API status: ${data.status}`;
  } catch {
    status.textContent =
      "Unable to connect to the API. Check that the server is running.";
  } finally {
    button.disabled = false;
  }
});
