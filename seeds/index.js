const mongoose=require('mongoose');
const cities=require('./cities')
const {places,descriptors}=require('./seedHelpers')
const Campground=require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

    const sample=(array) => array[Math.floor(Math.random()*array.length)]
    
  

    const seedDB =async()=>{
      await Campground.deleteMany({})
      for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10
        const camp =new Campground({
          // YOUR USER ID
          author:'65466defaf0b71b00c2c978a',
          location:`${cities[random1000].city},${cities[random1000].state}`,
          title:`${sample(descriptors)} ${sample(places)}`,
          description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio vel asperiores, suscipit commodi veritatis magnam mollitia placeat odit fugiat. Vitae alias voluptas laudantium fugiat ipsam vero labore sequi tempore aliquam.',
          price,
          geometry:{
            type: "Point",
            coordinates:[
              cities[random1000].longitude,
              cities[random1000].latitude,]
          },
          images:[
            {
              url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              filename: 'YelpCamp/qjhjsyw8vzmplhjjwnfz',
            }
          ]
        })
        await camp.save();
      }
    }
    seedDB().then(()=>{
      mongoose.connection.close()
    })