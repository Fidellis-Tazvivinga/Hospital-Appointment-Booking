import React from 'react'
import { Button, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import "../Admin/css/Admin.css"
import { Link } from 'react-router-dom';

const ContentHeader = ({ link, name }) => {
    return (



        <div className="doctors">
            <div className="doctors__top">
                <div className="manage__doctors">
                    <h2>Manage {name && name}</h2>
                </div>
                <div className="add__doctors">
                    <Link className='add__text' to={link}>
                        <Button type="primary" icon={<PlusOutlined />} className="add__text__button" >

                            Add New

                        </Button>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default ContentHeader