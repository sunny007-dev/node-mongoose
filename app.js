const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/sunnyDB")
    .then(() => console.log("connected successfully !"))
    .catch((err) => console.log("Some error found"));


const mySchema = new mongoose.Schema({
    name: { type: String, required: true },
    qualification: String,
    occupation: String,
    age: Number,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
});

const Mylist = new mongoose.model("Sunnydata", mySchema);

/**
 * Create/Insert collection of data
 */
const createData = async () => {
    try {
        //create single document
        // const newList = new Mylist({
        //     name:"Anshul",
        //     qualification: "B-tech",
        //     occupation: "Manager",
        //     age: 25,
        //     active: true
        // });
        // const result = await newList.save();
        // console.log(result);

        //create Many documents 
        const seoList = new Mylist({
            name: "Rahul",
            qualification: "B-tech",
            occupation: "SEO",
            age: 32,
            active: true
        });
        const fullStachList = new Mylist({
            name: "Ranjeet",
            qualification: "MCA",
            occupation: "Team Lead",
            age: 34,
            active: true
        });
        const graphicList = new Mylist({
            name: "Surya",
            qualification: "Mass-comm",
            occupation: "Graphic Designer",
            age: 28,
            active: false
        });
        const result = await Mylist.insertMany([seoList, fullStachList, graphicList]);
        console.log(result);
    } catch (err) {
        console.log(err)
    }
}

// createData();

/**
 * Read/Fetch data from documents
 */
const getData = async () => {
    try {
        /**
         * Comparison Query operator
         */
        // const result = await Mylist.find({"age": {$gt:28}});
        // const result = await Mylist.find({"age": {$gte:28}});
        // const result = await Mylist.find({"age": {$lt:28}});
        // const result = await Mylist.find({"age": {$lte:28}});
        // const result = await Mylist.find({age: {$in: [25, 32]}});
        // const result = await Mylist.find({age: {$nin: [25, 32]}});
        /**
         * Logical Query operator
         */
        // const result = await Mylist.find({$and:[{age:26}, {qualification:"MCA"}]});
        // const result = await Mylist.find({$or:[{age:26}, {qualification:"MCA"}]});
        // const result = await Mylist.find({"age": {$gt:28}});
        // const result = await Mylist.find({"age": {$not: {$gt:28}}});

        /**
         * Count and Sorting Query
         */
        // const result = await Mylist.find().count();
        // const result = await Mylist.find({age: {$gte: 28}}).count();
        const result = await Mylist.find({qualification: "MCA"}).select({_id:0, qualification:0}).sort({name: -1})
        // const result = await Mylist.find({qualification: "MCA"}).select({_id:0, qualification:0}).sort({name: 1})

        console.log(result);
    }catch(error) {
        console.log(error)
    }
}
// getData();

/**
 * Update data Document
 */
const updateDoc = async () => {
    try{
        const result  = await Mylist.findByIdAndUpdate({_id: "6416fd27a2a0db6d564935ac"} , {$set: {occupation: "Project lead"}}, {new:true})
        console.log(result);
    }catch(error) {
        console.log(error);
    }
}

updateDoc();