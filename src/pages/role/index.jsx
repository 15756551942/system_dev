import React, { Component } from 'react'
import {Card,Button,Table,Modal,message} from 'antd'

import {reqRoles,reqAddRole} from '../../api'
import AddRole from './add_role'
import AuthForm from './auth_form'

export default class Role extends Component {
    state = {
        roles:[],
        role:[],
        isShowAdd:false,
        isShowAuth:false
    }
    constructor(props) {
        super(props)
        this.ADDROLE = React.createRef()
    }
    initColumns = () => {
        this.columns = [
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'create_time'
            },
            {
                title:'授权时间',
                dataIndex:'auth_time'
            },
            {
                title:'授权人',
                dataIndex:'auth_name'
            }
        ]
    }
    onRow = (role) => {
        return {
            onClick:event => {
                this.setState({role})
            }
        }
    }
    getRoles = async () => {
        const result = await reqRoles()
        if(result.data.status === 0){
            const roles = result.data.data
            this.setState({roles})
        }
    }
    addRole = async() => {
        this.setState({isShowAdd:false})
        let roleName = this.ADDROLE.current.getRoleName()
        const result = await reqAddRole(roleName)
        if(result.data.status === 0){
            message.success('添加角色成功')
            const role = result.data.data
            this.setState(state => (
                {roles:[...state.roles,role]}
            ))
            
        }else{
            message.error('添加角色失败')
        }
        // console.log(roleName)
    }
    updateRole = () => {

    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }
    render() {
        const {roles,role,isShowAdd,isShowAuth} = this.state
        const title = (
            <span>
                <Button type='primary' style={{marginRight:20}} onClick={() => {this.setState({isShowAdd:true})}}>创建角色</Button>
                <Button disabled={!role._id} type='primary' onClick={() => {this.setState({isShowAuth:true})}} >设置角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table 
                    dataSource={roles}
                    columns={this.columns}
                    bordered
                    rowKey='_id'
                    pagination={{ defaultPageSize: 5}}
                    rowSelection={{type:'radio',selectedRowKeys:[role._id]}}
                    onRow={this.onRow}
                />
                <Modal title="添加角色" visible={isShowAdd} onOk={this.addRole} onCancel={() => {this.setState({isShowAdd:false})}}>
                    <AddRole ref={this.ADDROLE} />
                </Modal>
                <Modal title="设置角色权限" visible={isShowAuth} onOk={this.updateRole} onCancel={() => {this.setState({isShowAuth:false})}}>
                    <AuthForm role={role} />
                </Modal>
            </Card>
        )
    }
}