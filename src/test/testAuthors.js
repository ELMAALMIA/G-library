import AuthorService from '../services/authorService.js';

function testAuthorService() {
    const authorService = new AuthorService();

    // Open the connection and return the promise chain
    return authorService.conexion()
        .then(() => {
            console.log("Testing select:");
            return authorService.select();
        })
        .then(() => {
            console.log("Testing insert:");
            const newAuthor = {
                "Au_ID": 16995919,
                "Author": "EL MAALMI",
                "Year_Born": 2001
            };
            return authorService.insert(newAuthor);
        })
        .then(() => {
            console.log("Testing findById:");
            return authorService.findById(31,'Au_ID'); // Replace with a valid ID
        })
        .then(() => {
            console.log("Testing update:");
            return authorService.update({ Author: "NEW NAME" }, 1,"Au_ID"); // Update with a valid ID
        })
        .then(() => {
            console.log("Testing remove:");
            return authorService.remove(10,'Au_ID'); // Remove with a valid ID
        })
        .finally(() => {
            console.log("Closing connection...");
            return authorService.close(); // Ensure to close the connection at the end
        });
}

// Run tests and handle errors
testAuthorService()
    .catch(err => console.error("Test Error:", err));
