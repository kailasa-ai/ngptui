import { Conversation } from "@/types";

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

export const groupedConversationsBydate = (conversations: Conversation[]) => {
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDay();

  return conversations.reduce((acc, value) => {
    const date = new Date(value.created_at * 1000);

    if (date.getDay() === currentDay) {
      acc["Today"] = acc["Today"] || [];
      acc["Today"].push(value);

      return acc;
    }

    const year = yearFormatter.format(date);

    if (parseInt(year) === currentYear) {
      const month = monthFormatter.format(date);

      acc[month] = acc[month] || [];
      acc[month].push(value);

      return acc;
    }

    acc[year] = acc[year] || [];
    acc[year].push(value);

    return acc;
  }, {} as { [key: string]: any[] });
};
