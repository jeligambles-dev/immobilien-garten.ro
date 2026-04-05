import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { name, phone, email, service, message } = await req.json();

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Completează toate câmpurile obligatorii." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const toEmail = process.env.CONTACT_EMAIL || "contact@immobilien-garten.ro";
    const fromEmail = process.env.RESEND_FROM || "Immobilien Garten <onboarding@resend.dev>";

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email || undefined,
      subject: `Cerere nouă: ${service || "Contact"} — ${name}`,
      html: `
        <h2>Cerere nouă de pe site</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Nume</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="tel:${phone}">${phone}</a></td></tr>
          ${email ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>` : ""}
          ${service ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Serviciu</td><td style="padding:8px;border-bottom:1px solid #eee;">${service}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Mesaj</td><td style="padding:8px;border-bottom:1px solid #eee;">${message.replace(/\n/g, "<br>")}</td></tr>
        </table>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: result.error.message || "Eroare la trimitere." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare la trimitere." },
      { status: 500 }
    );
  }
}
