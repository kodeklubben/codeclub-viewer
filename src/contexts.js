// NOTE: Putting these contexts in separate files might enable better code splitting.

// lessonSrc/*/logo-black.png
export const iconContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]logo-black[.]png$/);

// lessonSrc/*/index.md
export const courseContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[.]md$/);

// lessonSrc/*/index*.md
export const courseAllLangsContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]index[^.]*[.]md$/);

// lessonSrc/*/playlists/*.txt
export const playlistContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/]playlists[/][^/]*[.]txt$/);

// lessonSrc/*/*/*.md, but not files README.md or README_xx.md where xx is any two letters in lower case
export const lessonContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/](?!README(_[a-z]{2})?[.]md$)[^/]*[.]md$/);

// lessonSrc/*/*/README.md and lessonSrc/*/*/README_xx.md where xx is any two letters in lower case
export const readmeContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/]README(_[a-z]{2})?[.]md$/);

// lessonSrc/*/*/*.md
export const lessonAllContext =
  require.context('lessonSrc/', true, /^[.][/][^/]*[/][^/]*[/][^.]*[.]md$/);
