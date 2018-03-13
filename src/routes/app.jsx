import TableList from "views/VideoList/VideoList.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import Login from "views/Login/Login.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/login", component: Login },
    { path: "/videos", sidebarName: "Lista de Vídeos", navbarName: "Vídeos", icon: ContentPaste, component: TableList },
    { path: "/video/:id", component: MediaPlayer },
    { redirect: true, path: "/", to: "/videos", navbarName: "Redirect" }
];

export default appRoutes;
