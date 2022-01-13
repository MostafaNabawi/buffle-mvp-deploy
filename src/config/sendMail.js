import emailjs, { init } from "@emailjs/browser";

const uid = "user_PGXUM2NcuDApNpiJBAEP3";
const template_id = "template_oq52ptc";
const service_id = "service_ez094vn";
const frontURl = process.env.BASE_URL || "http://localhost:3000";

async function sendMail(email, name, token) {
  const res = await emailjs.send(
    service_id,
    template_id,
    {
      to: email,
      name: name,
      message: `You can continue your registrition step through this link: ${frontURl}/register/step-two/${token}`,
    },
    init(uid)
  );
  return res.status;
}
export { sendMail };
