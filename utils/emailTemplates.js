export function acceptedEmail({ name, courseName, whatsappLink }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>🎉 Enrollment Approved!</h2>

      <p>Dear <b>${name}</b>,</p>

      <p>
        Congratulations! Your enrollment for the course
        <b>${courseName}</b> has been <b>approved</b>.
      </p>

      ${
  whatsappLink
    ? `<p>
        👉 Please join the official WhatsApp group using the link below:
        <br/>
        <a href="${whatsappLink}" target="_blank">
          Join WhatsApp Group
        </a>
      </p>

      <p>
        🎥 Before classes begin, please watch our Zoom setup guide:
        <br/>
        <a href="https://youtube.com/shorts/-iMDKs63NYQ?si=B5-ILAXJmHPI6UBM" target="_blank">
          How to Install & Set Up Zoom for Classes
        </a>
      </p>`
          : `<p>
              📌 Our team will contact you shortly with further details.
            </p>`
      }

      <p>
        If you have any questions, feel free to contact us.
      </p>

      <p>
        Regards,<br/>
        <b>Al-Maahir Academy</b>
      </p>
    </div>
  `;
}

export function rejectedEmail({ name, courseName }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6">
      <h2>Enrollment Update</h2>

      <p>Dear <b>${name}</b>,</p>

      <p>
        Thank you for your interest in the course
        <b>${courseName}</b>.
      </p>

      <p>
        After careful review, we regret to inform you that
        your enrollment could not be approved at this time.
      </p>

      <p>
        You are most welcome to apply again in the future.
      </p>

      <p>
        Regards,<br/>
        <b>Al-Maahir Academy</b>
      </p>
    </div>
  `;
}
