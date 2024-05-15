document.addEventListener("DOMContentLoaded", customCartHandle);

function customCartHandle() {
  async function getCartItems() {
    const response = await fetch("/cart.js")
      .then(response => response.json())
      .catch(error => {
        console.error("getCartItems:", error.message);
      });

    console.log("Cart changes >>", response.items);

    return response.items;
  }

  function observeCartChanges() {
    const cartObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        const isValidRequestType = ["xmlhttprequest", "fetch"].includes(
          entry.initiatorType
        );
        const isCartChangeRequest = /\/cart\//.test(entry.name);

        if (isValidRequestType && isCartChangeRequest) {
          getCartItems();
        }
      });
    });

    cartObserver.observe({ entryTypes: ["resource"] });
  }
  observeCartChanges();
}
