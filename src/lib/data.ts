export interface Service {
  id: string
  name: string
  description: string
  price: string
  duration: string
  icon: string
}

export interface Zone {
  id: string
  name: string
  icon: string
}

export const SERVICES: Service[] = [
  {
    id: "laser",
    name: "Лазерная эпиляция",
    description: "Диодный лазер — безопасно и эффективно. Удаляет волосы надолго.",
    price: "от 500 ₽",
    duration: "15–60 мин",
    icon: "💡",
  },
  {
    id: "wax",
    name: "Восковая / сахарная эпиляция",
    description: "Классические методы для быстрого результата. Подходит для всех типов кожи.",
    price: "от 400 ₽",
    duration: "20–45 мин",
    icon: "🍯",
  },
  {
    id: "massage",
    name: "Массаж лица",
    description: "Подтяжка овала, улучшение кровообращения, свежий вид.",
    price: "800 ₽",
    duration: "40 мин",
    icon: "💎",
  },
  {
    id: "baro",
    name: "Барофорез",
    description: "Интенсивное увлажнение и питание кожи. Глубокое проникновение сыворотки.",
    price: "2 500 ₽",
    duration: "60 мин",
    icon: "🌿",
  },
]

export const ZONES: Zone[] = [
  { id: "legs", name: "Ноги", icon: "🦵" },
  { id: "bikini", name: "Бикини", icon: "✨" },
  { id: "underarms", name: "Подмышки", icon: "💪" },
  { id: "face", name: "Лицо", icon: "😊" },
  { id: "arms", name: "Руки", icon: "🤲" },
  { id: "belly", name: "Живот", icon: "🫄" },
  { id: "back", name: "Спина", icon: "🔙" },
]

export const CONTACTS = {
  phone: "+7 (900) 312-09-39",
  phoneHref: "tel:+79003120939",
  whatsapp: "https://wa.me/79003120939",
  vk: "https://vk.com/bella.me64",
  address: "г. Саратов, ул. им. Зарубина В.С., 150а",
  addressDetail: "каб. 206, 2 этаж, вход со двора",
  hours: "9:00–20:00, без выходных",
}

export const REVIEWS = [
  {
    name: "Анна",
    text: "Делала лазерную эпиляцию ног — результат превзошёл ожидания! После третьей процедуры волосы практически исчезли. Мастер очень аккуратный, всё объяснила.",
    source: "Avito",
  },
  {
    name: "Мария",
    text: "Пришла на массаж лица — кожа просто сияет! Приятная атмосфера, чистота, комфорт. Теперь хожу регулярно.",
    source: "Avito",
  },
  {
    name: "Екатерина",
    text: "Делала барофорез — кожа после процедуры как у младенца! Очень довольна, рекомендую эту студию всем подругам.",
    source: "Avito",
  },
]

export const AFTERCARE = [
  {
    title: "До процедуры",
    items: [
      "Не загорайте 2 недели до процедуры",
      "Не вырывайте волосы 2–3 недели (можно брить)",
      "Не наносите крем за сутки до сеанса",
      "При лазерной эпиляции — волосы должны быть тёмными",
    ],
  },
  {
    title: "После процедуры",
    items: [
      "Не загорайте 2 недели после сеанса",
      "Не посещайте баню/сауну 3 дня",
      "Наносите солнцезащитный крем SPF 50+",
      "Не расчёсывайте обработанную зону",
      "Используйте рекомендованный крем для успокоения кожи",
    ],
  },
]