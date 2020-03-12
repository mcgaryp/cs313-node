function getAllBooks(callback) {
 
	var result = {
		status:"success",
		books: [{id:1, title:"The Holy Bible"},
			    {id:2, title:"The Book of Mormon"},
			    {id:3, title:"The Pearl of Great Price"},
			    {id:4, title:"The Doctrine and Covenants"}]
	};
 
	callback(null, result);
}
 
function getBook(id) {
	var result = {id: id, title: "The Holy Bible"};
	return result;
}
 
function createBook(title) {
}
 
module.exports = {
	getAllBooks: getAllBooks,
	getBook: getBook,
	createBook: createBook
};
