import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { hash } from "bcrypt"

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: 'https://firebasestorage.googleapis.com/v0/b/olxrn-427a6.appspot.com/o/guest.png?alt=media&token=f12a183a-4662-4480-b51b-7886c7887ec2' })
    picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
export const UserModel = 'User'
export type UserDocument = User & Document


UserSchema.pre('save', async function (next) {

    const hashedPassword = await hash(this.password, 10)
    this.password = hashedPassword
    console.log(hashedPassword)
    next()
    
})


