import { FaFutbol, FaTrophy, FaUsers } from "react-icons/fa";
import "./HeroSection.css";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>إبحث واحجز أفضل المرافق الرياضية</h1>
        <h4>إختر مرفق رياضي - حجز فوري مع دفع آمن</h4>
        <div className="hero-content-btn">
          <Link to="/aboutUs" className="hero-btn outline">من نحن؟</Link>
          <Link to="/booking" className="hero-btn filled">ابدا الحجز</Link>
        </div>
      </div>

      <div className="home-cards-container">
        <Card
          icon={<FaFutbol size={48} />}
          title="الحجز السهل"
          description="يسمح الموقع بالحجز بسهولة للأندية والمرافق الرياضية، مما يوفر الوقت والجهد ويضمن لهم مكانًا في الأنشطة المفضلة لديهم."
        />
        <Card
          icon={<FaTrophy size={48} />}
          title="سهولة الاستخدام"
          description="يتيح للمستخدمين الوصول السريع إلى المرافق الرياضية التي يبحثون عنها."
        />
        <Card
          icon={<FaUsers size={48} />}
          title="دعم المجتمع الرياضي"
          description="يساهم الموقع في بناء مجتمع رياضي قوي من خلال توفير الأماكن الرياضية القريبة منك."
        />
      </div>
    </section>
  );
}

function Card({ icon, title, description }) {
  return (
    <div className="home-card">
      <div className="icon-wrapper">{icon}</div>
      <h3>{title}</h3>
      <hr />
      <p>{description}</p>
    </div>
  );
}

export default HeroSection;
