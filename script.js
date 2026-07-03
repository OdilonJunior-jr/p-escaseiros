(() => {
  const PHONE = "5534997665455";
  const UNIT_PRICE = 12;
  const MAX_QUANTITY = 20;
  let quantity = 1;

  const quantityOutput = document.querySelector("#quantity");
  const orderTotal = document.querySelector("[data-order-total]");
  const orderButton = document.querySelector("[data-order-now]");

  const currency = (value) => value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const orderMessage = (qty) => {
    const total = qty * UNIT_PRICE;
    const product = qty === 1 ? "pão caseiro artesanal" : "pães caseiros artesanais";

    return [
      "Olá, Cida! Gostaria de fazer um pedido:",
      "",
      `• Quantidade: ${qty} ${product}`,
      `• Valor por unidade: ${currency(UNIT_PRICE)}`,
      `• Total do pedido: ${currency(total)}`,
      "",
      "Pode me informar as opções de entrega ou retirada?",
    ].join("\n");
  };

  const whatsappURL = (message) =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

  const updateQuantity = () => {
    quantityOutput.textContent = String(quantity);
    orderTotal.textContent = currency(quantity * UNIT_PRICE);
    orderButton.setAttribute(
      "aria-label",
      `Fazer pedido de ${quantity} ${quantity === 1 ? "pão" : "pães"} pelo WhatsApp, total ${currency(quantity * UNIT_PRICE)}`
    );
  };

  document.querySelector("[data-minus]").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    updateQuantity();
  });

  document.querySelector("[data-plus]").addEventListener("click", () => {
    quantity = Math.min(MAX_QUANTITY, quantity + 1);
    updateQuantity();
  });

  orderButton.addEventListener("click", () => {
    window.open(whatsappURL(orderMessage(quantity)), "_blank", "noopener,noreferrer");
  });

  const lightbox = document.querySelector("[data-lightbox-modal]");
  const lightboxImage = lightbox.querySelector("img");

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-lightbox]").forEach((button) => {
    button.addEventListener("click", () => {
      lightboxImage.src = button.dataset.lightbox;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  updateQuantity();
})();
