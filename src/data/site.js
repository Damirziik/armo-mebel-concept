export const siteConfig = {
  phoneDisplay: '+7 705 378 87 70', phone: '+77053788770',
  whatsapp: 'https://wa.me/77053788770', instagram: 'https://www.instagram.com/armo_mebel_astana/',
  city: 'Астана, Казахстан',
  facts: [
    { value:'6', label:'лет на рынке' },
    { value:'3–15', label:'дней — заявленный срок изготовления' },
    { value:'01', label:'проект под ваше пространство' }
  ]
};

export function whatsappLink(projectTitle='') {
  const message = projectTitle
    ? `Здравствуйте! Мне понравился проект «${projectTitle}». Хочу узнать подробнее о подобном решении.`
    : 'Здравствуйте! Хочу заказать мебель и получить консультацию.';
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
