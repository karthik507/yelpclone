import React,{useContext ,useEffect} from 'react'
import RestaurentFinder from '../apis/RestaurentFinder';
import { RestaurentsContext } from '../context/RestaurentsContext';
import { useNavigate} from 'react-router-dom';
import StarRating from './StarRating';

const RestaurentList = (props) => {
    const {restaurents , setRestaurents} = useContext(RestaurentsContext);
    let history =useNavigate();
    useEffect(() =>{
        const fetchData = async()=>{
        try {
            const response = await RestaurentFinder.get("/")
            console.log(response.data.data);
            setRestaurents(response.data.data.restaurent);
        }catch(err)
        {} 
        }; 
        fetchData();
    },[] );

    const handleDelete = async (e,id) => {
        e.stopPropagation();
        try{
        const response  = await RestaurentFinder.delete(`/${id}`);
        console.log(response);
        setRestaurents(restaurents.filter(restaurent => {
            return restaurent.id !== id;
        }));
        }catch(err)
        {console.log(err);
        } 
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history(`/restaurents/${id}/update`);
    };
    const handleRestaurentSelect = (id) => {
        history(`/restaurents/${id}`);
    };
    const renderRating=(restaurent) => {
        if(!restaurent.no_ofrating){
            return <span className='text-warning'>0 reviews</span>
        }

        return (
        <>
        <StarRating rating ={restaurent.id}/>
        <span className='text-warning ml-1'>({restaurent.no_ofrating})</span>
        </>
        )
    }

    return (
        <div className='list-group'>
            <table className='table table-hower table-dark'>
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col'>Restaurent</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price range</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {restaurents && restaurents.map((restaurent)=>{
                     return(
                    <tr onClick={() => handleRestaurentSelect(restaurent.id)} key={restaurent.id}>
                        <td>{restaurent.name}</td>
                        <td>{restaurent.location}</td>  
                            <td>{"$".repeat(restaurent.price_range)}</td>
                            <td>{renderRating(restaurent)}</td>
                            <td><button onClick={(e) => handleUpdate(e ,restaurent.id)} className='btn btn-warning'>Update</button>  </td>
                            <td><button onClick={(e) => handleDelete(e ,restaurent.id)} className='btn btn-danger'>delete</button>  </td>
                    </tr>
                    );
                    })};
                   { /* <tr>
                        <td>pizza</td>
                        <td>hubli</td>
                        <td>$$</td>
                        <td>rating</td>
                        <td><button className='btn btn-warning'>Update</button></td> 
                        <td><button className='btn btn-danger'>delete</button></td><br></br>
                    </tr> */}
                {/* <tr>
                    <td>kfc</td>
                    <td>bengalore</td>
                    <td>$$$</td>
                    <td>rating</td>
                    <td><button className='btn btn-warning'>Update</button></td> 
                    <td><button className='btn btn-danger'>delete</button></td><br></br>
                </tr> */}
                 </tbody>
                
            </table> 
        </div> 
    )
};
export default RestaurentList;
