import express from "express";
import { Resend } from "resend";
import 'dotenv/config'

const app = express();
app.use(express.json())

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", async (req, res) => {

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [req.body.email.toString()],
      subject: "Teste de e-mail",
      html: "<strong>it works!</strong>",
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
