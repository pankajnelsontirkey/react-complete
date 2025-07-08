import { useLoaderData } from 'react-router-dom';

import PostItem from '../components/PostItem';

function PostPage() {
  const post = useLoaderData();

  return <PostItem post={post} />;
}

export default PostPage;
