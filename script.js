// Wait for the full DOM to load before executing any JavaScript logic
document.addEventListener("DOMContentLoaded", function () {
  // Reference to the primary input field representing the number of people in the main party (e.g. "walkers")
  const fieldWalkInput = document.getElementById(
    "wc_bookings_field_persons_1469"
  );

  // Reference to the secondary input field representing guests accompanying the main person (e.g. "guests")
  const guestInput = document.getElementById("wc_bookings_field_persons_1470");

  // If either input is not found on the page (e.g. due to page not being a booking form), stop further execution
  if (!fieldWalkInput || !guestInput) return;

  // Create message containers for walkers and guests
  const walkMessage = document.createElement("div");
  walkMessage.style.color = "#721c24";
  walkMessage.style.backgroundColor = "#f8d7da";
  walkMessage.style.padding = "8px 12px";
  walkMessage.style.marginTop = "6px";
  walkMessage.style.border = "1px solid #f5c6cb";
  walkMessage.style.borderRadius = "4px";
  walkMessage.style.fontSize = "14px";
  walkMessage.style.display = "none";
  fieldWalkInput.insertAdjacentElement("afterend", walkMessage);

  const guestMessage = document.createElement("div");
  guestMessage.style.color = "#721c24";
  guestMessage.style.backgroundColor = "#f8d7da";
  guestMessage.style.padding = "8px 12px";
  guestMessage.style.marginTop = "6px";
  guestMessage.style.border = "1px solid #f5c6cb";
  guestMessage.style.borderRadius = "4px";
  guestMessage.style.fontSize = "14px";
  guestMessage.style.display = "none";
  guestInput.insertAdjacentElement("afterend", guestMessage);

  // Define a function to enforce maximum limits on walkers and guests
  function enforceGuestLimit() {
    // Parse the walker count as an integer; default to 0 if input is empty or invalid
    let fieldWalkCount = parseInt(fieldWalkInput.value || 0);

    // Cap the number of walkers to a maximum of 6 (as there are only 6 alpacas)
    if (fieldWalkCount > 6) {
      fieldWalkCount = 6;
      fieldWalkInput.value = 6;
      walkMessage.textContent = "Maximum 6 walkers allowed.";
      walkMessage.style.display = "block";
    } else {
      walkMessage.textContent = "";
      walkMessage.style.display = "none";
    }

    // Set the maximum number of guests to equal the number of walkers, capped at 6
    guestInput.max = fieldWalkCount;

    // If the current guest count exceeds the allowed number, reduce it to match the walker count
    const guestCount = parseInt(guestInput.value || 0);
    if (guestCount > fieldWalkCount) {
      guestInput.value = fieldWalkCount;
      guestMessage.textContent = "Each walker may bring only one guest.";
      guestMessage.style.display = "block";
    } else {
      guestMessage.textContent = "";
      guestMessage.style.display = "none";
    }
  }

  // Attach a listener to the walker input field to enforce guest limits as the user changes the value
  fieldWalkInput.addEventListener("input", enforceGuestLimit);

  // Run the logic once on initial page load to apply correct constraints based on existing values
  enforceGuestLimit();
});
