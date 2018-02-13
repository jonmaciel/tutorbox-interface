import TableList from "views/VideoList/VideoList.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/videos", sidebarName: "Lista de Vídeos", navbarName: "Vídeos", icon: ContentPaste, component: TableList },
    { path: "/video/:id", component: MediaPlayer },
    { redirect: true, path: "/", to: "/videos", navbarName: "Redirect" }
];

export default appRoutes;
