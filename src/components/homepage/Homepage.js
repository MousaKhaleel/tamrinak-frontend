import HeroSection from "./HeroSection/HeroSection";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import checkIcon from "../../Assets/StockPhotos/check.png";

// Sports Images
import running from "../../Assets/StockPhotos/New/pexels-runffwpu-2168292.jpg";
import karate from "../../Assets/StockPhotos/karate.jpg";
import swim from "../../Assets/StockPhotos/swim.jpg";
import football2 from "../../Assets/StockPhotos/football2.jpg";
import bowling from "../../Assets/StockPhotos/bowling.jpg";
import ps3 from "../../Assets/StockPhotos/ps3.jpg";
import gym from "../../Assets/StockPhotos/gym.jpg";

// Styles
import "./styles.css";

// Sports Data TODO replace with API data
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
    },
    {
        img: bowling,
        alt: "لعبة البولينج",
        title: "Bowling-لعبة البولينج",
        description: "استمتع بتجربة البولينج في صالات مجهزة بأحدث التقنيات ومختلف المستويات.",
        button: "عرض صالات البولينج"
    },
    {
        img: ps3,
        alt: "الرياضات الإلكترونية",
        title: "Esports-الرياضات الإلكترونية",
        description: "استمتع بأحدث أجهزة اللعب في بيئة احترافية مع شاشات وأجهزة متطورة.",
        button: "عرض الأماكن"
    },
    {
        img: gym,
        alt: "كمال أجسام",
        title: "Bodybuilding-كمال الأجسام",
        description: "قم ببناء العضلات واللياقة البدنية من خلال مجموعة متنوعة من التمارين والتحديات.",
        button: "عرض الصالات"
    }
];

function Homepage() {
    return (
        <div>
            <NavigationBar />
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
                            <img src={sport.img} alt={sport.alt} loading="lazy" />
                            <h3>{sport.title}</h3>
                            <p>{sport.description}</p>
                            <button>{sport.button}</button>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Homepage;
