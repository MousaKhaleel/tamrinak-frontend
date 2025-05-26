import React from "react";

function FAQ() {
  return (
    <div className="container py-5" dir="rtl">
      <h1 className="text-center mb-5 fw-bold">الأسئلة الشائعة</h1>

      <div className="accordion" id="faqAccordion">
        {[
          {
            question: "ما هو تطبيق تمرينك؟",
            answer:
              "تمرينك هو منصة إلكترونية تساعدك على حجز الملاعب والمرافق الرياضية بكل سهولة. يمكنك تصفح المرافق، قراءة التقييمات، وحجز الوقت المناسب لك مباشرة من التطبيق.",
          },
          {
            question: "كيف يمكنني إنشاء حساب؟",
            answer:
              "يمكنك إنشاء حساب من خلال الضغط على \"تسجيل\" في الصفحة الرئيسية، ثم إدخال بياناتك الأساسية مثل الاسم والبريد الإلكتروني وكلمة المرور.",
          },
          {
            question: "هل يمكنني تعديل أو إلغاء حجز بعد تأكيده؟",
            answer:
              "نعم، يمكنك تعديل أو إلغاء الحجز من خلال صفحة \"حجوزاتي\" ضمن حسابك الشخصي، مع الالتزام بسياسة الإلغاء الخاصة بالمنشأة.",
          },
          {
            question: "كيف يمكنني تقييم ملعب بعد الحجز؟",
            answer:
              "بعد انتهاء الحجز، يمكنك الذهاب إلى صفحة \"حجوزاتي\"، ثم اختيار الحجز المناسب والضغط على \"أضف تقييمًا\" لكتابة رأيك وتقييمك.",
          },
          {
            question: "هل يمكنني التواصل مع صاحب المنشأة؟",
            answer:
              "نعم، يمكنك التواصل مع صاحب المنشأة عبر معلومات الاتصال المعروضة في صفحة تفاصيل الملعب أو من خلال نموذج الرسائل داخل التطبيق.",
          },
          {
            question: "هل أحتاج إلى دفع عبر الإنترنت؟",
            answer:
              "يعتمد ذلك على سياسة المنشأة. بعض الملاعب تتطلب دفعاً مقدماً عبر الإنترنت، بينما يسمح البعض الآخر بالدفع عند الوصول.",
          },
        ].map(({ question, answer }, idx) => (
          <div className="accordion-item" key={idx}>
            <h2 className="accordion-header" id={`heading${idx}`}>
              <button
                className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${idx}`}
                aria-expanded={idx === 0 ? "true" : "false"}
                aria-controls={`collapse${idx}`}
              >
                {question}
              </button>
            </h2>
            <div
              id={`collapse${idx}`}
              className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
              aria-labelledby={`heading${idx}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
