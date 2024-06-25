export function getNext(role: string): string {
    switch (role) {
        case "ROLE_PATIENT":
            return "/patient-home-page";
        case "ROLE_DOCTOR":
            return "/doctor-home-page";
        default:
            return ""
    }
}