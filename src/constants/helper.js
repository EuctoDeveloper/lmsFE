export const NO_TOKEN_URL= [
    "login",
    "forgot-password",
    "forgotPassword",
    "resetPassword"
];
export const LOGIN_URL = "/login";

export const DATE_FORMAT = "DD-MM-YYYY";

export function postLoginFn(data) {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("email", data.userData.email);
    localStorage.setItem("name", data.userData.name);
    localStorage.setItem("role", data.userData.role);
}

export const downloadCSV = (heading, rows) => {
    const escapeCsvValue = (value) => {
        if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
        }
        return value;
    };

    const csvContent = [
        heading.map(escapeCsvValue).join(","),
        ...rows.map(row => row.map(escapeCsvValue).join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};