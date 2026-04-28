require('dotenv').config();
const mongoose = require('mongoose');
const { User, Chef, Booking, Notification } = require('./models');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  await Promise.all([User.deleteMany({}), Chef.deleteMany({}), Booking.deleteMany({}), Notification.deleteMany({})]);

  // Admin
  const admin = await User.create({ name: 'Admin', email: 'admin@chefkart.com', password: 'Admin@123', role: 'admin' });
  console.log('✅ Admin:', admin.email);

  // Customer
  const user = await User.create({ name: 'John Doe', email: 'user@chefkart.com', password: 'User@123', role: 'user', phone: '9876543210', address: 'Bangalore' });
  console.log('✅ User:', user.email);

  // Chefs
  const chefsData = [
    { name:'Priya Sharma', email:'priya@chefkart.com', cuisines:['South Indian','North Indian'], specialties:['Biryani','Dosas','Sambar'], dishes:[{name:'Chicken Biryani',description:'Authentic Hyderabadi dum biryani',price:350,prepTime:'60 mins',isVeg:false},{name:'Masala Dosa',description:'Crispy dosa with spiced potato filling',price:120,prepTime:'20 mins',isVeg:true}], experience:8, hourly:600, location:'Bangalore', bio:'Passionate chef with 8 years crafting authentic South Indian flavors.' },
    { name:'Rahul Mehta', email:'rahul@chefkart.com', cuisines:['Mughlai','Continental'], specialties:['Kebabs','Pasta','Grills'], dishes:[{name:'Seekh Kebab',description:'Juicy minced lamb kebabs from the tandoor',price:280,prepTime:'40 mins',isVeg:false},{name:'Pasta Arrabbiata',description:'Spicy tomato pasta with fresh herbs',price:220,prepTime:'25 mins',isVeg:true}], experience:5, hourly:800, location:'Mumbai', bio:'Trained in 5-star hotels, bringing gourmet meals to your home.' },
    { name:'Anita Nair', email:'anita@chefkart.com', cuisines:['Kerala','South Indian'], specialties:['Seafood','Appam','Stew'], dishes:[{name:'Kerala Fish Curry',description:'Coconut milk-based fish curry with kodampuli',price:380,prepTime:'45 mins',isVeg:false},{name:'Appam with Stew',description:'Lacy rice pancakes with vegetable stew',price:180,prepTime:'30 mins',isVeg:true}], experience:10, hourly:700, location:'Kochi', bio:'Kerala cuisine specialist with traditional recipes from generations.' },
    { name:'Sanjay Gupta', email:'sanjay@chefkart.com', cuisines:['Rajasthani','Gujarati'], specialties:['Dal Baati','Thepla','Kadhi'], dishes:[{name:'Dal Baati Churma',description:'Traditional Rajasthani comfort food',price:300,prepTime:'90 mins',isVeg:true},{name:'Gatte Ki Sabji',description:'Gram flour dumplings in spicy yogurt gravy',price:200,prepTime:'35 mins',isVeg:true}], experience:6, hourly:500, location:'Jaipur', bio:'Authentic Rajasthani flavors with a modern twist.' },
    { name:'Meena Patel', email:'meena@chefkart.com', cuisines:['Chinese','Thai','Continental'], specialties:['Stir Fry','Noodles','Curries'], dishes:[{name:'Pad Thai',description:'Classic Thai noodles with tamarind sauce',price:250,prepTime:'20 mins',isVeg:false},{name:'Kung Pao Chicken',description:'Spicy Sichuan stir fry with peanuts',price:290,prepTime:'25 mins',isVeg:false}], experience:4, hourly:650, location:'Delhi', bio:'Asian cuisine expert bringing restaurant flavors home.' },
    { name:'Vikram Iyer', email:'vikram@chefkart.com', cuisines:['North Indian','Punjabi'], specialties:['Butter Chicken','Naan','Tandoori'], dishes:[{name:'Butter Chicken',description:'Creamy tomato-based chicken curry',price:320,prepTime:'45 mins',isVeg:false},{name:'Paneer Tikka Masala',description:'Smoky cottage cheese in rich masala',price:280,prepTime:'40 mins',isVeg:true}], experience:7, hourly:750, location:'Chandigarh', bio:'Punjabi food lover making every meal a celebration.' }
  ];

  for (const d of chefsData) {
    const u = await User.create({ name:d.name, email:d.email, password:'Chef@123', role:'chef' });
    await Chef.create({
      userId:u._id, bio:d.bio, cuisines:d.cuisines, specialties:d.specialties,
      dishes:d.dishes, experience:d.experience, pricing:{ hourly:d.hourly, daily:d.hourly*6 },
      location:d.location, rating:+(3.5+Math.random()*1.5).toFixed(1),
      totalReviews:Math.floor(Math.random()*50)+5, isVerified:true, isAvailable:true,
      availability:['Mon','Tue','Wed','Thu','Fri','Sat'].map(day=>({ day, from:'09:00', to:'18:00' }))
    });
    console.log('✅ Chef:', d.name);
  }

  console.log('\n🎉 Seed complete!\n');
  console.log('Admin:  admin@chefkart.com  / Admin@123');
  console.log('User:   user@chefkart.com   / User@123');
  console.log('Chef:   priya@chefkart.com  / Chef@123\n');
  process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
