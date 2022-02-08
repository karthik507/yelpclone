import React, { useContext, useEffect } from "react";
import  { useParams } from "react-router-dom";
import { RestaurentsContext } from "../context/RestaurentsContext";
import RestaurentFinder from "../apis/RestaurentFinder";
import StarRating from "../component/StarRating";
import Reviews from "../component/Reviews";
import AddReview from "../component/AddReview";
const RestaurentdetailPage = () => {
    const {id}  = useParams();
    const {selectedRestaurent ,setSelectedRestaurent} = useContext(RestaurentsContext);
    useEffect(() => {
        const fetchData =async () => {
            try{
            const response = await RestaurentFinder.get(`/${id}`);


            setSelectedRestaurent(response.data.data)
        }   
            catch(err){
                console.log(err);
            }

        };
        fetchData();
        },[]);

    return <div>{selectedRestaurent && (
                <>
                <h1 className="text-center display-1" >{selectedRestaurent.restaurent.name}</h1>
                <div className="text-center" >
                    <StarRating rating={selectedRestaurent.restaurent.average_rating}/> 
                    <span className="text-warning ml-1">
                    {selectedRestaurent.restaurent.no_ofrating ? `(${selectedRestaurent.restaurent.no_ofrating})`: "(0)" }
                </span> 
                </div>
                <div className="mt-3">
                <Reviews reviews = {selectedRestaurent.reviews}/>
                
                </div>
                <AddReview/>
                </>
    )} </div>;
    
};

export default RestaurentdetailPage;
