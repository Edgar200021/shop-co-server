const fs = require("fs");
const mongoose = require("mongoose");
const Product = require("../dist/models/productModel");
require("dotenv").config({ path: "../.env" });

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

async function addData() {
  try {
    await Product.default.insertMany(products);
    console.log("Add data");
  } catch (error) {
    console.log(error);
  }
}

async function deleteAllData() {
  try {
    await Product.default.deleteMany();
    console.log("Data deleting");
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  try {
    await mongoose.connect(DB);
    console.log("connecting to DB");
    if (process.argv[2] === "--delete") await deleteAllData();
    if (process.argv[2] === "--insert") await addData();
  } catch (err) {
    console.error(err);
  }
})();

//async function deleteAllData() {
//  try {
//    await Product.deleteMany();
//    console.log("success");
//  } catch (error) {
//    console.log(error);

//  }
//}

//if (process.argv[2] === "--delete") deleteAllData();

//const product = [{
//    "title": "Denim Bermuda Shorts",
//    "price": 28.99,
//    "description": "Denim Bermuda shorts for a laid-back and cool style.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "shorts"
//  },
//  {
//    "title": "Bohemian Maxi Dress",
//    "price": 39.99,
//    "description": "Bohemian maxi dress for a free-spirited and feminine look.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Casual Linen Shirt",
//    "price": 47.99,
//    "description": "Casual linen shirt for a comfortable and breathable feel.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Vintage Logo Pullover",
//    "price": 28.99,
//    "description": "Pullover with a vintage logo for a retro-inspired style.",
//    "discount": 15,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#f1c40f", "#2c3e50", "#3498db"],
//    "category": "sweater"
//  },
//  {
//    "title": "High-Waisted Flare Jeans",
//    "price": 64.99,
//    "description": "High-waisted flare jeans for a trendy and flattering look.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2c3e50", "#f39c12", "#3498db"],
//    "category": "jeans"
//  },
//  {
//    "title": "Hooded Utility Jacket",
//    "price": 49.99,
//    "description": "Hooded utility jacket for a practical and stylish outerwear option.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e67e22", "#d35400", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Floral Print Midi Dress",
//    "price": 36.99,
//    "description": "Midi dress with a floral print for a versatile and chic style.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#3498db", "#2ecc71", "#e74c3c"],
//    "category": "dress"
//  },
//  {
//    "title": "Cargo Jogger Shorts",
//    "price": 32.99,
//    "description": "Cargo jogger shorts for a comfortable and casual look.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#2ecc71", "#3498db", "#9b59b6"],
//    "category": "shorts"
//  },
//  {
//    "title": "Premium Leather Biker Jacket",
//    "price": 89.99,
//    "description": "Experience the epitome of style with our Premium Leather Biker Jacket. Crafted from high-quality leather, this jacket boasts a timeless design with a modern edge. The asymmetrical zipper and zippered cuffs add an extra layer of attitude. Whether you're hitting the streets or revving up your motorcycle, this jacket is a statement of bold fashion.",
//    "discount": 25,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Tailored Slim-Fit Suit",
//    "price": 149.99,
//    "description": "Dress to impress with our Tailored Slim-Fit Suit. This meticulously crafted suit is a symbol of sophistication and modern elegance. The slim-fit design accentuates your silhouette, while the high-quality fabric ensures comfort throughout the day or night. Perfect for formal occasions, business meetings, or a night on the town.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "suit"
//  },
//  {
//    "title": "Cozy Cable-Knit Turtleneck Sweater",
//    "price": 54.99,
//    "description": "Embrace the warmth and style of our Cozy Cable-Knit Turtleneck Sweater. Indulge in the softness of the cable-knit pattern that adds texture and visual appeal. The turtleneck design provides extra warmth during chilly days. Whether you're enjoying a fireside chat or strolling through the city, this sweater is your go-to for comfort and fashion.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Elegant Striped Button-Up Shirt",
//    "price": 34.99,
//    "description": "Step into refined elegance with our Elegant Striped Button-Up Shirt. The subtle stripes and tailored fit elevate this shirt to a wardrobe essential. Whether you're heading to the office or a formal event, this shirt exudes sophistication. The breathable fabric ensures comfort, making it a versatile piece for various occasions.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "Performance Running Shorts",
//    "price": 39.99,
//    "description": "Achieve peak performance with our Performance Running Shorts. Designed for runners by runners, these shorts prioritize comfort and functionality. The moisture-wicking fabric keeps you dry, while the strategic ventilation enhances breathability. Whether you're logging miles on the trail or sprinting on the track, these shorts are your trusted companion.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Contemporary Striped Sweater",
//    "price": 49.99,
//    "description": "Upgrade your sweater collection with our Contemporary Striped Sweater. The bold stripes and modern silhouette make a statement, while the soft knit ensures a cozy feel. Whether you're meeting friends for coffee or attending a casual gathering, this sweater effortlessly combines style and comfort.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "sweater"
//  },
//  {
//    "title": "Abstract Graphic Print Hoodie",
//    "price": 42.99,
//    "description": "Unleash your individuality with our Abstract Graphic Print Hoodie. The unique print adds an artistic touch, while the hoodie offers both style and functionality. Crafted for those who embrace creativity, this hoodie is the perfect way to express your personality while staying cozy and casual.",
//    "size": ["X-Small", "Small", "Medium"],
//    "color": ["#c0392b", "#3498db", "#27ae60"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Performance Jogging Pants",
//    "price": 59.99,
//    "description": "Elevate your workout experience with our Performance Jogging Pants. Engineered for optimal performance, these pants feature a tapered fit for freedom of movement. The moisture-wicking fabric keeps you dry, and the zippered pockets add a practical touch. Whether you're hitting the gym or going for a run, these pants deliver both style and function.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Rock Band T-shirt",
//    "price": 29.99,
//    "description": "Celebrate the golden era of rock with our Vintage Rock Band T-shirt. Featuring an iconic band logo from the heyday of rock 'n' roll, this shirt is a must-have for music enthusiasts. The vintage wash adds a worn-in look for extra character. Whether you're headed to a concert or just want to channel rock vibes, this tee is your ticket to timeless style.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "t-shirt"
//  },
//  {
//    "title": "Denim Cargo Bermuda Shorts",
//    "price": 34.99,
//    "description": "Combine style and functionality with our Denim Cargo Bermuda Shorts. The denim fabric provides a casual and comfortable feel, while the cargo pockets add a utilitarian touch. Perfect for warm days when you want a laid-back look with a hint of adventure. Pair them with your favorite tee for effortless summer style.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "shorts"
//  },
//  {
//    "title": "Boho-Chic Maxi Dress",
//    "price": 49.99,
//    "description": "Embrace bohemian flair with our Boho-Chic Maxi Dress. Flowy and feminine, this dress features intricate patterns and a relaxed silhouette. Whether you're attending a summer festival or enjoying a day in the sun, this maxi dress effortlessly captures the carefree spirit of boho-chic fashion.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Linen Casual Shirt",
//    "price": 44.99,
//    "description": "Stay cool and stylish with our Linen Casual Shirt. Crafted from breathable linen fabric, this shirt is perfect for warm weather. The relaxed fit and casual design make it a versatile piece for both casual and semi-formal occasions. Pair it with shorts or chinos for an effortlessly polished look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Retro Logo Pullover",
//    "price": 32.99,
//    "description": "Step back in time with our Retro Logo Pullover. Featuring a vintage-inspired logo, this pullover exudes retro charm. The comfortable fit and soft fabric make it ideal for casual days when you want to add a nostalgic touch to your outfit. Pair it with jeans or joggers for a laid-back retro look.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#f1c40f", "#2c3e50", "#3498db"],
//    "category": "sweater"
//  },
//  {
//    "title": "High-Waisted Flare Jeans",
//    "price": 64.99,
//    "description": "Channel a '70s vibe with our High-Waisted Flare Jeans. The high-rise fit elongates your silhouette, while the flared legs add a touch of retro flair. Made from stretch denim for comfort, these jeans are a versatile addition to your wardrobe. Pair them with platform heels for a groovy, bohemian look.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2c3e50", "#f39c12", "#3498db"],
//    "category": "jeans"
//  },
//  {
//    "title": "Utility Hooded Jacket",
//    "price": 59.99,
//    "description": "Stay prepared for any adventure with our Utility Hooded Jacket. This versatile jacket combines style with functionality, featuring multiple pockets and a detachable hood. The durable fabric and timeless design make it an essential piece for outdoor enthusiasts and urban explorers alike.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e67e22", "#d35400", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Floral Print Boho Dress",
//    "price": 36.99,
//    "description": "Embrace the whimsical beauty of our Floral Print Boho Dress. With its delicate floral pattern and bohemian silhouette, this dress is perfect for warm days and carefree moments. The flowy design and lightweight fabric create an effortless and romantic look. Pair it with sandals for a stroll through the garden or a beachside getaway.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#3498db", "#2ecc71", "#e74c3c"],
//    "category": "dress"
//  },
//  {
//    "title": "Cargo Utility Shorts",
//    "price": 32.99,
//    "description": "Upgrade your casual wardrobe with our Cargo Utility Shorts. The cargo pockets and relaxed fit add a touch of utility, while the comfortable fabric ensures all-day wear. Perfect for outdoor activities or simply enjoying a laid-back day in the sun. Pair them with a graphic tee for a cool and effortless look.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#2ecc71", "#3498db", "#9b59b6"],
//    "category": "shorts"
//  },
//  {
//    "title": "Bohemian Ruffle Blouse",
//    "price": 44.99,
//    "description": "Express your bohemian spirit with our Bohemian Ruffle Blouse. The ruffle details and flowy design create a romantic and free-spirited look. Whether you're attending a summer festival or enjoying a picnic in the park, this blouse adds a touch of boho-chic charm to your wardrobe. Pair it with your favorite jeans or a maxi skirt for effortless style.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#f39c12", "#3498db", "#2ecc71"],
//    "category": "blouse"
//  },
//  {
//    "title": "Leather Moto Jacket",
//    "price": 74.99,
//    "description": "Rev up your style with our Leather Moto Jacket. This timeless piece features a classic moto design with zippered pockets and a bold attitude. Crafted from high-quality leather, it's not just a jacket; it's a statement. Whether you're hitting the open road or strolling through the city, this jacket adds an instant edge to your ensemble.",
//    "discount": 15,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Formal Slim-Fit Tuxedo",
//    "price": 159.99,
//    "description": "Dress to impress with our Formal Slim-Fit Tuxedo. This impeccably tailored tuxedo is a symbol of sophistication and refinement. The slim-fit silhouette modernizes the classic tuxedo style, making it perfect for black-tie events, weddings, or any occasion where you want to make a lasting impression.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "suit"
//  },
//  {
//    "title": "Chunky Knit Turtleneck Sweater",
//    "price": 49.99,
//    "description": "Stay cozy and stylish with our Chunky Knit Turtleneck Sweater. The oversized knit and turtleneck design create a comfortable and on-trend look. Whether you're curled up by the fireplace or out for a winter stroll, this sweater keeps you warm while making a bold fashion statement.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Classic Checkered Button-Up Shirt",
//    "price": 39.99,
//    "description": "Elevate your casual wardrobe with our Classic Checkered Button-Up Shirt. The timeless checkered pattern adds a touch of sophistication, while the comfortable fit ensures all-day wear. Pair it with jeans for a laid-back look or dress it up with chinos for a smart-casual ensemble.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "Performance Basketball Shorts",
//    "price": 44.99,
//    "description": "Take your game to the next level with our Performance Basketball Shorts. Engineered for optimal mobility and breathability, these shorts are perfect for the court. The moisture-wicking fabric keeps you cool, while the bold design adds a streetwear edge. Whether you're shooting hoops or just embracing the athleisure trend, these shorts have you covered.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Urban Camo Hoodie",
//    "price": 54.99,
//    "description": "Blend into the cityscape with our Urban Camo Hoodie. The modern camouflage print and comfortable hoodie design make it a streetwear essential. Whether you're exploring the urban jungle or just want a casual and edgy look, this hoodie combines style and comfort effortlessly.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Tech-Fabric Jogging Pants",
//    "price": 64.99,
//    "description": "Experience the fusion of style and technology with our Tech-Fabric Jogging Pants. These pants are crafted from high-tech fabric that not only looks sleek but also offers superior performance. The tapered fit and minimalist design make them a versatile choice for both workouts and casual outings.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Graphic Print T-shirt",
//    "price": 29.99,
//    "description": "Show off your unique style with our Vintage Graphic Print T-shirt. The retro-inspired graphic adds a nostalgic touch, while the soft and breathable fabric ensures all-day comfort. Whether you're a collector of vintage vibes or just want to make a statement, this tee is a must-have for your casual wardrobe.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "t-shirt"
//  },
//  {
//    "title": "Cargo Pocket Denim Shorts",
//    "price": 34.99,
//    "description": "Combine style and utility with our Cargo Pocket Denim Shorts. The denim fabric provides a classic and comfortable feel, while the cargo pockets add a functional and rugged touch. Whether you're heading to a summer barbecue or a weekend adventure, these shorts are a versatile choice for casual occasions.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "shorts"
//  },
//  {
//    "title": "Vintage Floral Maxi Dress",
//    "price": 59.99,
//    "description": "Transport yourself to a bygone era with our Vintage Floral Maxi Dress. The romantic floral pattern and maxi length create a timeless and elegant look. Whether you're attending a garden party or a summer soirée, this dress is the epitome of vintage-inspired charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Linen Button-Down Shirt",
//    "price": 42.99,
//    "description": "Stay cool and breezy with our Linen Button-Down Shirt. Crafted from lightweight linen fabric, this shirt is a perfect choice for warm weather. The button-down design and relaxed fit make it a versatile piece for both casual and semi-formal occasions. Pair it with shorts or chinos for a laid-back yet polished look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Distressed Denim Jacket",
//    "price": 79.99,
//    "description": "Embrace a rugged aesthetic with our Distressed Denim Jacket. The distressed details add a worn-in charm, while the classic denim design ensures versatility. Whether you're layering for a casual day out or adding an edge to your evening look, this jacket is a timeless wardrobe staple.",
//    "discount": 10,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Modern Fit Checked Suit",
//    "price": 129.99,
//    "description": "Step into modern elegance with our Modern Fit Checked Suit. The contemporary checked pattern and tailored fit make a bold statement. Ideal for formal events, business meetings, or whenever you want to exude confidence and style. Elevate your wardrobe with this sleek and sophisticated suit.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "suit"
//  },
//  {
//    "title": "Cashmere Blend Turtleneck Sweater",
//    "price": 89.99,
//    "description": "Indulge in luxury with our Cashmere Blend Turtleneck Sweater. Crafted from a sumptuous cashmere blend, this sweater offers unparalleled softness and warmth. The turtleneck design adds a touch of sophistication, making it a perfect choice for chilly days when you want to stay stylish and cozy.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Classic Striped Oxford Shirt",
//    "price": 44.99,
//    "description": "Upgrade your shirt collection with our Classic Striped Oxford Shirt. The timeless stripes and crisp Oxford fabric create a polished and sophisticated look. Suitable for both business and casual occasions, this shirt is a versatile wardrobe essential that combines comfort and style.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "High-Performance Running Shorts",
//    "price": 49.99,
//    "description": "Achieve your personal best with our High-Performance Running Shorts. Engineered for comfort and functionality, these shorts feature moisture-wicking fabric and strategic ventilation. Whether you're sprinting on the track or hitting the gym, these shorts provide the performance you need with a sleek and sporty design.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Quilted Zip-Up Hooded Sweater",
//    "price": 54.99,
//    "description": "Stay warm and stylish with our Quilted Zip-Up Hooded Sweater. The quilted pattern adds texture and visual interest, while the zip-up design and hood provide extra versatility. Whether you're layering for the outdoors or running errands in the city, this sweater is a cozy and fashionable choice.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Tech-Blend Performance Jogging Pants",
//    "price": 69.99,
//    "description": "Unleash your full potential with our Tech-Blend Performance Jogging Pants. Crafted from high-tech fabric, these pants provide optimal comfort and flexibility. The tapered fit and minimalist design make them suitable for workouts or casual outings. Elevate your activewear collection with this fusion of style and performance.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Logo Graphic T-shirt",
//    "price": 27.99,
//    "description": "Capture retro vibes with our Vintage Logo Graphic T-shirt. The distressed logo adds a worn-in look, while the soft fabric ensures all-day comfort. Whether you're a fan of vintage aesthetics or just want a laid-back tee with character, this shirt is a casual wardrobe essential.",
//    "discount": 15,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "t-shirt"
//  },
//  {
//    "title": "Cargo Detail Denim Bermuda Shorts",
//    "price": 39.99,
//    "description": "Blend style and functionality with our Cargo Detail Denim Bermuda Shorts. The denim fabric offers a classic feel, while the cargo pockets add a utilitarian touch. Perfect for warm days when you want a laid-back look with a hint of adventure. Pair them with a tee or a button-up shirt for effortless summer style.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "shorts"
//  },
//  {
//    "title": "Retro Floral Print Maxi Dress",
//    "price": 54.99,
//    "description": "Transport yourself to the '70s with our Retro Floral Print Maxi Dress. The bold floral pattern and maxi length create a bohemian and retro-inspired look. Whether you're attending a summer party or enjoying a day in the sun, this dress is a timeless piece that exudes vintage charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Linen Casual Button-Up Shirt",
//    "price": 37.99,
//    "description": "Stay cool and casual with our Linen Casual Button-Up Shirt. Crafted from breathable linen fabric, this shirt is a perfect choice for laid-back days. The button-up design and relaxed fit make it versatile for various occasions. Pair it with shorts or chinos for a relaxed yet polished summer look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Suede Bomber Jacket",
//    "price": 94.99,
//    "description": "Elevate your outerwear collection with our Suede Bomber Jacket. The luxurious suede fabric and classic bomber silhouette make it a stylish choice for any occasion. Whether you're heading out for a night on the town or just want to add a touch of sophistication to your casual look, this jacket is a versatile statement piece.",
//    "discount": 20,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Double-Breasted Wool Coat",
//    "price": 139.99,
//    "description": "Stay warm in style with our Double-Breasted Wool Coat. Crafted from premium wool, this coat exudes timeless elegance. The double-breasted design and tailored fit create a sophisticated silhouette. Whether you're dressing up for a formal event or need a polished outer layer for your winter ensemble, this coat is a classic choice.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "coat"
//  },
//  {
//    "title": "Chunky Cable-Knit Cardigan",
//    "price": 69.99,
//    "description": "Wrap yourself in warmth with our Chunky Cable-Knit Cardigan. The oversized cable-knit pattern adds texture and visual interest, while the open-front design allows for easy layering. Whether you're lounging at home or out for a casual day, this cardigan combines comfort and style effortlessly.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Printed Flannel Button-Up Shirt",
//    "price": 42.99,
//    "description": "Upgrade your casual wardrobe with our Printed Flannel Button-Up Shirt. The unique print adds a touch of individuality, while the flannel fabric provides warmth and comfort. Whether you're by the campfire or navigating the urban jungle, this shirt is a versatile choice for a laid-back yet stylish look.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "Athletic Compression Leggings",
//    "price": 34.99,
//    "description": "Enhance your workout experience with our Athletic Compression Leggings. Designed for flexibility and support, these leggings feature compression technology to optimize performance. The moisture-wicking fabric keeps you dry, making them perfect for intense workouts or casual athleisure wear.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "leggings"
//  },
//  {
//    "title": "Graphic Print Pullover Hoodie",
//    "price": 49.99,
//    "description": "Make a statement with our Graphic Print Pullover Hoodie. The bold graphic adds a contemporary and urban edge, while the hoodie design ensures comfort. Whether you're heading to a casual outing or just want to express your individuality, this hoodie is a standout piece in your streetwear collection.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Slim-Fit Stretch Chinos",
//    "price": 59.99,
//    "description": "Upgrade your casual style with our Slim-Fit Stretch Chinos. The slim-fit silhouette and stretch fabric provide both style and comfort. Whether you're heading to the office or a weekend brunch, these chinos offer versatility for various occasions. Pair them with a button-up shirt or a casual tee for a polished look.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage-Inspired Graphic Tee",
//    "price": 29.99,
//    "description": "Channel retro vibes with our Vintage-Inspired Graphic Tee. The nostalgic graphic print adds a touch of the past, while the soft and breathable fabric ensures comfort. Whether you're a collector of vintage memorabilia or just want a cool and casual tee, this shirt is a must-have for your wardrobe.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "t-shirt"
//  },
//  {
//    "title": "Cargo Pocket Utility Pants",
//    "price": 44.99,
//    "description": "Combine style and utility with our Cargo Pocket Utility Pants. The cargo pockets add a rugged and functional touch, while the comfortable fabric ensures all-day wear. Whether you're on an outdoor adventure or just embracing the utility trend, these pants offer both style and practicality.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "pants"
//  },
//  {
//    "title": "Bohemian Lace Maxi Dress",
//    "price": 64.99,
//    "description": "Embrace bohemian romance with our Bohemian Lace Maxi Dress. The intricate lace detailing and maxi length create a dreamy and ethereal look. Whether you're attending a garden party or a summer wedding, this dress is a boho-chic statement piece that radiates elegance and free-spirited charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Casual Linen Henley Shirt",
//    "price": 37.99,
//    "description": "Keep it cool and casual with our Casual Linen Henley Shirt. Crafted from breathable linen fabric, this shirt is a summer essential. The Henley neckline adds a laid-back vibe, making it perfect for weekend outings or beachside strolls. Pair it with shorts or chinos for effortless warm-weather style.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Faux Leather Biker Jacket",
//    "price": 74.99,
//    "description": "Add a touch of rebellion to your style with our Faux Leather Biker Jacket. The biker-inspired design and faux leather material create an edgy and cool look. Whether you're hitting the streets or heading to a concert, this jacket is a bold statement piece that elevates your entire ensemble.",
//    "discount": 15,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Tailored Fit Formal Suit",
//    "price": 159.99,
//    "description": "Command attention with our Tailored Fit Formal Suit. The modern silhouette and impeccable tailoring make it a standout choice for formal events, weddings, or business occasions. Elevate your style and make a lasting impression with this sophisticated and timeless suit.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "suit"
//  },
//  {
//    "title": "Oversized Knit Turtleneck Sweater",
//    "price": 54.99,
//    "description": "Stay cozy and on-trend with our Oversized Knit Turtleneck Sweater. The chunky knit and oversized design create a comfortable and effortlessly stylish look. Whether you're lounging at home or braving the winter chill, this sweater is a must-have for those who appreciate both comfort and fashion.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Casual Plaid Flannel Shirt",
//    "price": 39.99,
//    "description": "Upgrade your casual wardrobe with our Casual Plaid Flannel Shirt. The classic plaid pattern and soft flannel fabric make it a versatile choice for various occasions. Whether you're headed to a weekend brunch or a relaxed day out, this shirt adds a touch of laid-back charm to your look.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "Performance Running Shorts",
//    "price": 44.99,
//    "description": "Maximize your running experience with our Performance Running Shorts. Engineered for comfort and performance, these shorts feature breathable fabric and strategic ventilation. Whether you're hitting the trail or the treadmill, these shorts offer the ideal combination of style and functionality.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Casual Zip-Up Hoodie",
//    "price": 49.99,
//    "description": "Stay casual and comfortable with our Casual Zip-Up Hoodie. The zip-up design and classic hoodie style make it a versatile choice for any laid-back occasion. Whether you're running errands or relaxing at home, this hoodie is a go-to piece for a casual and relaxed vibe.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Slim Jogger Pants with Zipper Pockets",
//    "price": 64.99,
//    "description": "Elevate your casual look with our Slim Jogger Pants. The slim fit and zipper pockets add a modern and urban edge. Crafted from comfortable fabric, these joggers are perfect for both lounging and casual outings. Pair them with a graphic tee or a hoodie for a streetwear-inspired ensemble.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Logo Print T-shirt",
//    "price": 27.99,
//    "description": "Celebrate retro style with our Vintage Logo Print T-shirt. The vintage-inspired logo print adds a nostalgic touch, while the soft and breathable fabric ensures all-day comfort. Whether you're a fan of classic logos or just want a casual tee with character, this shirt is a versatile addition to your wardrobe.",
//    "discount": 10,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "t-shirt"
//  },
//  {
//    "title": "Cargo Detail Denim Pants",
//    "price": 44.99,
//    "description": "Combine style and functionality with our Cargo Detail Denim Pants. The cargo pockets and denim fabric provide a rugged and versatile look. Whether you're heading on an outdoor adventure or just want a casual and utilitarian style, these pants are a wardrobe essential for the modern explorer.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "pants"
//  },
//  {
//    "title": "Boho-Chic Floral Maxi Dress",
//    "price": 59.99,
//    "description": "Embrace bohemian elegance with our Boho-Chic Floral Maxi Dress. The floral pattern and flowing silhouette create a romantic and free-spirited look. Whether you're attending a summer festival or enjoying a garden party, this maxi dress is a timeless piece that radiates boho-chic charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Casual Linen Short Sleeve Shirt",
//    "price": 37.99,
//    "description": "Keep it cool and breezy with our Casual Linen Short Sleeve Shirt. Crafted from lightweight linen fabric, this shirt is perfect for warm days. The short sleeve design and relaxed fit make it a versatile piece for various casual occasions. Pair it with shorts or chinos for an easygoing summer look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Quilted Faux Fur-Lined Jacket",
//    "price": 89.99,
//    "description": "Stay warm and stylish with our Quilted Faux Fur-Lined Jacket. The quilted design and faux fur lining provide both insulation and a luxurious touch. Whether you're braving the winter chill or just want to make a statement, this jacket is a cozy and fashionable choice for the colder months.",
//    "discount": 10,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Classic Wool-Blend Peacoat",
//    "price": 129.99,
//    "description": "Add a timeless piece to your winter wardrobe with our Classic Wool-Blend Peacoat. Crafted from premium wool-blend fabric, this peacoat exudes sophistication and warmth. The double-breasted design and tailored fit make it a versatile choice for both formal and casual winter occasions.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "coat"
//  },
//  {
//    "title": "Cable-Knit Turtleneck Sweater Dress",
//    "price": 74.99,
//    "description": "Combine style and comfort with our Cable-Knit Turtleneck Sweater Dress. The cable-knit pattern adds texture, while the turtleneck design provides warmth and elegance. Whether you're heading to the office or a winter gathering, this sweater dress is a chic and cozy choice for the colder months.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "dress"
//  },
//  {
//    "title": "Flannel-Lined Denim Jacket",
//    "price": 59.99,
//    "description": "Stay cozy in style with our Flannel-Lined Denim Jacket. The denim exterior offers a classic look, while the flannel lining adds extra warmth. Whether you're layering for a casual day out or enjoying a bonfire with friends, this jacket is a versatile choice for the cooler seasons.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#f39c12", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "High-Performance Compression Leggings",
//    "price": 49.99,
//    "description": "Achieve peak performance with our High-Performance Compression Leggings. Designed for flexibility and support, these leggings feature advanced compression technology. Whether you're hitting the gym or practicing yoga, these leggings offer the perfect blend of style and functionality.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "leggings"
//  },
//  {
//    "title": "Hooded Sherpa-Lined Fleece Jacket",
//    "price": 54.99,
//    "description": "Embrace coziness with our Hooded Sherpa-Lined Fleece Jacket. The sherpa lining provides extra warmth, while the fleece exterior adds a touch of casual style. Whether you're heading for a winter hike or just running errands in the city, this jacket is a comfortable and trendy choice.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "jacket"
//  },
//  {
//    "title": "Slim-Fit Cargo Jogger Pants",
//    "price": 64.99,
//    "description": "Upgrade your casual look with our Slim-Fit Cargo Jogger Pants. The slim fit and cargo pockets add a modern and utilitarian touch. Crafted from comfortable fabric, these joggers are perfect for both lounging and casual outings. Pair them with a hoodie or a graphic tee for an effortlessly cool ensemble.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Retro-Inspired Graphic Sweatshirt",
//    "price": 34.99,
//    "description": "Channel retro vibes with our Retro-Inspired Graphic Sweatshirt. The vintage graphic adds a nostalgic touch, while the sweatshirt design ensures comfort. Whether you're staying in or heading out, this sweatshirt is a casual wardrobe essential that combines style and personality.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Cargo Detail Utility Pants",
//    "price": 44.99,
//    "description": "Combine style and functionality with our Cargo Detail Utility Pants. The cargo pockets and comfortable fabric make them a versatile choice for various occasions. Whether you're exploring the outdoors or just want a casual and utilitarian style, these pants are a wardrobe essential for the modern explorer.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "pants"
//  },
//  {
//    "title": "Bohemian Ruffle Maxi Dress",
//    "price": 59.99,
//    "description": "Embrace bohemian chic with our Bohemian Ruffle Maxi Dress. The ruffle detailing and maxi length create a romantic and free-spirited look. Whether you're attending a summer festival or enjoying a day in the sun, this dress is a timeless piece that radiates boho charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Casual Linen Button-Up Shirt",
//    "price": 37.99,
//    "description": "Stay cool and relaxed with our Casual Linen Button-Up Shirt. Crafted from breathable linen fabric, this shirt is perfect for warm days. The button-up design and relaxed fit make it a versatile piece for various casual occasions. Pair it with shorts or chinos for an easygoing summer look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Puffer Jacket with Detachable Hood",
//    "price": 79.99,
//    "description": "Stay warm and versatile with our Puffer Jacket featuring a detachable hood. The puffer design provides insulation, and the detachable hood offers flexibility for different weather conditions. Whether you're commuting in the city or exploring the outdoors, this jacket is a practical and stylish choice.",
//    "discount": 10,
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Tailored Velvet Blazer",
//    "price": 139.99,
//    "description": "Elevate your evening attire with our Tailored Velvet Blazer. The luxurious velvet fabric and tailored fit exude sophistication and style. Whether you're attending a special event or a formal dinner, this blazer is a refined choice that makes a lasting impression.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "blazer"
//  },
//  {
//    "title": "Oversized Cable-Knit Sweater",
//    "price": 59.99,
//    "description": "Wrap yourself in warmth with our Oversized Cable-Knit Sweater. The chunky cable-knit pattern and oversized design create a cozy and stylish look. Whether you're lounging at home or enjoying a day out, this sweater is a must-have for those who appreciate comfort without compromising on fashion.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Classic Plaid Button-Up Shirt",
//    "price": 44.99,
//    "description": "Upgrade your shirt collection with our Classic Plaid Button-Up Shirt. The timeless plaid pattern and crisp fabric create a polished and versatile look. Suitable for both casual and semi-formal occasions, this shirt is a wardrobe essential that combines comfort and style seamlessly.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "Athletic Jogger Shorts",
//    "price": 39.99,
//    "description": "Maximize your comfort during workouts with our Athletic Jogger Shorts. Engineered for flexibility and breathability, these shorts feature a modern jogger silhouette. Whether you're hitting the gym or going for a run, these shorts provide the ideal blend of style and functionality.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Sherpa-Lined Hooded Cardigan",
//    "price": 54.99,
//    "description": "Stay cozy and stylish with our Sherpa-Lined Hooded Cardigan. The sherpa lining provides warmth, and the hood adds an extra layer of comfort. Whether you're lounging at home or heading out on a chilly day, this cardigan is a versatile choice for a laid-back and trendy look.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Slim-Fit Tech Jogging Pants",
//    "price": 69.99,
//    "description": "Unleash your style with our Slim-Fit Tech Jogging Pants. Crafted from high-tech fabric, these pants provide optimal comfort and flexibility. The slim fit and minimalist design make them suitable for workouts or casual outings. Elevate your activewear collection with this fusion of style and performance.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Logo Graphic Hoodie",
//    "price": 49.99,
//    "description": "Capture retro vibes with our Vintage Logo Graphic Hoodie. The distressed logo adds a worn-in look, while the hoodie design ensures warmth and comfort. Whether you're a fan of vintage aesthetics or just want a laid-back hoodie with character, this piece is a casual wardrobe essential.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Cargo Pocket Denim Shorts",
//    "price": 34.99,
//    "description": "Blend style and functionality with our Cargo Pocket Denim Shorts. The denim fabric offers a classic feel, while the cargo pockets add a utilitarian touch. Perfect for warm days when you want a laid-back look with a hint of adventure. Pair them with a tee or a button-up shirt for effortless summer style.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "shorts"
//  },
//  {
//    "title": "Boho-Chic Floral Print Midi Dress",
//    "price": 64.99,
//    "description": "Embrace bohemian elegance with our Boho-Chic Floral Print Midi Dress. The floral pattern and midi length create a romantic and free-spirited look. Whether you're attending a garden party or enjoying a summer day, this dress is a timeless piece that radiates boho-chic charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "dress"
//  },
//  {
//    "title": "Casual Linen V-Neck Shirt",
//    "price": 37.99,
//    "description": "Keep it cool and casual with our Casual Linen V-Neck Shirt. Crafted from breathable linen fabric, this shirt is a summer essential. The V-neck design adds a touch of laid-back style, making it perfect for weekend outings or beachside strolls. Pair it with shorts or chinos for effortless warm-weather fashion.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  },
//  {
//    "title": "Water-Resistant Hooded Windbreaker",
//    "price": 69.99,
//    "description": "Stay prepared for unpredictable weather with our Water-Resistant Hooded Windbreaker. The water-resistant material and hood provide protection against light rain, while the lightweight design makes it easy to carry. Whether you're headed for a hike or just need a stylish layer, this windbreaker is a versatile choice.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "jacket"
//  },
//  {
//    "title": "Modern Fit Checked Suit",
//    "price": 159.99,
//    "description": "Make a statement at formal events with our Modern Fit Checked Suit. The contemporary checked pattern and modern fit add a touch of flair to classic formalwear. Whether you're attending a wedding or a business function, this suit is a stylish choice that balances tradition and fashion.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "suit"
//  },
//  {
//    "title": "Chunky Cable-Knit Blanket Scarf",
//    "price": 29.99,
//    "description": "Stay warm and cozy with our Chunky Cable-Knit Blanket Scarf. The oversized design allows for versatile styling, whether you prefer a classic drape or a stylish wrap. Made from soft and chunky knit fabric, this scarf is a cold-weather accessory that adds both warmth and fashion to your winter wardrobe.",
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "accessory"
//  },
//  {
//    "title": "Printed Chambray Button-Up Shirt",
//    "price": 42.99,
//    "description": "Upgrade your casual style with our Printed Chambray Button-Up Shirt. The chambray fabric and unique print make it a standout choice for laid-back occasions. Whether you're brunching with friends or heading to a casual dinner, this shirt adds a touch of individuality to your wardrobe.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },

//  {
//    "title": "Graphic Print Pullover Sweatshirt",
//    "price": 49.99,
//    "description": "Make a statement with our Graphic Print Pullover Sweatshirt. The bold graphic adds a contemporary and urban edge, while the sweatshirt design ensures comfort. Whether you're heading to a casual outing or just want to express your individuality, this sweatshirt is a standout piece in your streetwear collection.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Skinny-Fit Stretch Denim Jeans",
//    "price": 54.99,
//    "description": "Elevate your denim game with our Skinny-Fit Stretch Denim Jeans. The skinny fit and stretch fabric provide a modern and comfortable silhouette. Whether you're going for a casual street style or dressing up for a night out, these jeans offer versatility for various occasions.",
//    "size": ["32x32", "34x32", "36x32"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "jeans"
//  },
//  {
//    "title": "Retro Logo Embroidered Baseball Cap",
//    "price": 24.99,
//    "description": "Add a touch of nostalgia to your look with our Retro Logo Embroidered Baseball Cap. The embroidered logo and classic design make it a timeless accessory. Whether you're out for a casual day or need a finishing touch to your streetwear ensemble, this cap is a stylish choice.",
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "accessory"
//  },
//  {
//    "title": "Cargo Detail Utility Jogger Pants",
//    "price": 59.99,
//    "description": "Combine style and functionality with our Cargo Detail Utility Jogger Pants. The cargo pockets and comfortable fabric make them a versatile choice for various occasions. Whether you're on an outdoor adventure or just embracing the utility trend, these jogger pants offer both style and practicality.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"],
//    "category": "pants"
//  },
//  {
//    "title": "Bohemian Lace-Inset Maxi Skirt",
//    "price": 44.99,
//    "description": "Embrace bohemian vibes with our Bohemian Lace-Inset Maxi Skirt. The lace detailing and maxi length create a romantic and free-spirited look. Whether you're attending a music festival or enjoying a summer day, this maxi skirt is a versatile piece that radiates boho charm.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "skirt"
//  },
//  {
//    "title": "Casual Linen Drawstring Shorts",
//    "price": 37.99,
//    "description": "Keep it cool and breezy with our Casual Linen Drawstring Shorts. Crafted from lightweight linen fabric, these shorts are perfect for warm days. The drawstring waist and relaxed fit make them a comfortable and stylish choice for various casual occasions. Pair them with a tee or a button-up shirt for an easygoing summer look.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shorts"
//  },
//  {
//    "title": "Quilted Vest with Faux Fur Collar",
//    "price": 49.99,
//    "description": "Add a layer of warmth and style with our Quilted Vest featuring a faux fur collar. The quilted design provides insulation, and the faux fur collar adds a touch of luxury. Whether you're layering for fall or need a stylish option for transitional weather, this vest is a versatile choice.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#34495e", "#95a5a6", "#3498db"],
//    "category": "vest"
//  },
//  {
//    "title": "Double-Breasted Trench Coat",
//    "price": 89.99,
//    "description": "Stay sophisticated in unpredictable weather with our Double-Breasted Trench Coat. The classic double-breasted design and belted waist create a timeless and flattering silhouette. Whether you're heading to the office or a weekend brunch, this trench coat is a versatile outerwear piece that adds elegance to any look.",
//    "size": ["Large", "X-Large"],
//    "color": ["#2ecc71", "#f39c12"],
//    "category": "coat"
//  },
//  {
//    "title": "Fair Isle Knit Sweater",
//    "price": 54.99,
//    "description": "Stay cozy and festive with our Fair Isle Knit Sweater. The traditional Fair Isle pattern adds a touch of holiday charm, making it perfect for the winter season. Whether you're celebrating by the fireplace or heading to a holiday party, this sweater is a stylish choice for a warm and festive look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#e74c3c", "#34495e", "#f39c12"],
//    "category": "sweater"
//  },
//  {
//    "title": "Cotton Checkered Casual Shirt",
//    "price": 39.99,
//    "description": "Upgrade your casual wardrobe with our Cotton Checkered Casual Shirt. The classic checkered pattern and breathable cotton fabric make it a versatile choice for various occasions. Whether you're going for a laid-back look or a casual day out, this shirt adds a touch of timeless style to your ensemble.",
//    "size": ["Small", "Medium"],
//    "color": ["#f39c12", "#95a5a6"],
//    "category": "shirts"
//  },
//  {
//    "title": "High-Performance Cycling Shorts",
//    "price": 44.99,
//    "description": "Enhance your cycling experience with our High-Performance Cycling Shorts. Designed for comfort and flexibility, these shorts feature advanced padding and moisture-wicking fabric. Whether you're hitting the trails or the road, these cycling shorts offer the perfect blend of style and functionality.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#9b59b6", "#2ecc71", "#3498db"],
//    "category": "shorts"
//  },
//  {
//    "title": "Chunky Knit Infinity Scarf",
//    "price": 29.99,
//    "description": "Stay warm and stylish with our Chunky Knit Infinity Scarf. The chunky knit adds texture and warmth, while the infinity design allows for easy styling. Whether you're braving the winter chill or just want a fashionable accessory, this scarf is a must-have for the colder months.",
//    "color": ["#34495e", "#f1c40f", "#e74c3c"],
//    "category": "accessory"
//  },
//  {
//    "title": "Relaxed Fit Zip-Up Hoodie",
//    "price": 49.99,
//    "description": "Stay casual and comfortable with our Relaxed Fit Zip-Up Hoodie. The zip-up design and relaxed fit make it a versatile choice for any laid-back occasion. Whether you're running errands or relaxing at home, this hoodie is a go-to piece for a casual and relaxed vibe.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#1abc9c", "#f39c12", "#3498db"],
//    "category": "hoodie"
//  },
//  {
//    "title": "Slim-Fit Chino Pants",
//    "price": 64.99,
//    "description": "Elevate your casual look with our Slim-Fit Chino Pants. The slim fit and chino fabric add a polished and versatile touch. Crafted from comfortable fabric, these chinos are perfect for both casual outings and semi-formal occasions. Pair them with a button-up shirt or a casual tee for a stylish ensemble.",
//    "size": ["Large", "X-Large", "XX-Large"],
//    "color": ["#d35400", "#3498db", "#e74c3c"],
//    "category": "pants"
//  },
//  {
//    "title": "Vintage Logo Graphic Tank Top",
//    "price": 27.99,
//    "description": "Celebrate retro style with our Vintage Logo Graphic Tank Top. The distressed logo print adds a nostalgic touch, while the sleeveless design ensures comfort on warm days. Whether you're hitting the gym or enjoying a casual day out, this tank top is a versatile addition to your summer wardrobe.",
//    "size": ["Medium", "Large", "X-Large"],
//    "color": ["#2980b9", "#f39c12", "#2ecc71"]
//  },
//  {
//    "title": "Boho-Chic Embroidered Blouse",
//    "price": 44.99,
//    "description": "Embrace bohemian style with our Boho-Chic Embroidered Blouse. The intricate embroidery and relaxed fit create a free-spirited and stylish look. Whether you're heading to a festival or enjoying a sunny day, this blouse is a versatile piece that adds boho charm to your wardrobe.",
//    "size": ["Small", "Medium", "Large"],
//    "color": ["#27ae60", "#2ecc71", "#3498db"],
//    "category": "blouse"
//  },
//  {
//    "title": "Casual Linen Henley Shirt",
//    "price": 37.99,
//    "description": "Keep it cool and casual with our Casual Linen Henley Shirt. Crafted from breathable linen fabric, this shirt is perfect for warm days. The Henley neckline and relaxed fit make it a versatile piece for various casual occasions. Pair it with shorts or chinos for an easygoing summer look.",
//    "size": ["X-Large", "XX-Large", "3X-Large"],
//    "color": ["#8e44ad", "#2c3e50", "#f1c40f"],
//    "category": "shirts"
//  }]
