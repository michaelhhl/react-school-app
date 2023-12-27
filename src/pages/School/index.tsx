import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { UniversityScore, searchUniversityByCategoryType } from "../../api/ScoreApi";
import useTitle from "../../hooks/useTitle";
import { useTranslation } from "react-i18next";

const School: React.FC = () => {
    const { t } = useTranslation()
    const { schoolId } = useParams();
    const [udata, setUdata] = useState<Array<UniversityScore>>([]);
    useTitle(t(`menu.${schoolId}`));

    const getUniversities = async () => {
        const ret = await searchUniversityByCategoryType({ categoryType: schoolId });
        setUdata(ret as Array<UniversityScore>);
    }

    useEffect(() => {
        getUniversities();
    }, [schoolId])

    const StudentColumns = [
        {
            title: t('column.year'),
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: t('column.university'),
            dataIndex: 'university',
            key: 'university',
        },
        {
            title: t('column.major'),
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: t('column.maxScore'),
            dataIndex: 'maxScore',
            key: 'maxScore',
        },
        {
            title: t('column.highLevel'),
            dataIndex: 'highLevel',
            key: 'highLevel',
        },
        {
            title: t('column.minScore'),
            dataIndex: 'minScore',
            key: 'minScore',
        },
        {
            title: t('column.lowLevel'),
            dataIndex: 'lowLevel',
            key: 'lowLevel',
        },
        {
            title: t('column.averageScore'),
            dataIndex: 'averageScore',
            key: 'averageScore',
        },
    ];

    return (
        <>
            <Table dataSource={udata} columns={StudentColumns} rowKey="recordId" />
        </>
    )
}
export default School