import { useEffect, useState } from 'react';
import { deletePost, getPosts } from './Api/GetApi';
import './Post.css'; // ✅ Import external stylesheet
import { Form } from './components/Form';

const Post = () => {
    const [data, setData] = useState([]);
    const [updateDataApi, setUpdateDataApi] = useState({})

    const GetApiData = async () => {
        try {
            const res = await getPosts();
            setData(res); // or res.data if needed
        } catch (err) {
            console.error("Failed to fetch data:", err);
        }
    };

    useEffect(() => {
        GetApiData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await deletePost(id);
            if (response.status === 200) {
                const newData = data.filter((curPost) => curPost.id !== id);
                setData(newData);
                console.log("Post deleted successfully");
            }
        }
        catch (err) {
            console.error("Failed to delete post:", err);
        }
    }
    const handleUpdateData = (curElem) => {
        setUpdateDataApi(curElem);
    }

    return (
        <>
            <section>
                <Form data={data}
                    setData={setData}
                    setUpdateDataApi={setUpdateDataApi}
                    updateDataApi={updateDataApi}
                />
            </section>
           <div className="post-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
    <h1 className="post-heading" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>Posts</h1>
    <ol
        className="post-list"
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        }}
    >
        {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
                <li
                    key={id}
                    className="post-item"
                    style={{
                        backgroundColor: '#f9f9f9',
                        padding: '15px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }}
                >
                    <h3 className="post-title" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Title: {title}</h3>
                    <p className="post-body" style={{ fontSize: '1rem', marginBottom: '15px' }}>Body: {body}</p>
                    <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            className="edit-btn"
                            onClick={() => handleUpdateData(curElem)}
                            style={{
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: 'white',
                                backgroundColor: '#4CAF50',
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(id)}
                            style={{
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                color: 'white',
                                backgroundColor: '#f44336',
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            );
        })}
    </ol>
</div>

        </>
    );
};

export default Post;
