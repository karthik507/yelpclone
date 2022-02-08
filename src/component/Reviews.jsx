import React from 'react'
import StarRating from './StarRating'
const Reviews = ({reviews}) => {
    return (
            <div className='row row-cols-3 mb-2'>
               {reviews.map((review) => {
                   return(
                    <div key={review.id} className="card text-white bg-success mb-3 mr-4" style={{maxWidth: '30%'},{marginLeft:'5px'},{marginRight:'5px'},{margin:'40px'}}>

                    {/* <div style="margin-left :0 ; padding: 0; " key={review.id} class="card text-white bg-success mb-3" style={{maxWidth: '30%'  }}> */}
                    <div  className='card-header d-flex justify-content-between' >
                    <span>{review.name}</span>
                    <span><StarRating rating={review.rating} /></span>
                </div>
                <div className="card-body">  
                    <p className='card-text'>{review.review}</p>
                </div>  
                </div>
                
                   );
                } )}
                {/* <div class="card text-white bg-success mb-3" style={{maxWidth: '30%'}}>
                    <div className='card-header d-flex justify-content-between'>
                    <span>karthik</span>
                    <span><StarRating rating={3.2} /></span>
                </div>
                <div className="card-body">
                    <p className='card-text'>this is awesome</p>
                </div>
                </div> */}
            </div>
        
    )
}
 
export default Reviews
