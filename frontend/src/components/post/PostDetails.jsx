import PropTypes from "prop-types";
import { usePosts } from '../../context/PostContext';

//post details component to display individual post

export function PostDetails() {
  const { postId } = useParams();
  const { loading, error, fetchPostById } = usePosts();
  const [post, setPost] = useState(null);

  useEffect (() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    fetchPost();
  }, [postId]);

  if (loading) {return <div>Loading...</div>};
  if (!post) {return <div>Post not found...</div>};

  return (
    //make the formatting better (MVP as of now)
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-lato text-3xl text-black">{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>
        <strong>Published:</strong> {post.date}
      </p>
    </div>
  );
}

PostDetails.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
