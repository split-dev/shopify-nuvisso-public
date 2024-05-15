document.addEventListener("DOMContentLoaded", customizerHandler);

function customizerHandler() {
  const customizer = document.querySelector(".customizer");
  const customTextElems = document.querySelectorAll(".custom--text");
  const sideSelectElems = document.querySelectorAll(
    ".select-layout__item.text"
  );
  const textInputElem = document.getElementById("customizer__text--input");
  const clearTextInputElem = document.querySelector(".customizer__text--clear");
  const textPositionPickerElems = document.querySelectorAll(
    ".customizer__position--input[name='text-position']"
  );
  const customImageList = document.querySelectorAll(
    ".customizer__images--item img"
  );
  const customImageBoxElems = document.querySelectorAll(".custom--image");
  const customImageElems = document.querySelectorAll(".custom--image img");
  const imagePositionPickerElems = document.querySelectorAll(
    ".customizer__position--input[name='img-position']"
  );
  const imageSideSelectElems = document.querySelectorAll(
    ".select-layout__item.picture"
  );
  const uploadImageInput = document.querySelector(".customizer__image--upload");
  const fontPickersBoxElem = document.getElementById(
    "customizer__font-pickers"
  );
  const defaultBuyBtn = document.querySelector(".buy-wrapper");
  const customizerNextBtn = document.querySelector(".customizer__next-button");
  const customizerBuyBtns = document.querySelectorAll(
    ".customizer__buy-button"
  );
  const sliderResetBtns = document.querySelectorAll(".customizer__reset-btn");
  const optionImageBtn = document.querySelector(
    ".customizer__option-button[data-group='images']"
  );
  const optionTextImageBtn = document.querySelector(
    ".customizer__option-button[data-group='images-text']"
  );
  // const optionButtonsElems = document.querySelectorAll(
  //   ".customizer__option-button"
  // );
  // const sliderButtons = document.querySelectorAll(
  //   ".thumbnail-list__item button"
  // );
  const imgPositionCheckbox = document.getElementById(
    "customizer__position--checkbox"
  );
  const textPositionCheckbox = document.getElementById("text-position");
  const customizerImages = document.querySelectorAll(
    ".customizer__sides > img"
  );
  const textBuyThumb = document.querySelector(".text_buy_block");
  const textBuyButton = document.querySelector(".customizer__buy-button.text");
  const textAcceptInput = document.querySelector(".text_buy_block input");
  const imageBuyBtn = document.querySelectorAll(
    ".image_buy_block .customizer__buy-button.second"
  );
  const imageAcceptInput = document.querySelector(".image_buy_block input");

  //Customizer hidden inputs
  const hiddenInputs = {
    font: document.querySelectorAll("input[name='properties[Font]']"),
    text: document.querySelectorAll("input[name='properties[Text]']"),
    text_position: document.querySelectorAll(
      "input[name='properties[Text position]']"
    ),
    image_position: document.querySelectorAll(
      "input[name='properties[Image position]']"
    ),
    image: document.querySelectorAll("input[name='properties[Image]']"),
    side: document.querySelectorAll("input[name='properties[Side]']"),
    file: document.querySelectorAll("input[name='properties[Image]']"),
  };

  function setHiddenInputValue(prop, newValue) {
    hiddenInputs[prop].forEach(input => {
      input.value = newValue;
    });
  }

  customizer.addEventListener("toggle", () => {
    defaultBuyBtn.classList.toggle("visually-hidden");
  });

  // emailjs.init({
  //   publicKey: "ctkzCvZxm_2v8UW-z",
  // });
  // const uid = new ShortUniqueId({ length: 10 });

  const fonts = ["Alternate Gothic", "Minion Pro", "Anca", "Qwitcher Grypen"];
  let currentFont = fonts[0];

  [...customTextElems].forEach(elem => {
    elem.style.fontFamily = currentFont;
  });

  fonts.slice(0, 4).map((font, idx) => {
    const fontPickerBoxElem = document.createElement("li");
    const fontPickerButtonElem = document.createElement("button");

    fontPickerButtonElem.classList.add("customizer__font-picker");
    idx === 0 && fontPickerButtonElem.classList.add("current");
    fontPickerButtonElem.innerHTML = font;
    fontPickerButtonElem.style.fontFamily = font;
    fontPickerBoxElem.appendChild(fontPickerButtonElem);
    fontPickersBoxElem.appendChild(fontPickerBoxElem);
  });

  function fontChange() {
    const pickersElems = document.querySelectorAll(".customizer__font-picker");

    [...pickersElems].forEach(picker => {
      picker.addEventListener("click", event => {
        const font = event.target.textContent;
        currentFont = font;

        customTextElems.forEach(elem => {
          elem.style.fontFamily = font;
        });
        picker.classList.add("current");

        [...pickersElems].forEach(pick => {
          if (pick.textContent !== picker.textContent) {
            pick.classList.remove("current");
          }
        });

        setHiddenInputValue("font", font);
      });
    });
  }
  fontChange();

  function imageOptionsOpen() {
    const optionDetailsElems = document.querySelectorAll(
      ".customizer__image--option"
    );

    [...optionDetailsElems].forEach(details => {
      details.addEventListener("click", () => {
        [...optionDetailsElems].forEach(item => {
          if (item !== details) {
            item.removeAttribute("open");
          }
        });
      });
    });
  }
  imageOptionsOpen();

  const customData = {
    text: "",
    textPosition: "down",
    image: "",
    imagePosition: "center",
    side: "",
  };

  // const customData = {
  // };
  // let currentSide = "";

  // const basicCustomData = {
  //   text: "",
  //   textPosition: "down",
  //   image: "",
  //   imagePosition: "center",
  // };

  optionTextImageBtn.addEventListener("click", () => {
    setHiddenInputValue("image_position", customData.imagePosition);
  });
  optionImageBtn.addEventListener("click", () => {
    setHiddenInputValue("image_position", customData.imagePosition);
  });

  function toggleApproveVisibility(parentElem, show) {
    const approve = parentElem.querySelector(".approve-icon");

    show === false
      ? approve.classList.add("visually-hidden")
      : approve.classList.remove("visually-hidden");
  }

  function toggleCustomPosition(elems) {
    [...elems].forEach(elem => {
      elem.classList.toggle("center");
      elem.classList.toggle("down");
    });
  }

  function textSidePicker() {
    [...sideSelectElems].forEach((select, idx) => {
      const sideGroup = select.getAttribute("data-side");
      // customData[sideGroup] = { ...basicCustomData };

      if (idx === 0) {
        // currentSide = sideGroup;
        customData.side = sideGroup;
        setHiddenInputValue("side", sideGroup);
      }

      select.addEventListener("click", () => {
        // const { textPosition, imagePosition } = customData[sideGroup];
        const { textPosition, imagePosition } = customData;
        select.classList.add("current");
        // currentSide = sideGroup;
        customData.side = sideGroup;

        setHiddenInputValue("side", sideGroup);

        // textInputElem.value = customData[currentSide].text;
        textInputElem.value = customData.text;

        [...customTextElems].forEach(elem => {
          // elem.textContent = customData[currentSide].text;
          elem.textContent = customData.text;

          if (!elem.classList.contains(textPosition)) {
            toggleCustomPosition(customTextElems);
          }
        });

        [...customImageBoxElems].forEach(elem => {
          const img = elem.querySelector("img");

          // img.src = customData[currentSide].image;
          img.src = customData.image;

          if (!elem.classList.contains(imagePosition)) {
            toggleCustomPosition(customImageBoxElems);
          }
        });

        [...textPositionPickerElems].forEach(radio => {
          if (radio.value === textPosition) {
            radio.checked = true;
          }
        });

        [...sideSelectElems].forEach(side => {
          if (select !== side) {
            side.classList.remove("current");
            toggleApproveVisibility(side, false);
          } else {
            customData.text.length > 0 && toggleApproveVisibility(side, true);
          }
        });

        [...customizerImages].forEach(img => {
          const imgSide = img.getAttribute("data-side");

          sideGroup === imgSide
            ? img.classList.remove("visually-hidden")
            : img.classList.add("visually-hidden");
        });
      });
    });
  }
  textSidePicker();

  function imageSidePicker() {
    [...imageSideSelectElems].forEach(select => {
      const sideGroup = select.getAttribute("data-side");

      select.addEventListener("click", () => {
        // const { imagePosition, textPosition } = customData[sideGroup];
        const { imagePosition } = customData;
        select.classList.add("current");
        // currentSide = sideGroup;
        customData.side = sideGroup;
        setHiddenInputValue("side", sideGroup);

        [...customImageBoxElems].forEach(elem => {
          const img = elem.querySelector("img");

          // img.src = customData[currentSide].image;
          img.src = customData.image;

          if (!elem.classList.contains(imagePosition)) {
            toggleCustomPosition(customImageBoxElems);
          }
        });

        // [...customTextElems].forEach(elem => {
        //   // elem.textContent = customData[currentSide].text;
        //   elem.textContent = customData.text;

        //   if (!elem.classList.contains(textPosition)) {
        //     toggleCustomPosition(customTextElems);
        //   }
        // });

        [...imagePositionPickerElems].forEach(radio => {
          if (radio.value === imagePosition) {
            radio.checked = true;
          }
        });

        [...imageSideSelectElems].forEach(side => {
          if (select !== side) {
            side.classList.remove("current");
            toggleApproveVisibility(side, false);
          } else {
            customData.image.length > 0 && toggleApproveVisibility(side, true);
          }
        });

        [...customizerImages].forEach(img => {
          const imgSide = img.getAttribute("data-side");

          sideGroup === imgSide
            ? img.classList.remove("visually-hidden")
            : img.classList.add("visually-hidden");
        });
      });
    });
  }
  imageSidePicker();

  function positionHandler() {
    [...textPositionPickerElems].forEach(radio => {
      radio.addEventListener("change", event => {
        const { value, checked } = event.target;
        toggleCustomPosition(customTextElems);
        toggleCustomPosition(customImageBoxElems);

        if (checked) {
          // customData[currentSide].textPosition = value;
          customData.textPosition = value;

          setHiddenInputValue("text_position", value);

          // value === "down"
          //   ? (customData[currentSide].imagePosition = "center")
          //   : (customData[currentSide].imagePosition = "down");
          value === "down"
            ? (customData.imagePosition = "center")
            : (customData.imagePosition = "down");

          [...imagePositionPickerElems].forEach(input => {
            if (value !== input.value) {
              input.checked = true;
            }
          });
        }
      });
    });
  }
  positionHandler();

  function textHandler() {
    const onChange = event => {
      const { value } = event.target;

      if (value.length > 0) {
        customizerNextBtn.removeAttribute("disabled");
        // [...customizerBuyBtns].forEach(btn => {
        //   btn.removeAttribute("disabled");
        // });

        if (textAcceptInput.checked) {
          textBuyButton.removeAttribute("disabled");
        }
      } else {
        textBuyButton.disabled = true;
      }
    };
    const onInput = event => {
      const { value } = event.target;
      // customData[currentSide].text = value;
      customData.text = value;
      setHiddenInputValue("font", currentFont);
      setHiddenInputValue("text", value);

      [...customTextElems].forEach(elem => {
        // elem.textContent = customData[currentSide].text;
        elem.textContent = customData.text;
      });

      [...sideSelectElems].forEach(select => {
        const sideGroup = select.getAttribute("data-side");
        // if (sideGroup !== currentSide) {
        //   return;
        // }
        if (sideGroup !== customData.side) {
          return;
        }

        //const approveIcon = select.querySelector(".approve-icon");

        // customData[currentSide].text.length > 0
        //   ? approveIcon.classList.remove("visually-hidden")
        //   : approveIcon.classList.add("visually-hidden");

        if (customData.text.length > 0) {
          toggleApproveVisibility(select, true);

          setHiddenInputValue("text_position", customData.textPosition);
        } else {
          toggleApproveVisibility(select, false);

          setHiddenInputValue("text_position", "");
        }
      });

      onChange(event);
    };

    textInputElem.addEventListener("input", onInput);
    textInputElem.addEventListener("change", onChange);
  }
  textHandler();

  function clearTextarea() {
    clearTextInputElem.addEventListener("click", () => {
      textInputElem.value = "";

      // for (const key in customData) {
      //   customData[key].text = "";
      // }
      customData.text = "";

      [...sideSelectElems].forEach(side => {
        toggleApproveVisibility(side, false);
        //const approveIcon = side.querySelector(".approve-icon");
        //approveIcon.classList.add("visually-hidden");
        // side.removeAttribute("disabled");
      });

      [...customTextElems].forEach(text => {
        text.textContent = "";
      });

      customizerNextBtn.disabled = true;
    });
  }
  clearTextarea();

  function acceptTerms() {
    textAcceptInput.addEventListener("change", event => {
      if (event.target.checked && customData.text.length > 0) {
        textBuyButton.removeAttribute("disabled");
      } else {
        textBuyButton.disabled = true;
      }
    });

    imageAcceptInput.addEventListener("change", event => {
      if (event.target.checked && customData.image.length > 0) {
        imageBuyBtn.forEach(btn => {
          btn.removeAttribute("disabled");
        });
      } else {
        imageBuyBtn.forEach(btn => {
          btn.disabled = true;
        });
      }
    });
  }
  acceptTerms();

  function customImagePicker() {
    [...customImageList].forEach(image => {
      image.addEventListener("click", event => {
        const { src } = event.target;

        // customData[currentSide].image = src;
        customData.image = src;
        customImageElems.forEach(img => {
          img.src = src;
        });
        setHiddenInputValue("image", src);

        // [...customizerBuyBtns].forEach(btn => {
        //   btn.removeAttribute("disabled");
        // });

        if (imageAcceptInput.checked) {
          imageBuyBtn.forEach(btn => {
            btn.removeAttribute("disabled");
          });
        }

        [...imageSideSelectElems].forEach(select => {
          const sideGroup = select.getAttribute("data-side");

          [...customTextElems].forEach(text => {
            text.classList.add("plus-image");
          });

          // if (sideGroup !== currentSide) {
          //   select.disabled = true;
          //   return;
          // }
          if (sideGroup !== customData.side) {
            // select.disabled = true;
            return;
          }

          // const approveIcon = select.querySelector(".approve-icon");
          // customData[currentSide].image.length > 0
          //   ? approveIcon.classList.remove("visually-hidden")
          //   : approveIcon.classList.add("visually-hidden");
          customData.image.length > 0
            ? toggleApproveVisibility(select, true)
            : toggleApproveVisibility(select, false);
        });
      });
    });
  }
  customImagePicker();

  function imagePositionHandler() {
    [...imagePositionPickerElems].forEach(radio => {
      radio.addEventListener("change", event => {
        const { value, checked } = event.target;
        toggleCustomPosition(customTextElems);
        toggleCustomPosition(customImageBoxElems);

        if (checked) {
          // customData[currentSide].imagePosition = value;
          customData.imagePosition = value;

          setHiddenInputValue("image_position", value);

          // value === "down"
          //   ? (customData[currentSide].textPosition = "center")
          //   : (customData[currentSide].textPosition = "down");
          value === "down"
            ? (customData.textPosition = "center")
            : (customData.textPosition = "down");

          [...textPositionPickerElems].forEach(input => {
            if (value !== input.value) {
              input.checked = true;
            }
          });
        }
      });
    });
  }
  imagePositionHandler();

  function uploadCustomImage() {
    uploadImageInput &&
      uploadImageInput.addEventListener("change", event => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
          const { result } = event.target;

          // customData[currentSide].image = result;
          customData.image = result;
          customImageElems.forEach(img => {
            img.src = result;
          });
          setHiddenInputValue("image", result);
        };

        reader.readAsDataURL(file);
      });
  }
  uploadCustomImage();

  // function setOrderNote() {
  //   const buyButtons = document.querySelectorAll(
  //     ".product-form__submit.customizer__buy-button"
  //   );

  //   [...buyButtons].forEach(btn => {
  //     btn.addEventListener("click", () => {
  //       setTimeout(() => {
  //         const orderNote = document.getElementById("CartDrawer-Note");
  //         const checkoutBtn = document.getElementById("CartDrawer-Checkout");

  //         const id = uid.rnd();
  //         const serviceID = "service_fz9hiu4";
  //         const templateID = "template_kgk4igo";
  //         const templateParams = {
  //           id: id,
  //           font: currentFont,
  //           ...customData,
  //         };

  //         orderNote.value = `Email order id: ${id}`;

  //         checkoutBtn.addEventListener("click", () => {
  //           emailjs
  //             .send(serviceID, templateID, templateParams)
  //             .then(res => {
  //               console.log("SUCCESS", res.status, res.text);
  //             })
  //             .catch(err => {
  //               console.error("FAIL", err);
  //             });
  //         });
  //       }, 1500);
  //     });
  //   });
  // }
  // setOrderNote();

  function resetData() {
    const imgBuyThumb = document.querySelector(".customizer__buy-btn__image");
    const allBuyThumb = document.querySelector(".customizer__buy-btn__all");

    [...sliderResetBtns].forEach(btn => {
      btn.addEventListener("click", () => {
        // for (const key in customData) {
        //   customData[key].text = "";
        //   customData[key].image = "";
        // }
        customData.text = "";
        customData.image = "";

        [...customTextElems].forEach(text => {
          text.textContent = "";
          text.classList.remove("plus-image");
        });

        [...customImageElems].forEach(image => {
          image.src = "";
        });

        textBuyThumb.classList.remove("visually-hidden");
        imgBuyThumb.classList.remove("visually-hidden");
        allBuyThumb.classList.remove("visually-hidden");

        clearTextInputElem.click();

        // [...sliderButtons].forEach(sliderBtn => {
        //   sliderBtn.removeAttribute("disabled");
        // });

        [...imageSideSelectElems].forEach(select => {
          toggleApproveVisibility(select, false);

          // const approveIcon = select.querySelector(".approve-icon");
          // approveIcon.classList.add("visually-hidden");
          // select.removeAttribute("disabled");
        });

        // customizerNextBtn.disabled = true;

        hiddenInputs.image.value = "";
        hiddenInputs.text.value = "";
        hiddenInputs.font.value = "";

        for (const key in hiddenInputs) {
          setHiddenInputValue(key, "");
        }

        setHiddenInputValue("font", currentFont);
      });
    });
  }
  resetData();

  // function handleOptionButtonsElems() {
  //   [...optionButtonsElems].forEach(btn => {
  //     btn.addEventListener("click", () => {
  //       [...sliderButtons].forEach((sliderBtn, sliderIdx) => {
  //         if (sliderIdx === 0) {
  //           sliderBtn.click();
  //         }

  //         sliderBtn.disabled = true;
  //       });
  //     });
  //   });
  // }
  // handleOptionButtonsElems();

  function imgPositionCheckboxHandler() {
    imgPositionCheckbox.addEventListener("change", event => {
      const { checked } = event.target;

      [...imagePositionPickerElems].forEach(input => {
        if (checked && input.value === "down") {
          input.click();
        }

        if (!checked && input.value === "center") {
          input.click();
        }
      });
    });
  }
  imgPositionCheckboxHandler();

  function textPositionCheckboxHandler() {
    textPositionCheckbox.addEventListener("change", event => {
      const { checked } = event.target;

      [...textPositionPickerElems].forEach(input => {
        if (checked && input.value === "down") {
          input.click();
        }

        if (!checked && input.value === "center") {
          input.click();
        }
      });
    });
  }
  textPositionCheckboxHandler();

  // function setMobileImage() {
  //   const variantPicker = document.querySelectorAll("input[data-variant]");
  //   const mobileImg = document.querySelector(
  //     ".customizer__mobile--image > img"
  //   );

  //   [...variantPicker].forEach(label => {
  //     label.addEventListener("change", () => {
  //       setTimeout(() => {
  //         const sliderMedia = document.querySelectorAll(
  //           ".product__media > img"
  //         );

  //         mobileImg.src = sliderMedia[0].src;
  //       }, 1000);
  //     });
  //   });
  // }
  // setMobileImage();
}
