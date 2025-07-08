import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

function BlogPage() {
  const posts = useLoaderData();

  return <PostList posts={posts} />;
}

export default BlogPage;
