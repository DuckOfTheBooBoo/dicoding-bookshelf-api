// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');

/**
 * @typedef {Object} Book
 * @property {string} id          - Id of the book.
 * @property {string} name        - Name of the book.
 * @property {number} year        - Year the book published.
 * @property {string} author      - Author of the book.
 * @property {string} summary     - Summary of the book.
 * @property {string} publisher   - Publisher of the book.
 * @property {number} pageCount   - Page count of the book.
 * @property {number} readPage    - Current reading page.
 * @property {boolean} finished   - Finished reading status.
 * @property {boolean} reading    - Currently reading status.
 * @property {Date} insertedAt    - Date of the book were inserted.
 * @property {Date} updatedAt     - Date of the book were updated.
 */
class Book {
  constructor(name, year, author, summary, publisher, pageCount, readPage, reading) {
    this.id = nanoid(16);
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = false;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = this.insertedAt;
  }
}

let books = [];

module.exports = { Book, books };
