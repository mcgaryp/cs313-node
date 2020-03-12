var bookModel = require('./bookModel.js');
 
function handleBookList(request, response) {
	console.log("Returning the book list");
 
	bookModel.getAllBooks(function(error, result) {
		response.json(result);
	});
}
 
function handleSingleBook(request, response) {
	var id = request.params.id;
 
	console.log("Returning details for book: " + id);
 
	var result = bookModel.getBook(id);
	response.json(result);
}
 
 
module.exports = {
	handleBookList: handleBookList,
	handleSingleBook: handleSingleBook
};
