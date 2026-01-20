export const parseEnvToJson = (text: string): Record<string, string> => {
  const env: Record<string, string> = {};

  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...rest] = line.split("=");

      if (!key || rest.length === 0) return;

      env[key.trim()] = rest.join("=").trim();
    });

  return env;
};
