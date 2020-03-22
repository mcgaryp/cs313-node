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
			callback(null, result.rows)
			return
		}
		console.log(error)
		callback(error, null)
	})
}

function getBook(id, title, callback) {
	// var result = null

	// getAllBooks((error, data) => {
	// 	if (error == null) {
	// 		books = data.books
	// 		result = books.find((value) => {
	// 			return value.id == id
	// 		})

	// 		callback(null, result)
	// 	}

	// 	callback("There was an error", null)
	// })
	if (id) {
		const query = "SELECT * FROM class_10_book WHERE id = $1::int;"
		const param = [id]

		pool.query(query, param, (error, result) => {
			if (result) {
				console.log(result.rows)
				callback(null, result.rows)
				return
			}
			console.log(error)
			callback(error, null)
		})

		return
	}

	const query = "SELECT * FROM class_10_book WHERE title = $1;"
	const param = [title]

	pool.query(query, param, (error, result) => {
		if (result) {
			console.log(result.rows)
			callback(null, result.rows)
			return
		}
		console.log(error)
		callback(error, null)
	})
}

function createBook(title, callback) {
	const query = "INSERT INTO class_10_book (title) VALUES ($1);"
	const param = [title]
	pool.query(query, param, (error, result) => {
		if (result) {
			console.log(result.rows)
			callback(null, result.rows)
			return
		}
		console.log(error)
		callback(error, null)
	})
}

module.exports = {
	getAllBooks: getAllBooks,
	getBook: getBook,
	createBook: createBook
}


// class_10_book