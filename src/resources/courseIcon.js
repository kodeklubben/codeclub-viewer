// lessonSrc/*/logo-black.png
export const iconContext =
  require.context('lessonSrc/', true, /^[.][/][^/]+[/]logo-black[.]png$/);

export const getCourseIcon = (course) => {
  const path = `./${course}/logo-black.png`;
  return iconContext.keys().includes(path) ? iconContext(path) : null;
};
