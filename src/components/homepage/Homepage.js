import HeroSection from "./HeroSection/HeroSection";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import checkIcon from "../../Assets/StockPhotos/check.png";

// teemp
import running from "../../Assets/StockPhotos/New/pexels-runffwpu-2168292.jpg";

import karate from "../../Assets/StockPhotos/Sports/pexels-artempodrez-6253307.jpg";
import swim from "../../Assets/StockPhotos/Sports/pexels-jim-de-ramos-395808-1263349.jpg";
import football2 from "../../Assets/StockPhotos/Sports/pexels-markusspiske-114296.jpg";
import bowling from "../../Assets/StockPhotos/Sports/pexels-pavel-danilyuk-7429604.jpg";
import ps3 from "../../Assets/StockPhotos/Sports/pexels-kowalievska-1174746.jpg";
import gym from "../../Assets/StockPhotos/Facilities/pexels-willpicturethis-1954524.jpg";

import "./styles.css";

// TODO replace with recomendations
const sports = [
    {
        img: karate,
        alt: "الكاراتيه",
        title: "Karate-كراتيه",
        description: "تعلم مهارات الدفاع عن النفس مع الكاراتيه، رياضة تركز على الانضباط واللياقة البدنية.",
        button: "عرض الأندية"
    },
    {
        img: swim,
        alt: "السباحة",
        title: "Swimming-السباحة",
        description: "استمتع بالسباحة كرياضة مائية رائعة تساعد في تحسين اللياقة البدنية.",
        button: "عرض المسابح"
    },
    {
        img: football2,
        alt: "كرة القدم",
        title: "Football-كرة القدم",
        description: "انضم إلى مباريات كرة القدم وطور مهاراتك في هذه الرياضة الجماعية الممتعة.",
        button: "عرض الملاعب"
    }
];

function Homepage() {
    return (
        <div>
            <HeroSection />

            <section className="we-info">
                <div className="we-info-content">
                    <h5>/من نحن؟/</h5>
                    <h1>إختر مرفقك الرياضي المناسب</h1>
                    <h3>!مرحبًا بكم في موقع "تمرينك" في الأردن</h3>
                    <p>
                        تمرينك هو موقع إلكتروني يهدف إلى تسهيل عملية استكشاف وحجز المرافق الرياضية في الأردن...
                    </p>

                    <div className="check">
                        {["حجز آمن", "اختيار سريع", "أفضل خدمة"].map((text, i) => (
                            <div key={i} className="check-item">
                                <img src={checkIcon} alt={text} loading="lazy" />
                                <h3>{text}</h3>
                            </div>
                        ))}
                    </div>

                    <p>
                        يمكن للمستخدمين الحجز مباشرة عبر الموقع، الدفع إلكترونيًا، وترك تقييماتهم بعد الاستخدام...
                    </p>
                </div>

                <div>
                    <img id="sport" src={running} alt="ملعب الجري" loading="lazy" />
                </div>
            </section>

            <section id="sports">
                <div id="title">
                    <h1>إختر رياضتك المفضلة الآن</h1>
                </div>

                <div className="sports-container">
  {sports.map((sport, index) => (
    <div className="sports-card" key={index}>
      <div className="sports-image-wrapper">
        <img src={sport.img} alt={sport.alt} loading="lazy" />
      </div>
      <div className="sports-content">
        <h3>{sport.title}</h3>
        <p>{sport.description}</p>
        <button>{sport.button}</button>
      </div>
    </div>
  ))}
</div>

            </section>
        </div>
    );
}

export default Homepage;
