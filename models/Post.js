// require mongoose
const mongoose = require("mongoose");

// schema
const postSchema = mongoose.Schema(
	{
		title: { type: String },
		body: { type: String },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
        category: { type: String},
        comments: [
            {
                commentbody: { type: String},
                commentauthor: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
            }
        ]
	},
	{
		timestamps: true,
	}
);

// model
const Post = mongoose.model("Post", postSchema);

//export
module.exports = Post;
