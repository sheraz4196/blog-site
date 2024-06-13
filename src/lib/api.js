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
    const data = await client.getEntries(query);
    return data;
  } catch (error) {
    handleErrors(error, "Error fetching entries");
  }
};

const validateData = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (error) {
    handleErrors(error, "Validation error");
    return null;
  }
};

export const getFilteredBlogs = async (field, id) => {
  const post = await getEntries({
    content_type: "blogPost",
    [`fields.${field}.sys.id`]: id,
  });
  if (post?.items) return post?.items;
  console.log(`Error getting Blog Post.`);
};

export const getPagesData = async (contentType, setData) => {
  const data = await getEntries({
    content_type: contentType,
    order: "-sys.createdAt",
  });
  if (data) {
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
    console.log("Posts Data Here======>", post);
    return post.items;
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

export async function searchBlogsData(search) {
  if (!search?.length) {
    return [];
  }
  const url = `${process.env.BLOG_SITE_BASE_URL}/spaces/${spaceId}/entries?content_type=blogPost&query=${search}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }
    const data = await response.json();
    const posts = data.items || [];
    return posts;
  } catch (error) {
    handleErrors(error, "Error Fetching Posts");
    return [];
  }
}
