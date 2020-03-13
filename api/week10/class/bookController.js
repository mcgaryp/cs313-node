var bookModel = require('./bookModel.js');

function handleBookList(request, response) {
	console.log("Returning the book list");

	bookModel.getAllBooks(function (error, result) {
		if (error || result == null || result.length <= 0) {
			response.status(500).json({ success: false, data: error })
			return
		}
		response.render('./pages/week10/class', { books: result })
	});
}

function handleSingleBook(request, response) {
	var id = request.query.id

	if (id) {
		console.log("Returning details for book: " + id)

		bookModel.getBook(id, null, (error, data) => {
			if (error || result == null || result.length <= 0) {
				response.status(500).json({ success: false, data: error })
				return
			}

			response.render('./pages/week10/class', { books: result })
		})
		return
	}

	var title = request.query.title
	console.log("Returning details for book: " + title)

	bookModel.getBook(null, title, (error, data) => {
		if (error || result == null || result.length <= 0) {
			response.status(500).json({ success: false, data: error })
			return
		}

		response.render('./pages/week10/class', { books: result })
	})
}

function createBook(req, res) {
	var title = request.query.title

	console.log("Adding new book with the title: " + title)

	bookModel.createBook(title, (error, result) => {
		if (result) {
			console.log("We added to the database!")
			return
		}

		console.log("Failed to add to the database")
		response.render('./pages/week10/class', { books: null })
	})
}


module.exports = {
	handleBookList: handleBookList,
	handleSingleBook: handleSingleBook,
	createBook: createBook
};
