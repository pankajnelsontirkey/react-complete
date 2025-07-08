export const postLoader = ({ params }) => {
  const postId = params.id;
  return fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
};
