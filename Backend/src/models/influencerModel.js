import mongoose from 'mongoose';

const influencerSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productDescription: { type: String, required: true },
    influencers: { type: Array, required: true }
}, { timestamps: true });

export default mongoose.model('Influencer', influencerSchema);
