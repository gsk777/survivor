function hideLogo(season) {
    let logo = seasonData.get(season).seasonLogo;
    logo.style.display = "none";
}

function showLogo(season) {
    let logo = seasonData.get(season).seasonLogo;
    logo.style.display = "inline-block";
}

function toggleLogosOn(seasonList) {
    seasonList.forEach(season => showLogo(season));
}

function toggleLogosOff(seasonList) {
    seasonList.forEach(season => hideLogo(season));
}
// TIERS====================================================================

let tierCurrent = true;
let tierOneButton = document.getElementById("tier1");
let tierTwoButton = document.getElementById("tier2");
let tierThreeButton = document.getElementById("tier3");
let tierFourButton = document.getElementById("tier4");

let tiers = new Map();
tiers.set(1, {
    element: tierOneButton,
    checked: false,
    imageOn: "images/Tier One.png",
    imageOff: "images/Tier One Fade.png",
});
tiers.set(2, {
    element: tierTwoButton,
    checked: false,
    imageOn: "images/Tier Two.png",
    imageOff: "images/Tier Two Fade.png",
});
tiers.set(3, {
    element: tierThreeButton,
    checked: false,
    imageOn: "images/Tier Three.png",
    imageOff: "images/Tier Three Fade.png",
});
tiers.set(4, {
    element: tierFourButton,
    checked: true,
    imageOn: "images/Tier Four.png",
    imageOff: "images/Tier Four Fade.png",
});

function tierToggle(selected) {
    let showList = new Set();
    let n = 1;
    for (let season of seasonData.values()) {
        if (season.tier <= selected) {
            showList.add(n);
        }
        n += 1;
    }
    if (tierCurrent === false) {
        tierCurrent = true;
        filterCurrent = false;
        castTypeOff.clear();
        finalTribalOff.clear();
        for (let box of [newbieBox, returneeBox, mixedBox, finalTwoBox, finalThreeBox]) {
            box[0].checked = true;
        }
        toggleLogosOn(Array.from(seasonData.keys()));
    }
    if (tiers.get(selected).checked === false) {
        for (let tier of tiers.values()) {
            if (tier.checked === true) {
                tier.element.src = tier.imageOff;
                tier.element.style.outline = "5px solid transparent";
                tier.checked = false;
            }
        }
        tiers.get(selected).checked = true;
        tiers.get(selected).element.src = tiers.get(selected).imageOn;
        tiers.get(selected).element.style.outline = "5px solid orangered";
        toggleLogosOff(Array.from(seasonData.keys()));
        toggleLogosOn(showList);
    }
}

// CAST TYPE================================================================

let filterCurrent = false;
let newbieBox = document.getElementsByName("newbie");
let returneeBox = document.getElementsByName("returnee");
let mixedBox = document.getElementsByName("mixed");
let castTypeOff = new Set();

function castTypeToggle(castType, checkbox) {
    let showList = new Set();
    let n = 1;
    for(let season of seasonData.values()){
        if (season.castType === castType) {
            showList.add(n);
        }
        n += 1;
    }
    if (checkbox[0].checked === true) {
        for (let season of showList) {
            castTypeOff.delete(season);
            if (finalTribalOff.has(season)) { // Checks if the season should stay off based on finalTribal filter
                showList.delete(season);
            }
        }
        toggleLogosOn(showList);
    } else {
        if (filterCurrent === false) {
            tierToggle(4);
            filterCurrent = true;
            tierCurrent = false;
        }
        toggleLogosOff(showList);
        for (let season of showList) {
            castTypeOff.add(season);
        }
    }
}

// FINAL TRIBAL ======================================================================

let finalTwoBox = document.getElementsByName("finaltwo");
let finalThreeBox = document.getElementsByName("finalthree");
let finalTribalOff = new Set();

function finalTribalToggle(number, checkbox) {
    let showList = new Set();
    let n = 1;
    for(let season of seasonData.values()) {
        if (season.finalTribal === number) {
            showList.add(n);
        }
        n += 1;
    }
    if (checkbox[0].checked === true) {
        for (let season of showList) {
            finalTribalOff.delete(season);
            if (castTypeOff.has(season)) { // Checks if the season should stay off based on castType filter
                showList.delete(season);
            }
        }
        toggleLogosOn(showList);
    } else {
        if (filterCurrent === false) {
            tierToggle(4);
            filterCurrent = true;
            tierCurrent = false;
        }
        toggleLogosOff(showList);
        for (let season of showList) {
            finalTribalOff.add(season);
        }
    }
}