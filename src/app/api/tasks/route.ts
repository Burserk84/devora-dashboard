import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Task from "@/lib/models/Task";
import mongoose from "mongoose";

/**
 * Handles GET requests to fetch all tasks.
 * @returns A JSON response with the tasks or an error message.
 */
export async function GET() {
  try {
    await dbConnect(); // Ensure database is connected

    const tasks = await Task.find({}); // Fetch all tasks

    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create a new task.
 * @param req The incoming request object, which contains the task data in its body.
 * @returns A JSON response with the created task or an error message.
 */
export async function POST(req: Request) {
  try {
    await dbConnect(); // Ensure database is connected

    const body = await req.json(); // Parse the request body
    const task = await Task.create(body); // Create a new task

    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (error: unknown) {
    // Check if the error is a Mongoose validation error for more specific feedback
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    // Handle other potential errors
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unknown server error occurred";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
