const form = document.getElementById("inviteForm");
const customRadio = document.querySelector('input[name="restaurant"][value="Свой вариант"]');
const customInput = document.getElementById("customRestaurant");
const errorMessage = document.getElementById("errorMessage");
const successScreen = document.getElementById("successScreen");
const dateInput = document.getElementById("date");

const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;

document.querySelectorAll('input[name="restaurant"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const isCustom = customRadio.checked;
    customInput.classList.toggle("visible", isCustom);
    customInput.required = isCustom;
    if (!isCustom) customInput.value = "";
  });
});
customInput.addEventListener("focus", () => { customRadio.checked = true; customInput.classList.add("visible"); });

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorMessage.textContent = "";
  const selected = form.querySelector('input[name="restaurant"]:checked');
  if (!selected) { errorMessage.textContent = "Выбери ресторан или предложи свой ♡"; return; }
  const restaurant = selected.value === "Свой вариант" ? customInput.value.trim() : selected.value;
  if (!restaurant) { errorMessage.textContent = "Напиши, какой ресторан ты предлагаешь."; customInput.focus(); return; }
  const date = dateInput.value;
  const time = document.getElementById("time").value;
  if (!date || !time) { errorMessage.textContent = "Осталось выбрать дату и время ♡"; return; }

  const payload = {
    restaurant,
    date,
    time,
    wishes: document.getElementById("wishes").value.trim()
  };
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.querySelector("span").textContent = "Отправляю…";
  try {
    const response = await fetch("/.netlify/functions/submit-invitation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Не удалось отправить ответ");
    successScreen.classList.add("show");
    successScreen.setAttribute("aria-hidden", "false");
    form.reset();
    customInput.classList.remove("visible");
  } catch (error) {
    errorMessage.textContent = "Не получилось отправить ответ. Попробуй ещё раз чуть позже.";
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Отправить мой выбор";
  }
});
document.getElementById("closeSuccess").addEventListener("click", () => {
  successScreen.classList.remove("show");
  successScreen.setAttribute("aria-hidden", "true");
});
