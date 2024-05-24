const createBookTableQuery = `
CREATE TABLE IF NOT EXISTS Books (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  Title VARCHAR(255) NOT NULL,
  Author VARCHAR(255) NOT NULL,
  ISBN VARCHAR(50) NOT NULL,
  PublishedDate DATE NOT NULL
);
`;
module.exports = createBookTableQuery;