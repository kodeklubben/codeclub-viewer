import hljs from 'highlight.js';

export default function (code, lang) {
  if (lang === 'blocks') {
    // replace <> with &lt; and &gt; to keep HTML valid
    let safeCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // put scratchcode in single <pre> to easier find and
    // replace with SVG client side (Lesson component)
    return `<pre class=blocks>${safeCode}</pre>`;
  }

  if (lang === 'microblocks') {
    let safeCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre class=microblocks>${safeCode}</pre>`;
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
