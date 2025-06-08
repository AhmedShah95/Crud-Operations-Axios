import React, { useState } from 'react'
import { addPost, updatePost } from '../Api/GetApi';
import { useEffect } from 'react';

export const Form = ({data , setData , updateDataApi , setUpdateDataApi}) => {
    const [addData , setAddData] = useState({
        title: '',
        body: ''
    });

    useEffect(() => {
        if (updateDataApi) {
            setAddData({
                title: updateDataApi.title || "", 
                body: updateDataApi.body || ""
            });
        }
    }, [updateDataApi])

   const isEmpty = !updateDataApi || Object.keys(updateDataApi).length === 0;
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const addPostData = async () => {
        const res = await addPost(addData);
        console.log(res);
        if(res.status === 201) {
            setData([...data, res.data]);
            setAddData({
                title: '',
                body: ''
            });
        }
    };

    const updatePostData = async () => {
        try {
            const res = await updatePost(updateDataApi.id, addData);
            console.log(res);
            setData((prev) => {
                return prev.map((curElem) => {
                    return curElem.id === res.data.id ? res.data : curElem;
                });
            });
            setAddData({
                title : "",
                body : ""
            })
            setUpdateDataApi({}); // Reset updateDataApi after successful update
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        const action = e.nativeEvent.submitter.value;
        e.preventDefault();
        if(action === "Add") {
            addPostData();
        } else if(action === "Edit") {
            updatePostData();
        }
    };

    return (
        <>
            <div style={{ maxWidth: '400px', margin: '20px auto' }}>
                <h2>My Form</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="field1">Field 1:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleChange}
                            value={addData.title}
                            style={{ width: '100%', padding: '8px' }}
                            placeholder='Add Tittle'
                        />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="field2">Field 2:</label>
                        <input
                            type="text"
                            id="body"
                            name="body"
                            onChange={handleChange}
                            value={addData.body}
                            placeholder='Add Body'
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        style={{
                            padding: '10px 15px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                        value={isEmpty ? "Add" : "Edit"}
                    >
                        {isEmpty ? "Add" : "Edit"}
                    </button>
                </form>
            </div>
        </>
    );
};