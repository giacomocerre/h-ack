/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    NODE_ENV: "development" | "production" | "test";
    MEMORY_TWIN_ID: string;
  }
}
