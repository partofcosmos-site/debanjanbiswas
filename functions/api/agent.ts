interface Env {
  SECRET_PASSPHRASE: string;
  GEMINI_API_KEY: string;
  GITHUB_PAT: string;
}

interface PagesFunctionContext<Env> {
  request: Request;
  env: Env;
}

export const onRequestPost = async (context: PagesFunctionContext<Env>) => {
  try {
    const requestData = await context.request.json() as { prompt: string; passphrase?: string };
    
    // 1. Authentication Check
    if (!requestData.passphrase || requestData.passphrase !== context.env.SECRET_PASSPHRASE) {
      return new Response(JSON.stringify({ error: "UNAUTHORIZED: Invalid passphrase." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!requestData.prompt) {
      return new Response(JSON.stringify({ error: "BAD REQUEST: Missing prompt." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const REPO_OWNER = "partofcosmos-site";
    const REPO_NAME = "debanjanbiswas";
    const FILE_PATH = "data/studentData.json";
    
    // 2. Fetch current data from GitHub
    const githubHeaders = {
      "Authorization": `Bearer ${context.env.GITHUB_PAT}`,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Agentic-Terminal-Function"
    };

    const githubUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const fileRes = await fetch(githubUrl, { headers: githubHeaders });
    
    if (!fileRes.ok) {
      const err = await fileRes.text();
      return new Response(JSON.stringify({ error: `Failed to fetch from GitHub: ${err}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const fileData = await fileRes.json() as { content: string; sha: string };
    const currentJsonString = atob(fileData.content);
    const fileSha = fileData.sha;

    // 3. Process with Gemini AI
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`;
    
    const aiPrompt = `You are an intelligent background agent for a student's portfolio website.
Your job is to read the user's natural language command and update their JSON database accordingly.

CURRENT JSON DATA:
${currentJsonString}

USER COMMAND:
"${requestData.prompt}"

INSTRUCTIONS:
1. Apply the user's command to the JSON data. (e.g. updating progress, adding a new book, etc.)
2. Output ONLY the raw, perfectly formatted JSON string.
3. Do NOT wrap the JSON in markdown blocks (e.g., no \`\`\`json). Just the raw JSON.`;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: aiPrompt }] }]
      })
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      return new Response(JSON.stringify({ error: `AI Processing Failed: ${err}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    const geminiData = await geminiRes.json() as { candidates: Array<{ content: { parts: Array<{ text: string }> } }> };
    let updatedJsonText = geminiData.candidates[0].content.parts[0].text;
    
    // Clean up if Gemini added markdown formatting anyway
    updatedJsonText = updatedJsonText.replace(/^```json\s*/, "").replace(/\s*```$/, "").trim();

    // Validate the new JSON
    try {
      JSON.parse(updatedJsonText);
    } catch {
      return new Response(JSON.stringify({ error: "AI returned invalid JSON. Try rewording your prompt." }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    // 4. Commit updated JSON to GitHub
    const base64UpdatedContent = btoa(unescape(encodeURIComponent(updatedJsonText)));
    
    const updateRes = await fetch(githubUrl, {
      method: "PUT",
      headers: githubHeaders,
      body: JSON.stringify({
        message: `agent: ${requestData.prompt}`,
        content: base64UpdatedContent,
        sha: fileSha
      })
    });

    if (!updateRes.ok) {
      const err = await updateRes.text();
      return new Response(JSON.stringify({ error: `GitHub Commit Failed: ${err}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ 
      message: "JSON database successfully updated.",
      rebuildTriggered: true
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: `Internal Server Error: ${errorMessage}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
