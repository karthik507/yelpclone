import React from "react";
import AddRestaurent from "../component/AddRestaurent";
import Header from "../component/Header";
import RestaurentList from "../component/RestaurentList";

const Home = () => {
    return (
    <div>
        <Header/>
        <AddRestaurent/>
        <RestaurentList/>
        </div>
    );
};

export default Home;
