import { ZONES } from "./data"

export interface QuizAnswers {
  zones: string[]
  type: string
  experience: string
}

export function getResult(answers: QuizAnswers): {
  suitable: boolean
  recommendation: string
  procedure: string
  message: string
} {
  const { zones, type, experience } = answers

  if (zones.length === 0) {
    return {
      suitable: false,
      recommendation: "Выберите зоны",
      procedure: "",
      message: "Пожалуйста, выберите хотя бы одну зону для эпиляции.",
    }
  }

  const zoneNames = zones.map((id) => ZONES.find((z) => z.id === id)?.name || id).join(", ")

  if (type === "laser") {
    if (experience === "first") {
      return {
        suitable: true,
        recommendation: "Лазерная эпиляция",
        procedure: "Диодный лазер",
        message: `Отлично! Лазерная эпиляция подходит для зон: ${zoneNames}. На первой консультации мастер подберёт мощность под ваш тип кожи. Волосы должны быть тёмными — это важно для результата.`,
      }
    }
    return {
      suitable: true,
      recommendation: "Лазерная эпиляция",
      procedure: "Диодный лазер",
      message: `Лазерная эпиляция — ваш лучший выбор для зон: ${zoneNames}. Продолжайте курс для стойкого результата.`,
    }
  }

  if (type === "wax") {
    return {
      suitable: true,
      recommendation: "Восковая / сахарная эпиляция",
      procedure: "Воск или сахар",
      message: `Классический метод для зон: ${zoneNames}. Быстро и эффективно. Результат держится 2–3 недели.`,
    }
  }

  // type === "unknown"
  if (experience === "first") {
    return {
      suitable: true,
      recommendation: "Лазерная эпиляция",
      procedure: "Диодный лазер",
      message: `Для зон: ${zoneNames} рекомендуем лазерную эпиляцию — это современный метод с долгосрочным результатом. На первой консультации расскажем всё и подберём параметры.`,
    }
  }

  return {
    suitable: true,
    recommendation: "Лазерная эпиляция",
    procedure: "Диодный лазер",
    message: `Для зон: ${zoneNames} лучше всего подходит лазерная эпиляция. Это даёт стойкий результат за несколько процедур.`,
  }
}