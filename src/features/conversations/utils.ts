import { Conversation } from "@/types/chat";

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const groupedConversationsBydate = (conversations: Conversation[]) => {
  const currentDate = new Date();
  const yesterday = new Date(currentDate).setDate(currentDate.getDate() - 1);
  const currentYear = currentDate.getFullYear();

  return conversations.reduce((acc, value) => {
    const date = new Date(value.created_at * 1000);
    const dayFormat = dateFormatter.format(date);

    if (dayFormat === dateFormatter.format(currentDate)) {
      acc["Today"] = acc["Today"] || [];
      acc["Today"].push(value);

      return acc;
    }

    if (dayFormat === dateFormatter.format(yesterday)) {
      acc["Yesterday"] = acc["Yesterday"] || [];
      acc["Yesterday"].push(value);

      return acc;
    }

    if (((currentDate as any) - (date as any)) / (3600 * 24 * 1000) < 7) {
      acc["Previous 7 Days"] = acc["Previous 7 Days"] || [];
      acc["Previous 7 Days"].push(value);

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
