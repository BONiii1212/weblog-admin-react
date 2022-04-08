import { AuthProvider } from "./auth-context"

export const AppProviders = ({children}) => {
    return (
        <AuthProvider>{children}</AuthProvider>
    )
}