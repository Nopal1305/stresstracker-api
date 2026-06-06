import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Tambahkan parameter 'type'
export const sendOtp = async (email, otpCode, type = 'register') => {
  try {
    // Siapkan variabel untuk subjek dan isi email
    let mailSubject = '';
    let mailHtml = '';

    if (type === 'register') {
      mailSubject = 'Verifikasi Pendaftaran Akun';
      mailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Selamat Datang!</h2>
          <p>Terima kasih telah mendaftar. Untuk menyelesaikan proses registrasi, gunakan kode OTP berikut:</p>
          <h1 style="color: #4CAF50; letter-spacing: 5px;">${otpCode}</h1>
          <p>Kode ini hanya berlaku selama 5 menit. Jangan bagikan kode ini kepada siapa pun.</p>
        </div>
      `;
    } else if (type === 'reset') {
      mailSubject = 'Permintaan Reset Password';
      mailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Reset Password Akun</h2>
          <p>Kami menerima permintaan untuk mengatur ulang password Anda. Berikut adalah kode OTP Anda:</p>
          <h1 style="color: #FF5722; letter-spacing: 5px;">${otpCode}</h1>
          <p>Kode ini akan kedaluwarsa dalam 5 menit. Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini dan akun Anda akan tetap aman.</p>
        </div>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: mailSubject,
      html: mailHtml,
    };

    // Eksekusi pengiriman (asumsi transporter Nodemailer sudah di-setup di atas)
    await transporter.sendMail(mailOptions);
    console.log(`Email OTP (${type}) berhasil dikirim ke ${email}`);

  } catch (error) {
    console.error('Gagal mengirim email:', error);
  }
};

export default sendOtp;