import hljs from 'highlight.js';

export default function (code, lang) {
  if (lang === 'blocks') {
    // set class on pre, to avoid background coloring of scratch code
    // rendering to SVG is done client-side in Lesson component
    return `<pre class="blocks">${code}</pre>`;
  }

  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, code).value;
    } catch (err) { /* try next */ }
  }

  try {
    return hljs.highlightAuto(code).value;
  } catch (err) {
    return '';
  }
}
