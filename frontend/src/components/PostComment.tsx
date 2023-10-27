import React, { useState } from 'react';
import '../assets/css/global.css';
import '../assets/css/PostComment.css';


function PostComment() {


    const [count, setCount] = useState(25);
    const [upvoteStyle, setUpvoteStyle] = useState({ color: '#9D9D9D' });
    const [downvoteStyle, setDownvoteStyle] = useState({ color: '#9D9D9D' });

    const handleUpvote = () => {
        setCount((prevCount) => {
            if (upvoteStyle.color === '#9D9D9D') {
                setUpvoteStyle({ color: '#710808' });
                setDownvoteStyle({ color: '#9D9D9D' });
                return prevCount + 1;
            } else {
                setUpvoteStyle({ color: '#9D9D9D' });
                return prevCount - 1;
            }
        });
    }

    const handleDownvote = () => {
        setCount((prevCount) => {
            if (downvoteStyle.color === '#9D9D9D') {
                setDownvoteStyle({ color: '#710808' });
                setUpvoteStyle({ color: '#9D9D9D' });
                return prevCount - 1;
            } else {
                setDownvoteStyle({ color: '#9D9D9D' });
                return prevCount + 1;
            }
        });
    }


    const [newComment, setNewComment] = useState(''); 
    const [comments, setComments] = useState([
        {
            "first_name": "Kunal",
            "last_name": "Mahato",
            "comment": "This is a great paper!",
            "date": "12-08-2023"
        },
        {
            "first_name": "Kunal",
            "last_name": "Mahato",
            "comment": "This is a great paper!",
            "date": "12-08-2023"
        }
    ]);
    
    const handleAddComment = () => {
        let localFname= (String)(localStorage.getItem('local_first_name')); 
    let localLname= (String)(localStorage.getItem('local_last_name'));
        if (newComment.trim() !== '') {
            const currentDate = formatDate(new Date()); 
            const newCommentObj = {
                "first_name": localFname,
                "last_name": localLname,
                "comment": newComment,
                "date": currentDate,
            };

            setComments([...comments, newCommentObj]);
            setNewComment('');
        }
    }

    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <section>
            <div className="comment">
                <div className="new-comment">
                    <div className="add-comment">
                        <input type="text" className="comment-box" placeholder="Add new comment" onChange={(e) => setNewComment(e.target.value)}/>
                        <i className="fa-solid fa-plus" onClick={handleAddComment}></i>
                    </div>

                    <div className="upvote-downvote">
                        <i
                            className="fa-solid fa-circle-arrow-up"
                            style={upvoteStyle}
                            onClick={handleUpvote}
                        ></i>
                        <i
                            className="fa-solid fa-circle-arrow-down"
                            style={downvoteStyle}
                            onClick={handleDownvote}
                        ></i>
                        <div>{count}</div>
                    </div>
                </div>
                <div style={{height: '29vh', overflow:'auto'}}>
                    {comments.map((item, index) => (
                        <div key={index}>
                            <div className="comment-details">
                                <div className="comment-user">
                                    <div>  <h6>{item.first_name} {item.last_name}</h6> </div>
                                    <div className="comment-date">{item.date}</div>
                                </div>
                                <div className="comment-text">
                                    <p>{item.comment}</p>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PostComment;