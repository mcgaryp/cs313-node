const { Pool } = require("pg")
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString: connectionString })

function getAllBooks(callback) {

	// var result = {
	// 	status: "success",
	// 	books: [
	// 		{ id: 1, title: "The Holy Bible" },
	// 		{ id: 2, title: "The Book of Mormon" },
	// 		{ id: 3, title: "The Pearl of Great Price" },
	// 		{ id: 4, title: "The Doctrine and Covenants" }
	// 	]
	// }
	const query = "SELECT * FROM class_10_book;"
	pool.query(query, (error, result) => {
		if (result) {
			console.log(result.rows)
			callback(null, result)
			return
		}
		console.log(error)
		callback(error, null)
	})
}

function getBook(id, callback) {

	var result = null
	
	getAllBooks((error, data) => {
		if (error == null) {
			books = data.books
			result = books.find((value) => {
				return value.id == id
			})

			callback(null, result)
		}

		callback("There was an error", null)
	})
}

function createBook(title) {

}

module.exports = {
	getAllBooks: getAllBooks,
	getBook: getBook,
	createBook: createBook
};


// class_10_book