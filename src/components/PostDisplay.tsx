
// import { useSelector, useDispatch } from "react-redux";
// import { fetchPost } from "../features/postSlice";
// import { RootState, AppDispatch } from "../store";
// import { useEffect } from "react";


// const PostDisplay = () => {

//     const dispatch = useDispatch<AppDispatch>();
//     const { post, loading, error } = useSelector((state: RootState) => state.post)
//     console.log(post);
    
//     useEffect(() => {
//         dispatch(fetchPost())
//       }, [dispatch]);

//     return (
//         <div>
//             {/* <button onClick={() => dispatch(fetchPost())} disabled={loading}>
//                 {loading ? 'Loading...' : 'Fetch Post'}
//             </button> */}
//             {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//             {post && (
//                 <>
//                     <div>
//                         <h3>{post.title}</h3>
//                         <p>{post.body}</p>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default PostDisplay;