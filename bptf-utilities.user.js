// ==UserScript==
// @name         Backpack.tf - Bot Utilities
// @namespace    Forked from Bon's Backpack.tf - Bot Utilities (https://github.com/Bonfire) | Modified by Lucas (https://github.com/LucasHenriqueDiniz/)
// @version      1.20
// @description  A script to provide various TF2Autobot utilities on backpack.tf
// @author       Original by Bonfire | Modified by Lucas
// @downloadURL  https://github.com/LucasHenriqueDiniz/bptf-utilities/raw/master/bptf-bot-utilities.user.js
// @updateURL    https://github.com/LucasHenriqueDiniz/bptf-utilities/raw/master/bptf-bot-utilities.meta.js
// @match        *://backpack.tf/*
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://code.jquery.com/jquery-3.6.0.slim.min.js
// @run-at       document-end
// ==/UserScript==

(async () => {
  // painted values probably remove later
  const paintedData = {
    "A Color Similar to Slate": {
      stringNote: "🧪",
      price: {
        keys: 0,
        metal: 11,
      },
    },
    "A Deep Commitment to Purple": {
      stringNote: "🪀",
      price: {
        keys: 0,
        metal: 15,
      },
    },
    "A Distinctive Lack of Hue": {
      stringNote: "🎩",
      price: {
        keys: 1,
        metal: 5,
      },
    },
    "A Mann's Mint": {
      stringNote: "👽",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "After Eight": {
      stringNote: "🏴",
      price: {
        keys: 1,
        metal: 5,
      },
    },
    "Aged Moustache Grey": {
      stringNote: "👤",
      price: {
        keys: 0,
        metal: 5,
      },
    },
    "An Extraordinary Abundance of Tinge": {
      stringNote: "🏐",
      price: {
        keys: 1,
        metal: 5,
      },
    },
    "Australium Gold": {
      stringNote: "🏆",
      price: {
        keys: 0,
        metal: 15,
      },
    },
    "Color No. 216-190-216": {
      stringNote: "🧠",
      price: {
        keys: 0,
        metal: 7,
      },
    },
    "Dark Salmon Injustice": {
      stringNote: "🐚",
      price: {
        keys: 0,
        metal: 15,
      },
    },
    "Drably Olive": {
      stringNote: "🥝",
      price: {
        keys: 0,
        metal: 5,
      },
    },
    "Indubitably Green": {
      stringNote: "🥦",
      price: {
        keys: 0,
        metal: 5,
      },
    },
    "Mann Co. Orange": {
      stringNote: "🏀",
      price: {
        keys: 0,
        metal: 6,
      },
    },
    Muskelmannbraun: {
      stringNote: "👜",
      price: {
        keys: 0,
        metal: 2,
      },
    },
    "Noble Hatter's Violet": {
      stringNote: "🍇",
      price: {
        keys: 0,
        metal: 7,
      },
    },
    "Peculiarly Drab Tincture": {
      stringNote: "🪑",
      price: {
        keys: 0,
        metal: 3,
      },
    },
    "Pink as Hell": {
      stringNote: "🎀",
      price: {
        keys: 1,
        metal: 10,
      },
    },
    "Radigan Conagher Brown": {
      stringNote: "🚪",
      price: {
        keys: 0,
        metal: 2,
      },
    },
    "The Bitter Taste of Defeat and Lime": {
      stringNote: "💚",
      price: {
        keys: 1,
        metal: 10,
      },
    },
    "The Color of a Gentlemann's Business Pants": {
      stringNote: "🧽",
      price: {
        keys: 0,
        metal: 5,
      },
    },
    "Ye Olde Rustic Colour": {
      stringNote: "🥔",
      price: {
        keys: 0,
        metal: 2,
      },
    },
    "Zepheniah's Greed": {
      stringNote: "🌳",
      price: {
        keys: 0,
        metal: 4,
      },
    },
    "An Air of Debonair": {
      stringNote: "👜🔷",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Balaclavas Are Forever": {
      stringNote: "👜🔷",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Operator's Overalls": {
      stringNote: "👜🔷",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Cream Spirit": {
      stringNote: "🍘🥮",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Team Spirit": {
      stringNote: "🔵🔴",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "The Value of Teamwork": {
      stringNote: "🎎",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Waterlogged Lab Coat": {
      stringNote: "🎏",
      price: {
        keys: 0,
        metal: 30,
      },
    },
    "Legacy Paint": {
      stringNote: "🔵⛔",
      price: {
        keys: 4,
        metal: 0,
      },
    },
  };

  let fetchedData = await GM_getValue("keyData");

  // Fetch the price of a key in refined and store it
  // Only fetch this if the user has no keyData stored or it's been 30 minutes since the last fetch
  if (fetchedData) {
    let keyData = JSON.parse(fetchedData);

    let elapsedMillis = new Date() - keyData["timeStamp"];
    if (elapsedMillis >= 1_800_000) {
      fetchKeyPrice();
    } else {
      let KEY_PRICE = keyData["keyPrice"];
      console.log("Key price fetched from storage. Current key price: " + KEY_PRICE + " ref");
      console.log(
        "Key price will next be fetched remotely in " +
          ((1_800_000 - elapsedMillis) / 60_000).toFixed(2) +
          " mins"
      );
    }
  } else {
    fetchKeyPrice();
  }

  // Stock item def index mappings
  const stockMap = new Map();
  stockMap
    .set("0", "190") // Bat
    .set("1", "191") // Bottle
    .set("2", "192") // Fireaxe
    .set("3", "193") // Club
    .set("4", "194") // Knife
    .set("5", "195") // Fists
    .set("6", "196") // Shovel
    .set("7", "197") // Wrench
    .set("8", "198") // Bonesaw
    .set("9", "199") // Shotgun - Engineer (Primary)
    .set("10", "199") // Shotgun - Soldier
    .set("11", "199") // Shotgun - Heavy
    .set("12", "199") // Shotgun - Pyro
    .set("13", "200") // Scattergun
    .set("14", "201") // Sniper Rifle
    .set("15", "202") // Minigun
    .set("16", "203") // SMG
    .set("17", "204") // Syringe Gun
    .set("18", "205") // Rocket Launcher
    .set("19", "206") // Grenade Launcher
    .set("20", "207") // Stickybomb Launcher
    .set("21", "208") // Flamethrower
    .set("22", "209") // Pistol - Engineer
    .set("23", "209") // Pistol - Scout
    .set("24", "210") // Revolver
    .set("25", "737") // Construction PDA
    .set("29", "211") // Medigun
    .set("30", "212") // Invis Watch
    .set("735", "736"); // Sapper

  // Run on the classifieds page
  (location.href.includes("classifieds/sell") || location.href.includes("classifieds/buy")) &&
    (() => {
      console.log("Running on classifieds page");
      let item = $(".item");

      // Fetch the item attributes
      let itemPrice = item.attr("data-price");
      let itemName = item.attr("data-name");
      let extra = item.attr("data-q_name");
      let paintName = item.attr("data-paint_name");

      // Fetch the key price
      let keyData = JSON.parse(fetchedData);
      let keyPrice = keyData["keyPrice"];

      // Calculate the number of keys and metal
      let keys = (itemPrice / keyPrice).toFixed();
      let metal = (itemPrice % keyPrice).toFixed(1);
      metal = metal + metal.charAt(metal.length - 1);

      let sellDescription = `🌟 Selling ${extra} ${itemName} ${
        paintName !== undefined ? ` [${paintName} - ${paintedData[paintName].stringNote}]` : ""
      } at just ${keys > 0 ? `${keys} keys` : ""} ${keys > 0 && metal > 0 ? "and" : ""} ${
        metal > 0 ? `${metal} refs` : ""
      }! 🌟`;

      // input elements
      let metalInput = $("#metal")[0];
      let keysInput = $("#keys")[0];
      let listingDescription = $("#listing-comments")[0];

      if (metalInput && metalInput.value === "" && metal > 0) {
        metalInput.value = metal;
      }

      if (keysInput && keysInput.value === "" && keys > 0) {
        keysInput.value = keys;
      }

      if (listingDescription) {
        listingDescription.value = sellDescription;
      }
    })();

  // Run on user's inventory page
  location.href.includes("/profiles/") &&
    (async () => {
      //wait until at least one item is loaded to know if the backpack is

      function waitToBackpack() {
        console.log("waiting for backpack to load");
        return new Promise((resolve) => {
          let interval = setInterval(() => {
            if ($(".item").length > 0) {
              console.log("backpack loaded", $(".item").length);
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }

      waitToBackpack().then(() => {
        console.log("Running on user's inventory page");
        const tradableForm = $("select.form-control")[1];
        const items = $(".item");
        const backpackPages = $(".backpack-page");

        if (tradableForm) {
          // changing the value dont work, so we need to trigger the change event
          tradableForm.value = "1";
          tradableForm.dispatchEvent(new Event("change"));
        }

        const filters = $("#filters");
        filters.append(`
          <div class="form-group" style="display: flex; align-items: center; justify-content: space-between;">
            <label for="hidePure" style="margin-bottom: 0px;">Hide pure</label>
            <input type="checkbox" id="hidePure" name="hidePure" value="hidePure">
          </div>
        `);

        $("#hidePure").on("change", function () {
          if (this.checked) {
            let pureItems = $(".item[isPure]");
            pureItems.each((index, pureItem) => {
              $(pureItem).hide();
            });
          } else {
            let pureItems = $(".item[isPure]");
            pureItems.each((index, pureItem) => {
              $(pureItem).show();
            });
          }
          try {
            backpackPages.each((index, page) => {
              $(page).document.querySelectorAll(".item-list").children(":visible").length > 0
                ? $(page).show()
                : $(page).hide();
            });
          } catch (error) {
            console.log("Error on hide bp pages, fix this later", error);
          }
        });

        items.each((index, item) => {
          let itemName = $(item).attr("data-name");
          let itemPrice = $(item).attr("data-price");
          let itemQuality = $(item).attr("data-q_name");

          console.log(itemName, itemPrice, itemQuality);

          if (itemName && itemPrice && itemQuality) {
            if (
              (itemName === "Scrap Metal" ||
                itemName === "Reclaimed Metal" ||
                itemName === "Refined Metal" ||
                itemName === "Mann Co. Supply Crate Key") &&
              itemQuality === "Unique"
            ) {
              //create a new attribute to identify pure items
              item.setAttribute("isPure", true);
            }
          }
        });
      });
    })();

  // Modify popover
  $(document).on("mouseover", ".item", function () {
    let hoveredItem = this;
    let itemElement = $(hoveredItem)[0];

    let popoverLoad = setInterval(function () {
      // Add the "bot utility elements row"
      if ($(hoveredItem).next().hasClass("popover")) {
        if (!$("#bot-utility-elements").length) {
          let botUtilityElements = document.createElement("dd");
          botUtilityElements.className = "popover-btns";
          botUtilityElements.id = "bot-utility-elements";
          $("#popover-search-links")[0].before(botUtilityElements);
        }

        let addUtilitiesLoad = setInterval(function () {
          let itemSKU = itemLookup(itemElement);

          // Add the "<sku>" button
          if (!$("#sku-item-button").length) {
            let skuItemButton = document.createElement("a");
            skuItemButton.id = "sku-item-button";
            skuItemButton.className = "btn btn-default btn-xs";

            let skuIcon = document.createElement("i");
            skuIcon.className = "fa fa-book";

            let itemCommand = `${itemSKU}`;

            $(skuItemButton).data("itemCommand", itemCommand);
            $(skuIcon).data("itemCommand", itemCommand);
            skuItemButton.prepend(skuIcon);
            $("#bot-utility-elements").append(skuItemButton);

            $("#sku-item-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // Add the "Add Item" button
          if (!$("#add-item-button").length) {
            let addItemButton = document.createElement("a");
            addItemButton.id = "add-item-button";
            addItemButton.className = "btn btn-default btn-xs";
            addItemButton.textContent = " Add";

            let plusIcon = document.createElement("i");
            plusIcon.className = "fa fa-plus";

            let itemCommand = `!add sku=${itemSKU}`;

            $(addItemButton).data("itemCommand", itemCommand);
            $(plusIcon).data("itemCommand", itemCommand);
            addItemButton.prepend(plusIcon);
            $("#bot-utility-elements").append(addItemButton);

            $("#add-item-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // Add the "Update Item" button
          if (!$("#update-item-button").length) {
            let updateItemButton = document.createElement("a");
            updateItemButton.id = "update-item-button";
            updateItemButton.className = "btn btn-default btn-xs";
            updateItemButton.textContent = " Update";

            let editIcon = document.createElement("i");
            editIcon.className = "fa fa-edit";

            let itemCommand = `!update sku=${itemSKU}`;
            $(updateItemButton).data("itemCommand", itemCommand);
            $(editIcon).data("itemCommand", itemCommand);

            updateItemButton.prepend(editIcon);
            $("#bot-utility-elements").append(updateItemButton);

            $("#update-item-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // Add the "Remove Item" button
          if (!$("#remove-item-button").length) {
            let removeItemButton = document.createElement("a");
            removeItemButton.id = "remove-item-button";
            removeItemButton.className = "btn btn-default btn-xs";
            removeItemButton.textContent = " Remove";

            let minusIcon = document.createElement("i");
            minusIcon.className = "fa fa-minus";

            let itemCommand = `!remove sku=${itemSKU}`;
            $(removeItemButton).data("itemCommand", itemCommand);
            $(minusIcon).data("itemCommand", itemCommand);

            removeItemButton.prepend(minusIcon);
            $("#bot-utility-elements").append(removeItemButton);

            $("#remove-item-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // Add the "Pricecheck Item" button
          if (!$("#pricecheck-item-button").length) {
            let pricecheckItemButton = document.createElement("a");
            pricecheckItemButton.id = "pricecheck-item-button";
            pricecheckItemButton.className = "btn btn-default btn-xs";
            pricecheckItemButton.textContent = " PC";

            let priceIcon = document.createElement("i");
            priceIcon.className = "fa fa-tags";

            let itemCommand = `!pricecheck sku=${itemSKU}`;
            $(pricecheckItemButton).data("itemCommand", itemCommand);
            $(priceIcon).data("itemCommand", itemCommand);

            pricecheckItemButton.prepend(priceIcon);
            $("#bot-utility-elements").append(pricecheckItemButton);

            $("#pricecheck-item-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // Add the Copy Item Ref Value button
          if (!$("#copy-item-ref-value-button").length) {
            let dataPrice = roundValueToRef($(hoveredItem).attr("data-price")) ?? "0.00";

            let refPriceItemButton = document.createElement("a");
            refPriceItemButton.id = "copy-item-ref-value-button";
            refPriceItemButton.className = "btn btn-default btn-xs";
            refPriceItemButton.textContent = " Copy Ref Value";

            let refIcon = document.createElement("i");
            refIcon.className = "fa fa-paint-brush";

            let itemCommand = dataPrice;
            $(refPriceItemButton).data("itemCommand", itemCommand);
            $(refIcon).data("itemCommand", itemCommand);

            refPriceItemButton.prepend(refIcon);
            $("#bot-utility-elements").append(refPriceItemButton);

            $("#copy-item-ref-value-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          // // Add the "Painted Name" button
          // if (!$("#copy-item-ref-value-button").length) {
          //   let paintName = $(hoveredItem).attr("data-paint_name");
          //   let paintPrice = paintedData[paintName].price;
          //   let pricecheckItemButton2 = document.createElement("a");

          //   pricecheckItemButton2.id = "pricecheck-item-button2";
          //   pricecheckItemButton2.className = "btn btn-default btn-xs";
          //   pricecheckItemButton2.textContent = " 222";

          //   let priceIcon2 = document.createElement("i");
          //   priceIcon2.className = "fa fa-paint-brush";

          //   let itemCommand = `Key Price: ${paintPrice.keys} keys, Metal Price: ${paintPrice.metal} ref`;
          //   $(pricecheckItemButton2).data("itemCommand", itemCommand);
          //   $(priceIcon2).data("itemCommand", itemCommand);

          //   pricecheckItemButton2.prepend(priceIcon2);
          //   $("#bot-utility-elements").append(pricecheckItemButton2);

          //   $("#pricecheck-item-button2").on("click", (event) => {
          //     GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
          //   });
          // }

          // Add the "Match Listing" button | Only if the item has a listing intent (classifieds page)
          if ($(hoveredItem).data("listing_intent") && !$("#match-listing-button").length) {
            let matchListingButton = document.createElement("a");
            matchListingButton.id = "match-listing-button";
            matchListingButton.className = "btn btn-default btn-xs";
            matchListingButton.textContent = " Match";

            let matchIcon = document.createElement("i");
            matchIcon.className = "fa fa-arrow-circle-down";

            let itemCommand = "";
            let [keyPrice, metalPrice] = extractPrice($(hoveredItem));
            if ($(hoveredItem).data("listing_intent") === "buy") {
              itemCommand = `!update sku=${itemSKU}${
                keyPrice != null ? "&buy.keys=" + keyPrice : ""
              }${metalPrice != null ? "&buy.metal=" + metalPrice : ""} `;
            } else {
              itemCommand = `!update sku=${itemSKU}${
                keyPrice != null ? "&sell.keys=" + keyPrice : ""
              }${metalPrice != null ? "&sell.metal=" + metalPrice : ""} `;
            }

            $(matchListingButton).data("itemCommand", itemCommand);
            $(matchIcon).data("itemCommand", itemCommand);

            matchListingButton.prepend(matchIcon);
            $("#bot-utility-elements").append(matchListingButton);

            $("#match-listing-button").on("click", (event) => {
              GM_setClipboard($(event.target).data("itemCommand"), "text/plain");
            });
          }

          clearInterval(addUtilitiesLoad);
        }, 50);

        setTimeout(function () {
          clearInterval(addUtilitiesLoad);
        }, 1000);

        clearInterval(popoverLoad);
      }
    }, 50);

    setTimeout(function () {
      clearInterval(popoverLoad);
    }, 750);
  });

  function itemLookup(itemElement) {
    let item = $(itemElement);

    let tempDefIndex = item.attr("data-defindex");
    let itemName = item.attr("data-original-title");
    let itemDefIndex = stockMap.has(tempDefIndex) ? stockMap.get(tempDefIndex) : tempDefIndex;

    let itemQuality = item.attr("data-quality");
    let isUncraftable = item.attr("data-craftable") !== "1";
    let itemEffectID = item.attr("data-effect_id");

    let itemSkinInfo = item.find(".item-icon");
    let itemWear, itemSkin;
    if (itemSkinInfo.length > 0) {
      itemSkinInfo = itemSkinInfo
        .css("background-image")
        .match(/warpaint\/[(?!_)\S]+_[0-9]+_[0-9]+_[0-9]+\.png/g);
      if (itemSkinInfo !== null) {
        itemSkin = itemSkinInfo[0].split("_")[1];
        itemWear = itemSkinInfo[0].split("_")[2];
      }
    }

    let isStrange = item.attr("data-quality_elevated") === "11";
    let itemKillstreak = item.attr("data-ks_tier");
    let isFestivized = item.attr("data-original-title")?.toLowerCase().indexOf("festivized") !== -1;
    let isAustralium = item.attr("data-australium") === "1";

    // Other item attributes
    let crateSeries = item.attr("data-crate");
    let itemTarget, itemOutput, itemOutputQuality;
    const priceIndex = item.attr("data-priceindex").split("-");
    if (priceIndex[0] !== "0") {
      switch (item.attr("data-base_name")) {
        case "Chemistry Set":
          // Only change defindex if it's a buy listing or it's the item on the stats page.
          // So it won't change anything if it's from someones inventory or a sell listing.
          if (!item.attr("data-original_id")) {
            if (itemName.includes("Festive")) itemDefIndex = "20007";
            else if (itemName.includes("Collector's")) itemDefIndex = "20006";
            // Unsure about this one couldn't find any items might be unused.
            else if (itemName.includes("Strange")) itemDefIndex = "20008";
            // Assume all strangifier's are series 2 which they are definetly not :(
            // Used series 2 since it's the one with the biggest volume (Don't quote me on that).
            // Available defindexes; Series 1: 20000, Series 1 Rare: 20001, Series 2: 20005, Series 3: 20009.
            else if (itemName.includes("Strangifier")) itemDefIndex = "20005";
          }
        case "Fabricator":
          [itemOutput, itemOutputQuality, itemTarget] = priceIndex;
          break;
        case "Kit":
          itemTarget = priceIndex[1];
          break;
        case "Strangifier":
        case "Unusualifier":
          itemTarget = priceIndex[0];
      }
    }
    if (itemDefIndex == "9536") {
      itemDefIndex = (Math.floor(itemSkin / 100) % 2 === 0 ? "17" : "16") + itemSkin;
    }
    // Get the full item SKU, and be sure to remove any pesky whitespaces
    let itemSKU = `${itemDefIndex};\
    ${itemQuality}\
    ${itemEffectID ? `;u${itemEffectID}` : ""}\
    ${isAustralium ? ";australium" : ""}\
    ${isUncraftable ? ";uncraftable" : ""}\
    ${itemSkinInfo ? `;w${itemWear};pk${itemSkin}` : ""}\
    ${isStrange ? ";strange" : ""}\
    ${itemKillstreak ? `;kt-${itemKillstreak}` : ""}\
    ${itemTarget ? `;td-${itemTarget}` : ""}\
    ${isFestivized ? ";festive" : ""}\
    ${crateSeries ? `;c${crateSeries}` : ""}\
    ${itemOutput ? `;od-${itemOutput}` : ""}\
    ${itemOutputQuality ? `;oq-${itemOutputQuality}` : ""}`;

    return itemSKU.replace(/\s/g, "");
  }

  function extractPrice(hoveredItem) {
    let listingPrice = $(hoveredItem).data("listing_price");

    // Split the string in the event that the item has a key, ref price
    let splitString = listingPrice.split(",");

    // If we are working with a key, ref price...
    if (splitString.length > 1) {
      return [
        splitString[0].replace("keys", "").replace("key", "").trim(),
        splitString[1].replace("ref", "").trim(),
      ];
    } else {
      if (splitString[0].includes("key")) {
        // If the item is priced in the "X keys" format
        let keyPrice = splitString[0].replace("keys", "").replace("key", "").trim();
        let splitKey = keyPrice.split(".");

        if (splitKey.length > 1) {
          return [splitKey[0], KEY_PRICE * (splitKey[1] / 10)];
        } else {
          return [keyPrice, null];
        }
      } else {
        // If the item is priced in the "X ref" format
        return [null, splitString[0].replace("ref", "").trim()];
      }
    }
  }

  function roundValueToRef(value) {
    const price = parseFloat(value);

    if (price < 0.1) {
      return "0.05";
    }

    // Remove casas decimais depois da primeira sem arredondar (@TODO)
    const oneDecimalValue = price.toFixed(1);

    // Repete o último dígito para garantir duas casas decimais e múltiplo de 0,11
    const repeatedDigitValue = oneDecimalValue + oneDecimalValue.charAt(oneDecimalValue.length - 1);

    console.log("Old value: " + price + " | New value: " + repeatedDigitValue);
    return repeatedDigitValue;
  }

  function fetchKeyPrice() {
    // Reach out to Prices.TF to grab the current key selling price
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://autobot.tf/json/items/5021;6",
      onload: async function (response) {
        // Parse the sell price of the key in refined
        var keyResponse = JSON.parse(response.responseText);

        // Log to the user the current key price
        console.log(
          "Fetched key price from remote source: " + keyResponse["sell"]["metal"] + " ref"
        );

        // Set the KEY_PRICE
        KEY_PRICE = keyResponse["sell"]["metal"];

        let keyData = {
          keyPrice: KEY_PRICE,
          timeStamp: new Date().getTime(),
        };

        // Store the KEY_PRICE and the current timestamp
        await GM_setValue("keyData", JSON.stringify(keyData));
        console.log("Stored key data for 30 minutes");
      },
    });
  }
})();
