import React, { useContext, useState } from 'react'
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentsContext';

const AddRestaurent = () => {   
    const {addRestaurents} = useContext(RestaurentsContext)
    const [name,setName] = useState("");
    const [location,setLocation] =useState("");
    const [priceRange,setPriceRange] =useState("Price range");
    const handleSubmit  = async (e) => {
        e.preventDefault()
        try{
           const response= await RestaurentFinder.post("/",{
                name,
                location,
                price_range:priceRange
            });
            addRestaurents(response.data.data.restaurent);
            console.log(response);
        }catch(err)
        {

        }



    }




    return (
        <div className='mb-4'>
            <form action=''>
                <div className='form-row'>
                    <div className='col'>
                        <input value = {name} onChange={(e)=>setName(e.target.value)} classname="form-control" type="text" placeholder='name'/>
                    </div>
                    <br></br>
                    <div className ='col'  >
                        <input value = {location} onChange={(e)=>setLocation(e.target.value)}  className='form-control-width:50%' type='text' placeholder='location'/>
                    </div>
                    
                    <br></br>
                    <div className='col'>
                        <select value = {priceRange} onChange={(e)=>setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                            <option disabled >Price range</option>
                            <option value='1'>$</option>
                            <option value='2'>$$</option>
                            <option value='3'>$$$</option>
                            <option value='4'>$$$$</option>
                            <option value='5'>$$$$$</option>
                        </select>
                    </div>
                    <br></br>
                    <button onClick={handleSubmit} type="submit" className='btn btn-primary'> add</button>
                   </div>
            </form>
            
        </div>
    )
}

export default AddRestaurent
