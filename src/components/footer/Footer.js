import React from 'react';
import './Footer.css';

function Footer() {
    return ( 
        <div>
            <section className="contact-container">
  <div className="form-section">
    <h2>أرسل رسالة لنا</h2>
    <form>
      <input type="text" placeholder="الاسم" required="" />
      <input type="tel" placeholder="رقم الهاتف" required="" />
      <input type="email" placeholder="البريد الإلكتروني" required="" />
      <textarea
        placeholder="نص الرسالة"
        rows={4}
        required=""
        defaultValue={""}
      />
      <button type="submit">إرسال</button>
    </form>
  </div>
  <div className="info-section">
    <h2>تواصل معنا الآن</h2>
    <p>لا تتردد في التواصل معنا لأي استفسار أو طلب</p>
    <p>
      <span className="icon">📍</span> الموقع: جامعة البلقاء التطبيقية، السلط
    </p>
    <p>
      <span className="icon">📞</span>الهاتف: 0777309888
    </p>
    <p>
      <span className="icon">✉</span> tamrinak@email.com
    </p>
    <div className="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.636496835853!2d35.716793599999995!3d32.02495890000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cbd1654d5c8e5%3A0x61f22c89710c16af!2sAlBalqa%20Applied%20University!5e0!3m2!1sen!2sjo!4v1743679901705!5m2!1sen!2sjo"
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>

        </div>
     );
}

export default Footer;