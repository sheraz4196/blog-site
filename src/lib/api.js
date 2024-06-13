import { BlogPostSchema } from "@/schemas/zodTypes";

const contentful = require("contentful");
const spaceId = process.env.NEXT_PUBLIC_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
  host: process.env.CONTENTFUL_HOST,
});

const handleErrors = (error, message) => {
  console.error(`${message}:`, error);
};
const getEntries = async (query) => {
  try {
    const filterQuery = {
      ...query,
    };
    const data = await client.getEntries(filterQuery);
    return data;
  } catch (error) {
    handleErrors(error, "Error fetching entries");
  }
};

export const getFilteredBlogs = async (field, id) => {
  const post = await getEntries({
    content_type: "blogPost",
    [`fields.${field}.sys.id`]: id,
  });
  if (post.items) {
    const validatePost = post.items.map((post) => BlogPostSchema.parse(post));
    return validatePost;
  }
  console.log(`Error getting Blog Post.`);
};

export const getPagesData = async (contentType, setData) => {
  const data = await getEntries({
    content_type: contentType,
    order: "-sys.createdAt",
  });
  if (data) {
    console.log("========>", data);
    if (setData) setData(data);
    else return data;
  } else {
    console.log(`Error getting posts for ${contentType}.`);
  }
};
export const getPagesDataWithPagination = async (
  contentType,
  page,
  setData
) => {
  const data = await getEntries({
    content_type: contentType,
    order: "-sys.createdAt",
    skip: (page - 1) * 4, //Correct logic for pagination
    limit: 4,
  });
  if (data) {
    if (setData) setData(data);
    else return data;
  } else {
    console.log(`Error getting posts for ${contentType}.`);
  }
};

export async function getSlugPagData(contentType, slug) {
  const post = await getEntries({
    content_type: contentType,
    "fields.slug": slug,
  });
  if (post.items) {
    const validatePost = post.items.map((post) => BlogPostSchema.parse(post));
    return validatePost;
  }
  console.log(`Error getting post for ${contentType.name}.`);
}

export const getSimilarBlogs = async (excludeSlug) => {
  try {
    const data = await getEntries({
      content_type: "blogPost",
      "fields.slug[ne]": excludeSlug,
      limit: 3,
      order: "-sys.createdAt",
    });

    if (data) {
      return data;
    } else {
      console.log(`No Simialr Blog Post found.`);
    }
  } catch (error) {
    handleErrors(error, "Error getting similar BlogPosts");
  }
};

export async function getFilteredBlogsByTagData(id) {
  return getFilteredBlogs("tags", id);
}
export async function getFilteredBlogsByAuthorData(id) {
  return getFilteredBlogs("authors", id);
}
