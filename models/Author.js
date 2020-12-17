
const mongoose = require("mongoose");


const authorSchema = new mongoose.Schema(
	{
		name: {type: String, required: [true, "You must provide a name property"],},
        articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
        comments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true,
	}
);

// model
const Author = mongoose.model("Author", authorSchema);

//export
module.exports = Author;
