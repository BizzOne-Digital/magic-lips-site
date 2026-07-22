import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import PageContent, { PageKey } from "@/models/PageContent";
import { PAGE_CONTENT_DEFAULTS, mergePageContent } from "@/lib/pageContentDefaults";
import { isAdminAuthenticated } from "@/lib/auth";

const VALID_KEYS: PageKey[] = ["home", "about", "contact", "offers"];

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const pageKey = request.nextUrl.searchParams.get("page") as PageKey | null;

    if (pageKey) {
      if (!VALID_KEYS.includes(pageKey)) {
        return NextResponse.json({ error: "Invalid page key" }, { status: 400 });
      }
      const doc = await PageContent.findOne({ pageKey }).lean();
      return NextResponse.json({
        pageKey,
        content: mergePageContent(pageKey, doc?.content as Record<string, unknown> | undefined),
      });
    }

    const docs = await PageContent.find({ pageKey: { $in: VALID_KEYS } }).lean();
    const byKey = Object.fromEntries(docs.map((d) => [d.pageKey, d.content]));
    const pages = Object.fromEntries(
      VALID_KEYS.map((key) => [key, mergePageContent(key, byKey[key] as Record<string, unknown> | undefined)])
    );

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Page content GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isAdminAuthenticated(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const pageKey = body.pageKey as PageKey;
    const content = body.content as Record<string, unknown>;

    if (!VALID_KEYS.includes(pageKey) || !content || typeof content !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const defaults = PAGE_CONTENT_DEFAULTS[pageKey];
    const cleaned: Record<string, unknown> = {};
    for (const key of Object.keys(defaults)) {
      if (content[key] !== undefined) cleaned[key] = content[key];
    }

    const doc = await PageContent.findOneAndUpdate(
      { pageKey },
      { pageKey, content: cleaned },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      pageKey,
      content: mergePageContent(pageKey, doc.content as Record<string, unknown>),
    });
  } catch (error) {
    console.error("Page content PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
