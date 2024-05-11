"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [showUpdate, setShowUpdate] = useState(false);
    const [showNotification, setShowNotification] = useState("");

    return (
        <div className='p-4'>
            <div className='flex items-center justify-center'>
                {/* Success Alert */}
                <div role="alert" className={`lg:w-2/5 mb-4 alert alert-success ${showNotification === 'success' ? 'flex' : 'hidden'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{message}</span>
                </div>
                {/* Delete Alert  */}
                <div role="alert" className={`lg:w-2/5 mb-4 alert alert-error ${showNotification === 'error' ? 'flex' : 'hidden'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current shrink-0" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Error! Task failed successfully.</span>
                </div>
            </div>
            <div className='flex items-center justify-center w-full'>
                <button className="btn btn-outline btn-success" onClick={() => setShow(!show)}>{!show ? "Show" : "Hide"}</button>
            </div>
            <div className='flex'>
                <Left show={show} setShowUpdate={setShowUpdate} showUpdate={showUpdate} setShowNotification={setShowNotification} setId={setId} />
                {show && <div className="divider divider-horizontal"></div>}
                {show && <Right setShowNotification={setShowNotification} setMessage={setMessage} />}
                {showUpdate && <div className="divider divider-horizontal"></div>}
                {showUpdate && <Update setShowNotification={setShowNotification} setShowUpdate={setShowUpdate} id={id} setMessage={setMessage} />}
            </div>
        </div>
    )
}

function Left({ show, setShowUpdate, showUpdate, setShowNotification, setId }) {

    const [apiData, setapiData] = useState(null);
    const [pending, setpending] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.ok === false) {
            throw Error("Searching data not found")
          }
          return response.json()
        })
        .then((data) => { setapiData(data); setpending(false) })
        .catch((err) => { setError(err.message) })
    }, []);
    
    const handleEdit = (id) => {
        setShowUpdate(true);
        setId(id);
    }

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
            if (res.status === 200) {
                setShowNotification("error");
                setTimeout(() => {
                    setShowNotification("");
                }, 2000);
            }
        })

    }

    return (
        <div className={show ? "w-3/4" : "w-full"}>
            {!pending && <div className='p-4'>
                <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
                    {
                        apiData.slice(0, 20).map((element) => {
                            return (
                                <>
                                    <div className="shadow-xl card bg-base-100">
                                        <div className="card-body">
                                            <h2 className="card-title">{element.title.split(" ")[0]}</h2>
                                            <p>{element.body}</p>
                                            <div className='flex items-center gap-4 justify-evenly'>
                                                <button className="w-20 btn btn-outline btn-info" onClick={() => { handleEdit(element.id) }}>Edit</button>
                                                <button className="w-20 btn btn-outline btn-error" onClick={() => { handleDelete(element.id) }} >Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>}
        </div>
    )
}

function Right({ setShowNotification, setMessage }) {

    const [data, setData] = useState({
        id: 0,
        title: "",
        body: ""
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, title, body } = data;
        if (id !== "" && title !== "" && body !== "") {
            axios.post("https://jsonplaceholder.typicode.com/posts", data).then((res) => {
                if (res.status === 201) {
                    setMessage('Data has been saved!');
                    setShowNotification("success");
                    setTimeout(() => {
                        setShowNotification("");
                    }, 2000);
                }
                console.log("Res = ", res);
            })
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <h1>Add User</h1>
                <input type="text" placeholder="User title" name='title' className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <input type="text" placeholder="body" name='body' className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <input type="number" placeholder="User id" name='id' className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <button className="btn btn-outline" type='submit'>Submit</button>
            </form>
        </div>
    )
}

function Update({ id, setShowNotification, setShowUpdate, setMessage }) {

    const [data, setData] = useState({
        id: 0,
        title: "",
        body: ""
    });

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
            let individualData = {
                id: res.data.id,
                title: res.data.title,
                body: res.data.body
            }
            setData(individualData);
        }).catch((err) => {
            console.log(err);
        })
    }, [id])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { id, title, body } = data;
        if (id !== 0 && title !== "" && body !== "") {
            axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data).then((res) => {
                if (res.status === 200) {
                    setMessage('Data has been updated!');
                    setShowNotification("success");
                    setTimeout(() => {
                        setShowNotification("");
                    }, 2000);
                }
            })
        }
    }

    return (
        <div >
            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <h1>Update User</h1>
                <input type="text" placeholder="User title" name='title' value={data.title} className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <input type="text" placeholder="body" name='body' value={data.body} className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <input type="number" placeholder="User id" name='id' value={data.id} className="w-full max-w-xs input input-bordered" onChange={handleInput} />
                <button className="btn btn-outline" type='submit'>Update</button>
                <div className='flex items-center justify-center w-full'>
                    <button className="btn btn-circle btn-outline" onClick={() => { setShowUpdate(false) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </form>
        </div>
    )
}