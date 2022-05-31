import React, { useState } from 'react';
import { Tree } from 'antd';
const treeData = [


    {
        title: '08:00',
        key: '08:00',
        children: [
            {
                title: '08:00',
                key: '08:01',
            },
            {
                title: '08:10',
                key: '08:10',
            },
            {
                title: '08:20',
                key: '08:20',
            },
        ],
    },
    {
        title: '09:00',
        key: '09:00',
        children: [
            {
                title: '09:00',
                key: '09:01',
            },
            {
                title: '09:10',
                key: '09:10',
            },
            {
                title: '09:20',
                key: '09:20',
            },
        ],
    },
    {
        title: '10:00',
        key: '10:00',
        children: [
            {
                title: '10:00',
                key: '10:01',
            },
            {
                title: '10:10',
                key: '10:10',
            },
            {
                title: '10:20',
                key: '10:20',
            },
        ],
    },
    {
        title: '11:00',
        key: '11:00',
        children: [
            {
                title: '11:00',
                key: '11:01',
            },
            {
                title: '11:10',
                key: '11:10',
            },
            {
                title: '11:20',
                key: '11:20',
            },
        ],
    },
    {
        title: '12:00',
        key: '12:00',
        children: [
            {
                title: '12:00',
                key: '12:01',
            },
            {
                title: '12:10',
                key: '12:10',
            },
            {
                title: '12:20',
                key: '12:20',
            },
        ],
    },
    {
        title: '13:00',
        key: '13:00',
        children: [
            {
                title: '13:00',
                key: '13:01',
            },
            {
                title: '13:10',
                key: '13:10',
            },
            {
                title: '13:20',
                key: '13:20',
            },
        ],
    },
    {
        title: '14:00',
        key: '14:00',
        children: [
            {
                title: '14:00',
                key: '14:01',
            },
            {
                title: '14:10',
                key: '14:10',
            },
            {
                title: '14:20',
                key: '14:20',
            },
        ],
    },
    {
        title: '15:00',
        key: '15:00',
        children: [
            {
                title: '15:00',
                key: '15:01',
            },
            {
                title: '15:10',
                key: '15:10',
            },
            {
                title: '15:20',
                key: '15:20',
            },
        ],
    },
    {
        title: '16:00',
        key: '16:00',
        children: [
            {
                title: '16:00',
                key: '16:01',
            },
            {
                title: '16:10',
                key: '16:10',
            },
            {
                title: '16:20',
                key: '16:20',
            },
        ],
    },
    {
        title: '17:00',
        key: '17:00',
        children: [
            {
                title: '17:00',
                key: '17:01',
            },
            {
                title: '17:10',
                key: '17:10',
            },
            {
                title: '17:20',
                key: '17:20',
            },
        ],
    },
    {
        title: '18:00',
        key: '18:00',
        children: [
            {
                title: '18:00',
                key: '18:01',
            },
            {
                title: '18:10',
                key: '18:10',
            },
            {
                title: '18:20',
                key: '18:20',
            },
        ],
    },
    {
        title: '19:00',
        key: '19:00',
        children: [
            {
                title: '19:00',
                key: '19:01',
            },
            {
                title: '19:10',
                key: '19:10',
            },
            {
                title: '19:20',
                key: '19:20',
            },
        ],
    },

];

const Time = ({ checkedKeys, setCheckedKeys }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };

    const onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    const onSelect = (selectedKeysValue, info) => {
        console.log('onSelect', info);
        setSelectedKeys(selectedKeysValue);
    };

    return (
        <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}

        />
    );
};

export default Time;