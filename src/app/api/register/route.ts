import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs'

export async function POST(req:any) {
    try {

        const { username, email, password } = await req.json();

        console.log("Request body:", { username, email, password }); // เพิ่ม log เพื่อตรวจสอบ request body

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({ username, email, password: hashedPassword });



        return NextResponse.json({ message: "User registered." }, { status: 201 })

    } catch(error) {
        console.error("Error in registration API:", error); // เพิ่มการ log ข้อผิดพลาด
        return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })

    }
}