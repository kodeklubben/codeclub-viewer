export default function(state="YAYAYYAYA", action) {
  switch (action.type) {
    case "SET_LANGUAGE_NORWAY":
      return "norway";
    case "SET_LANGUAGE_SWEDEN":
      return "sweden";
    case "SET_LANGUAGE_DENMARK":
      return "denmark";
  }

  return state;
}
