// modal component functions
export function openModal() {
  modal.style.display = "block";

  const addButton = document.querySelector(".addButton");
  addButton.disabled = true;

  const inputField = document.querySelector(".modalInput");
  const checkboxAndDateContainer = document.querySelector(
    ".checkboxAndDateContainer"
  );
  const checkbox = checkboxAndDateContainer.querySelector(
    'input[type="checkbox"]'
  );
  const dateInput = checkboxAndDateContainer.querySelector(".date");

  inputField.addEventListener("input", checkInputs);
  checkbox.addEventListener("change", checkInputs);
  dateInput.addEventListener("change", checkInputs);

  function checkInputs() {
    if (
      inputField.value.trim() === "" ||
      checkboxAndDateContainer.querySelector(
        'input[type="checkbox"]:checked'
      ) === null ||
      dateInput.value === ""
    ) {
      addButton.disabled = true;
    } else {
      addButton.disabled = false;
    }
  }
}
