export * from "./util";
export * from "./modal";
export * from "./table";
export * from "./toast";

export const daisyDataComponentsPlugin = {
    content: [
        "./modal/**/*.{html,js,ts,tsx,vue}",
        "./table/**/*.{html,js,ts,tsx,vue}",
        "./toast/**/*.{html,js,ts,tsx,vue}",
        "./util/**/*.{html,js,ts,tsx,vue}"
    ]
}
