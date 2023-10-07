import { Schema, model, Types, Date } from "mongoose";

const notificationSchema = new Schema<any>({
    title: String,
    description: String,
    message: String,
    entity: Schema.Types.ObjectId,
    settings: { type: Schema.Types.ObjectId, ref: 'notificationSettings' },
    createdAt: Number,
    updatedAt: Number
});

const NotificationModel = model("notification", notificationSchema);

const notificationSettingsSchema = new Schema<any>({
    deadline: [Date],
    sendEmail: Boolean,

});

const NotificationSettingsModel = model("notificationSettings", notificationSettingsSchema);
