import { z } from "zod";

import { envConfig, modelKeys } from "@/env.config";

export const avatarModelSchema = z.object({
  model: z.enum(modelKeys, {
    invalid_type_error: "Invalid model name provided.",
    required_error: "Model name is required.",
    message: "Invalid model name provided.",
  }),
});

export const getApiKey = async (searchParams: URLSearchParams) => {
  const validParams = await avatarModelSchema.parseAsync({
    model: searchParams.get("model"),
  });

  const model = validParams.model;

  return process.env[envConfig[model]];
};

export const getApiKeyfromModel = async (model?: string) => {
  const validParams = await avatarModelSchema.parseAsync({
    model,
  });

  return process.env[envConfig[validParams.model]];
};
