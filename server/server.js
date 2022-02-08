require('dotenv').config()

const express = require("express");
const cors = require("cors");
const db = require("./db/index.js");

const morgan = require("morgan");


const app = express();

app.use(cors());
app.use(express.json());

// get all restaurents
app.get("/api/v1/restaurents", async(req, res) => {
    try {
        //const result = await db.query('select  *  from restaurents');
        const restaurentRatingData =await db.query('select * from restaurents left join(select restaurent_id,count(*) as no_ofrating ,trunc(avg(rating),1) as average_rating from reviews  group  by restaurent_id) reviews on restaurents.id = reviews.restaurent_id');
        //console.log("results",result);
       //console.log("restaurentData",restaurentRatingData);
        res.status(200).json({
            status: "success",
            result: restaurentRatingData.rows.length,
            data: {
                restaurent: restaurentRatingData.rows,

            },
        });
    } catch (err) {
        console.log(err);
    }
});
// get one restaurent
app.get("/api/v1/restaurents/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        const restaurent = await db.query(" select * from restaurents left join(select restaurent_id,count(*) as no_ofrating  ,trunc(avg(rating),1) as average_rating from reviews  group  by restaurent_id) reviews on restaurents.id=reviews.restaurent_id where  id= $1 ", [req.params.id]);
        console.log(restaurent);
        const reviews = await db.query(" select * from reviews where restaurent_id = $1 ", [req.params.id]);

 
        res.status(200).json({
            status: "sucess",
            data: {
                restaurent : restaurent.rows[0],
                reviews :reviews.rows
            },
        });
    } catch (err) {
        console.log(err);
    }
});

// create a restaurent
app.post("/api/v1/restaurents", async(req, res) => {
    console.log(req.body);
    try {
        const result = await db.query("insert into restaurents (name,location,price_range) values($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(result);
        res.status(201).json({
            status: "sucess",
            data: {
                restaurent: result.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//update restaurent
app.put("/api/v1/restaurents/:id", async(req, res) => {
    console.log(req.params.id);
    try {
        const result = await db.query("update restaurents set name =$1 ,location=$2,price_range=$3 where id =$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(result);
        res.status(200).json({
            status: "sucess",
            data: {
                restaurent: result.rows[0],
            },
        });


    } catch (err) {
        console.log(err);

    }

    console.log(req.params.id);
    console.log(req.body);
});

//delete restaurent
app.delete("/api/v1/restaurents/:id", async(req, res) => {
    try {
        const result = await db.query("delete from restaurents where id = $1", [req.params.id]);
        res.status(204).json({
            status: "sucess",
        });

    } catch (err) {
        console.log(err);
    }
});
app.post("/api/v1/restaurents/:id/addReview" , async (req,res) => {
try{
        const newReview= await  db.query("insert into reviews (restaurent_id ,name ,review ,rating) values ($1,$2,$3,$4) returning *",[req.params.id , req.body.name , req.body.review, req.body.rating]
        );
        res.status(201).json({
            status : "sucess",
            data  : {
                review :newReview.rows[0],
            },
        });
}catch(err){
    console.log(err)
}  
});



console.log("test");
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('app is listening to port %d', (port));
});