import { InjectionToken } from "@angular/core";
export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface AppConfig {
    BASE_URL :          string,
    REGISTER_URL :      string
}

export const BaseAppConfig: AppConfig = {
    BASE_URL :          "http://localhost:3000",
    REGISTER_URL :      "/register"
}