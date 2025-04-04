import HeroSection from "./HeroSection/HeroSection";
import check from "../../Assets/StockPhotos/check.png";
import sport from "../../Assets/StockPhotos/sport.jpg";
import karate from "../../Assets/StockPhotos/karate.jpg";
import swim from "../../Assets/StockPhotos/swim.jpg";
import football2 from "../../Assets/StockPhotos/football2.jpg";
import bowling from "../../Assets/StockPhotos/bowling.jpg";
import ps3 from "../../Assets/StockPhotos/ps3.jpg";
import gym from "../../Assets/StockPhotos/gym.jpg";
import Taekwondo from "../../Assets/StockPhotos/Taekwondo.jpg";
import Footer from "../Footer/Footer";

function Homepage() {
    return (
        <div>
            <HeroSection />
            <div>
            {/* //TODO: devide further */}
                <section className="we-info">
                    <div className="we-info-content">
                        <h5>/من نحن؟/</h5>
                        <h1>إختر مرفقك الرياضي المناسب</h1>
                        <h3>!مرحبًا بكم في موقع "تمرينك" في الأردن</h3>
                        <p>
                            تمرينك هو موقع إلكتروني يهدف إلى تسهيل عملية استكشاف وحجز المرافق
                            الرياضية في الأردن. يتيح للمستخدمين العثور على ملاعب وصالات رياضية
                            بسهولة، ومعرفة تفاصيلها مثل الموقع، الأسعار، والتوافر.
                        </p>
                        <div className="check">
                            <div className="check-item">
                                <img src={check} alt="حجز آمن" loading="lazy" />
                                <h3>حجز آمن</h3>
                            </div>
                            <div className="check-item">
                                <img src={check} alt="اختيار سريع" loading="lazy" />
                                <h3>اختيار سريع</h3>
                            </div>
                            <div className="check-item">
                                <img src={check} alt="أفضل خدمة" loading="lazy" />
                                <h3>أفضل خدمة</h3>
                            </div>
                        </div>
                        <p>
                            يمكن للمستخدمين الحجز مباشرة عبر الموقع، الدفع إلكترونيًا، وترك
                            تقييماتهم بعد الاستخدام. كما يوفر الموقع لأصحاب المرافق الرياضية لوحة
                            تحكم لإدارة حجوزاتهم وزيادة عدد عملائهم.
                        </p>
                    </div>
                    <div>
                        <img id="sport" src={sport} alt="صورة رياضية" loading="lazy" />
                    </div>
                </section>
                {/* قسم الرياضات */}
                <section id="sports">
                    <div id="title">
                        <h1>إختر رياضتك المفضلة الأن</h1>
                    </div>
                    <div className="sports-container">
                        <div className="sports-card">
                            <img src={karate} alt="الكاراتيه" loading="lazy" />
                            <h3>Karate-كراتيه</h3>
                            <p>
                                تعلم مهارات الدفاع عن النفس مع الكاراتيه، رياضة تركز على الانضباط
                                واللياقة البدنية.
                            </p>
                            <button>عرض الأندية</button>
                        </div>
                        <div className="sports-card">
                            <img src={swim} alt="السباحة" loading="lazy" />
                            <h3>Swimming-السباحة</h3>
                            <p>
                                استمتع بالسباحة كرياضة مائية رائعة تساعد في تحسين اللياقة البدنية.
                            </p>
                            <button>عرض المسابح</button>
                        </div>
                        <div className="sports-card">
                            <img src={football2} alt="كرة القدم" loading="lazy" />
                            <h3>football-كرة القدم</h3>
                            <p>
                                انضم إلى مباريات كرة القدم وطور مهاراتك في هذه الرياضة الجماعية
                                الممتعة.
                            </p>
                            <button>عرض الملاعب</button>
                        </div>
                        <div className="sports-card">
                            <img src={bowling} alt="لعبة البولينج" loading="lazy" />
                            <h3>Bowling-لعبة البولينج</h3>
                            <p>
                                استمتع بتجربة البولينج في صالات مجهزة بأحدث التقنيات ومختلف المستويات.
                            </p>
                            <button>عرض صالات البولينج</button>
                        </div>
                        <div className="sports-card">
                            <img src={ps3} alt="الرياضات الإلكترونية" loading="lazy" />
                            <h3>
                                <span>Esports-</span>الرياضات الإلكترونية
                            </h3>
                            <p>استمتع بأحدث أجهزة اللعب في بيئة احترافية مع شاشات وأجهزة متطورة.</p>
                            <button>عرض الأماكن</button>
                        </div>
                        <div className="sports-card bodybuilding">
                            <img src={gym} alt="كمال أجسام" loading="lazy" />
                            <h3>
                                <span>Bodybuilding-</span>كمال الأجسام
                            </h3>
                            <p>
                                قم ببناء العضلات واللياقة البدنية من خلال مجموعة متنوعة من التمارين
                                والتحديات.
                            </p>
                            <button>عرض الصالات</button>
                        </div>
                        <div className="sports-card taekwondo-card">
                            <img src={Taekwondo} alt="تايكوندو" loading="lazy" />
                            <h3>Taekwondo-التايكواندو</h3>
                            <p>
                                تقدم لعبة التايكواندو تجربة مثيرة للاعبين من خلال تقنيات القتال
                                الكورية، بما في ذلك الضربات والركلات، مع إمكانية مواجهة خصوم في
                                مباريات تنافسية.
                            </p>
                            <button>عرض الأندية</button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Homepage;