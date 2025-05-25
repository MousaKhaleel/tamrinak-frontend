function FAQ() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">الأسئلة الشائعة</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">ما هو تطبيق تمرينك؟</h2>
          <p className="mt-2 text-gray-700">
            تمرينك هو منصة إلكترونية تساعدك على حجز الملاعب والمرافق الرياضية بكل سهولة. يمكنك تصفح المرافق، قراءة التقييمات، وحجز الوقت المناسب لك مباشرة من التطبيق.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">كيف يمكنني إنشاء حساب؟</h2>
          <p className="mt-2 text-gray-700">
            يمكنك إنشاء حساب من خلال الضغط على "تسجيل" في الصفحة الرئيسية، ثم إدخال بياناتك الأساسية مثل الاسم والبريد الإلكتروني وكلمة المرور.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">هل يمكنني تعديل أو إلغاء حجز بعد تأكيده؟</h2>
          <p className="mt-2 text-gray-700">
            نعم، يمكنك تعديل أو إلغاء الحجز من خلال صفحة "حجوزاتي" ضمن حسابك الشخصي، مع الالتزام بسياسة الإلغاء الخاصة بالمنشأة.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">كيف يمكنني تقييم ملعب بعد الحجز؟</h2>
          <p className="mt-2 text-gray-700">
            بعد انتهاء الحجز، يمكنك الذهاب إلى صفحة "حجوزاتي"، ثم اختيار الحجز المناسب والضغط على "أضف تقييمًا" لكتابة رأيك وتقييمك.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">هل يمكنني التواصل مع صاحب المنشأة؟</h2>
          <p className="mt-2 text-gray-700">
            نعم، يمكنك التواصل مع صاحب المنشأة عبر معلومات الاتصال المعروضة في صفحة تفاصيل الملعب أو من خلال نموذج الرسائل داخل التطبيق.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">هل أحتاج إلى دفع عبر الإنترنت؟</h2>
          <p className="mt-2 text-gray-700">
            يعتمد ذلك على سياسة المنشأة. بعض الملاعب تتطلب دفعاً مقدماً عبر الإنترنت، بينما يسمح البعض الآخر بالدفع عند الوصول.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
