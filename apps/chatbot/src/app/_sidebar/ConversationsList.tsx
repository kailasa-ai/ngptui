"use client";

import { useState } from "react";
import ConversationItem from "./ConversationItem";

const data = [
  {
    id: "13907c16-34e3-45a0-9e88-98985298d227",
    name: "identifying the capital city of Maharashtra",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713493137,
  },
  {
    id: "6237f9cd-a721-48e8-9fb0-89556e71fb60",
    name: "inquiring about the capital city of Maharashtra",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713460922,
  },
  {
    id: "d7ed5e1f-50eb-4b58-9a17-8ef5058acfa2",
    name: "asking about chemistry compound",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713460831,
  },
  {
    id: "428758a0-003d-4717-91bb-c10fca169031",
    name: "inquiring about the capital city of Maharashtra",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713460701,
  },
  {
    id: "0325551f-d13a-4fb4-9034-a93c83e4056a",
    name: "inquiring about the capital city of Maharashtra",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713460420,
  },
  {
    id: "4c4c672c-1c07-4844-b7de-0e450d9ef2ad",
    name: "inquiring about the capital city of Telangana",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713460388,
  },
  {
    id: "35930cdb-7397-442a-8c5d-071c7ebb092d",
    name: "inquiring about the capital of Tamil Nadu",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713448500,
  },
  {
    id: "0921dcbc-81dd-466a-ab66-3dbc2735d759",
    name: "inquiring about the capital city of Tamilnadu",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713448098,
  },
  {
    id: "37a666b4-b73f-4cc2-8905-95d43f12178d",
    name: "inquiring about capital city of Karnataka",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713447476,
  },
  {
    id: "9c25dbfe-5321-4b95-af44-60b472fdfd4c",
    name: "Greeting myself☺️",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713444096,
  },
  {
    id: "cac4fe84-d35f-4b69-b561-d5057abfda0b",
    name: "Greeting myself☺️",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1713444096,
  },
  {
    id: "160731fb-0c7d-4b7b-b8ba-c693f5554ca5",
    name: "Greeting myself☺️",
    inputs: {},
    status: "normal",
    introduction: "",
    created_at: 1682188200,
  },
];

const yearFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric", // '2-digit', 'numeric'
});

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long", // '2-digit', 'numeric'
});

const ConversationsList = () => {
  const [conversations] = useState(() => {
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDay();
    return data.reduce((acc, value) => {
      const date = new Date(value.created_at * 1000);

      if (date.getDay() === currentDay) {
        if (!acc["Today"]) {
          acc["Today"] = [];
        }

        acc["Today"].push(value);

        return acc;
      }

      const year = yearFormatter.format(date);

      if (parseInt(year) === currentYear) {
        const month = monthFormatter.format(date);

        if (!acc[month]) {
          acc[month] = [];
        }

        acc[month].push(value);

        return acc;
      }

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(value);

      return acc;
    }, {} as { [key: string]: any[] });
  });

  return (
    <div className="flex flex-col pb-3 gap-5 text-gray-950">
      {Object.keys(conversations).map((key) => {
        return (
          <div className="h-auto empty:hidden first:mt-5 empty:mt-0" key={key}>
            <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-gray-400">
              {key}
            </h3>
            <ol>
              {conversations[key].map((conversation: any) => {
                return (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationsList;
