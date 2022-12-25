import React, { useState } from "react";
import { Header, Icon, Menu, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { Link } from "../routes";

const Navbar = () => {

    return (
        <Menu>
            <Menu.Item name='logo'>
                <Link route='/'>
                    <a className="">
                        <Header as='h2' floated='left'>
                            <Icon name='settings' />
                            <Header.Content>
                                Campaign Contribute
                                <Header.Subheader>Manage your preferences</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </a>
                </Link>
            </Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item name='campaigns'>
                    <Link route='/'>
                        <a className="">
                            <b>Campaigns</b>
                        </a>
                    </Link>
                </Menu.Item>

                <Menu.Item name='create' >
                    <Link route='/campaigns/new'>
                        <a className="">
                            <Button icon='plus' />
                        </a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Navbar;