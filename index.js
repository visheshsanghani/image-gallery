const body = document.body;
const galleryTabs = document.querySelectorAll(".gallery_tabs li");
const galleryItems = document.querySelectorAll(".gallery_item");
const galleryImgs = document.querySelectorAll(".gallery_item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox_img");
const lightboxCloseBtn = document.querySelector(".lightbox_close");

let galleryImagesList = [
  {
    alt: "Wayne Rooney",
    link: "https://wallpapers.com/images/high/wayne-rooney-feels-the-moment-kg6ulaqmzlwra788.webp",
    category: "manchesterunited",
  },
  {
    alt: "manchester united logo - dark theme",
    link: "https://wallpapers.com/images/high/manchester-united-logo-in-fancy-gold-wxouu61sjlu447vc.webp",
    category: "manchesterunited",
  },
  {
    alt: "manchester united - shirt",
    link: "https://wallpapers.com/images/high/old-trafford-football-stadium-3qa51osx3hdsbp8m.webp",
    category: "manchesterunited",
  },
  {
    alt: "Bruno Fernandes",
    link: "https://wallpapers.com/images/high/bruno-fernandes-manchester-united-number-one-hyz0t082qqbvq89k.webp",
    category: "manchesterunited",
  },
  {
    alt: "Tyrel Malacia",
    link: "https://wallpapers.com/images/high/tyrell-malacia-spotlight-nfzoioq8mix90a2n.webp",
    category: "manchesterunited",
  },
  {
    alt: "Liverpool Logo",
    link: "https://wallpapers.com/images/high/liverpool-fc-sports-logo-cenbmamoxetw11h1.webp",
    category: "liverpool",
  },
  {
    alt: "Liverpool logo - Background red",
    link: "https://wallpapers.com/images/high/liverpool-4k-logo-on-leather-background-zb4yi00jiysvdouv.webp",
    category: "liverpool",
  },
  {
    alt: "Mo Salah",
    link: "https://wallpapers.com/images/high/m-salah-from-liverpool-4k-pvlwt82bko9mvwno.webp",
    category: "liverpool",
  },
  {
    alt: "Arsenal logo",
    link: "https://wallpapers.com/images/high/arsenal-flag-on-red-silk-8jyyntvf1mfue642.webp",
    category: "arsenal",
  },
  {
    alt: "Granit Xhaka",
    link: "https://wallpapers.com/images/high/granit-xhaka-amused-x0psxug9by826chf.webp",
    category: "arsenal",
  },
  {
    alt: "Arsenal logo - Crest",
    link: "https://wallpapers.com/images/high/arsenal-fc-breastplate-logo-k9e1399n2w0ta4o7.webp",
    category: "arsenal",
  },
  {
    alt: "Manchester City - logo",
    link: "https://wallpapers.com/images/high/manchester-city-logo-checker-plate-f8m9lur6pwqxtd33.webp",
    category: "manchestercity",
  },
  {
    alt: "Manchester City Stadium",
    link: "https://wallpapers.com/images/high/manchester-city-black-stadium-logo-m61ch2c9mel1nw8r.webp",
    category: "manchestercity",
  },
  {
    alt: "Sergio Aguero",
    link: "https://wallpapers.com/images/high/manchester-city-sergio-aguero-game-cflcx8k488n54iuc.webp",
    category: "manchestercity",
  },
];

body.onload = function () {
  filterImagesBasedOnCategory();
};

const toogleTheme = (e) => {
  if (e.checked) {
    document.documentElement.style.setProperty("--bg-color", "#000000");
    document.documentElement.style.setProperty("--box-color", "#828282");
    document.documentElement.style.setProperty("--main-color", "#000000");
    document.documentElement.style.setProperty(
      "--theme-border",
      "1px solid wheat"
    );
    document.documentElement.style.setProperty("--theme-text-color", "#ffffff");
  } else {
    document.documentElement.style.setProperty("--bg-color", "#e0e2fc");
    document.documentElement.style.setProperty("--box-color", "#a9ade3");
    document.documentElement.style.setProperty("--main-color", "#4C57D5");
    document.documentElement.style.setProperty("--theme-border", "unset");
    document.documentElement.style.setProperty("--theme-text-color", "#000000");
  }
};

const filterImagesBasedOnCategory = (filterValue = "all") => {
  galleryImagesList.forEach((item) => {
    if (filterValue === "all" || filterValue == item.category) {
      let divElement = document.createElement("div");
      divElement.classList.add("gallery_item");
      divElement.setAttribute("aria-label", item.alt);
      let imgElement = document.createElement("img");
      imgElement.src = item.link;
      imgElement.alt = item.alt;
      imgElement.addEventListener("click", (e) => {
        let imgSrc = e.target.getAttribute("src");
        divElement.classList.add("active-img");
        lightboxImg.setAttribute("src", imgSrc);
        lightboxImg.setAttribute("aria-label",item.alt)
        lightboxImg.setAttribute("alt",item.alt)
        lightbox.classList.add("open");
        body.classList.add("overflow_hide");
      });
      divElement.append(imgElement);
      document
        .querySelector("#gallery-image-container")
        .appendChild(divElement);
    }
  });
};

galleryTabs.forEach((currTab) => {
  currTab.addEventListener("click", (e) => {
    document.querySelector("#gallery-image-container").innerHTML = "";
    // removing the existing 'active' class from the tabs.
    e.target.parentElement.querySelector(".active").classList.remove("active");

    // adding the 'active' class to the currently clicked tab.
    e.target.classList.add("active");

    let filterValue = e.target.getAttribute("data-filter");
    filterImagesBasedOnCategory(filterValue);
  });
});

/*------- Lightbox functionality -------*/

galleryImgs.forEach((currImg) => {
  currImg.addEventListener("click", (e) => {
    let imgSrc = e.target.getAttribute("src");

    lightboxImg.setAttribute("src", imgSrc);

    lightbox.classList.add("open");
    body.classList.add("overflow_hide");
  });
});

// Function for closing the Lightbox
const lightboxClose = () => {
  let currentActiveImg = document
    .querySelector("#gallery-image-container")
    .querySelector(".active-img");
  currentActiveImg.classList.remove("active-img");
  lightbox.classList.remove("open");
  body.classList.remove("overflow_hide");
};

// closing the lightbox on clicking the lightboxClose btn.
lightboxCloseBtn.addEventListener("click", lightboxClose);

// closing the lightbox on clicking outside of it.
window.addEventListener("click", (e) => {
  if (e.target.className === "lightbox-container") {
    lightboxClose();
  }
});


window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightboxClose();
  }
});

// Left / Right arrow -> nextSibling / previousSibling event 
window.addEventListener("keydown", (e) => {
  if (lightboxImg.getAttribute("src"))
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      let currentActiveImg = document
        .querySelector("#gallery-image-container")
        .querySelector(".active-img");
      let nextImageSelectedParent =
        e.key === "ArrowRight"
          ? currentActiveImg.nextSibling
          : currentActiveImg.previousSibling;
      if (nextImageSelectedParent) {
        let imgSrc =
          nextImageSelectedParent.firstElementChild.getAttribute("src");
        nextImageSelectedParent.classList.add("active-img");
        lightboxImg.setAttribute("src", imgSrc);
        lightboxImg.setAttribute("aria-label", nextImageSelectedParent.firstElementChild.getAttribute("alt"));
        lightbox.classList.add("open");
        body.classList.add("overflow_hide");
        currentActiveImg.classList.remove("active-img");
      }
    }
});
