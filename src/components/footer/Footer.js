import React from 'react';
import './Footer.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { contactUs } from '../../Services/adminService';

function Footer() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      const response = await contactUs(name, email, message);
      if (response.success) {
        alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
        form.reset();
      } else {
        alert('حدث خطأ أثناء إرسال الرسالة: ' + (response.message || 'يرجى المحاولة لاحقاً'));
      }
    } catch (error) {
      console.error('Error contacting us:', error);
      alert('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.');
    }
  };

  return (
    <footer id='contact' className="footer">
      <div className="footer-container">
        <div className="info-section">
          <h2>تواصل معنا الآن</h2>
          <p>لا تتردد في التواصل معنا لأي استفسار أو طلب</p>
          <p>
            <FaMapMarkerAlt className="icon" /> الموقع: جامعة البلقاء التطبيقية، السلط
          </p>
          <p>
            <FaPhoneAlt className="icon" /> الهاتف: 0777309888
          </p>
          <p>
            <FaEnvelope className="icon" /> tamrinak@gmail.com
          </p>
          <div className="map">
            <iframe
              title="موقع جامعة البلقاء التطبيقية"
              style={{ borderRadius: '10px' }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.636496835853!2d35.716793599999995!3d32.02495890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cbd1654d5c8e5%3A0x61f22c89710c16af!2sAlBalqa%20Applied%20University!5e0!3m2!1sen!2sjo!4v1743679901705!5m2!1sen!2sjo"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="vertical-divider"></div>

        <div className="form-section">
          <h2>أرسل رسالة لنا</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="الاسم" required />
            <input name="email" type="email" placeholder="البريد الإلكتروني" required />
            <textarea name="message" placeholder="نص الرسالة" rows={4} required />
            <button type="submit">إرسال</button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;