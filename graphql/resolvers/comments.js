const Post = require("../../models/Post");
const { UserInputError, AuthenticationError } = require("apollo-server");
const checkAuth = require("../../utils/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("empty comment", {
          errors: {
            body: "comment body must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    },

    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        const commentIdx = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIdx].username === username) {
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        } else throw new AuthenticationError("aht aht, you cant do that");
      } else throw new UserInputError("comment not found");
    },
  },
};
