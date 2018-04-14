import VideoList from "views/VideoList/VideoList.jsx";
import OrganizationList from "views/Organization/OrganizationList.jsx";
import TutormakerList from "views/Tutormaker/TutormakerList.jsx";
import Organization from "views/Organization/Organization.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import Login from "views/Login/Login.jsx";
import {
    Dashboard, Person, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const appRoutes = [
    { path: "/login", component: Login },
    { path: "/tutormakers", sidebarName: "Tutormakers", navbarName: '', icon: Person, component: TutormakerList, allowedRole: ['admin'] },
    { path: "/organizations", sidebarName: "Lista de Organizações", navbarName: '', icon: Person, component: OrganizationList, allowedRole: ['admin']},
    { path: "/organization/:id", component: Organization, allowedRole: ['admin'] },
    { path: "/videos", sidebarName: "Lista de Vídeos", navbarName: '', icon: ContentPaste, component: VideoList, allowedRole: ['admin', 'script_writer', 'video_producer', 'organization_admin', 'system_admin', 'system_member'] },
    { path: "/video/:id", component: MediaPlayer, allowedRole: ['admin', 'script_writer', 'video_producer', 'organization_admin', 'system_admin', 'system_member'] },
    { redirect: true, path: "/", to: "/videos", navbarName: "Redirect" }
];

export default appRoutes;
