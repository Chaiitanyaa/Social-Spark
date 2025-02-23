import axios from "axios";
import Influencer from "../models/influencerModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Extract keywords using a dummy function (Replace with Gemini API)
const extractKeywords = async (description) => {
  

  const genAI = new GoogleGenerativeAI(process.env.GEMINIAPIKEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `I will be pasting a description of a product here, you need give 1 keyword which should be a category of youtube videos from it which would be used to search youtube influencers in that niche. Please make sure to only output that 1 keyword and nothing else. The keyword is one word in length and the keyword needs to be an influencer niche (Top influencer niches are: Beauty & makeup influencers dominate platforms with skincare routines, cosmetic tutorials, and product reviews, while fashion & lifestyle creators share outfit inspirations, styling tips, and shopping hauls. The fitness & health niche covers workout routines, nutrition, and wellness advice, whereas technology & gadgets influencers provide product reviews, unboxings, and industry updates. Gaming influencers thrive through live streaming, game walkthroughs, and esports content, while travel & adventure creators showcase destination guides and budget-friendly travel tips. The food & cooking niche is packed with recipe tutorials, food reviews, and mukbangs, while finance & investing influencers focus on personal finance, crypto, and stock market insights. Parenting & family influencers engage audiences with parenting hacks and family vlogs, while DIY & crafts creators inspire with handmade projects and home decor ideas. Education & online learning influencers provide content on coding, language learning, and career advice, whereas entrepreneurship & business experts discuss startups, productivity, and career growth. Self-development & motivation influencers focus on mindset coaching, while luxury & high-end lifestyle creators showcase extravagant travel, fashion, and cars. The pet & animal care niche includes pet training and exotic pet content, while sustainable & eco-friendly living influencers promote minimalism and green products. Automobile & motorsports influencers cover car reviews and racing, and home improvement & real estate creators focus on interior design and home renovation. Lastly, comedy & entertainment influencers thrive on viral skits and memes, while ASMR & relaxation creators produce soothing content for stress relief and sleep. ). Description: ${description}`; 

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
//   var k = "";
//   var keywords = [];
//   for (k of result.response.text().split(",")){
//     keywords.push(k.trim())
//   };
//   return keywords;
};

// Find influencers from DMT API
const fetchInfluencers = async (keywords) => {
  try {
    var influencers = [];
    
        const response = await axios.get(process.env.DMT_FIND_CHANNELS_URL, {
            params: { channelType: "youtube", keywords: keywords },
            headers: { "x-rapidapi-key": process.env.RAPIDAPI_KEY },
          });

          for (const influencer of response.data.data.channels) {
            if ((influencer.country === "CA" || influencer.country === "US") && influencer.followers < 500000) {
              influencers.push(influencer);
      
            }
          }

    return influencers;
  } catch (error) {
    console.error("Error fetching influencers:", error);
  }
};

// Find lookalike influencers
// const fetchLookalikeInfluencers = async (influencers) => {
//   let lookalikes = [];

//   for (const influencer of influencers) {
//     try {
//       const response = await axios.get(DMT_LOOKALIKE_URL, {
//         params: { channelType: "youtube", url: influencer.url },
//         headers: { "x-rapidapi-key": process.env.RAPIDAPI_KEY },
//       });

//       lookalikes.push(...(response.data?.data?.channels));
//     } catch (error) {
//       console.error(`Error fetching lookalikes for ${influencer.name}:`, error);
//     }
//   }

//   return lookalikes;
// };

// Controller function to find and store influencers
export const findInfluencers = async (req, res) => {
    console.log("Received request for influencers");
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Product description required" });

  console.log(`Received request for product: ${description}`);

  try {
    // Step 1: Extract keywords (dummy function for now)
    const keywords = await extractKeywords(description);
    

    // Step 2: Fetch 5 main influencers
    const influencers = await fetchInfluencers(keywords);

    // Step 3: Find lookalikes (5 API calls)
    // const lookalikes = await fetchLookalikeInfluencers(influencers);
    // console.log(
    //   `Found lookalikes:`,
    //   lookalikes.map((i) => i.name)
    // );

    // Step 4: Combine all influencers
    // const allInfluencers = [...influencers, ...lookalikes];

    const allInfluencers = influencers;

    // Step 5: Store in MongoDB
    const savedData = await Influencer.create({
      companyId: req.user.id,
      productDescription: description,
      influencers: allInfluencers,
    });

    res.status(201).json(savedData);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
