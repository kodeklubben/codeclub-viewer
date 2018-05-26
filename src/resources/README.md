# Resources
This folder contains all the functions that get data from files in the repository 'oppgaver'.
This is done through the use of webpack's `require.context()` function.

Functions returning lists, always return lists of keys.
If you want the actual items in that list, you have to call a function for getting that item.
That way we can delay the loading of the item as long as possible, and more easily implement code splitting.

