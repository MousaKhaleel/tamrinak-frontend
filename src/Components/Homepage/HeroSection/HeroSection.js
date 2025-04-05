import soccerPlayer from "../../../Assets/StockPhotos/soccer-player.png";
import CupGold from "../../../Assets/StockPhotos/Fatcow-Farm-Fresh-Cup-gold.32.png";
import community from "../../../Assets/StockPhotos/4.png";
import "./HeroSection.css";

function HeroSection() {
    return ( 
        <div>
            <section className="hero-section">
  <div className="hero-content">
    <h1>إبحث واحجز أفضل المرافق الرياضية</h1>
    <h4>إختر مرفق رياضي - حجز فوري مع دفع آمن</h4>
    <div className="hero-content-btn">
      <button id="content-btn1">تواصل معنا</button>
      <button id="content-btn2">من نحن؟</button>
    </div>
  </div>
  <div className="cards-container">
    <div className="card">
      <img src={soccerPlayer} alt="كرة قدم" loading="lazy" />
      <h3>الحجز السهل</h3>
      <hr />
      <p>
        يسمح الموقع بالحجز بسهولة للأندية والمرافق الرياضية، مما يوفر الوقت
        والجهد ويضمن لهم مكانًا في الأنشطة المفضلة لديهم.
      </p>
    </div>
    <div className="card">
      <img
        src={CupGold}
        alt="سهولة الاستخدام"
        loading="lazy"
      />
      <h3>سهولة الاستخدام</h3>
      <hr />
      <p>
        يتيح للمستخدمين الوصول السريع إلى المرافق الرياضية التي يبحثون عنها.
      </p>
    </div>
    <div className="card">
      <img src={community} alt="دعم المجتمع الرياضي" loading="lazy" />
      <h3>دعم المجتمع الرياضي</h3>
      <hr />
      <p>
        يساهم الموقع في بناء مجتمع رياضي قوي من خلال توفير الأماكن الرياضية
        القريبة منك.
      </p>
    </div>
  </div>
</section>

        </div>
     );
}

export default HeroSection;