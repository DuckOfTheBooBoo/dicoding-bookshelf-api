/**
 * @param {Object} object
 */
function objectHasItems(object) {
  return Object.keys(object).length > 0;
}

function bookFilter(arrayOfBooks) {
  return arrayOfBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
}

module.exports = { objectHasItems, bookFilter };
