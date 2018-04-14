import VideoList from "views/VideoList/VideoList.jsx";
import OrganizationList from "views/Organization/OrganizationList.jsx";
import CurrentOrganization from "views/Organization/CurrentOrganization.jsx";
import TutormakerList from "views/Tutormaker/TutormakerList.jsx";
import Organization from "views/Organization/Organization.jsx";
import MediaPlayer from "views/Video/MediaPlayer.jsx";
import Login from "views/Login/Login.jsx";
import {
    Dashboard, Person, Dvr, ContentPaste, LibraryBooks, BubbleChart, LocationOn, Notifications
} from 'material-ui-icons';

const ALL_USERS = ['admin', 'script_writer', 'video_producer', 'organization_admin', 'system_admin', 'system_member'];
const END_USERS = ['organization_admin', 'system_admin', 'system_member'];
const TUTORMAKERS = ['admin', 'script_writer', 'video_producer'];

const appRoutes = [
    { path: '/login', component: Login },
    { path: '/tutormakers', sidebarName: 'Tutormakers', navbarName: '', icon: Person, component: TutormakerList, allowedRole: ['admin'] },
    { path: '/organizations', sidebarName: 'Lista de Organizações', navbarName: '', icon: Person, component: OrganizationList, allowedRole: ['admin']},
    { path: '/organization/:id', component: Organization, allowedRole: ['admin'] },
    { path: '/current_organization', sidebarName: 'Organização', navbarName: '', icon: Dvr, component: CurrentOrganization, allowedRole: END_USERS },
    { path: '/videos', sidebarName: 'Lista de Vídeos', navbarName: '', icon: ContentPaste, component: VideoList, allowedRole: ALL_USERS },
    { path: '/video/:id', component: MediaPlayer, allowedRole: ALL_USERS },
    { redirect: true, path: "/", to: "/videos", navbarName: "Redirect" }
];

export default appRoutes;
