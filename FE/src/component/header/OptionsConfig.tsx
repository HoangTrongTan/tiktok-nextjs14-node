import { CameraIcon, CardAIcon, CointTiktokIcon, FavoritesIcon, FlashbulbIcon, HomeLiveIcon, KeyboardIcon, MoonIcon, PersonIcon, QuestionsIcon, SettingsIcon } from '../../../public/icons/icons';
const config = [
    {
        text: "Xem hồ sơ",
        icons: <PersonIcon />,
        href: '/profile',
        id: true
    },
    {
        text: "Yêu thích",
        icons: <FavoritesIcon />
    },
    {
        text: "Nhận xu",
        icons: <CointTiktokIcon />
    },
    {
        text: "LIVE Studio",
        icons: <CameraIcon />
    },
    {
        text: "Trung tâm LIVE",
        icons: <HomeLiveIcon />
    },
    {
        text: "Trung tâm Nhà sáng tạo LIVE",
        icons: <FlashbulbIcon />
    },
    {
        text: "Cài đặt",
        icons: <SettingsIcon />
    },
    {
        text: "Tiếng việt",
        icons: <CardAIcon />
    },
    {
        text: "Phản hồi và trợ giúp",
        icons: <QuestionsIcon />
    },
    {
        text: "Phím tắt trên bàn phím",
        icons: <KeyboardIcon />
    },
    {
        text: "Chế độ tối",
        icons: <MoonIcon />
    },
];
export { config }