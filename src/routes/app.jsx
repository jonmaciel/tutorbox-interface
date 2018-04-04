import VideoList from "views/VideoList/VideoList.jsx";
import OrganizationList from "views/Organization/OrganizationList.jsx";
import TutormakerList from "views/Tutormaker/TutormakerList.jsx";
import Organization from "views/Organization/Organization.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/app/tutormakers", sidebarName: "Tutormakers", navbarName: '', icon: Person, component: TutormakerList, allowedRole: ['admin'] },
    { path: "/app/organizations", sidebarName: "Lista de Organizações", navbarName: '', icon: Person, component: OrganizationList, allowedRole: ['admin']},
    { path: "/app/organization/:id", component: Organization, allowedRole: ['admin'] },
    { path: "/app/videos", sidebarName: "Lista de Vídeos", navbarName: '', icon: ContentPaste, component: VideoList, allowedRole: ['admin', 'script_writer'] },
    { path: "/app/video/:id", component: MediaPlayer, allowedRole: ['admin', 'script_writer'] },
    { redirect: true, path: "/app", to: "/app/videos", navbarName: "Redirect" },
    { redirect: true, path: "/", to: "/app/videos", navbarName: "Redirect" }
];

export default appRoutes;
