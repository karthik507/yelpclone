import React, { useState } from 'react'
import RestaurentFinder from "../apis/RestaurentFinder"
import {useLocation, useParams,useNavigate, Navigate} from 'react-router-dom'

const AddReview = () => {
    const {id}  = useParams();
    const history = useNavigate();
    console.log(id);
    const [name,setName] = useState("");
    const [reviewText,setReviewText]= useState("");
    const [rating,setRating] = useState("")

    const handleSubmitReview = async (e) =>{
        //e.preventDefault();
        const response = await RestaurentFinder.post(`/${id}/addReview`,{
            name,
            review : reviewText,
            rating,
        });
        history("/");
        history("/");

        /* console.log(response); */
    };
    return (
        <div className='mb-2'>
            <form action=''>
                <div className='form-row'>
                    <div className='form-group col-8'>
                        <label htmlFor='name'>Name</label>
                        <input value={name} onChange={(e)  => setName(e.target.value)} id='name' placeholder='name' type='text' className='form-control'/>
                    </div>
                    <br></br>
                    <div className="form-group col-4">
                        <label htmlFor='rating'>Rating</label><br></br>
                        <select  value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className='custom-select'>
                            <option disabled>Rating</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                </div>
                <br></br>
                <div className='form-group'>
                    <label  htmlFor='Review'>Review</label>
                    <textarea  value={reviewText} onChange={(e) => setReviewText(e.target.value)} id="Review" className='form-control'></textarea>
                </div>
                <br></br>
              <button type='submit' onClick={handleSubmitReview} className ="btn btn-primary">Submit </button>
            </form>
        </div>
    )
}

export default AddReview
