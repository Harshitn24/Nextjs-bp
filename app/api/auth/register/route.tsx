
import { NextResponse } from 'next/server';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import connectDB from '@/utils/db';

export async function POST( req : Request, res : NextResponse) {
    
    try {
      const { email, password } = await req.json();

      await connectDB()
      const existingUser = await User.findOne({ email : email });
      
      if (existingUser) {
        return new NextResponse("This account already exist.", { status : 400})
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({email: email, password: hashedPassword });
      // .then(res => {
      //   console.log("user registered ");
      // })
      // .catch(err => {
      //   console.log('asdf',err);
      // })
      // console.log('asdfg')
      console.log(user);
      return NextResponse.json(user);
    } catch (error) {
        console.log(error)
      return new NextResponse("Some error occured." ,{ status : 500 })
    }
};
