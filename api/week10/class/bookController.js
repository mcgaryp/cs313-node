var bookModel = require('./bookModel.js');

function handleBookList(request, response) {
	console.log("Returning the book list");

	bookModel.getAllBooks(function (error, result) {
		response.json(result);
	});
}

function handleSingleBook(request, response) {
	var id = request.query.id;

	console.log("Returning details for book: " + id);

	bookModel.getBook(id, (error, data) => {
		if (error == null) {
			console.log(data)
			response.json(data);
			return
		}

		console.log(error)
	})
}


module.exports = {
	handleBookList: handleBookList,
	handleSingleBook: handleSingleBook
};
