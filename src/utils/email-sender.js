import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOtp = async (targetEmail, otpCode) => {
  const mailOptions = {
    from: `"Stress Tracker App" <${process.env.EMAIL_USER}>`,
    to: targetEmail,
    subject: 'Kode Verifikasi Registrasi',
    html: `
      <h2>Selamat Datang!</h2>
      <p>Terima kasih telah mendaftar. Berikut adalah kode verifikasi Anda:</p>
      <h1 style="color: #4CAF50; letter-spacing: 5px;">${otpCode}</h1>
      <p><i>Kode ini hanya berlaku selama 5 menit. Jangan berikan kode ini kepada siapa pun.</i></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️ Email OTP berhasil dikirim ke ${targetEmail}`);
  } catch (error) {
    console.error('Gagal mengirim email:', error);
  }
};

export default sendOtp;