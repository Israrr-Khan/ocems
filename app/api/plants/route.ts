import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const plants = await db.orm.public.Plant
      .orderBy((p) => p.createdAt.desc())
      .limit(100)
      .all();

    return NextResponse.json({
      success: true,
      data: plants,
    });
  } catch (error) {
    console.error("Plants API error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "PLANTS_FETCH_FAILED",
        message: "Unable to fetch plants",
      },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, location, description } = body;

    if (typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_PLANT_DATA",
          message: "name is required",
        },
        { status: 400 }
      );
    }

    const plant = await db.orm.public.Plant.create({
      name,
      location,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        data: plant,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Plant POST error:", error);

    return NextResponse.json(
      {
        success: false,
        code: "PLANT_CREATE_FAILED",
        message: "Unable to create plant",
      },
      { status: 500 }
    );
  }
}