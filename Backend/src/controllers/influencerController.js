import axios from "axios";
import Influencer from "../models/influencerModel.js";

// Extract keywords using a dummy function (Replace with Gemini API)
const extractKeywords = async (description) => {
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "I will be pasting a description of a product here, you need extract 3 main keywords from it which would be used to search youtube influencers in that niche. Description: "; 

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  console.log(`Extracting keywords from: "${description}"`);
  return ["beauty", "makeup", "skincare"]; // Dummy extracted keywords
};

// Find influencers from DMT API
const fetchInfluencers = async (keywords) => {
  try {
    const response = await axios.get(DMT_FIND_CHANNELS_URL, {
      params: { channelType: "youtube", keywords: keywords.join(",") },
      headers: { "x-rapidapi-key": process.env.RAPIDAPI_KEY },
    });

    return response.data?.data?.channels.slice(0, 5) || [];
  } catch (error) {
    console.error("Error fetching influencers:", error);
    return [];
  }
};

// Find lookalike influencers
const fetchLookalikeInfluencers = async (influencers) => {
  let lookalikes = [];

  for (const influencer of influencers) {
    try {
      const response = await axios.get(DMT_LOOKALIKE_URL, {
        params: { channelType: "youtube", url: influencer.url },
        headers: { "x-rapidapi-key": process.env.RAPIDAPI_KEY },
      });

      lookalikes.push(...(response.data?.data?.channels || []));
    } catch (error) {
      console.error(`Error fetching lookalikes for ${influencer.name}:`, error);
    }
  }

  return lookalikes;
};

// Controller function to find and store influencers
export const findInfluencers = async (req, res) => {
  const { description } = req.body;
  if (!description)
    return res.status(400).json({ message: "Product description required" });

  console.log(`Received request for product: ${description}`);

  try {
    // Step 1: Extract keywords (dummy function for now)
    const keywords = await extractKeywords(description);

    // Step 2: Fetch 5 main influencers
    const influencers = await fetchInfluencers(keywords);
    console.log(
      `Found influencers:`,
      influencers.map((i) => i.name)
    );

    // Step 3: Find lookalikes (5 API calls)
    const lookalikes = await fetchLookalikeInfluencers(influencers);
    console.log(
      `Found lookalikes:`,
      lookalikes.map((i) => i.name)
    );

    // Step 4: Combine all influencers
    const allInfluencers = [...influencers, ...lookalikes];

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
