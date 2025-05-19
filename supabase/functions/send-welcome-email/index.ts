
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a Supabase client
const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const { record, type } = await req.json();

    // Check if this is a user signup event
    if (type === "INSERT" && record?.id && record?.email) {
      // Check if user is from Deakin
      const isDeakinUser = record.email.toLowerCase().endsWith("@deakin.edu.au");
      
      // Get user profile information
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', record.id)
        .single();

      // Send a welcome email
      // In a real production environment, you would use an email service like SendGrid, Resend, etc.
      console.log(`🎉 Welcome email would be sent to ${record.email}`);
      console.log(`User details: ${JSON.stringify({ 
        id: record.id,
        email: record.email,
        isDeakinUser,
        profile
      })}`);

      // For a real implementation, you'd add your email sending logic here
      // Example: await sendEmailWithResend(record.email, "Welcome to InnovAIte", welcomeEmailTemplate(record.email, isDeakinUser));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// For production, you would implement a real email function like below:
/*
async function sendEmailWithResend(to: string, subject: string, html: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  if (!RESEND_API_KEY) {
    throw new Error("Missing Resend API key");
  }
  
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "InnovAIte <no-reply@yourcompany.com>",
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Failed to send email: ${JSON.stringify(data)}`);
  }
  
  return data;
}

function welcomeEmailTemplate(email: string, isDeakinUser: boolean) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1E40AF; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666; }
        .button { display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; 
                  text-decoration: none; border-radius: 5px; margin-top: 15px; }
        .special { background-color: #5046e5; border: 1px solid #6366f1; padding: 15px; margin: 15px 0; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to InnovAIte!</h1>
        </div>
        <div class="content">
          <p>Hello,</p>
          <p>Thank you for creating an account with InnovAIte. We're excited to have you join our community!</p>
          
          ${isDeakinUser ? `
            <div class="special">
              <h3>Special Deakin University Access</h3>
              <p>We've identified that you're using a Deakin University email address. You now have access to exclusive Deakin-only content and features!</p>
            </div>
          ` : ''}
          
          <p>Get started by exploring our platform:</p>
          <a href="https://your-app-url.com/dashboard" class="button">Go to Dashboard</a>
          
          <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
          
          <p>Best regards,<br>The InnovAIte Team</p>
        </div>
        <div class="footer">
          <p>© 2025 InnovAIte. All rights reserved.</p>
          <p>This email was sent to ${email}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
*/
