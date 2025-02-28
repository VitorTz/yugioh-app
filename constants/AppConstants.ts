import { Colors } from "./Colors";



export const AppConstants = {
    icon: {
        size: 32,
        color: Colors.white
    },
    hitSlopLarge: {
        left: 20,
        top: 20,
        right: 20,
        bottom: 20
    },
    hitSlop: {
        left: 10,
        top: 10,
        right: 10,
        bottom: 10
    },
    githubUrl: "https://github.com/VitorTz/yugioh-app",
    profileOptions: [
        {
          title: "Profile",
          subtitle: "name, email, password",
          iconName: "person-outline",
          shouldShowLoadingStatus: false
        },
        {
          title: "Settings",
          subtitle: "color theme",
          iconName: "settings-outline",
          shouldShowLoadingStatus: false
        },
        {
          title: "Github",
          subtitle: "source code",
          iconName: "logo-github",
          shouldShowLoadingStatus: false
        },
        {
          title: "Logout",
          subtitle: null,
          iconName: "log-out-outline",
          shouldShowLoadingStatus: true
        }
    ]
}