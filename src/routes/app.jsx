import VideoList from "views/VideoList/VideoList.jsx";
import OrganizationList from "views/Organization/OrganizationList.jsx";
import Organization from "views/Organization/Organization.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import Login from "views/Login/Login.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/login", component: Login },
    { path: "/organizations", sidebarName: "Lista de Organizações", navbarName: '', icon: Person, component: OrganizationList },
    { path: "/organization/:id", component: Organization },
    { path: "/videos", sidebarName: "Lista de Vídeos", navbarName: '', icon: ContentPaste, component: VideoList },
    { path: "/video/:id", component: MediaPlayer },
    { redirect: true, path: "/", to: "/videos", navbarName: "Redirect" }
];

export default appRoutes;
