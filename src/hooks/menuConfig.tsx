import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface MenuItem {
    label?: ReactNode,
    key: string,
    children?: Array<MenuItem>,
    icon: ReactNode
}

const useMenuConfig = () => {
    const { t } = useTranslation()

    const subjectsMap: { [subject: string]: string } = {
        'Economics': '经济学',
        'NeoConfucianism': '理学',
        'Engineering': '工学'
    };
    const subjectsSubObjMap: Map<string, string[]> = new Map<string, string[]>();
    subjectsSubObjMap.set('Economics', ['jjxl', 'czxl', 'jrxl', 'jjymyl']);
    subjectsSubObjMap.set('NeoConfucianism', ['sxl', 'wlxl', 'hxl', 'twxl', 'dlkxl', 'dqkxl', 'hykxl', 'dqwlxl', 'dzxl', 'swkxl', 'xlxl', 'tjxl']);
    subjectsSubObjMap.set('Engineering', ['lxl', 'jxl', 'yql', 'cll', 'nydll', 'dql', 'dzxxl', 'zdhl', 'jsjl', 'tml', 'sll', 'dzl', 'kyl', 'qgl', 'jtysl', 'hygcl', 'hkhtl', 'hjkxygc']);


    const menus: Array<MenuItem> = []
    const keyArray = ['Economics', 'NeoConfucianism', 'Engineering']
    keyArray.forEach((element, index, arr) => {
        const subMenus: Array<MenuItem> = [];
        subjectsSubObjMap.get(element)?.forEach((major, majorIndex, majorArr) => {
            subMenus.push({
                label: <Link to={'/school/' + majorArr[majorIndex]} >{t(`menu.${major}`)}</Link>,
                key: '/school/' + majorArr[majorIndex],
                icon: <PieChartOutlined />
            })
        })
        menus.push(
            {
                label: <Link to={'/school/' + arr[index]} >{subjectsMap[element]}</Link>,
                key: arr[index],
                icon: <DesktopOutlined />,
                children: subMenus,
            }
        )
    });

    return menus
}
export default useMenuConfig

