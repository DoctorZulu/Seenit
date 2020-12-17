// require mongoose
const mongoose = require("mongoose");

// schema
const postSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
        category: { type: String, required: true},
        comments: [
            {
                body: { type: String, required: true},
                author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
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
