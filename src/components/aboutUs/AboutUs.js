import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import basketball from '../../Assets/AboutUs/people_basketball.jpg';
import editUser from '../../Assets/AboutUs/edit-user-color-icon.png';
import bookingConfirmed from '../../Assets/AboutUs/booking-confirmed-icon.png';
import gym_7208457 from '../../Assets/AboutUs/gym_7208457.png';
import enterprise6419109 from '../../Assets/AboutUs/enterprise_6419109.png';

import avatar from '../../Assets/Defaults/profile-42914_1280.png';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [rotatingWord, setRotatingWord] = useState("سريعة");
  const words = ["سريعة", "بسيطة", "ذكية", "موثوقة"];

  useEffect(() => {
    const changeWord = () => {
      setRotatingWord((prev) => {
        const currentIndex = words.indexOf(prev);
        return words[(currentIndex + 1) % words.length];
      });
    };
    const intervalId = setInterval(changeWord, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    const startCount = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 100;
        const increment = Math.ceil(target / speed);

        let count = 0;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = count.toLocaleString();
            setTimeout(updateCount, 10);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCount();
      });
    };

    const statsSection = document.querySelector('.stats-section');
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !statsStarted) {
        statsStarted = true;
        startCount();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-sect">
        <div className="hero-content">
          <h1>مرحباً بك في <span style={{ color: '#F5C45E', fontSize: '40px' }}>Tamrinak</span></h1>
          <h2>
            نحن هنا لتقديم تجربة
            <span id="rotating-word" className="fade-word">{rotatingWord}</span>
            لحجز المرافق الرياضية.
          </h2>
          <Link to="/sports" className="start-button">ابدأ التجربة</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="abou-container">
        <div className="img-people">
          <img src={basketball} alt="People Playing Sports" />
        </div>
        <div className="content">
          <h1>مرحباً بك في <span>Tamrinak</span></h1>
          <p>
            نحن فريق من عشّاق التكنولوجيا والرياضة، جمعنا شغفنا لتقديم منصة رقمية حديثة تسهّل على الأفراد الوصول إلى الملاعب والصالات الرياضية في عمّان بطريقة ذكية ومريحة.
          </p>
          <p>
            لاحظنا التحديات اليومية التي يواجهها الرياضيون عند محاولة حجز المرافق الرياضية، خاصة مع الاعتماد على وسائل تقليدية مثل المكالمات الهاتفية أو التواصل عبر وسائل التواصل الاجتماعي، مما يؤدي إلى ضياع الوقت والجهد، بل وأحيانًا تفويت الفرصة في الحجز.
          </p>
          <p>
            من هنا وُلدت فكرة منصتنا <strong className="highlight">Tamrinak</strong> لتكون نقطة التقاء موثوقة بين اللاعبين وأصحاب المنشآت الرياضية. نحن نهدف إلى:
          </p>
          <ul className="goals-list">
            <li><span className="icon">&larr;</span>  توفير تجربة سلسة واحترافية لحجز المرافق والاندية الرياضية.</li>
            <li><span className="icon">&larr;</span> تمكين المستخدم من استعراض المرافق ومعرفة الأسعار .</li>
            <li><span className="icon">&larr;</span> تقديم واجهة استخدام بسيطة وسريعة للمستخدمين.</li>
            <li><span className="icon">&larr;</span> إتاحة الحجز المباشر دون الحاجة لوسائل تقليدية.</li>
            <li><span className="icon">&larr;</span> تطوير المنصة باستمرار لتلبية احتياجات المجتمع الرياضي.</li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h2>إحصائيات المنصة</h2>
        <div className="stats">
          <div className="stat-item green">
            <img src={editUser} alt="Users" className="stat-icon" />
            <span className="stat-number" data-target="1200">0</span>
            <p>عملية تسجيل </p>
          </div>
          <div className="stat-item red">
            <img src={bookingConfirmed} alt="Bookings" className="stat-icon" />
            <span className="stat-number" data-target="3500">0</span>
            <p> عملية حجز</p>
          </div>
          <div className="stat-item blue">
            <img src={gym_7208457} alt="Facilities" className="stat-icon" />
            <span className="stat-number" data-target="50">0</span>
            <p> مرفق رياضي</p>
          </div>
          <div className="stat-item purple">
            <img src={enterprise6419109} alt="Visitors" className="stat-icon" />
            <span className="stat-number" data-target="8900">0</span>
            <p>زائر </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <h2 className='text-center mt-5'>فريقنا</h2>
        <div className="team-container">
          <div className="team-row">
            {["يزيد محمد الفيومي", "دانيال أيمن جبر", "موسى محمد خليل", "سيف الله المحمديين", "بكر باسم"].map((name, index) => (
              <div className="our-team" key={index}>
                <div className="picture">
                  <img src={avatar} alt={name} />
                </div>
                <div className="team-content">
                  <h3 className="name">{name}</h3>
                  <h4 className="title">هندسة البرمجيات</h4>
                </div>
                <ul className="social">
                  <li><a href="#" className="fa fa-facebook"></a></li>
                  <li><a href="#" className="fa fa-instagram"></a></li>
                  <li><a href="#" className="fa fa-linkedin"></a></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className='text-center mt-5'>انظر أيضًا</h4>
          <Link to="/faq" className='text-center d-block mb-5'>الأسئلة الشائعة</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
