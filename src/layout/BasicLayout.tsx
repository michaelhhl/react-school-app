import React, { useEffect, useState } from 'react';
import { Avatar, Col, Layout, Menu, MenuProps, Row, Switch, theme } from 'antd';
import useMenuConfig from '../hooks/menuConfig';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import routes from '../router';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import useTitle from '../hooks/useTitle';

const { Header, Content, Sider } = Layout;


const BasicLayout: React.FC = () => {
    const { t, i18n } = useTranslation()
    const location = useLocation();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([]);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
    const [isInit, setIsInit] = useState<boolean>(false)
    const [openKeys, setOpenKeys] = useState(['']);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const menus = useMenuConfig();
    useTitle(t('title'));

    useEffect(() => {
        const routers = matchRoutes(routes, location.pathname);
        const pathArr: string[] = [];
        if (routers !== null) {
            routers.forEach((item) => {
                const path = item.route.path;
                if (path) {
                    pathArr.push(path);
                }
            })
        }
        setDefaultSelectedKeys(pathArr);
        setDefaultOpenKeys(pathArr);
        setIsInit(true);
    }, [location.pathname]);

    if (!isInit) {
        return null;
    }

    const rootSubmenuKeys = ['Economics', 'NeoConfucianism', 'Engineering'];

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const onChangeLang = (checked: boolean) => {
        if (checked) {
            i18n.changeLanguage('cn')
        } else {
            i18n.changeLanguage('jp')
        }
    }


    return (
        <Layout className='min-h-screen w-screen'>
            <Header className='bg-blue-100'>
                <Row>
                    <Col span={20} className='flex place-content-center'>
                        {t('welcome')}
                    </Col>
                    <Col span={4} className='flex justify-end items-center'>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <Switch checkedChildren="CN" unCheckedChildren="JP" onChange={onChangeLang} className="bg-blue-500 ml-1" defaultChecked />
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Sider style={{ background: colorBgContainer, minWidth: '200px' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={defaultSelectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menus}
                    />
                </Sider>
                <Layout className='p-2'>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default BasicLayout;