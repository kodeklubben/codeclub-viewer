const microbitIframeId = "makecoderenderer";
let language;
const getMicrobitSnippets = () =>
  Array.from(document.getElementsByClassName("microbit"));

const renderSpinner = () => {
  const pres = [...document.getElementsByTagName("pre")];
  for (let pre of pres) {
    if ([...pre.childNodes][0].className === "python") return;
    pre.style.display = "none";
    let img = document.createElement("img");
    img.id = "spinner";
    img.src = require("../assets/graphics/spinner.gif");
    img.alt = "Spinner";
    img.width = "50";
    img.height = "50";
    img.style.maxWidth = "100%";
    img.style.display = "block";
    img.style.margin = "0 auto 15px";
    pre.parentElement.insertBefore(img, pre);
  }
};

/**
 * Creates an iframe that is being used to render the code
 * @param {object} language Lesson language
 */
const createIframe = language => {
  const microbitLanguages = {
    // Taken from https://support.crowdin.com/api/language-codes/
    da: "da", // Danish
    de: "de", // German
    el: "el", // Greek
    en: "en", // English
    es: "es-ES", // Spanish
    fi: "fi", // Finnish
    fr: "fr", //French
    hu: "hu", // Hungarian
    is: "is", // Icelandic
    it: "it", // Italian
    nl: "nl", // Dutch
    nb: "nb", // Norwegian
    nn: "nn-NO", // Norwegian
    sv: "sv-SE", // Swedish
    tr: "tr" // Turkish
  };
  const f = document.createElement("iframe");
  //f.addEventListener('load', (e) => { console.log('microbit iframe loaded.'); });
  f.id = microbitIframeId;
  f.style.position = "absolute";
  f.style.left = 0;
  f.style.bottom = 0;
  f.style.width = "1px";
  f.style.height = "1px";
  if (language in microbitLanguages) {
    f.src =
      "https://makecode.microbit.org/--docs?render=1&lang=" +
      microbitLanguages[language];
  } else {
    f.src = "https://makecode.microbit.org/--docs?render=1&lang=en";
  }
  document.body.appendChild(f);
  //console.log('iframe created and appended to body');

  window.addEventListener("message", processIframeMessage);
};

const removeIframe = () => {
  window.removeEventListener("message", processIframeMessage);
  document.getElementById(microbitIframeId).remove();
  //console.log('Microbit iframe removed');
};

// Taken from https://makecode.microbit.org/blocks-embed
const renderSnippets = () => {
  getMicrobitSnippets().forEach(pre => {
    const f = document.getElementById(microbitIframeId);
    f.dataset.rendering = +(f.dataset.rendering || 0) + 1; // unary "+" to force string to number
    //console.log('renderSnippets(), snippets currently rendering:', f.dataset.rendering);
    f.contentWindow.postMessage(
      {
        type: "renderblocks",
        id: pre.id,
        code: pre.innerText
      },
      "https://makecode.microbit.org/"
    );
  });
};

/**
 * Creates an image from the rendered microbit code
 * @param {object} msg
 */
const createImage = msg => {
  let img = document.createElement("img");
  img.src = msg.uri;
  img.width = msg.width;
  img.height = msg.height;
  img.style.display = "block";
  img.style.margin = "0 auto 15px";
  img.style.maxWidth = "100%";
  let code = document.getElementsByTagName("pre")[0];
  let spinner = document.getElementById("spinner");
  if (document.body.contains(spinner)) {
    spinner.remove();
  }
  if (typeof code === "undefined") return;
  if (code.className === "microbit") {
    code.parentElement.insertBefore(img, code);
    code.parentElement.removeChild(code);
  }

  // // Check to see if this was the last image. If so, remove iframe.
  // const f = document.getElementById(microbitIframeId);
  // f.dataset.rendering = +f.dataset.rendering - 1; // unary "+" to force string to number
  // //console.log('createImage(), snippets currently rendering:', f.dataset.rendering);
  // if (f.dataset.rendering <= 0) {
  //   removeIframe();
  // }
};

const processIframeMessage = e => {
  let msg = e.data;
  if (msg.source === "makecode") {
    //console.log('processIframeMessage, e.data.type:', msg.type);
    if (msg.type === "renderready") {
      renderSnippets();
    } else if (msg.type === "renderblocks") {
      createImage(msg);
      removeIframe();
      createIframe(language);
    }
  }
};

export const renderMicrobit = lang => {
  language = lang;
  if (getMicrobitSnippets().length > 0) {
    renderSpinner();
    createIframe(lang);
  }
};
