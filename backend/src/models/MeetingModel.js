import mongoose, { Schema } from "mongoose";

const meetingModel = new Schema(
    {
        user_id: {
            type: String
        },
        meeting_code: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now, 
            required: true
        }
    }
)

const Meeting = mongoose.model("Meeting", meetingModel);

export { Meeting };