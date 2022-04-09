import { AuthProvider } from "./auth-context"
import { MenuProvider } from "./menu-context"

export const AppProviders = ({children}) => {
    return (
        <AuthProvider>
            <MenuProvider>
                {children}
            </MenuProvider>
        </AuthProvider>
    )
}