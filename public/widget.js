document.getElementById("kommoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const formData = {
      name: e.target.name.value.trim(),
      phone: e.target.phone.value.trim().replace(/\+/g, ""),
      language: e.target.language.value.trim(),
      ownerId: e.target.ownerId.value.trim()
    };
  
    try {
      const response = await fetch("/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      document.getElementById("result").innerText = result.message || "Recommendation created successfully!";
    } catch (error) {
      document.getElementById("result").innerText = "Error connecting to server.";
      console.error(error);
    }
  });
  