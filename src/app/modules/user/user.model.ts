import { Schema, model } from "mongoose";

// export interface IUser {
//     _id: Schema.Types.ObjectId;
//     name: string;
//     email: string;
//     contact?: string;
//     password: string;
//     companyName?: string;
//     companyEmail?: string;
//     companyContact?: string;
//     website?: string;
//     monthlyShipmentValue?: string;
//     companyLogo?: string;
//     address?: object;
//     selectedCarriers?: [object];
//     shipments?: [Schema.Types.ObjectId];
// };

// creating schema using interface
// const userSchema = new Schema<IUser>({
//     // user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // using for populate
//     // status: { type: String, default: "active", enum: ["active", "done"], required: true }, // set default data
//     // name: {
//     //     firstName: { type: String, required: true, unique: false },
//     //     middleName: { type: String, required: false, unique: false },
//     //     lastName: { type: String, required: true, unique: false },
//     // },

//     name: { type: String, required: true, immutable: true, },
//     email: { type: String, required: true, unique: true, immutable: true, },
//     password: { type: String, required: true },
//     contact: { type: String, required: false },
//     companyName: { type: String, required: false },
//     companyEmail: { type: String, required: false },
//     companyContact: { type: String, required: false },
//     website: { type: String, required: false },
//     monthlyShipmentValue: { type: String, required: false },
//     companyLogo: { type: String, required: false },
//     address: { type: Object, default: {}, required: false },
//     selectedCarriers: [{ type: Array, default: [] }],
//     shipments: [{ type: Schema.Types.ObjectId, ref: 'Shipment' }],
// }, {
//     timestamps: true, // This option will automatically create 'created_at' and 'updated_at' fields
// });

// const User = model("User", userSchema);

// export default User;

// const mongoose = require('mongoose');

// const shopSchema = new Schema({
//     CreateDate: {
//         type: Date,
//         default: Date.now,
//     },
//     CreatedBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // You can replace 'User' with the actual User schema if needed
//     },
//     LastUpdateDate: {
//         type: Date,
//         default: Date.now,
//     },
//     LastUpdatedBy: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // You can replace 'User' with the actual User schema if needed
//     },
//     IsMarkedToDelete: {
//         type: Boolean,
//         default: false,
//     },
//     Name: {
//         type: String,
//         required: true,
//     },
//     DivisionID: {
//         type: String,
//         required: true,
//     },
//     ParentShopId: {
//         type: String,
//         required: true,
//     },
//     DanaShopId: {
//         type: String,
//     },
//     Address: {
//         Country: {
//             type: String,
//             required: true,
//         },
//         Province: {
//             type: String,
//             required: true,
//         },
//         City: {
//             type: String,
//             required: true,
//         },
//         Area: {
//             type: String,
//             required: true,
//         },
//         Address1: {
//             type: String,
//             required: true,
//         },
//         Address2: {
//             type: String,
//         },
//         Postcode: {
//             type: String,
//             required: true,
//         },
//         Latitude: {
//             type: String,
//             required: true,
//         },
//         Longitude: {
//             type: String,
//             required: true,
//         },
//     },
// },
//     { collection: 'Shops' }
// );

// const Shops = model('Shop', shopSchema);

// export default Shops;

export interface IUser {
  userId: string;
  userEmail: string;
  userPassword: string;
  userPhone: string;
  userName: string;
  followers: any; //followers:Array<object>,
  following: any; //following:Array<object>,
  avatar: string;
}

const instaUserSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    userPassword: {
      type: String,
    },
    userName: {
      type: String,
    },
    followers: [
      {
        type: String,
      },
    ],
    following: [
      {
        type: String,
      },
    ],
    avatar: {
      type: String,
    },
  },
  { minimize: false, timestamps: true,collection: 'InstUsers' }
);
//minimize option is used within a schema to control whether empty objects (objects with no properties) should be saved in the MongoDB documents or not. When minimize is set to false, Mongoose will store empty objects in the documents, while setting it to true (which is the default) will remove empty objects when saving.

// 3. Create a Model.
const InstaUser = model<IUser>("InstUser", instaUserSchema);

export default InstaUser;
